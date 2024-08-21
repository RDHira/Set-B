// src/components/UserList.test.js
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

// Mock the global fetch function
global.fetch = jest.fn();

test('renders loading state initially', () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  render(<UserList />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('renders user names when data is fetched successfully', async () => {
  const mockUsers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockUsers,
  });

  render(<UserList />);
  await waitFor(() => expect(screen.getByText(/John Doe/i)).toBeInTheDocument());
  expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
});

test('renders error message when API call fails', async () => {
  fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

  render(<UserList />);
  await waitFor(() => expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument());
});
