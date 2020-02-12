class Pool {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency;
    this.workerCount = 0;
    this.queue = [];
    this.checkQueue = this.checkQueue.bind(this);
  }

  checkQueue() {
    if (this.queue.length > 0) {
      const work = this.queue.shift();
      work.callback(work.argument).then((result) => {
        work.resolve(result);
        this.checkQueue();
      });
    } else {
      this.workerCount -= 1;
    }
  }

  execute(callback, argument) {
    if (this.workerCount < this.maxConcurrency) {
      this.workerCount += 1;

      return new Promise(resolve => {
        callback(argument).then((result) => {
          resolve(result);
          this.checkQueue();
        });
      });
    } else {
      return new Promise(resolve => {
        this.queue.push({ callback, argument, resolve });
      });
    }
  }
}

function map(array, callback, option) {
  const { concurrency } = option;

  const pool = new Pool(concurrency);

  return Promise.all(array.map(one => pool.execute(callback, one)));
};

async function map2(array, callback, option) {
  const { concurrency } = option;

  const retval = new Array(array.length);

  const workers = new Array(concurrency).fill(1);
  await Promise.all(
    workers.map(() => new Promise(async resolve => {
      for(let i = 0; i < array.length; i += 1) {
        if (retval[i] === undefined) {
          retval[i] = null;
          const result = await callback(array[i]);
          retval[i] = result;
        }
      }
      resolve();
    }))
  );

  return retval;
}

const retval = map([1, 2, 3, 4, 5], async (val) => {
  let now = new Date();
  console.log('Start' + val + ' ' + now.getSeconds());
  await new Promise(resolve => setTimeout(resolve, 10000 - val * 1000));
  now = new Date();
  console.log('End' + val + ' ' + now.getSeconds());
  return val + 1;
}, { concurrency: 2 });

retval.then((result) => console.log(result));