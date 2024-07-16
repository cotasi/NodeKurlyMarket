import React from "react";

import styled from "styled-components";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Cart = styled.div`
  max-width: 85%;
  margin: 0 auto;
  > h2 {
    padding: 50px 0;
    text-align: center;
  }
  .Contents {
    display: flex;
    .Select {
      width: 60%;
      .top_select {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        .input_label {
          display: flex;
          align-items: center;
          input {
            display: none;
          }
          label {
            font-weight: 600 !important;
            font-size: 15px;
            letter-spacing: -0.05px;
            margin-left: 1rem;
          }
          margin-right: 1rem;
          position: relative;
          &:after {
            content: "";
            position: absolute;
            right: -16px;
            top: 10%;
            bottom: 10%;
            margin: auto 0;
            width: 1px;
            background-color: #ddd;
          }
        }
        button {
          font-size: 15px;
          font-weight: 600 !important;
          margin-top: 3px;
          margin-left: 1rem;
        }
      }
    }
  }
`;

const CartDetail = () => {
  return (
    <Cart>
      <h2>장바구니</h2>
      <div className="Contents">
        <div className="Select">
          <div className="top_select">
            <div className="input_label">
              <CheckCircleOutlineIcon style={{ color: "#dedede" }} />
              <input type="checkbox" id="all_chk" />
              <label htmlFor="all_chk">전체 선택 (0/0)</label>
            </div>
            <button>선택 삭제</button>
          </div>
        </div>
        <div className="Prices"></div>
      </div>
    </Cart>
  );
};

export default CartDetail;
