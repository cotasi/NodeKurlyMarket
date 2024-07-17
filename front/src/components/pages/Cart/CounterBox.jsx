import React, { useEffect } from "react";

import styled from "styled-components";

import axios from "axios";

import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

const CBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 16px;
    font-weight: 600 !important;
    padding: 0 0.5rem;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const CounterBox = ({ cart, idxs }) => {
  const Plus = async () => {
    const reqsent = {
      count: cart[idxs].prd_counts,
      index: cart[idxs].main_id,
    };

    try {
      await axios.post("/cart/countup", reqsent);
    } catch (err) {
      console.log(err);
    }
  };

  const Erase = async () => {
    const reqsent = {
      count: cart[idxs].prd_counts,
      index: cart[idxs].main_id,
    };

    try {
      await axios.post("/cart/countdown", reqsent);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CBox>
      <button onClick={Erase}>
        <HorizontalRuleIcon />
      </button>
      <span>{cart[idxs].prd_counts}</span>
      <button onClick={Plus}>
        <AddIcon />
      </button>
    </CBox>
  );
};

export default CounterBox;
