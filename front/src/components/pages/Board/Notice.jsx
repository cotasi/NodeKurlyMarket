import React, { useState } from "react";

import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Noticer = styled.main`
  max-width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  .Menus {
    width: 250px;
    margin-right: 3%;
    > h2 {
      font-size: 26px;
      font-weight: 700 !important;
      padding-bottom: 25px;
    }
    > ul {
      li {
        a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #787878;
          padding: 15px 20px;
          border: 1px solid #f2f2f2;
          margin-bottom: -1px;
          &.menucover {
            background-color: #fafafa;
            color: #742290;
            font-weight: 700 !important;
          }
        }
      }
    }
  }
  .Contents {
    width: calc(97% - 250px);
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 35px;
      h2,
      h4 {
        display: inline-block;
      }
      h4 {
        font-size: 16px;
        color: #999;
        font-weight: 500 !important;
        margin-left: 0.5rem;
      }
    }
    ul.tables {
      border-top: 2px solid #333;
      margin-bottom: 30px;
      li {
        display: flex;
        padding: 0 15px;
        &:not(:first-of-type) {
          border-bottom: 1px solid rgba(0, 0, 0, 0.25);
          a {
            padding: 20px 0;
            color: #333;
            display: flex;
            width: 100%;
            align-items: center;
          }
        }
        &:first-of-type {
          border-bottom: 1px solid #333;
          span {
            display: inline-block;
            padding: 20px 0;
          }
        }
        span {
          display: inline-block;
          &:first-of-type {
            width: 10%;
          }
          &:nth-of-type(2) {
            width: 60%;
          }
          &:nth-of-type(3) {
            width: 10%;
          }
          &:last-of-type {
            width: 20%;
          }
        }
      }
    }
    ul.mo_tables {
      display: none;
      border-top: 2px solid #333;
      margin-bottom: 30px;
      > li {
        padding: 0 15px;
        text-align: center;
        > span {
          font-size: 14px;
          display: inline-block;
          padding: 15px 0;
        }
        &:first-of-type {
          border-bottom: 1px solid #333;
        }
        &:not(:first-of-type) {
          text-align: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.25);
          position: relative;
          button {
            position: absolute;
            right: 15px;
            top: 0;
            padding: 10px 0;
          }
          > a {
            display: block;
            padding: 15px 0;
            color: #333;
          }
          > div.detail_con {
            text-align: center;
            height: 0;
            overflow: hidden;
            transition: height 0.4s;
            &.detailOpen {
              height: 250px;
            }
            span {
              display: block;
              padding: 10px 0;
              margin: 15px 0;
              border-bottom: 1px solid #333;
            }
          }
        }
      }
    }
    div.buttons {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      position: relative;
      > button {
        padding: 15px;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .wr_mo {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        display: flex;
        gap: 10px;
        button {
          width: 80px;
          padding: 15px 0;
          background-color: #5f0080;
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
  @media (max-width: 960px) {
    .Menus {
      width: 200px;
      > h2 {
        font-size: 22px;
      }
      > ul {
        li {
          a {
            padding: 10px 15px;
            font-size: 14px;
          }
        }
      }
    }
    .Contents {
      width: calc(97% - 200px);
      .title {
        h2 {
          font-size: 20px;
        }
        h4 {
          margin-left: 1.5rem;
          font-size: 12px;
        }
      }
      ul.tables {
        li {
          &:first-of-type {
            span {
              padding: 15px 0;
              font-size: 14px;
            }
          }
          &:not(:first-of-type) {
            span {
              padding: 0;
              font-size: 14px;
            }
          }
        }
      }
      div.buttons {
        .left,
        .right {
          padding: 10px;
          svg {
            font-size: 18px;
          }
        }
        .wr_mo {
          button {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
          }
        }
      }
    }
  }

  @media (max-width: 820px) {
    .Contents {
      ul.tables {
        li {
          span {
            &:nth-of-type(2) {
              width: 50%;
            }
            &:nth-of-type(3) {
              width: 15%;
            }
          }
        }
      }
      div.buttons {
        flex-wrap: wrap;
        .wr_mo {
          width: 100%;
          position: static !important;
          justify-content: center;
          margin-top: 20px;
        }
      }
    }
  }
  @media (max-width: 770px) {
    .Contents {
      .title {
        flex-direction: column;
        h4 {
          margin-top: 15px;
        }
      }
      ul.tables {
        display: none;
      }
      ul.mo_tables {
        display: block;
      }
    }
  }
  @media (max-width: 680px) {
    flex-direction: column;
    .Menus {
      margin: 0 auto;
      > h2 {
        text-align: center;
      }
    }
    .Contents {
      margin-top: 40px;
      width: 100%;
    }
  }
  @media (max-width: 410px) {
    .Contents {
      .title {
        h4 {
          margin-left: 0;
        }
      }
      ul.mo_tables {
        > li {
          &:not(:first-of-type) {
            button {
              position: static;
            }
          }
        }
      }
    }
  }
`;

const Notice = ({ header, idx, buheader }) => {
  const Navigate = useNavigate();

  const menuContents = [
    {
      name: "공지사항",
      eng: "notice",
    },
    {
      name: "자주하는 질문",
      eng: "qna",
    },
    {
      name: "1:1문의",
      eng: "onetoone",
    },
    {
      name: "대량주문문의",
      eng: "many",
    },
  ];

  const BoardContents = [
    {
      number: "공지",
      subject: "제주지역 주문 조기마감 안내",
      author: "컬리",
      date: "2024.07.18",
    },
    {
      number: "공지",
      subject: "제주지역 주문 조기마감 안내",
      author: "컬리",
      date: "2024.07.18",
    },
  ];

  const [menuOver, setMenuOver] = useState({
    boolean: true,
    index: idx,
  });

  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <Noticer>
      <div className="Menus">
        <h2>고객센터</h2>
        <ul>
          {menuContents.map((mc, nums) => (
            <li>
              <Link
                to={`/board/${mc.eng}`}
                className={`${
                  menuOver.boolean && menuOver.index === nums ? "menucover" : ""
                }`}
              >
                <span>{mc.name}</span>
                <ChevronRightIcon />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="Contents">
        <div className="title">
          <h2>{header}</h2>
          <h4>{buheader}</h4>
        </div>
        <ul className="tables">
          <li>
            <span>번호</span>
            <span>제목</span>
            <span>작성자</span>
            <span>작성일</span>
          </li>
          {BoardContents.map((bc, num) => (
            <li>
              <Link to="/">
                <span>{bc.number}</span>
                <span>{bc.subject}</span>
                <span>{bc.author}</span>
                <span>{bc.date}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mo_tables">
          <li>
            <span>제목</span>
          </li>
          {BoardContents.map((bcc, numm) => (
            <li>
              <Link to="/">
                <span>{bcc.subject}</span>
              </Link>
              <button
                onClick={() => {
                  setDetailOpen(!detailOpen);
                }}
              >
                <ExpandMoreIcon />
              </button>
              <div className={`detail_con ${detailOpen && "detailOpen"}`}>
                <span>번호 형태 : {bcc.number}</span>
                <span>작성자 : {bcc.author}</span>
                <span>작성 날짜 : {bcc.date}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="buttons">
          <button className="left">
            <ArrowBackIosNewIcon />
          </button>
          <button className="right">
            <ArrowForwardIosIcon />
          </button>
          <div className="wr_mo">
            <button
              onClick={() => {
                Navigate("/board/write");
              }}
            >
              글쓰기
            </button>
            <button>글수정</button>
          </div>
        </div>
      </div>
    </Noticer>
  );
};

export default Notice;
