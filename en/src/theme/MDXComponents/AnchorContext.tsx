import { createContext, useContext } from 'react';

export const InsideAnchorContext = createContext(false);
export const useInsideAnchor = () => useContext(InsideAnchorContext);
