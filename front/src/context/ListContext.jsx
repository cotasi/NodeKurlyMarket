import { createContext, useState } from "react";

const ListContext = createContext({
  stati: {
    chevron: false,
    chevron2: false,
  },
  act: {
    setchev: () => {},
    setChevron2: () => {},
  },
});

const ListProvider = ({ children }) => {
  const [chevron, setchev] = useState(false);
  const [chevron2, setChevron2] = useState(false);
  const val = {
    stati: { chevron, chevron2 },
    act: { setchev, setChevron2 },
  };

  return <ListContext.Provider value={val}>{children}</ListContext.Provider>;
};

const { Consumer: ListConsumer } = ListContext;

export { ListProvider, ListConsumer };
export default ListContext;
