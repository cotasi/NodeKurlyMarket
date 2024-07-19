import React, { useState, useRef, useContext, useEffect } from "react";

import LoginContext from "../../../context/LoginContext";

import styled from "styled-components";

import axios from "axios";

import { Spin } from "antd";

import { Link, useNavigate } from "react-router-dom";

const Forms = styled.form`
  text-align: center;
  margin-top: 50px;
  h2 {
    font-size: 20px;
    padding-bottom: 30px;
  }
  .formwrap {
    max-width: 272px;
    margin: 0 auto;
    .ids,
    .pwds {
      margin-bottom: 20px;
      label {
        display: none;
      }
      input {
        width: 250px;
        padding: 15px 10px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        outline: none;
        border-radius: 5px;
        &.red {
          border: 1px solid #f22c3d;
        }
        &::placeholder {
          font-size: 15px;
        }
      }
      small {
        display: block;
        width: 100%;
        text-align: left;
        margin-top: 15px;
        color: #f22c3d;
      }
    }
    .find {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 40px;
      a {
        font-size: 14px;
        display: block;
        padding: 0 10px;
        color: #000;
        position: relative;
        &:first-of-type {
          &:after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto 0;
            width: 1px;
            background-color: rgba(0, 0, 0, 0.4);
          }
        }
      }
    }
    .button {
      button {
        width: 100%;
        padding: 15px 0;
        font-size: 16px;
        cursor: pointer;
        &:first-of-type {
          background-color: #5f0080;
          color: #fff;
          margin-bottom: 20px;
        }
        &:last-of-type {
          color: #5f0080;
          border: 1px solid #5f0080;
        }
      }
    }
  }
  @media (max-width: 420px) {
    > h2 {
      font-size: 18px;
    }
    .formwrap {
      .ids {
        input {
          width: 200px;
          padding: 8px 10px;
          &::placeholder {
            font-size: 13px;
          }
        }
      }
      .pwds {
        input {
          width: 200px;
          padding: 8px 10px;
          &::placeholder {
            font-size: 12px;
          }
        }
      }
      .find {
        a {
          font-size: 12px;
        }
      }
      .button {
        button {
          width: 80%;
          padding: 10px 0;
          font-size: 14px;
        }
      }
    }
  }
`;

const Login = () => {
  const Navigate = useNavigate();

  const [loginerr, setloginerr] = useState(false);
  const [errmsg, seterrmsg] = useState({
    id: "",
    pw: "",
  });

  const idref = useRef(null);
  const pwref = useRef(null);

  const {
    login: { isAuth },
    set: { setIsAuth },
  } = useContext(LoginContext);

  const CheckAxios = async () => {
    try {
      const checkres = await axios.post(
        `/login/${JSON.stringify(idref.current.value)}/${JSON.stringify(
          pwref.current.value
        )}`
      );
      if (checkres && checkres.data && checkres.data.length > 0) {
        const datas = checkres.data;
        sessionStorage.setItem("uid", datas && datas[0].uid);
        setIsAuth(true);
        Navigate("/");
      } else {
        setIsAuth(false);
        setloginerr(true);
        seterrmsg({
          id: "아이디를 입력해주세요",
          pw: "비밀번호를 입력해주세요",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loginHandle = (e) => {
    e.preventDefault();
    CheckAxios();
  };

  return (
    <Forms onSubmit={loginHandle}>
      <h2>로그인</h2>
      <div className="formwrap">
        <div className="ids">
          <label htmlFor="userid">아이디</label>
          <input
            type="text"
            id="userid"
            placeholder="아이디를 입력해주세요."
            ref={idref}
            className={`${loginerr && "red"}`}
          />
          {loginerr && <small>{errmsg.id}</small>}
        </div>
        <div className="pwds">
          <label htmlFor="userpwd">패스워드</label>
          <input
            type="password"
            id="userpwd"
            placeholder="패스워드를 입력해주세요."
            ref={pwref}
            className={`${loginerr && "red"}`}
          />
          {loginerr && <small>{errmsg.pw}</small>}
        </div>
        <div className="find">
          <Link to="/">아이디 찾기</Link>
          <Link to="/">비밀번호 찾기</Link>
        </div>
        <div className="button">
          <button type="submit">로그인</button>
          <button>회원가입</button>
        </div>
      </div>
    </Forms>
  );
};

export default Login;
