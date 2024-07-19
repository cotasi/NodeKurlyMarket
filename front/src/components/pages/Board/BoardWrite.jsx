import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";

import axios from "axios";

import styled from "styled-components";

const Writer = styled.main`
  margin: 0 auto;
  margin-top: 50px;
  width: 85%;
  .Selector {
    position: relative;
    width: 120px;
    margin-bottom: 20px;
    > button {
      width: 100%;
      padding: 6px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 1px 1px 0 0 rgba(0, 0, 0, 0.35);
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.35);
      &.menuch {
        border-radius: 4px 4px 0 0;
      }
      svg {
        font-size: 1.2rem;
      }
    }
    ul {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      height: 0;
      overflow: hidden;
      background-color: #fff;
      &.menuup {
        height: 87px;
        overflow: visible;
        border: 1px solid rgba(0, 0, 0, 0.35);
        border-radius: 0 0 4px 4px;
        box-shadow: 1px 1px 0 0 0, 0, 0, rgba(0, 0, 0, 0.35);
      }
    }
  }
  .Subject {
    margin-bottom: 20px;
    input {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 15px;
      border: 1px solid #eceef1;
      border-radius: 6px;
      outline: none;
    }
  }
  .File {
    margin-bottom: 20px;
  }
  .Write {
    margin-bottom: 20px;
    border: 1px solid rgba(0, 0, 0, 0.35);
    .sel {
      padding: 10px 20px;
      display: flex;
      border: 1px solid rgba(0, 0, 0, 0.35);
      margin-top: -1px;
      margin-left: -1px;
      width: calc(100% + 2px);
      box-sizing: border-box;
      > li {
        width: 90px;
        margin-right: 20px;
        &:first-of-type {
          display: flex;
          align-items: center;
          justify-content: space-between;
          svg {
            width: 0.8em;
            height: 0.8em;
          }
        }
        &:nth-of-type(2) {
          display: flex;
          gap: 5px;
          width: auto;
          button {
            display: flex;
            justify-content: center;
            align-items: start;
          }
        }
        &:nth-of-type(3) {
          display: flex;
          gap: 5px;
          width: auto;
        }
      }
    }
    input {
      width: 100%;
      height: 450px;
      padding: 20px;
      border: none;
      box-sizing: border-box;
      background-color: white;
      outline: none;
    }
  }
`;

const BoardWrite = () => {
  const Navigate = useNavigate();
  const menus = ["공지사항", "자주하는 질문", "1:1 문의", "대량주문문의"];

  const [mns, setMns] = useState("공지사항");
  const [menuUp, setMenuUp] = useState(false);
  const [realTextArea, setRealTextArea] = useState(null);
  const [subject, setSubject] = useState("");

  const textaRef = useRef(null);
  const textRef = useRef(null);

  const TextareaArr = [];

  const TextAreaEvent = () => {
    TextareaArr.push("<div>" + textaRef.current.value + "</div>");

    setRealTextArea(TextareaArr);
  };

  const subjectEvent = () => {
    setSubject(textRef.current.value);
  };

  const NoticeAPI = async () => {
    const NoticeSubmit = {
      contents: realTextArea,
      notice_subject: subject,
    };
    try {
      await axios.post("/notice/submit", NoticeSubmit);
    } catch (error) {
      console.error(error);
    }
  };

  const NoticeSubmits = () => {
    NoticeAPI();
    Navigate("/board/notice");
  };

  useEffect(() => {
    if (textaRef.current) {
      textaRef.current.focus();
      textaRef.current.selectionStart = 0;
      textaRef.current.selectionEnd = 0;
    }
  }, []);

  return (
    <Writer>
      <div className="Selector">
        <button
          onClick={() => {
            setMenuUp(!menuUp);
          }}
          className={`${menuUp && "menuch"}`}
        >
          <span>{mns}</span>
          <ExpandMoreIcon />
        </button>
        <ul className={`${menuUp && "menuup"}`}>
          {menus.map((menus) => (
            <li>
              <button
                onClick={() => {
                  setMns(menus);
                  setMenuUp(false);
                }}
              >
                {menus}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="Subject">
        <input
          type="text"
          placeholder="제목"
          ref={textRef}
          onChange={subjectEvent}
        />
      </div>
      <div className="File">
        <input type="file" multiple />
      </div>
      <div className="Write">
        <ul className="sel">
          <li>
            <span>Normal</span>
            <button>
              <ArrowDropUpIcon />
            </button>
          </li>
          <li>
            <button>
              <FormatBoldIcon />
            </button>
            <button>
              <FormatItalicIcon />
            </button>
            <button>
              <FormatUnderlinedIcon />
            </button>
            <button>
              <FormatStrikethroughIcon />
            </button>
          </li>
          <li>
            <button>
              <FormatListNumberedIcon />
            </button>
            <button>
              <FormatListBulletedIcon />
            </button>
            <button>
              <FormatAlignLeftIcon />
            </button>
            <button>
              <FormatAlignCenterIcon />
            </button>
          </li>
        </ul>
        <input type="textarea" ref={textaRef} onChange={TextAreaEvent} />
      </div>
      <div className="Submit">
        <button onClick={NoticeSubmits}>전송</button>
      </div>
    </Writer>
  );
};

export default BoardWrite;
