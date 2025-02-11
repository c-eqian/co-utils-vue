import { tryOnScopeDispose } from '../src';
import { getCurrentScope, onScopeDispose } from 'vue';

// Mock Vue's reactivity functions
jest.mock('vue', () => ({
  getCurrentScope: jest.fn(),
  onScopeDispose: jest.fn(),
}));

describe('tryOnScopeDispose', () => {
  it('should register the callback and return true if there is a current scope', () => {
    const mockFn = jest.fn();
    (getCurrentScope as jest.Mock).mockReturnValue(true);
    (onScopeDispose as jest.Mock).mockImplementation((fn) => fn());

    const result = tryOnScopeDispose(mockFn);

    expect(result).toBe(true);
    expect(onScopeDispose).toHaveBeenCalledWith(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

  it('should not register the callback and return false if there is no current scope', () => {
    const mockFn = jest.fn();
    (getCurrentScope as jest.Mock).mockReturnValue(null);

    const result = tryOnScopeDispose(mockFn);

    expect(result).toBe(false);
    expect(onScopeDispose).not.toHaveBeenCalled();
    expect(mockFn).not.toHaveBeenCalled();
  });
});
