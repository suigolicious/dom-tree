import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const promptElement = screen.getByText('Title');
  expect(promptElement).toBeInTheDocument();
});
