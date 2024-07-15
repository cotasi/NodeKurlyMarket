import { createContext, useState } from "react";

const Menucontext = createContext({
    state: {
        menuon: false,
        menutwoon: {
            boolean: false,
            index: 0
        },
        menufour: false
    },
    actions: {
        setmenuon: ()=> {},
        setmenutwoon: ()=>{},
        setmenufour: ()=>{}
    }
})

const MenuProvider = ({children}) => {
    const [menuon,setmenuon] = useState(false);
    const [menutwoon,setmenutwoon] = useState({
        boolean: false,
        index: 0,
    });
    const [menufour,setmenufour] = useState(false);
    const values = {
        state: {menuon,menutwoon,menufour},
        actions: {setmenuon,setmenutwoon,setmenufour}
    }

    return (
        <Menucontext.Provider value={values}>
            {children}
        </Menucontext.Provider>
    )
}

const {Consumer: MenuConsumer} = Menucontext;

export { MenuProvider, MenuConsumer };
export default Menucontext;