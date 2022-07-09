import React, { useContext } from "react";
const UserContext = React.createContext();

const useStates = () => useContext(UserContext);

const StateProvider = ({ children, states }) => (
  <UserContext.Provider value={states}>{children}</UserContext.Provider>
);

export { StateProvider, useStates };
