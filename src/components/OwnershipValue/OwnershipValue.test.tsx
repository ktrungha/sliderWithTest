import { fireEvent, within } from '@testing-library/react';
import React from 'react';
import OwnershipValue from '.';
import { renderElement } from '../../__test__/utils';

describe('<OwnershipValue />', () => {
  const option = {
    initialInvestment: { min: 0, max: 10000, default: 1500, step: 500 },
    monthlyInvestment: { min: 0, max: 5000, default: 500, step: 500 },
    yearsRenting: { min: 0, max: 10, default: 1, step: 1 }
  };

  it('simple render', () => {
    const queries = renderElement(<OwnershipValue baseRent={1000} option={option} />)

    queries.getByText('$1,000 rent');
    const inititalInvestmentValueBox = queries.getAllByTestId("valueBoxDiv")[0];
    within(inititalInvestmentValueBox).getByText('$1,500');
    const monthlyInvestmentValueBox = queries.getAllByTestId("valueBoxDiv")[1];
    within(monthlyInvestmentValueBox).getByText('$500');
    const yearValueBox = queries.getAllByTestId("valueBoxDiv")[2];
    within(yearValueBox).getByText('1');
    const finalValueBox = queries.getAllByTestId("valueBoxDiv")[3];
    within(finalValueBox).getByText('$7,500');
    queries.getByText("Use your $7,500 ownership", { exact: false });
  })

  it('change initial investment', () => {
    const queries = renderElement(<OwnershipValue baseRent={1000} option={option} />);

    const inititalInvestmentSlider = queries.getAllByRole('slider')[0];

    // increase value
    fireEvent.keyDown(inititalInvestmentSlider, { key: 'ArrowUp' });
    fireEvent.keyDown(inititalInvestmentSlider, { key: 'ArrowUp' });
    {
      const inititalInvestmentValueBox = queries.getAllByTestId("valueBoxDiv")[0];
      within(inititalInvestmentValueBox).getByText('$2,500');
      const finalValueBox = queries.getAllByTestId("valueBoxDiv")[3];
      within(finalValueBox).getByText('$8,500');
    }

    // decrease value
    fireEvent.keyDown(inititalInvestmentSlider, { key: 'ArrowDown' });
    fireEvent.keyDown(inititalInvestmentSlider, { key: 'ArrowDown' });
    {
      const inititalInvestmentValueBox = queries.getAllByTestId("valueBoxDiv")[0];
      within(inititalInvestmentValueBox).getByText('$1,500');
      const finalValueBox = queries.getAllByTestId("valueBoxDiv")[3];
      within(finalValueBox).getByText('$7,500');
    }
  })


  it('change monthly investment', () => {
    const queries = renderElement(<OwnershipValue baseRent={1000} option={option} />);

    const monthlyInvestmentSlider = queries.getAllByRole('slider')[1];

    // increase value
    fireEvent.keyDown(monthlyInvestmentSlider, { key: 'ArrowUp' });
    {
      const monthlyInvestmentValueBox = queries.getAllByTestId("valueBoxDiv")[1];
      within(monthlyInvestmentValueBox).getByText('$1,000');
      const finalValueBox = queries.getAllByTestId("valueBoxDiv")[3];
      within(finalValueBox).getByText('$13,500');
    }

    // decrease value
    fireEvent.keyDown(monthlyInvestmentSlider, { key: 'ArrowDown' });
    {
      const monthlyInvestmentValueBox = queries.getAllByTestId("valueBoxDiv")[1];
      within(monthlyInvestmentValueBox).getByText('$500');
      const finalValueBox = queries.getAllByTestId("valueBoxDiv")[3];
      within(finalValueBox).getByText('$7,500');
    }
  })

  it('change year', () => {
    const queries = renderElement(<OwnershipValue baseRent={1000} option={option} />);

    const yearsSlider = queries.getAllByRole('slider')[2];

    // increase value
    fireEvent.keyDown(yearsSlider, { key: 'ArrowUp' });
    {
      const yearValueBox = queries.getAllByTestId("valueBoxDiv")[2];
      within(yearValueBox).getByText('2');
      const finalValueBox = queries.getAllByTestId("valueBoxDiv")[3];
      within(finalValueBox).getByText('$13,500');
    }

    // decrease value
    fireEvent.keyDown(yearsSlider, { key: 'ArrowDown' });
    {
      const yearValueBox = queries.getAllByTestId("valueBoxDiv")[2];
      within(yearValueBox).getByText('1');
      const finalValueBox = queries.getAllByTestId("valueBoxDiv")[3];
      within(finalValueBox).getByText('$7,500');
    }
  })
});