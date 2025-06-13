import type { LoginRequest, LoginResponse } from '@shared/types/auth';
import 'next-auth';
import type { Awaitable, RequestInternal } from 'next-auth';
import type { CommonProviderOptions, CredentialInput } from 'next-auth/providers';
import type { AdapterUser } from 'next-auth/src/adapters';
import type { Account, Profile } from 'next-auth/src/core/types';

declare module 'next-auth' {
  export interface User extends LoginResponse {}
  export interface CredentialsConfig<C extends Record<string, CredentialInput> = Record<string, CredentialInput>>
    extends CommonProviderOptions {
    type: 'credentials';
    credentials: C;
    authorize: (
      credentials: LoginRequest,
      req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>
    ) => Awaitable<LoginResponse | null>;
  }
  export interface Session {
    user: Omit<LoginResponse, '$unknown' | '$typeName' | 'token'>;
    token: string;
    refreshToken: string;
    expiredTime: number;
    username: string;
  }

  export interface CallbacksOptions<P = Profile, A = Account> {
    signIn: (params: {
      user: User | AdapterUser | string;
      account: A | null;
      profile?: P;
      email?: {
        verificationRequest?: boolean;
      };

      credentials?: Record<string, CredentialInput>;
    }) => Awaitable<string | boolean>;
  }
}

// declare module 'next-auth/providers/credentials' {
//   export interface CredentialsConfig<C extends Record<string, CredentialInput> = Record<string, CredentialInput>>
//     extends CommonProviderOptions {
//     type: 'credentials';
//     credentials: C;
//     authorize: (
//       credentials: Record<keyof C, string> | undefined,
//       req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>
//     ) => Awaitable<User | null>;
//   }
// }

declare module 'next-auth/jwt' {
  export interface DefaultJWT {
    token: string;
    refreshToken: string;
    user: Omit<LoginResponse, '$unknown' | '$typeName' | 'token'>;
    expiredTime: number;
    username: string;
  }
}

declare module '@tanstack/react-table' {
  export interface ColumnFilter<TKey extends string = string, TValue = any> {
    id: TKey;
    value: TValue;
  }

  export type ColumnFiltersState<TKey extends string = string, TValue = any> = Array<ColumnFilter<TKey, TValue>>;
}
