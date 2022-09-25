import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const promptElement = screen.getByText('Insert website to parse:');
  expect(promptElement).toBeInTheDocument();
});
