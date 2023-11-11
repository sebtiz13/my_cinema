export function clearMock(mockObject: Record<string, jest.Mock>) {
  for (const mock of Object.keys(mockObject)) {
    mockObject[mock].mockClear();
  }
}
