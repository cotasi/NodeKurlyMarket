import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

import { HiChevronDown } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";

import { RiMapPinFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

import Logo from "../../Assets/Atomic/Atom/Logo";

const Register = styled.div`
  display: none;
  position: absolute;
  right: 0;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.25);
  width: 250px;
  padding: 15px;
  p {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    b {
      color: #5f0080;
    }
  }
  .btns {
    margin-top: 20px;
    display: flex;
    align-items: center;
    button {
      font-size: 16px;
      padding: 10px;
      letter-spacing: -1px;
      &.join {
        color: #5f0080;
        border: 1px solid #5f0080;
        width: 40%;
        margin-right: 5%;
      }
      &.src_add {
        width: 55%;
        background-color: #5f0080;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          margin-right: 0.754rem;
        }
      }
    }
  }
`;

const NavigateTop = () => {
  const Navigate = useNavigate();
  const [tabon, settabon] = useState(false);
  const [momenu, setmo] = useState(false);
  const [mosch, setmosch] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const Logout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("uid");
    Navigate("/");
  };

  const sid = sessionStorage.getItem("uid");

  const goCart = () => {
    Navigate("/cart");
  };

  useEffect(() => {
    const stuid = sessionStorage.getItem("uid");
    if (stuid) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [isAuth]);

  return (
    <div className="Navigation">
      <div className="nav_top">
        <ul id="user_menu">
          {!isAuth && (
            <>
              <li>
                <Link to="/join">회원가입</Link>
              </li>
              <li>
                <Link to="/login">로그인</Link>
              </li>
            </>
          )}
          {sessionStorage.getItem("uid") === "admin" && (
            <li>
              <Link to="/admin">관리자 페이지</Link>
            </li>
          )}

          {isAuth && (
            <>
              <li>
                <span>
                  <b>{sid}</b> 님
                </span>
              </li>
              <li>
                <Link to="/join" onClick={Logout}>
                  로그아웃
                </Link>
              </li>
            </>
          )}
          <li>
            <button
              onClick={() => {
                settabon(!tabon);
              }}
            >
              <span>고객센터</span>
              <HiChevronDown />
            </button>
            <ul className={`tabmenu ${tabon ? "tabon" : ""}`}>
              <li>
                <Link to="/notice">공지사항</Link>
              </li>
              <li>
                <Link to="/qna">자주하는질문</Link>
              </li>
              <li>
                <Link to="/cs">1:1문의</Link>
              </li>
              <li>
                <Link to="/many">대량주문문의</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="nav_bot">
        <div className="logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="search">
          <input type="text" placeholder="검색어를 입력해주세요." />
          <button type="submit">
            <IoSearch />
          </button>
        </div>
        <div className="icons">
          <ul>
            <li>
              <button>
                <RiMapPinFill />
              </button>
              <Register>
                <p>
                  <b>배송지</b>를 등록하고 <br />
                  구매가능한 상품을 확인하세요
                </p>
                <div className="btns">
                  <button className="join">로그인</button>
                  <button className="src_add">
                    <span>주소검색</span>
                    <IoSearch />
                  </button>
                </div>
              </Register>
            </li>
            <li>
              <button>
                <FaHeart />
              </button>
            </li>
            <li>
              <button className="cart" onClick={goCart}>
                <FaCartShopping />
              </button>
            </li>
          </ul>
        </div>
        <div className="mo_nav">
          <button
            onClick={() => {
              setmo(true);
              document.body.classList.add("dimmed");
            }}
          >
            <b>마켓 컬리</b> 드롭다운 메뉴
          </button>
          <ul className={`${momenu ? "momenuon" : ""}`}>
            <li>
              <button
                className="close"
                onClick={() => {
                  setmo(false);
                  document.body.classList.remove("dimmed");
                }}
              >
                <MdClose />
              </button>
            </li>
            <li>
              <Link to="/join">로그인</Link>
            </li>
            <li>
              <Link to="/join">회원가입</Link>
            </li>
            <li>
              <Link to="/join">고객센터</Link>
            </li>
            <li>
              <Link to="/join">배송지 등록</Link>
            </li>
            <li>
              <Link to="/join">찜 리스트</Link>
            </li>
            <li>
              <Link to="/join">카트 리스트</Link>
            </li>
          </ul>
        </div>
        <div className="mo_search">
          <button
            onClick={() => {
              setmosch(true);
              document.body.classList.add("dimmed");
            }}
          >
            <IoSearch />
          </button>
          <div className={`mosch ${mosch ? "schon" : ""}`}>
            <form action="">
              <input type="text" placeholder="검색어를 입력해주세요." />
              <button type="submit">
                <IoSearch />
              </button>
            </form>
            <button
              className="close"
              onClick={() => {
                setmosch(false);
                document.body.classList.remove("dimmed");
              }}
            >
              <MdClose />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigateTop;
