import { createContext, useState } from "react";

const ListContext = createContext({
  stati: {
    chevron: false,
  },
  act: {
    setchev: () => {},
  },
});

const ListProvider = ({ children }) => {
  const [chevron, setchev] = useState(false);
  const val = {
    stati: { chevron },
    act: { setchev },
  };

  return <ListContext.Provider value={val}>{children}</ListContext.Provider>;
};

const { Consumer: ListConsumer } = ListContext;

export { ListProvider, ListConsumer };
export default ListContext;
