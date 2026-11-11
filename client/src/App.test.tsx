import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderApp = () =>
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

test('renders start new meeting button', () => {
  renderApp();
  const buttonElement = screen.getByText(/Start new meeting/i);
  expect(buttonElement).toBeInTheDocument();
});

test("renders room code input", () => {
  renderApp();
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});
