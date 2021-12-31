import React from 'react';
import { render } from '@testing-library/react';
import App from './textToSpeech';

test('renders learn react link', () => {
  const { getByText } = render(<textToSpeech />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
