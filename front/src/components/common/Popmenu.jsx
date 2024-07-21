import React from "react";

import styled from "@emotion/styled";

const Pop = styled.div`
  display: none;
  background-color: #fff;
  max-width: 300px;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 80;
  &.popon {
    display: block;
  }
  .msg {
    padding: 40px 30px;
    display: block;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .btnwrap {
    width: 100%;
    font-size: 18px;
    color: rgb(95, 0, 128);
    text-align: center;
    padding: 15px 0;
  }
`;

const Popmenu = ({
  children,
  idopen,
  setIdopen,
  emopen,
  setEmopen,
  heartopen,
  setHeartopen,
}) => {
  const connect = () => {
    if (idopen || emopen || heartopen) {
      setIdopen(false);
      setEmopen(false);
      setHeartopen(false);
    }
    document.body.classList.remove("dimmed");
  };
  return (
    <Pop className={`${idopen || emopen || heartopen ? "popon" : ""}`}>
      <div className="msg">{children}</div>
      <div className="btnwrap">
        <button onClick={connect}>확인</button>
      </div>
    </Pop>
  );
};

export default Popmenu;
