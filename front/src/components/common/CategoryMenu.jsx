import React, { useContext, useEffect } from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import { IoMenu } from "react-icons/io5";

import Menucontext, { MenuConsumer } from "../../context/Menucontext";

const Categorymenu = styled.div`
  max-width: 85%;
  margin: 0 auto;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > li {
      &:first-of-type {
        position: relative;
        &:hover {
          > button {
            color: #5f0080;
          }
        }
        > button {
          font-size: 18px;
          font-weight: 600 !important;
          padding: 20px 0;
          display: flex;
          align-items: center;
          span {
            margin-left: 0.5rem;
            line-height: 1;
          }
          svg {
            font-size: 22px;
          }
        }
        > ul.first_group {
          display: none;
          position: absolute;
          z-index: 30;
          top: calc(100% + 1px);
          left: 0;
          width: 23vw;
          height: 30vh;
          overflow-y: scroll;
          border: 1px solid rgba(0, 0, 0, 0.25);
          background-color: #fff;
          &.menuoneon {
            display: block;
          }
          > li {
            &.menuon {
              background-color: #f7f7f7;
              button {
                color: #5f0080;
                font-weight: 800 !important;
              }
            }
            > button {
              padding: 9px 15px;
              font-size: 15px;
              font-weight: 500 !important;
              width: 100%;
              text-align: left;
              display: flex;
              align-items: center;
              img {
                width: 20px;
              }
              span {
                margin-left: 0.75rem;
              }
              &:hover {
                background-color: #f7f7f7;
                color: #5f0080;
                font-weight: 800 !important;
              }
            }
          }
        }
        > ul.second_group {
          position: absolute;
          top: calc(100% + 1px);
          left: calc(23vw + 1px);
          z-index: 30;
          width: 0;
          opacity: 0;
          transition: all 0.4s;
          height: 30vh;
          overflow-y: scroll;
          background-color: #f7f7f7;
          border: 1px solid rgba(0, 0, 0, 0.25);
          &.menutwoon {
            width: 23vw;
            opacity: 1;
          }
          li {
            a {
              display: block;
              padding: 8px 15px;
              font-size: 14px;
              color: #000;
              &:hover {
                color: #5f0080;
                font-weight: 800 !important;
                text-decoration: underline;
              }
            }
          }
        }
      }
      &:nth-of-type(2) {
        > ul {
          display: flex;
          justify-content: center;
          align-items: center;
          li {
            a {
              color: #333;
              font-size: 16px;
              font-weight: 600 !important;
              padding: 20px 40px;
              &:hover {
                color: #5f0080;
                text-decoration: underline;
              }
            }
          }
        }
      }
      &:nth-of-type(3) {
        a {
          color: #333;
          font-size: 14px;
          display: block;
          border: 1px solid rgba(0, 0, 0, 0.25);
          padding: 8px 12px;
          border-radius: 26px;
          b {
            color: #5f0080;
          }
        }
      }
      &:nth-of-type(4) {
        display: none;
        position: relative;
        > button {
          font-size: 18px;
          font-weight: 500 !important;
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 20px 0;
          &:hover {
            color: #5f0080;
          }
          span {
            margin-left: 0.5rem;
          }
          svg {
            font-size: 22px;
          }
        }
        > ul {
          display: none;
          position: absolute;
          top: 100%;
          right: 0;
          width: 150%;
          background: #fff;
          border: none;
          transition: all 0.4s;
          z-index: 50;
          &.fourmenu {
            display: block;
            border: 1px solid rgba(0, 0, 0, 0.25);
          }
          > li {
            > a {
              color: #333;
              display: block;
              padding: 10px 20px;
              transition: all 0.6s;
              &:hover {
                background-color: #5f0080;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    nav {
      > li {
        &:not(:first-of-type) {
          display: none;
        }
        &:nth-of-type(4) {
          display: block;
        }
      }
    }
  }

  @media (max-width: 768px) {
    nav {
      > li {
        &:first-of-type {
          ul.first_group {
            width: 35vw;
          }
          ul.second_group {
            left: calc(35vw + 1px);
            &.menutwoon {
              width: 35vw;
            }
          }
        }
      }
    }
  }

  @media (max-width: 460px) {
    nav {
      > li {
        &:first-of-type {
          > button {
            font-size: 16px;
          }
          > ul.first_group {
            width: 45vw;
          }
          > ul.second_group {
            left: calc(45vw + 1px);
            &.menutwoon {
              width: 45vw;
            }
          }
        }
        &:nth-of-type(4) {
          position: relative;
          > button {
            font-size: 16px;
          }
        }
      }
    }
  }
`;

