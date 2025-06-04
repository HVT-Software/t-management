interface ErrorComponentProps {
  error: Error | unknown;
}

export function ErrorComponent({ error }: ErrorComponentProps) {
  const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định";

  return (
    <div className="rounded-md bg-destructive/10 p-6 text-center">
      <h3 className="text-lg font-medium text-destructive mb-2">Đã xảy ra lỗi</h3>
      <p className="text-sm text-destructive">{errorMessage}</p>
    </div>
  );
}
