import { createContext, useState } from "react";

const PopContext = createContext({
  inner: {
    idopen: false,
    emopen: false,
    heartopen: false,
  },
  actions: {
    setIdopen: () => {},
    setEmopen: () => {},
    setHeartopen: () => {},
  },
});

const PopProvider = ({ children }) => {
  const [idopen, setIdopen] = useState(false);
  const [emopen, setEmopen] = useState(false);
  const [heartopen, setHeartopen] = useState(false);

  const vl = {
    inner: { idopen, emopen, heartopen },
    actions: { setIdopen, setEmopen, setHeartopen },
  };
  return <PopContext.Provider value={vl}>{children}</PopContext.Provider>;
};

const { Consumer: PopConsumer } = PopContext;

export { PopConsumer, PopProvider };
export default PopContext;