const CategoryMenu = ({ response }) => {
  const {
    state: { menuon },
    actions: { setmenuon },
  } = useContext(Menucontext);

  useEffect(() => {
    return () => {
      setmenuon(false);
    };
  }, []);

  return (
    <Categorymenu>
      <MenuConsumer>
        {({ state, actions }) => (
          <nav>
            <li
              onMouseOver={() => {
                actions.setmenuon(true);
              }}
              onMouseLeave={() => {
                actions.setmenuon(false);
              }}
            >
              <button>
                <IoMenu />
                <span>카테고리</span>
              </button>
              <ul className={`first_group ${state.menuon ? "menuoneon" : ""}`}>
                {response &&
                  response.map((first, idx) => (
                    <li
                      onMouseOver={() => {
                        actions.setmenutwoon({
                          boolean: true,
                          index: idx,
                        });
                      }}
                      onMouseLeave={() => {
                        actions.setmenutwoon({
                          ...state.menutwoon,
                          boolean: false,
                        });
                      }}
                      className={`${
                        state.menutwoon.boolean && state.menutwoon.index === idx
                          ? "menuon"
                          : ""
                      }`}
                    >
                      <button>
                        <img src={first.icon_path} alt="icons" />
                        <span>{first.category}</span>
                      </button>
                    </li>
                  ))}
              </ul>
              <ul
                className={`second_group ${
                  state.menutwoon.boolean ? "menutwoon" : ""
                }`}
                onMouseOver={() => {
                  actions.setmenutwoon({
                    ...state.menutwoon,
                    boolean: true,
                  });
                }}
                onMouseLeave={() => {
                  actions.setmenutwoon({
                    ...state.menutwoon,
                    boolean: false,
                  });
                }}
              >
                {response &&
                  response[state.menutwoon.index].categories_sub
                    .filter((itm) => itm.sub_name !== "All")
                    .map((sec, idxs) => (
                      <li>
                        <Link
                          to={`/category/${
                            response[state.menutwoon.index].category_name
                          }/${sec.sub_name}`}
                        >
                          {sec.sub_category}
                        </Link>
                      </li>
                    ))}
              </ul>
            </li>
            <li>
              <ul>
                <li>
                  <Link to="/new_product">신상품</Link>
                </li>
                <li>
                  <Link to="/best">베스트</Link>
                </li>
                <li>
                  <Link to="/time_sales">알뜰쇼핑</Link>
                </li>
                <li>
                  <Link to="/benefits">특가/혜택</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/guide">
                <b>샛별 하루</b> 배송 안내
              </Link>
            </li>
            <li
              onMouseOver={() => {
                actions.setmenufour(true);
              }}
              onMouseLeave={() => {
                actions.setmenufour(false);
              }}
            >
              <button>
                <IoMenu />
                <span>메뉴 펼치기</span>
              </button>
              <ul className={`${state.menufour ? "fourmenu" : ""}`}>
                <li>
                  <Link to="/new_product">신상품</Link>
                </li>
                <li>
                  <Link to="/best">베스트</Link>
                </li>
                <li>
                  <Link to="/time_sales">알뜰쇼핑</Link>
                </li>
                <li>
                  <Link to="/benefits">특가/혜택</Link>
                </li>
                <li>
                  <Link to="/guide">특별 하루 배송 안내</Link>
                </li>
              </ul>
            </li>
          </nav>
        )}
      </MenuConsumer>
    </Categorymenu>
  );
};

export default CategoryMenu;
