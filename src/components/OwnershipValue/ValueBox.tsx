import { Typography } from '@material-ui/core';
import Circle from '@material-ui/icons/FiberManualRecord';
import React from 'react';
import { FormattedNumber } from 'react-intl';
import { GREY } from '../../colors';

interface Props {
  value: number;
  label: React.ReactNode;
  monetaryValue?: boolean;
  finalBox?: boolean;
}

const ValueBox: React.FC<Props> = (props) => {
  const { value, label, monetaryValue, finalBox } = props;
  return <div data-testid="valueBoxDiv" style={{ display: 'grid', gridTemplateColumns: '28px auto' }}>
    <div style={{ justifySelf: 'center', alignSelf: 'center' }} >
      <Circle style={{ color: GREY, display: 'block' }} />
    </div>
    <div style={{ alignSelf: 'center' }}>
      {label}
    </div>
    <div style={{ justifySelf: 'center' }} >
      {
        !finalBox &&
        <div style={{ border: `1px solid ${GREY}`, height: '100%' }} />
      }
    </div>
    <div style={{ padding: '0 20px' }}>
      <div style={{ textAlign: 'center', padding: '8px 16px' }}>
        {
          props.finalBox ?
            <Typography variant='h4' color='primary'>$<FormattedNumber value={value} /></Typography> :
            <Typography variant='subtitle1' style={{ fontSize: '19.5px' }}>
              {monetaryValue && '$'}
              <FormattedNumber value={value} />
            </Typography>
        }
      </div>
      <div>
        {props.children}
      </div>
    </div>
  </div>
}

ValueBox.defaultProps = { monetaryValue: true }

export default ValueBox;