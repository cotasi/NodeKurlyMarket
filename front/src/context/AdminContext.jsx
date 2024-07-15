import { createContext, useState } from "react";

const AdminContext = createContext({
  real: {
    menuon: false,
    idx: 0
  },
  actor: {
    setmenuon: () => {},
    setidx: () => {}
  }
});

const AdminProvider = ({ children }) => {
  const [menuon,setmenuon] = useState(false);
  const [idx,setidx] = useState(0);
  const val = {
    real: { menuon, idx },
    actor: {setmenuon, setidx}
  };

  return <AdminContext.Provider value={val}>{children}</AdminContext.Provider>;
};

const { Consumer: AdminConsumer } = AdminContext;

export { AdminProvider, AdminConsumer };
export default AdminContext;
