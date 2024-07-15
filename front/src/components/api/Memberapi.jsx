import { useEffect, useState } from "react";

export default function Axiosapi(firstcreate, deps) {
  const [mem, setmem] = useState([]);
  const [err, seterr] = useState(null);

  useEffect(() => {
    const processing = async () => {
      try {
        const resolve = await firstcreate();
        setmem(resolve);
      } catch (err) {
        seterr(err);
      }
    };
    processing();
  }, deps);

  return { mem,err };
}
