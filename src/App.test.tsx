import { render, screen } from '@testing-library/react';
import App from './App';

// Mock fetch
global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve([])
  })
) as jest.Mock;

describe('App Component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders reviews link', async () => {
    const AppComponent = await App();
    render(AppComponent);
    
    const linkElement = await screen.findByText(/reviews/i);
    expect(linkElement).toBeInTheDocument();
  });
});