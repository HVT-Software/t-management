declare type Result<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

declare type FileResult = {
  fileName: string;
  byteArray: Uint8Array;
};
