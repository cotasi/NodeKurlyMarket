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
    cursor: pointer;
    svg {
      font-size: 16px;
    }
  }
`;

const Counters = ({
  itemcount,
  setItemcount,
  items,
  numone,
  numtwo,
  updateitem,
  setUpdateitem,
}) => {
  const Increase = () => {
    setItemcount((prev) => (prev + 1 > 10 ? 10 : prev + 1));
  };

  const Decrease = () => {
    setItemcount((prev) => (prev - 1 <= 1 ? 1 : prev - 1));
  };

  useEffect(() => {
    if (itemcount > 0) {
      const reqdata = {
        counts: itemcount,
        mainid: items[numone].itemes[numtwo].item_id,
      };

      axios.post("/items/countchange", reqdata).catch((err) => {
        console.error(err);
      });
    }
    console.log(items[numone].itemes[numtwo].counts);
  }, [itemcount]);

  return (
    <Count>
      <button onClick={Decrease}>
        <HorizontalRuleIcon />
      </button>
      <span>{itemcount}</span>
      <button onClick={Increase}>
        <AddIcon />
      </button>
    </Count>
  );
};

export default Counters;
