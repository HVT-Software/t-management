declare interface WrappedComponentProps {
  children?: React.ReactNode;
}

declare interface LoginUser {
  tenantName: string;
  name: string;
  isAdmin?: boolean;
  username: string;
}

declare interface LoginDto extends LoginUser {
  token: string;
  expiredTime: number;
  session: number;
  username: string;
}

declare interface BaseResponse<T = undefined> {
  success: boolean;
  message?: string;
  data: T;
}

declare interface BaseListData<T, S = undefined> {
  count: number;
  items: Array<T>;
  summary?: S;
}
