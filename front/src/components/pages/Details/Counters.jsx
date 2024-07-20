import React, { useEffect } from "react";

import styled from "styled-components";

import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import axios from "axios";

const Count = styled.div`
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    padding: 0 10px;
  }
  button {
    display: flex;
    align-items: center;
    svg {
      font-size: 16px;
    }
  }
`;

const Counters = ({
  itemcount,
  setItemcount,
  items,
  setit,
  numone,
  numtwo,
  updateitem,
  setUpdateitem,
}) => {
  const Increase = async () => {
    setItemcount((prevCount) => {
      const newCount = prevCount + 1;

      const updatedata = {
        counts: newCount,
        item_id: items[numone].itemes[numtwo].item_id,
        price:
          items[numone].itemes[numtwo].sale_price !== null
            ? items[numone].itemes[numtwo].sale_price * newCount
            : items[numone].itemes[numtwo].real_price * newCount,
      };

      (async () => {
        try {
          const reqdata = await axios.post("/items/countup", updatedata);
          if (reqdata.data) console.log(reqdata.data);
        } catch (err) {
          console.error(err);
        }
      })();

      return newCount; // setItemcount의 콜백은 새로운 상태 값을 반환해야 합니다
    });
  };

  const Decrease = async () => {
    if (itemcount <= 1) setItemcount((prevCount) => 1);
    else
      setItemcount((prevCount) => {
        const newCount = prevCount - 1;

        const updatedata = {
          counts: newCount,
          item_id: items[numone].itemes[numtwo].item_id,
          price:
            items[numone].itemes[numtwo].sale_price !== null
              ? items[numone].itemes[numtwo].sale_price * newCount
              : items[numone].itemes[numtwo].real_price * newCount,
        };

        (async () => {
          try {
            const reqdata = await axios.post("/items/countup", updatedata);
            if (reqdata.data) console.log(reqdata.data);
          } catch (err) {
            console.error(err);
          }
        })();

        return newCount; // setItemcount의 콜백은 새로운 상태 값을 반환해야 합니다
      });
  };

  useEffect(() => {
    return async () => {
      setItemcount(1);

      const updatedata = {
        counts: itemcount,
        price:
          items[numone].itemes[numtwo].sale_price !== null
            ? items[numone].itemes[numtwo].sale_price * itemcount
            : items[numone].itemes[numtwo].real_price * itemcount,
        item_id: items[numone].itemes[numtwo].item_id,
      };
      try {
        const reqdata = await axios.post("/items/countup", updatedata);
        if (reqdata.data) console.log(reqdata.data);
      } catch (err) {
        console.error(err);
      }
    };
  }, []);

  return (
    <Count>
      <button onClick={Decrease}>
        <HorizontalRuleIcon />
      </button>
      <span>{items[numone].itemes[numtwo].counts}</span>
      <button onClick={Increase}>
        <AddIcon />
      </button>
    </Count>
  );
};

export default Counters;
