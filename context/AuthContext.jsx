import { createContext, useContext, useState } from "react";

// store the user data that is need troughout the app
const UserContext = createContext();

export const UserAuth = () => {
  return useContext(UserContext);
};

export default function AuthContextProvider({ children }) {
  const [isLoggedOut, setIsLoggedOut] = useState(true);

  return (
    <UserContext.Provider value={{ isLoggedOut }}>
      {children}
    </UserContext.Provider>
  );
}
