export const mockCookieStore = new Map<string, string>()
export const mockUseCookies = {
  set: jest.fn().mockImplementation((key: string, value: string) => mockCookieStore.set(key, value)),
  get: jest.fn().mockImplementation((key: string) => mockCookieStore.get(key)),
}
