import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";

import { Link, useLocation } from "react-router-dom";

import { ListConsumer, ListProvider } from "../../../context/ListContext";

import { IoChevronDown, IoChevronUp } from "react-icons/io5";

import { TiShoppingCart } from "react-icons/ti";

import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CList = styled.div`
  max-width: 75%;
  margin: 0 auto;
  > h2 {
    text-align: center;
    padding-top: 3.5rem;
    padding-bottom: 1.5rem;
    font-size: 28px;
  }
  > ul.menu {
    display: flex;
    flex-wrap: wrap;
    row-gap: 16px;
    padding: 30px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    margin-bottom: 2.5rem;
    li {
      width: 25%;
      &.menuup {
        a {
          color: #5f0080;
          text-decoration: underline;
          font-weight: 800 !important;
        }
      }
      a {
        display: block;
        color: #000;
        letter-spacing: -1px;
        font-size: 14px;
        font-weight: 600 !important;
      }
    }
  }
  > div.contents {
    display: flex;
    .filter {
      width: 20%;
      margin-right: 5%;
      > h2 {
        font-size: 16px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
      }
      .list {
        padding: 1rem 0;
        border-bottom: 1px solid #eee;
        button {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 16px;
            font-weight: 700 !important;
          }
          svg {
            font-size: 16px;
          }
        }
        .list-items {
          height: 0;
          overflow: hidden;
          opacity: 0;
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-end;
          align-items: center;
          padding: 0 1px;
          transition: all 0.2s;
          label {
            margin-left: 1rem;
          }
          input {
            display: none;
          }
          svg {
            font-size: 20px;
            color: #e4e4e4;
          }
          &.items_on {
            height: 60px;
            opacity: 1;
            padding: 0 5px;
          }
          &.items_on_2 {
            height: 180px;
            opacity: 1;
          }
          .list-item {
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 16px;
            cursor: pointer;
            span {
              margin-left: 0.5rem;
            }
            svg {
              font-size: 22px;
            }
          }
        }
      }
    }
    .items {
      width: 75%;
      display: flex;
      flex-wrap: wrap;
      a.item {
        width: 32%;
        margin-right: 1%;
        display: block;
        margin-bottom: 30px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .imgwrap {
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 10px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        button {
          width: 100%;
          padding: 6px 0;
          border: 1px solid rgba(0, 0, 0, 0.25);
          border-radius: 5px;
          font-size: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
          span {
            margin-left: 0.5rem;
          }
          svg {
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        > span {
          letter-spacing: -1px;
        }
        > div {
          letter-spacing: -1px;
        }
        span.delivery {
          color: #ccc;
          margin-bottom: 5px;
          display: block;
          font-size: 14px;
        }
        span.descs {
          display: block;
          color: #aaa;
          opacity: 0.8;
          font-size: 14px;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-bottom: 10px;
        }
        span.name {
          font-size: 16px;
          color: #333;
          font-weight: 500 !important;
          display: block;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 10px;
        }
        span.nosale {
          color: #333;
          font-size: 16px;
          font-weight: 700 !important;
        }
        span.sale {
          color: #ccc;
          text-decoration: line-through;
          font-size: 14px;
        }
        div.sale_desc {
          display: flex;
          font-size: 16px;
          font-weight: 700 !important;
          .saleper {
            color: #fb916e;
          }
          .finalsale {
            color: #333;
            margin-left: 0.5rem;
          }
        }
      }
    }
  }
  @media (max-width: 1024px) {
    ul.menu {
      > li {
        width: 33.333%;
      }
    }
    > div.contents {
      .items {
        a.item {
          width: 48%;
          &:nth-child(3n) {
            margin-right: 1%;
          }
          &:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
    }
  }
  @media (max-width: 860px) {
    > div.contents {
      flex-direction: column;
      .filter {
        width: 100%;
        .list:last-of-type {
          margin-bottom: 20px;
        }
      }
      .items {
        width: 100%;
      }
    }
  }
  @media (max-width: 630px) {
    ul.menu {
      > li {
        width: 50%;
      }
    }
  }
  @media (max-width: 500px) {
    ul.menu {
      > li {
        width: 100%;
        text-align: center;
      }
    }
  }
  @media (max-width: 430px) {
    > div.contents {
      .items {
        a.item {
          width: 100%;
          margin-right: 0;
        }
      }
    }
  }
`;

