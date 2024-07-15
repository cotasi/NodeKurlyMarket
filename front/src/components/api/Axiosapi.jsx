import { useEffect, useState } from "react";


export default function Axiosapi(firstcreate,deps) {
    const [loading,setload] = useState(false);
    const [response,setres] = useState(null);
    const [error,seterror] = useState(null);

    useEffect(()=>{
        const processing = async () => {
            setload(true);
            try {
                const resolve = await firstcreate();
                setres(resolve);
            }catch(err) {
                seterror(err);
            }
            setload(false);
        }
        processing();
    },deps);
    
    return {loading,response,error};
}