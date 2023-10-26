import { createContext, useState } from "react";

export let tokenContext = createContext();

function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);
  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
}

export default TokenContextProvider;