const CategoryList = ({ num1, num2, response, items, setit, load, type }) => {
  const { pathname } = useLocation();

  const delref = useRef(null);
  const deldivref = useRef(null);

  const [menuup, setmenuup] = useState(true);

  const [eachItem, setEachItem] = useState([]);

  const [delay, setdelay] = useState(false);

  const [delChk, setDelChk] = useState(false);

  useEffect(() => {
    const urlparam = pathname.split("/")[3];
    setdelay(false);
    setTimeout(() => {
      setdelay(true);
    }, 1000);
  }, [pathname]);

  useEffect(() => {
    // items, num1, num2가 유효한지 확인
    if (
      items &&
      items[num1] &&
      items[num1].itemes &&
      items[num1].itemes[num2]
    ) {
      if (items[num1].itemes[num2].types === type && type !== "All") {
        setEachItem((prev) => prev.filter((prevs) => prevs.types === type));
      } else if (type === "All") {
        setEachItem(items[num1].itemes); // 전체 아이템 목록으로 설정
      }
    }
  }, [items, num1, num2, type]);

  const delchkFunc = () => {
    setDelChk(!delChk);
    const delabel = deldivref.current.querySelector("label").textContent;
    if (delChk) {
      setit(
        items.filter((items) =>
          items.itemes.map((itemes) => itemes.delivery === delabel)
        )
      );
    }
  };

  const delchkChange = () => {
    setDelChk(!delChk);
  };

  return (
    <ListProvider>
      <CList>
        <h2>{response[num1].category}</h2>
        <ul className="menu">
          {response &&
            response[num1].categories_sub.map((csub, idx) => (
              <li className={`${menuup && num2 === idx ? "menuup" : ""}`}>
                <Link
                  to={`/category/${response[num1].category_name}/${csub.sub_name}`}
                >
                  {csub.sub_category}
                </Link>
              </li>
            ))}
        </ul>
        <div className="contents">
          <ListConsumer>
            {({ stati, act }) => (
              <div className="filter">
                <h2>필터</h2>
                <div className="list">
                  <button
                    onClick={() => {
                      act.setchev(!stati.chevron);
                    }}
                  >
                    <span>배송</span>
                    {stati.chevron ? <IoChevronUp /> : <IoChevronDown />}
                  </button>
                  <div
                    className={`list-items ${stati.chevron ? "items_on" : ""}`}
                    onClick={delchkFunc}
                    ref={deldivref}
                  >
                    <label htmlFor="delivery">샛별배송</label>
                    <input
                      type="checkbox"
                      id="delivery"
                      value="star"
                      ref={delref}
                      checked={delChk}
                      onChange={delchkChange}
                    />
                    {delChk && delref.current.value === "star" ? (
                      <IoIosCheckmarkCircleOutline
                        style={{ color: "#e5e5e5" }}
                      />
                    ) : (
                      <IoIosCheckmarkCircle style={{ color: "#5f0080" }} />
                    )}
                  </div>
                </div>
                <div className="list">
                  <button>
                    <span>가격</span>
                    <IoChevronUp />
                  </button>
                  <div className="list-items"></div>
                </div>
              </div>
            )}
          </ListConsumer>
          <div className="items">
            {delay && !load ? (
              items &&
              eachItem.map((itemes) => (
                <Link className="item" to={`/category/goods/${itemes.item_id}`}>
                  <div className="imgwrap">
                    <img src={itemes.img_path} alt=".." />
                  </div>
                  <button>
                    <TiShoppingCart />
                    <span>담기</span>
                  </button>
                  <span className="delivery">{itemes.delivery}</span>
                  <span className="name">{itemes.names}</span>
                  <span className="descs">{itemes.descs}</span>
                  {itemes.sale_price !== null ? (
                    <>
                      <span className="sale">
                        {itemes.real_price.toLocaleString()}원
                      </span>
                      <div className="sale_desc">
                        <div className="saleper">
                          {Math.floor(
                            ((parseInt(itemes.real_price) -
                              parseInt(itemes.sale_price)) /
                              parseInt(itemes.sale_price)) *
                              100
                          )}
                          %
                        </div>
                        <div className="finalsale">
                          {itemes.sale_price.toLocaleString()}원
                        </div>
                      </div>
                    </>
                  ) : (
                    <span className="nosale">
                      {itemes.real_price.toLocaleString()}원
                    </span>
                  )}
                </Link>
              ))
            ) : (
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  height: "100vh",
                  backgroundColor: "rgba(0,0,0,.5)",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  zIndex: "999",
                  alignItems: "center",
                }}
              >
                <CircularProgress size={60} />
              </Box>
            )}
          </div>
        </div>
      </CList>
    </ListProvider>
  );
};

export default CategoryList;
