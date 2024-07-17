import React, { useState, useEffect } from "react";

import styled from "styled-components";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import axios from "axios";
import CounterBox from "./CounterBox";

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
      width: 70%;
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
      .item_maps {
        padding: 10px 0;
        .button_part {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .text {
            display: flex;
            svg {
              color: #7cb6f4;
            }
            h3 {
              margin-left: 1rem;
            }
          }
          button {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .item_part {
          ul {
            li {
              padding: 20px 0;
              display: flex;
              align-items: center;
              border-bottom: 1px solid rgba(0, 0, 0, 0.25);
              div.input {
                margin-right: 1rem;
                input {
                  display: none;
                }
              }
              img {
                width: 60px;
              }
              > span {
                font-size: 16px;
                font-weight: 600 !important;
                margin-left: 1rem;
                display: block;
                width: 300px;
              }
            }
          }
        }
      }
    }
  }
`;

const CartDetail = () => {
  const [cart, setCart] = useState([]);

  const [itemChk, setItemChk] = useState({
    checked: [],
    checkedIndex: [],
  });

  const CartAPI = async () => {
    const cartreal = await axios.post("/cart");
    if (cartreal.data) setCart(cartreal.data);
  };

  const ciArray = [];

  const itemChecks = (idxs) => {
    setItemChk({
      checked: !itemChk.checked,
      checkedIndex: ciArray,
    });
    if (ciArray.length === 0) {
      ciArray.push(idxs);
    } else {
      ciArray.filter((v, i) => i !== idxs);
    }

    console.log(itemChk);
  };

  useEffect(() => {
    CartAPI();
    console.log(cart);
  }, [cart]);

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
          <div className="item_maps">
            <div className="button_part">
              <div className="text">
                <AcUnitIcon />
                <h3>냉동식품</h3>
              </div>
              <button>
                <KeyboardArrowDownIcon />
              </button>
            </div>
            <div className="item_part">
              <ul>
                {cart.map((carts, idxs) => (
                  <li>
                    <div className="input">
                      <input
                        type="checkbox"
                        onChange={() => {
                          itemChecks(idxs);
                        }}
                        checked={itemChk.checked}
                      />
                      {itemChk.checked &&
                      itemChk.checkedIndex.includes(idxs) ? (
                        <CheckCircleOutlineIcon
                          onClick={() => {
                            itemChecks(idxs);
                          }}
                          style={{ color: "#dedede" }}
                        />
                      ) : (
                        <CheckCircleIcon
                          onClick={() => {
                            itemChecks(idxs);
                          }}
                          style={{ color: "#5f0080" }}
                        />
                      )}
                    </div>
                    <img src={carts.prd_img} alt="prd_img" />
                    <span>{carts.prd_name}</span>
                    <CounterBox cart={cart} idxs={idxs} />
                    <button className="close"></button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="Prices"></div>
      </div>
    </Cart>
  );
};

export default CartDetail;
