import { createContext, useState, useEffect } from "react";

const LoginContext = createContext({
  login: {
    isAuth: false,
    isLoading: true,
    isDelay: true,
  },
  set: {
    setisAuth: () => {},
    setIsLoading: () => {},
    setIsDelay: () => {},
  },
});

const LoginProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isDelay, setIsDelay] = useState(false);
  const val = {
    login: { isAuth, isDelay },
    set: { setIsAuth, setIsDelay },
  };

  return <LoginContext.Provider value={val}>{children}</LoginContext.Provider>;
};

const { Consumer: LoginConsumer } = LoginContext;

export { LoginProvider, LoginConsumer };
export default LoginContext;
