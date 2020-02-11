import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '../en.json';
import CssBaseline from '@material-ui/core/CssBaseline';

export const renderElement = (element: React.ReactElement) => {
  return render(
    <IntlProvider locale='en' messages={messages} >
      <CssBaseline />
      {element}
    </IntlProvider>
  );
};

export interface MockTouch {
  identifier: number;
  clientX: number;
  clientY: number;
}

