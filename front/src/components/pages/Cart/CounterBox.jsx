import React, { useEffect } from "react";

import styled from "styled-components";

import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

const CBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CounterBox = ({ cart, idxs }) => {
  return (
    <CBox>
      <button>
        <HorizontalRuleIcon />
      </button>
      <span>{cart[idxs].prd_counts}</span>
      <button>
        <AddIcon />
      </button>
    </CBox>
  );
};

export default CounterBox;
