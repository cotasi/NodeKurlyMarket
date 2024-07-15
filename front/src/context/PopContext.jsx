import { createContext, useState } from "react";

const PopContext = createContext({
  inner: {
    idopen: false,
    emopen: false,
  },
  actions: {
    setIdopen: () => {},
    setEmopen: () => {},
  },
});

const PopProvider = ({ children }) => {
  const [idopen, setIdopen] = useState(false);
  const [emopen, setEmopen] = useState(false);

  const vl = {
    inner: { idopen, emopen },
    actions: { setIdopen, setEmopen },
  };
  return <PopContext.Provider value={vl}>{children}</PopContext.Provider>;
};

const { Consumer: PopConsumer } = PopContext;

export { PopConsumer, PopProvider };
export default PopContext;
