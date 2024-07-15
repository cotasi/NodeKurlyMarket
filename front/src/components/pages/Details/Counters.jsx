import React, { useState, useEffect } from "react";

import styled from "styled-components";

import axios from "Axios";

import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

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

const Counters = () => {
  return (
    <Count>
      <button>
        <HorizontalRuleIcon />
      </button>
      <span>1</span>
      <button>
        <AddIcon />
      </button>
    </Count>
  );
};

export default Counters;
