import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders reviws', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const linkElement = screen.getByText(/reviews/i);
  expect(linkElement).toBeInTheDocument();
});
