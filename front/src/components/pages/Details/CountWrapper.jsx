import React, { useState } from "react";

import Counters from "./Counters";

import styled from "styled-components";

const Wrap = styled.dt`
  > div.box {
    border: 1px solid rgba(0, 0, 0, 0.05);
    padding: 15px;
    > span {
      font-size: 14px !important;
      margin-bottom: 15px;
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .price {
        font-size: 14px;
        display: flex;
        align-items: center;
        .first {
          color: #ccc;
          text-decoration: line-through;
        }
        .second,
        .first_only {
          font-weight: 800 !important;
          color: #333;
          font-size: 14px !important;
        }
        .second {
          margin-left: 0.5rem;
        }
      }
    }
  }
  > p {
    padding-top: 40px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: end;
    span {
      &:first-of-type {
        font-size: 16px !important;
      }
      &:last-of-type {
        font-size: 16px !important;
      }
    }
    b {
      font-size: 30px;
      line-height: 0.9;
      margin-left: 0.5rem;
    }
  }
  @media (max-width: 560px) {
    > div.box {
      > span {
        font-size: 16px !important;
      }
      > div {
        .price {
          span {
            font-size: 14px !important;
          }
        }
      }
    }
  }
  @media (max-width: 400px) {
    > div.box {
      > div {
        flex-direction: column;
        .price {
          margin-top: 15px;
        }
      }
    }
  }
`;

const CountWrapper = ({
  numone,
  numtwo,
  items,
  itemcount,
  setItemcount,
  updateitem,
  setUpdateitem,
}) => {
  return (
    <Wrap>
      <div className="box">
        <span>{items[numone].itemes[numtwo].names}</span>
        <div>
          <Counters
            items={items}
            numone={numone}
            numtwo={numtwo}
            itemcount={itemcount}
            setItemcount={setItemcount}
            updateitem={updateitem}
            setUpdateitem={setUpdateitem}
          />
          <div className="price">
            {items[numone].itemes[numtwo].sale_price != null ? (
              <>
                <span className="first">
                  {items[numone].itemes[numtwo].real_price.toLocaleString()}원
                </span>
                <span className="second">
                  {items[numone].itemes[numtwo].sale_price.toLocaleString()}원
                </span>
              </>
            ) : (
              <span className="first_only">
                {items[numone].itemes[numtwo].real_price.toLocaleString()}원
              </span>
            )}
          </div>
        </div>
      </div>
      <p>
        <span>총 상품 금액: </span>
        <b>
          {items[numone].itemes[numtwo].sale_price !== null
            ? items[numone].itemes[numtwo].sale_price * itemcount
            : items[numone].itemes[numtwo].real_price * itemcount}
        </b>
        <span>원</span>
      </p>
    </Wrap>
  );
};

export default CountWrapper;
