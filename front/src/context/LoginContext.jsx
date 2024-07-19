import { createContext, useState, useEffect } from "react";

const LoginContext = createContext({
  login: {
    isAuth: false,
  },
  set: {
    setisAuth: () => {},
  },
});

const LoginProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const val = {
    login: { isAuth },
    set: { setIsAuth },
  };

  useEffect(() => {
    const suid = sessionStorage.getItem("uid");
    if (suid) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return <LoginContext.Provider value={val}>{children}</LoginContext.Provider>;
};

const { Consumer: LoginConsumer } = LoginContext;

export { LoginProvider, LoginConsumer };
export default LoginContext;
