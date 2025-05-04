import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IpContextProps {
  ipCamera: string;
  setIpCamera: (value: string) => void;
  ipData: string;
  setIpData: (value: string) => void;
}

const IpContext = createContext<IpContextProps | undefined>(undefined);

export const IpProvider = ({ children }: { children: ReactNode }) => {
  const [ipCamera, setIpCamera] = useState('');
  const [ipData, setIpData] = useState('');

  return (
    <IpContext.Provider value={{ ipCamera, setIpCamera, ipData, setIpData }}>
      {children}
    </IpContext.Provider>
  );
};

export const useIpContext = () => {
  const context = useContext(IpContext);
  if (!context) {
    throw new Error('useIpContext must be used within an IpProvider');
  }
  return context;
};
