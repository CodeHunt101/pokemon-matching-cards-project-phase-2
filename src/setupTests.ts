// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// src/setupTests.js
import '@testing-library/jest-dom';

// This helps with mocking components that might have complex rendering
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }))
})

// Mock TextEncoder/TextDecoder
// if (typeof TextEncoder === 'undefined') {
//   const { TextEncoder, TextDecoder } = require('util');
//   global.TextEncoder = TextEncoder;
//   global.TextDecoder = TextDecoder;
// }