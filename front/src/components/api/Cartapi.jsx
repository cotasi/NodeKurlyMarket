import { useEffect, useState } from "react";

export default function Cartapi(firstcreate, deps) {
  const [ld, setld] = useState(false);
  const [re, setRe] = useState(null);
  const [er, seter] = useState(null);

  useEffect(() => {
    const processing = async () => {
      setld(true);
      try {
        const resolve = await firstcreate();
        setRe(resolve);
      } catch (err) {
        seter(err);
      }
      setld(false);
    };
    processing();
  }, deps);

  return { ld, re, er };
}
