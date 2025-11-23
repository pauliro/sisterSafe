declare module '@self.id/web' {
  export class EthereumAuthProvider {
    constructor(provider: unknown, address: string);
  }

  export type AuthenticateParams = {
    authProvider: EthereumAuthProvider;
    ceramic: string;
    connectNetwork?: string;
  };

  export class SelfID {
    id: string;
    static authenticate(params: AuthenticateParams): Promise<{ id: string }>;
  }
}

