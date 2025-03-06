import '@testing-library/jest-dom'
import { mockCookieStore, mockUseCookies } from '@/__tests__/__mocks__/cookies';
import { testItems } from "@/__tests__/__utils__/testData"

jest.mock("next-client-cookies", () => ({
  ...jest.requireActual('next-client-cookies'),
  useCookies: () => mockUseCookies
}))

jest.mock("next/navigation", () => ({
  ...jest.requireActual('next/navigation'),
  useParams: jest.fn(),
}))