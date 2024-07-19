import React, { useEffect, useMemo, useState, useContext } from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowupIcon from "@mui/icons-material/KeyboardArrowUp";

import LoginContext from "../../../context/LoginContext";

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
      margin-right: 2%;
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
          height: 0;
          overflow: hidden;
          transition: all 0.4s;
          &.menuup {
            min-height: 100px;
            height: 300px;
            overflow: visible;
          }
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
              a {
                display: block;
                width: 60px;
                img {
                  width: 100%;
                  object-fit: cover;
                }
              }

              > span {
                font-size: 16px;
                font-weight: 600 !important;
                margin-left: 1rem;
                display: block;
                width: 300px;
                & + div {
                  margin-right: 2rem;
                }
              }
              > button.close {
                display: flex;
                align-items: center;
                justify-content: center;
                color: #d9d9d9;
                cursor: pointer;
              }
              > div.price_wrap {
                margin-right: 1.5rem;
                > span {
                  display: block;
                  width: 100px;
                  &:first-of-type {
                    font-weight: 700 !important;
                    font-size: 16px;
                    letter-spacing: -1px;
                    text-align: right;
                  }
                  &:last-of-type {
                    font-size: 13px;
                    text-decoration: line-through;
                    letter-spacing: -1px;
                    text-align: right;
                  }
                }
              }
            }
          }
        }
      }
    }
    .Prices {
      padding-top: 45px;
      .infobox {
        width: 250px;
        padding: 20px;
        background-color: #fafafa;
        border: 1px solid #f2f2f2;
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          &:nth-of-type(3),
          &:nth-of-type(4) {
            padding: 16px 0;
          }
          &:nth-of-type(3) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
          }
          span {
            font-size: 16px;
          }
        }
      }
      > button {
        margin-top: 30px;
        width: 100%;
        padding: 20px;
        color: #fff;
        background-color: #5f0080;
        border-radius: 5px;
        font-size: 18px;
      }
    }
  }
  @media (max-width: 960px) {
    .Contents {
      flex-direction: column;
      .Select {
        width: 100%;
      }
      .Prices {
        .infobox {
          margin: 0 auto;
        }
      }
    }
  }
  @media (max-width: 660px) {
    .Contents {
      .Select {
        .item_maps {
          .item_part {
            ul {
              li {
                > a {
                  width: 70px;
                }
                > span {
                  width: 150px;
                  & + div {
                    margin-left: 1rem;
                    margin-right: 1rem;
                  }
                }
                > div.price_wrap {
                  span {
                    width: 80px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 540px) {
    .Contents {
      .Select {
        .item_maps {
          .item_part {
            ul {
              li {
                > span {
                  display: none;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CartDetail = () => {
  const [itemChk, setItemChk] = useState([]);
  const [itemMenuup, setItemMenuup] = useState(true);
  const [allCheck, setAllCheck] = useState(false);

  let consider = useMemo(() => itemChk.filter((item) => item.checked === true));

  const {
    login: { isAuth },
    set: { setIsAuth },
  } = useContext(LoginContext);

  const FetchCart = async () => {
    try {
      const cartres = await axios.post("/carter");
      if (cartres.data) setItemChk(cartres.data);
    } catch (err) {
      console.error(err);
    }
  };

  const checkedToggle = (idxs) => {
    const toggled =
      itemChk &&
      itemChk.map((ichk, nums) =>
        ichk.checkedIndex === idxs ? { ...ichk, checked: !ichk.checked } : ichk
      );
    setItemChk(toggled);
  };

  const allChecked = () => {
    if (allCheck) {
      // 모든 아이템의 checked를 false로 업데이트
      const updatedItemChk = itemChk.map((iichk) => ({
        ...iichk,
        checked: false,
      }));
      setItemChk(updatedItemChk);
      setAllCheck(false);
    } else {
      // 모든 아이템의 checked를 true로 업데이트
      const updatedItemChk = itemChk.map((iichk) => ({
        ...iichk,
        checked: true,
      }));
      setItemChk(updatedItemChk);
      setAllCheck(true);
    }
  };

  useEffect(() => {
    if (itemChk) {
      FetchCart();
    }
  }, []);

  useEffect(() => {
    if (
      consider.length === itemChk.length &&
      consider.length !== 0 &&
      itemChk.length !== 0
    ) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [itemChk]);

  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);

  return (
    <Cart>
      <h2>장바구니</h2>
      <div className="Contents">
        <div className="Select">
          <div className="top_select">
            <div className="input_label">
              {!allCheck ? (
                <CheckCircleOutlineIcon
                  style={{ color: "#dedede" }}
                  onClick={allChecked}
                />
              ) : (
                <CheckCircleIcon
                  style={{ color: "#5f0080" }}
                  onClick={allChecked}
                />
              )}
              <input
                type="checkbox"
                id="all_chk"
                onChange={allChecked}
                checked={allCheck}
              />
              <label htmlFor="all_chk">
                전체 선택 ({consider.length}/{itemChk.length})
              </label>
            </div>
            <button>선택 삭제</button>
          </div>
          <div className="item_maps">
            <div className="button_part">
              <div className="text">
                <AcUnitIcon />
                <h3>냉동식품</h3>
              </div>
              <button
                onClick={() => {
                  setItemMenuup(!itemMenuup);
                }}
              >
                {itemMenuup ? (
                  <KeyboardArrowupIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </button>
            </div>
            <div className={`item_part ${itemMenuup && "menuup"}`}>
              <ul>
                {itemChk.map((chks, num) => (
                  <li>
                    <div className="input">
                      <input
                        type="checkbox"
                        checked={chks.checked}
                        onChange={() => {
                          checkedToggle(num);
                        }}
                      />
                      {chks.checked && chks.checkedIndex === num ? (
                        <CheckCircleIcon
                          style={{ color: "#5f0080" }}
                          onClick={() => {
                            checkedToggle(num);
                          }}
                        />
                      ) : (
                        <CheckCircleOutlineIcon
                          style={{ color: "#dfdfdf" }}
                          onClick={() => {
                            checkedToggle(num);
                          }}
                        />
                      )}
                    </div>
                    <Link to={`/category/goods/${num + 1}`}>
                      <img src={chks.carter.prd_img} alt="prd_img" />
                    </Link>
                    <span>{chks.carter.prd_name}</span>
                    <CounterBox cart={chks.carter} />
                    {chks.carter.prd_before != null ? (
                      <div className="price_wrap">
                        <span>
                          {(
                            chks.carter.prd_price * chks.carter.prd_counts
                          ).toLocaleString()}{" "}
                          원
                        </span>
                        <span>
                          {(
                            chks.carter.prd_before * chks.carter.prd_counts
                          ).toLocaleString()}{" "}
                          원
                        </span>
                      </div>
                    ) : (
                      <div className="price_one">
                        {chks.carter.prd_price * chks.carter.counts}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="Prices">
          <div className="infobox">
            <div className="box1">
              <span>상품금액</span>
              <span>0원</span>
            </div>
            <div className="box2">
              <span>상품할인금액</span>
              <span>0원</span>
            </div>
            <div className="box3">
              <span>배송비</span>
              <span>0원</span>
            </div>
            <div className="box4">
              <span>결제예정금액</span>
              <span>0원</span>
            </div>
          </div>
          {isAuth ? <button>결제하기</button> : <button>로그인</button>}
        </div>
      </div>
    </Cart>
  );
};

export default CartDetail;
