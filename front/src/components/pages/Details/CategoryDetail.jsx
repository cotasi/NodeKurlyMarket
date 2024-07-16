import React, { useContext } from "react";

import styled from "styled-components";

import axios from "axios";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import CountWrapper from "./CountWrapper";

import CountContext from "../../../context/CountContext";

const Detail = styled.div`
  width: 85%;
  margin: 0 auto;
  .top_desc {
    display: flex;
    margin-top: 25px;
    .images {
      margin-right: 5%;
      position: relative;
      align-self: start;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .right_desc {
      flex: 1;
      > h2 {
        font-size: 14px;
        color: rgb(153, 153, 153);
        margin-bottom: 2rem;
      }
      > p {
        font-size: 24px;
        font-weight: 600 !important;
      }
      > span.descs {
        display: block;
        margin-top: 25px;
        font-size: 14px;
        color: rgb(153, 153, 153);
        letter-spacing: -1px;
      }
      div.saleon {
        margin-top: 20px;
        display: flex;
        span {
          &:first-of-type {
            font-size: 22px;
            color: #fa622f;
            font-weight: 700 !important;
            margin-right: 10px;
          }
          &:last-of-type {
            font-size: 22px;
            font-weight: 700 !important;
            span {
              font-size: 16px;
              font-weight: 700 !important;
              color: #000;
            }
          }
        }
      }
      span.real {
        margin-top: 10px;
        font-size: 14px;
        color: #ccc;
        text-decoration: line-through;
        display: flex;
        align-items: center;
        .ques {
          margin-left: 5px;
          svg {
            font-size: 20px;
            color: #333;
          }
        }
      }
      .salenot {
        margin-top: 20px;
        display: flex;
        align-items: center;
        span {
          font-size: 22px;
          font-weight: 700 !important;
        }
      }
      span.origin {
        margin-top: 20px;
        font-size: 22px;
        display: block;
      }
      ul.lists {
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        margin-top: 15px;
        li {
          padding: 15px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          dl {
            display: flex;
            dd {
              display: block;
              width: 40%;
              font-size: 14px;
            }
            dt {
              width: 60%;
              font-size: 14px;
              span {
                display: block;
                &:first-of-type {
                  font-weight: 500 !important;
                }
                &:last-of-type {
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
      ul.btns {
        width: 100%;
        margin-top: 15px;
        display: flex;
        align-items: center;
        li {
          &:first-of-type {
            button {
              width: 60px;
              height: 60px;
              margin: auto;
              border: 1px solid rgba(0, 0, 0, 0.05);
              margin-right: 1rem;
              svg {
                color: #5f0080;
              }
            }
          }
          &:last-of-type {
            flex: 1;
            button {
              width: 100%;
              height: 60px;
              line-height: 60px;
              background-color: #5f0080;
              color: #fff;
              font-size: 18px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  @media (max-width: 960px) {
    .top_desc {
      flex-direction: column;
      .images {
        width: 100%;
        margin-right: 0;
        margin-bottom: 30px;
      }
      .right_desc {
        > h2 {
          font-size: 18px;
          margin-bottom: 1rem;
        }
        > p {
          font-size: 28px;
        }
        > span.descs {
          font-size: 16px;
        }
        > div.salenot {
          span {
            font-size: 26px;
          }
          > div.saleon {
            > span {
              &:first-of-type {
                font-size: 30px;
              }
              &:last-of-type {
                font-size: 30px;
                > span {
                  font-size: 20px;
                }
              }
            }
          }
          > span.real {
            font-size: 20px;
          }
        }
      }
    }
  }
  @media (max-width: 560px) {
    .top_desc {
      .right_desc {
        > ul.lists {
          li {
            dl {
              flex-direction: column;
              dd,
              dt {
                display: block;
                width: 100%;
                text-align: center;
              }
              dd {
                font-size: 18px;
                font-weight: 700 !important;
                margin-bottom: 15px;
              }
              dt {
                font-size: 18px;
                > span:last-of-type {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CategoryDetail = ({ numone, numtwo, items, setit }) => {
  const {
    one: { itemcount, updateitem },
    two: { setItemcount, setUpdateitem },
  } = useContext(CountContext);

  const cartadd = async () => {
    const insertcart = {
      cart_img: items[numone].itemes[numtwo].img_path,
      cart_name: items[numone].itemes[numtwo].names,
      cart_count: itemcount,
      cart_price:
        items[numone].itemes[numtwo].sale_price != null
          ? items[numone].itemes[numtwo].sale_price * itemcount
          : items[numone].itemes[numtwo].real_price * itemcount,
    };

    try {
      const cartdata = await axios.post("/cart/insert", insertcart);
      if (cartdata.data) console.log(cartdata.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Detail>
      <div className="top_desc">
        <div className="images">
          <img src={items && items[numone].itemes[numtwo].img_path} alt=".." />
        </div>
        <div className="right_desc">
          <h2>{items[numone].itemes[numtwo].delivery}</h2>
          <p>{items[numone].itemes[numtwo].names}</p>
          <span className="descs">{items[numone].itemes[numtwo].descs}</span>
          {items[numone].itemes[numtwo].sale_price != null ? (
            <>
              <div className="saleon">
                <span>
                  {Math.floor(
                    ((items[numone].itemes[numtwo].real_price -
                      items[numone].itemes[numtwo].sale_price) /
                      items[numone].itemes[numtwo].real_price) *
                      100
                  )}
                  %
                </span>
                <span>
                  {items[numone].itemes[numtwo].sale_price.toLocaleString()}
                  <span>원</span>
                </span>
              </div>
              <span className="real">
                {items[numone].itemes[numtwo].real_price.toLocaleString()}원
                <div className="ques">
                  <HelpOutlineIcon />
                </div>
              </span>
            </>
          ) : (
            <div className="salenot">
              <span>
                {items[numone].itemes[numtwo].real_price.toLocaleString()}원
              </span>
            </div>
          )}
          <span className="origin">
            원산지: {items[numone].itemes[numtwo].origin}
          </span>
          <ul className="lists">
            <li>
              <dl>
                <dd>배송</dd>
                <dt>
                  <span>{items[numone].itemes[numtwo].delivery}</span>
                  <span>
                    23시 전 주문시 내일 아침 7시 도착 <br />
                    (대구,부산,울산 샛별배송 운영시간 별도 확인)
                  </span>
                </dt>
              </dl>
            </li>
            <li>
              <dl>
                <dd>판매자</dd>
                <dt>컬리</dt>
              </dl>
            </li>
            <li>
              <dl>
                <dd>포장타입</dd>
                <dt>
                  <span>{items[numone].itemes[numtwo].deltype}</span>
                  <span>택배배송은 에코포장이 스트리폼으로 교체됩니다.</span>
                </dt>
              </dl>
            </li>
            <li>
              <dl>
                <dd>용량 및 중량</dd>
                <dt>{items[numone].itemes[numtwo].grams}</dt>
              </dl>
            </li>
            <li>
              <dl>
                <dd>상품선택</dd>
                <CountWrapper
                  itemcount={itemcount}
                  setItemcount={setItemcount}
                  items={items}
                  numone={numone}
                  numtwo={numtwo}
                  updateitem={updateitem}
                  setUpdateitem={setUpdateitem}
                />
              </dl>
            </li>
          </ul>
          <ul className="btns">
            <li>
              <button>
                <FavoriteBorderIcon />
              </button>
            </li>
            <li>
              <button onClick={cartadd}>장바구니 담기</button>
            </li>
          </ul>
        </div>
      </div>
    </Detail>
  );
};

export default CategoryDetail;
