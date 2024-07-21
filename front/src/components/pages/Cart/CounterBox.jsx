import React from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

const CBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
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
    svg {
      font-size: 16px;
    }
  }
`;

const CounterBox = ({ cart }) => {
  return (
    <CBox>
      <button>
        <HorizontalRuleIcon />
      </button>
      <span>{cart.prd_counts}</span>
      <button>
        <AddIcon />
      </button>
    </CBox>
  );
};

export default CounterBox;
