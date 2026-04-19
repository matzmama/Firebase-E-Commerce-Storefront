// If your config is at src/firebase.js, create src/__mocks__/firebase.js

const mockCollection = jest.fn();
const mockQuery = jest.fn();
const mockGetDocs = jest.fn(() => Promise.resolve({ docs: [] }));
const mockAddDoc = jest.fn(() => Promise.resolve());
const mockUpdateDoc = jest.fn(() => Promise.resolve());
const mockDeleteDoc = jest.fn(() => Promise.resolve());
const mockDoc = jest.fn();

export const db = {};
export const auth = { currentUser: null };

export { 
  mockCollection as collection,
  mockQuery as query,
  mockGetDocs as getDocs,
  mockAddDoc as addDoc,
  mockUpdateDoc as updateDoc,
  mockDeleteDoc as deleteDoc,
  mockDoc as doc
};