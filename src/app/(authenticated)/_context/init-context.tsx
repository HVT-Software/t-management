'use client';

import { createContext, PropsWithChildren, useContext } from 'react';

interface InitContext {
  isMobile: boolean;
}

const initContext = createContext<InitContext>({ isMobile: false });

export const useInitContext = () => {
  return useContext(initContext);
};

export const InitContextProvider: React.FC<PropsWithChildren & { isMobile: boolean }> = ({ children, isMobile }) => {
  return <initContext.Provider value={{ isMobile }}>{children}</initContext.Provider>;
};
