import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

import LoginContext from "../../context/LoginContext";

import { HiChevronDown } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";

import { RiMapPinFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

import Logo from "../../Assets/Atomic/Atom/Logo";

import axios from "axios";
import PopContext from "../../context/PopContext";
import Popmenu from "./Popmenu";

const Register = styled.div`
  display: none;
  position: absolute;
  right: 0;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.25);
  width: 250px;
  padding: 15px;
  z-index: 60;
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
  const [heartMsg, setHeartMsg] = useState("");
  const {
    login: { isAuth },
    set: { setIsAuth },
  } = useContext(LoginContext);
  const {
    inner: { idopen, emopen, heartopen },
    actions: { setIdopen, setEmopen, setHeartopen },
  } = useContext(PopContext);
  const [carts, setCarts] = useState([]);

  const Logout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("uid");
    setIsAuth(false);
    Navigate("/");
  };

  const sid = sessionStorage.getItem("uid");

  const goCart = () => {
    Navigate("/cart");
  };

  const faHearts = () => {
    if (isAuth) {
      setHeartMsg("준비중입니다.");
    } else {
      setHeartMsg("로그인하세요.");
    }
    setHeartopen(true);
    document.body.classList.add("dimmed");
  };

  useEffect(() => {
    const CartAPIs = async () => {
      try {
        const cartdatas = await axios.post("/carter");
        if (cartdatas.data) {
          setCarts(cartdatas.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (carts.length == 0) {
      CartAPIs();
    }
  }, []);

  useEffect(() => {
    console.log(carts);
  }, [carts]);

  return (
    <>
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
            {sessionStorage.getItem("uid") === "admin" && isAuth && (
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
                  <Link
                    to="/board/notice"
                    onClick={() => {
                      settabon(false);
                    }}
                  >
                    공지사항
                  </Link>
                </li>
                <li>
                  <Link
                    to="/qna"
                    onClick={() => {
                      settabon(false);
                    }}
                  >
                    자주하는질문
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cs"
                    onClick={() => {
                      settabon(false);
                    }}
                  >
                    1:1문의
                  </Link>
                </li>
                <li>
                  <Link
                    to="/many"
                    onClick={() => {
                      settabon(false);
                    }}
                  >
                    대량주문문의
                  </Link>
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
                <button onClick={faHearts}>
                  <FaHeart />
                </button>
              </li>
              <li>
                <button className="cart" onClick={goCart}>
                  <FaCartShopping />
                </button>
                <span>0</span>
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
              {!isAuth && (
                <>
                  <li>
                    <Link
                      to="/login"
                      onClick={() => {
                        setmo(false);
                        document.body.classList.remove("dimmed");
                      }}
                    >
                      로그인
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/join"
                      onClick={() => {
                        setmo(false);
                        document.body.classList.remove("dimmed");
                      }}
                    >
                      회원가입
                    </Link>
                  </li>
                </>
              )}
              {isAuth && (
                <>
                  <li>
                    <Link
                      to="/"
                      onClick={(e) => {
                        Logout(e);
                      }}
                    >
                      로그아웃
                    </Link>
                  </li>
                  <li>
                    <span>{sid} 님</span>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/board/notice"
                  onClick={() => {
                    setmo(false);
                    document.body.classList.remove("dimmed");
                  }}
                >
                  고객센터
                </Link>
              </li>
              <li>
                <Link
                  to="/join"
                  onClick={() => {
                    setmo(false);
                    document.body.classList.remove("dimmed");
                  }}
                >
                  배송지 등록
                </Link>
              </li>
              <li>
                <Link
                  to="/join"
                  onClick={() => {
                    setmo(false);
                    document.body.classList.remove("dimmed");
                  }}
                >
                  찜 리스트
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={() => {
                    setmo(false);
                    document.body.classList.remove("dimmed");
                  }}
                >
                  카트 리스트
                </Link>
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
      <Popmenu
        idopen={idopen}
        setIdopen={setIdopen}
        emopen={emopen}
        setEmopen={setEmopen}
        heartopen={heartopen}
        setHeartopen={setHeartopen}
      >
        {heartMsg}
      </Popmenu>
    </>
  );
};

export default NavigateTop;