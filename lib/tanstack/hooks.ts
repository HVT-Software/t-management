import { QueryKey, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getResultData, isErrorResult } from "./result-utils";

/**
 * Custom hook for fetching data with integrated Result type handling
 */
export function useResultQuery<TData, TError = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<Result<TData>>,
  options?: Omit<UseQueryOptions<Result<TData>, TError, TData>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey,
    queryFn,
    select: result => {
      if (isErrorResult(result)) {
        throw new Error(result.message);
      }
      return getResultData(result) as TData;
    },
    ...options
  });
}

/**
 * Custom hook for mutations with integrated Result type handling
 */
export function useResultMutation<TData, TVariables, TError = unknown>(
  mutationFn: (variables: TVariables) => Promise<Result<TData>>,
  options?: Omit<UseMutationOptions<Result<TData>, TError, TVariables, unknown>, "mutationFn">
) {
  return useMutation({
    mutationFn,
    onSuccess: (result, variables, context) => {
      if (options?.onSuccess && isErrorResult(result) === false) {
        options.onSuccess(result, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options
  });
}

/**
 * Hook for handling file downloads with FileResult
 */
export function useFileDownload(queryKey: QueryKey, queryFn: () => Promise<Result<FileResult>>) {
  return useQuery({
    queryKey,
    queryFn,
    enabled: false,
    select: result => {
      if (isErrorResult(result)) {
        throw new Error(result.message);
      }
      return result.data;
    },
    onSuccess: (data: any) => {
      if (data) {
        const blob = new Blob([data.byteArray]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = data.fileName;
        link.click();
        URL.revokeObjectURL(url);
      }
    }
  });
}
