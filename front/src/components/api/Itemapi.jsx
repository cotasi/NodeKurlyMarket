import { useEffect, useState } from "react";

export default function Axiosapi(firstcreate, deps) {
  const [load, setld] = useState(false);
  const [items, setit] = useState(null);
  const [err, seterr] = useState(null);

  useEffect(() => {
    const processing = async () => {
      try {
        const resolve = await firstcreate();
        setit(resolve);
        if (resolve) setld(false);
        else setld(true);
      } catch (err) {
        seterr(err);
      }
    };
    processing();
  }, deps);

  return { load, setit, items, err };
}
