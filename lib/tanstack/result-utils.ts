/**
 * Utility functions for working with Result objects from API responses
 */

export function isSuccessResult<T>(result: Result<T>): result is Result<T> & { data: T } {
  return result.success === true && result.data !== undefined;
}

export function isErrorResult<T>(result: Result<T>): result is Result<T> & { message: string } {
  return result.success === false && result.message !== undefined;
}

export function getResultData<T>(result: Result<T>): T | undefined {
  return isSuccessResult(result) ? result.data : undefined;
}

export function getResultError<T>(result: Result<T>): string | undefined {
  return isErrorResult(result) ? result.message : undefined;
}

export function createSuccessResult<T>(data: T): Result<T> {
  return {
    success: true,
    data
  };
}

export function createErrorResult<T>(message: string): Result<T> {
  return {
    success: false,
    message
  };
}
