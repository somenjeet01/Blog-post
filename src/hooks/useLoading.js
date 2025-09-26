import { useState, useCallback } from "react";

/**
 * Custom hook for managing loading states with async operations
 * @param {Function} asyncFn - The async function to execute
 * @param {Object} options - Configuration options
 * @returns {Object} - Loading state and execute function
 */
export const useAsyncLoading = (asyncFn, options = {}) => {
  const {
    initialLoading = false,
    onSuccess,
    onError,
    loadingDelay = 0, // Optional delay before showing loading state
  } = options;

  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setError(null);

        // Optional delay before showing loading
        if (loadingDelay > 0) {
          setTimeout(() => setIsLoading(true), loadingDelay);
        } else {
          setIsLoading(true);
        }

        const result = await asyncFn(...args);

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (err) {
        setError(err);
        if (onError) {
          onError(err);
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFn, onSuccess, onError, loadingDelay]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    execute,
    reset,
  };
};

/**
 * Hook for managing multiple loading states
 * @param {Array} keys - Array of loading state keys
 * @returns {Object} - Loading states and setters
 */
export const useMultipleLoading = (keys = []) => {
  const [loadingStates, setLoadingStates] = useState(
    keys.reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );

  const setLoading = useCallback((key, value) => {
    setLoadingStates((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const isAnyLoading = Object.values(loadingStates).some(Boolean);

  return {
    loadingStates,
    setLoading,
    isAnyLoading,
  };
};

/**
 * Hook for debounced loading state (prevents flashing for fast operations)
 * @param {number} delay - Delay in milliseconds before showing loading
 * @returns {Object} - Debounced loading state and setter
 */
export const useDebouncedLoading = (delay = 200) => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const setDebouncedLoading = useCallback(
    (loading) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (loading) {
        const id = setTimeout(() => {
          setIsLoading(true);
        }, delay);
        setTimeoutId(id);
      } else {
        setIsLoading(false);
        setTimeoutId(null);
      }
    },
    [delay, timeoutId]
  );

  return {
    isLoading,
    setLoading: setDebouncedLoading,
  };
};
