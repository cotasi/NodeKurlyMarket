import { createContext, useState } from "react";

const CountContext = createContext({
  one: {
    itemcount: 1,
    updateitem: [],
  },
  two: {
    setItemcount: () => {},
    setUpdateitem: () => {},
  },
});

const CountProvider = ({ children }) => {
  const [itemcount, setItemcount] = useState(1);
  const [updateitem, setUpdateitem] = useState([]);

  const vls = {
    one: { itemcount, updateitem },
    two: { setItemcount, setUpdateitem },
  };

  return <CountContext.Provider value={vls}>{children}</CountContext.Provider>;
};

const { Consumer: CountConsumer } = CountContext;

export { CountProvider, CountConsumer };
export default CountContext;
