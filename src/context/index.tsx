import React, { createContext } from 'react';

// default low level components
const DefaultLink: React.FC<{className?: string, href?: string, children?: React.ReactNode, onClick?: () => void, target?: string}> = 
  ({className, href, children, onClick, target}) => <a className={className} href={href} onClick={onClick} target={target}> {children}</a>;


const LameduseUIContext = createContext<LameduseUIContextProps>({
  LowLinkComponent: DefaultLink,
});

// Allows you to change the low level components used by LameduseUI.
interface LameduseUIContextProps {
  LowLinkComponent: React.FC<{className?: string, href?: string, children?: React.ReactNode, onClick?: () => void, target?: string}>;
}


// Provider func
const LameduseUIProvider: React.FC<{ children: React.ReactNode, props: Partial<LameduseUIContextProps>}> = ({ children, props }) => {
  let fullprops : LameduseUIContextProps = {
    LowLinkComponent: props.LowLinkComponent || DefaultLink,
  };
  return (
    <LameduseUIContext.Provider value={fullprops}>
      {children}
    </LameduseUIContext.Provider>
  );
};

export { LameduseUIContext, LameduseUIProvider, LameduseUIContextProps};
