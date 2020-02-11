import React from 'react';
import Container from '@material-ui/core/Container'
import OwnershipValue from './components/OwnershipValue';

const App: React.FC = () => {
  return (
    <div style={{ margin: '20px' }}>
      <Container>
        <div style={{ width: '510px' }}>
          <OwnershipValue baseRent={1000} option={{
            initialInvestment: { min: 0, max: 10000, default: 1500 },
            monthlyInvestment: { min: 0, max: 5000, default: 500 },
            yearsRenting: { min: 0, max: 10, default: 1 }
          }} />
        </div>
      </Container>
    </div>
  );
}

export default App;
