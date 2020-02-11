import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { calculateOwnership } from './logic';
import ValueBox from './ValueBox';
import Tooltip from '@material-ui/core/Tooltip';

const ValueLabelComponent: React.FC<{
  children: React.ReactElement;
  open: boolean;
  value: number;
}> = (props) => {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const CustomSlider = withStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
}))(Slider);

const Wrapper = styled.div`
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,.125);
`;

const MonthlyPayment = styled.div`
  border-bottom: 1px solid rgba(0,0,0,.125);
  padding: 20px;
`;

interface InitValues {
  min: number;
  max: number;
  default: number;
}

interface Option {
  initialInvestment: InitValues;
  monthlyInvestment: InitValues;
  yearsRenting: InitValues;
}

interface Props {
  baseRent: number;
  option: Option;
}

const OwnershipValue: React.FC<Props> = (props) => {
  const { baseRent, option } = props;
  const [initialInvestment, setInitialInvestment] = React.useState(option.initialInvestment.default);
  const [monthlyInvestment, setMonthlyInvestment] = React.useState(option.monthlyInvestment.default);
  const [yearsRenting, setYearsRenting] = React.useState(option.yearsRenting.default);

  const ownershipValue = React.useMemo(
    () => calculateOwnership(initialInvestment, monthlyInvestment, yearsRenting * 12),
    [initialInvestment, monthlyInvestment, yearsRenting]
  );

  return <Wrapper>
    <MonthlyPayment>
      <div style={{ paddingBottom: '8px' }}>
        <Typography variant='subtitle2' color='textSecondary'><FormattedMessage id="monthlyPayment" /></Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography variant='subtitle1'>
          <FormattedMessage id="rent" values={{ value: baseRent }} />
        </Typography>
        <Typography variant='subtitle1' >
          &nbsp;+&nbsp;
        </Typography>
        <Typography variant='subtitle1' color='primary'>
          <FormattedMessage id="investment" values={{ value: monthlyInvestment }} />
        </Typography>
      </div>
    </MonthlyPayment>
    <div style={{ padding: '20px' }}>
      <ValueBox value={initialInvestment} label={
        <Typography variant='subtitle2' color='textSecondary'>
          <span style={{ textDecoration: 'line-through' }}>
            <FormattedMessage id="securityDeposit" />
          </span>
          &nbsp;→&nbsp;
        <FormattedMessage id="initialInvestment" />
        </Typography>} >
        <CustomSlider
          ValueLabelComponent={ValueLabelComponent}
          defaultValue={option.initialInvestment.default}
          min={option.initialInvestment.min}
          max={option.initialInvestment.max}
          onChangeCommitted={(e, value) => setInitialInvestment(value as number)} />
      </ValueBox>
      <ValueBox value={monthlyInvestment} label={
        <Typography variant='subtitle2' color='textSecondary'>
          <FormattedMessage id="monthlyInvestment" />
        </Typography>} >
        <CustomSlider
          ValueLabelComponent={ValueLabelComponent}
          defaultValue={option.monthlyInvestment.default}
          min={option.monthlyInvestment.min}
          max={option.monthlyInvestment.max}
          onChangeCommitted={(e, value) => setMonthlyInvestment(value as number)} />
      </ValueBox>
      <ValueBox
        monetaryValue={false} value={yearsRenting} label={
          <Typography variant='subtitle2' color='textSecondary'>
            <FormattedMessage id="yearsWU" />
          </Typography>} >
        <CustomSlider
          ValueLabelComponent={ValueLabelComponent}
          defaultValue={option.yearsRenting.default}
          min={option.yearsRenting.min}
          max={option.yearsRenting.max}
          onChange={(e, value) => setYearsRenting(value as number)} />
      </ValueBox>
      <ValueBox
        value={ownershipValue}
        finalBox
        label={
          <Typography variant='subtitle2' color='textSecondary'>
            <FormattedMessage id="ownershipValue" />
          </Typography>} >
      </ValueBox>
      <div style={{ textAlign: 'center' }}>
        <Typography variant='body2'>
          <FormattedMessage id="text" values={{ value: ownershipValue }} />
        </Typography>
      </div>
    </div>
  </Wrapper>
}

export default OwnershipValue;
