import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <AppContext.Provider value ={{ users, setUsers, products, setProducts }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext

