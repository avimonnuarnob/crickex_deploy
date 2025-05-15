import Cookies from "js-cookie";
import React, { useState, useEffect, createContext, useContext } from "react";
interface CurrentUserContextType {
  isLoggedIn: Boolean;
  loginUser: (token: string) => void;
  logoutUser: () => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<string | undefined>(
    Cookies.get("userToken")
  );

  const loginUser = (token: string) => {
    Cookies.set("userToken", token, { sameSite: "Strict" });
    setUser(token);
  };

  const logoutUser = () => {
    Cookies.remove("userToken");
    setUser(undefined);
  };

  return (
    <CurrentUserContext.Provider
      value={{ isLoggedIn: Boolean(user), loginUser, logoutUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const currentUserContext = useContext(CurrentUserContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }

  return currentUserContext;
};

export default CurrentUserProvider;
