import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import axios from "axios";

import Popmenu from "../../common/Popmenu";

import PopContext from "../../../context/PopContext";

import {
  IoIosCheckmarkCircleOutline,
  IoIosCheckmarkCircle,
} from "react-icons/io";

import {
  idvalid,
  pwvalid,
  namevalid,
  pwCheck,
  emailCheck,
} from "../../../modules/util";

import dayjs from "dayjs";

const RegisterForm = styled.div`
  .wrapper {
    max-width: 50%;
    margin: 0 auto;
    margin-top: 30px;
    > h1 {
      text-align: center;
      font-size: 24px;
      margin-bottom: 45px;
    }
    > .reg_box {
      padding-top: 10px;
      border-top: 2px solid #333;
      position: relative;
      p.require {
        position: absolute;
        bottom: calc(100% + 10px);
        right: 0;
        span {
          color: #ee6a7b;
        }
      }
      .input_wrap {
        padding: 0 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 25px;
        position: relative;
        &:last-of-type {
          padding-bottom: 30px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        }
        > label {
          font-weight: 600 !important;
          width: 20%;
        }
        > div.input_wrapper {
          width: 50%;
          input {
            width: 100%;
            padding: 10px 20px;
            outline: none;
          }
        }
        > button {
          position: absolute;
          top: 0;
          right: 0;
          width: 20%;
          border: 1px solid #5f0080;
          background-color: #fff;
          color: #5f0080;
          padding: 10px 0;
          cursor: pointer;
        }
        small {
          display: block;
          width: 100%;
          margin-top: 10px;
        }
      }
    }
    div.join {
      width: 100%;
      display: flex;
      justify-content: center;
      button {
        width: 200px;
        padding: 20px 0;
        color: #fff;
        background-color: #5f0080;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
  @media (max-width: 900px) {
    .wrapper {
      max-width: 80%;
      .reg_box {
        .input_wrap {
          label {
            font-size: 14px;
          }
          input {
            width: 40%;
          }
          button {
            right: 1%;
          }
        }
      }
      div.join {
        button {
          padding: 15px 0;
          width: 120px;
        }
      }
    }
  }
  @media (max-width: 650px) {
    .wrapper {
      .reg_box {
        padding-top: 30px;
        .input_wrap {
          flex-wrap: wrap;
          label {
            width: 100%;
            margin-bottom: 10px;
          }
          input {
            width: 60%;
          }
          button {
            bottom: 0;
            top: unset;
            right: 15%;
          }
          &:last-of-type {
            button {
              bottom: 30px;
              right: 10px;
            }
          }
        }
      }
    }
  }
  @media (max-width: 480px) {
    .wrapper {
      .reg_box {
        .input_wrap {
          button {
            font-size: 13px;
          }
        }
      }
      div.join {
        button {
          padding: 10px 0;
          width: 80px;
          font-size: 13px;
        }
      }
    }
  }
  @media (max-width: 400px) {
    .wrapper {
      .reg_box {
        .input_wrap {
          div.input_wrapper {
            width: 85%;
            input {
              width: 100%;
            }
          }

          button {
            position: static;
            margin-top: 15px;
            background-color: #5f0080;
            color: #fff;
          }
        }
      }
    }
  }
`;

const Register = () => {
  const Navigate = useNavigate();

  const uidRef = useRef(null);
  const upwRef = useRef(null);
  const upwchkRef = useRef(null);
  const unameRef = useRef(null);
  const uemailRef = useRef(null);

  const [uid, setuid] = useState("");
  const [uiderr, setuiderr] = useState(true);
  const [uidmsg, setuidmsg] = useState("");
  const [popmsg, setpopmsg] = useState("");

  const [upw, setupw] = useState("");
  const [upwerr, setupwerr] = useState(true);
  const [upwmsg, setupwmsg] = useState("");

  const [upwchk, setupwchk] = useState("");
  const [upwchkerr, setupwchkerr] = useState(true);
  const [upwchkmsg, setupwchkmsg] = useState("");

  const [uname, setuname] = useState("");
  const [unerr, setunerr] = useState(true);
  const [unmsg, setunmsg] = useState("");

  const [uem, setuem] = useState("");
  const [uemerr, setuemerr] = useState(true);
  const [uemsg, setuemsg] = useState("");

  const {
    inner: { idopen, emopen },
    actions: { setIdopen, setEmopen },
  } = useContext(PopContext);

  const idCheckAxios = async () => {
    try {
      const idres = await axios.post("/member/idcheck");
      if (idres?.data) {
        const findDat = idres.data.find((item) => item.uid === uid);
        if (findDat) {
          setpopmsg("존재하는 아이디입니다.");
          setuiderr(true);
          setIdopen(true);
          document.body.classList.add("dimmed");
          setuidmsg("올바른 아이디가 아닙니다. 다시 확인하세요.");
        } else {
          setpopmsg("올바른 아이디입니다.");
          setuiderr(false);
          setIdopen(true);
          document.body.classList.add("dimmed");
          setuidmsg("올바른 아이디입니다. 그대로 사용하셔도 좋습니다.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const emailCheckAxios = async () => {
    const emres = await axios.post("/member/emailcheck");
    if (emres?.data) {
      const findem = emres.data.find((emres) => emres.uem === uem);
      if (findem) {
        setpopmsg("존재하는 이메일이 있습니다.");
        setuemsg("올바르지 않은 이메일입니다.");
        setuemerr(true);
      } else {
        setpopmsg("사용가능한 이메일입니다.");
        setuemsg("사용가능한 이메일입니다.");
        setuemerr(false);
      }
    }
  };

  const idChange = (e) => {
    setuid(e.target.value);
  };

  const pwChange = (e) => {
    setupw(e.target.value);
  };

  const pwchkChange = (e) => {
    setupwchk(e.target.value);
  };

  const nameChange = (e) => {
    setuname(e.target.value);
  };

  const emChange = (e) => {
    setuem(e.target.value);
  };

  const handleIdCheck = () => {
    const validcheck = idvalid(uidRef.current.value);
    if (validcheck) {
      setuid(uidRef.current.value);
      idCheckAxios();
    } else {
      setuiderr(true);
      setuidmsg("올바른 아이디가 아닙니다. 다시 확인하세요.");
      setpopmsg("올바른 아이디가 아닙니다. 다시 확인하세요.");
      if (uidRef.current.value.trim() === "") {
        setuidmsg("아이디가 비어있습니다. 입력해주세요.");
        setpopmsg("아이디가 비어있습니다. 입력해주세요.");
      }
      setIdopen(true);
      document.body.classList.add("dimmed");
    }
  };

  const handlePwCheck = async () => {
    const pwdvalid = pwvalid(upwRef.current.value);
    if (!pwdvalid) {
      setupwerr(true);
      setupwmsg("비밀번호가 형식에 올바르지 않습니다.");
      if (upwRef.current.value.trim() === "") {
        setupwmsg("비밀번호를 입력해주세요. 비어있습니다.");
      }
    } else {
      setupwerr(false);
      setupw(upwRef.current.value);
    }
  };

  // 가입하기 버튼 눌렀을 때 호출한다.
  const handlePwchkCheck = () => {
    const pchk = pwCheck(upwRef.current.value, upwchkRef.current.value);
    if (!pchk) {
      setupwchkerr(true);
      setupwchkmsg("비밀번호가 서로 다릅니다.");
      if (upwRef.current.value.trim() === "") {
        setupwchkerr(true);
        setupwchkmsg("비밀번호를 입력해야 합니다.");
      }
    } else setupwchkerr(false);
  };

  const handleNmCheck = () => {
    const nchk = namevalid(unameRef.current.value);
    if (!nchk) {
      setunerr(true);
      setunmsg("올바른 형식의 이름을 입력해주세요.");
      if (unameRef.current.value.trim() === "") {
        setunmsg("이름이 비어있습니다. 입력해주세요.");
      }
    } else {
      setunerr(false);
    }
  };

  const handleEmCheck = () => {
    const emailvalid = emailCheck(uemailRef.current.value);
    if (emailvalid) {
      setuem(uemailRef.current.value);
      emailCheckAxios();
      setEmopen(true);
      document.body.classList.add("dimmed");
    } else {
      setuemerr(true);
      setuemsg("형식에 맞지 않는 이메일입니다.");
      setpopmsg("형식에 맞지 않는 이메일입니다.");
      if (uemailRef.current.value === "") {
        setuemsg("이메일이 비어있습니다. 입력해주세요.");
        setpopmsg("이메일이 비어있습니다. 입력해주세요.");
      }
      setEmopen(true);
      document.body.classList.add("dimmed");
    }
  };

  const handleSubmit = async () => {
    handlePwCheck();
    handlePwchkCheck();
    handleNmCheck();
    if (!uiderr && !upwerr && !upwchkerr && !unerr && !uemerr) {
      const postdata = {
        uid: uid,
        upwd: upw,
        uname: uname,
        uem: uem,
      };
      try {
        const apiresponse = await axios.post("/member/submit", postdata);
        console.log("서버응답:" + apiresponse.data);
        Navigate("/");
      } catch (errors) {
        console.error("회원가입 실패:" + errors);
      }
    }
  };

  return (
    <>
      <RegisterForm>
        <div className="wrapper">
          <h1>회원가입</h1>
          <div className="reg_box">
            <p className="require">
              <span>*</span>필수입력사항
            </p>
            <div className="input_wrap">
              <label htmlFor="uid">아이디</label>
              <div className="input_wrapper">
                <input
                  type="text"
                  id="uid"
                  name="uid"
                  required
                  placeholder="아이디를 입력해주세요"
                  autoComplete="off"
                  ref={uidRef}
                  onChange={idChange}
                />
              </div>
              <button className="checkid" onClick={handleIdCheck}>
                중복확인
              </button>
              {uiderr && <small>{uidmsg}</small>}
            </div>
            <div className="input_wrap">
              <label htmlFor="upwd">비밀번호</label>
              <div className="input_wrapper">
                <input
                  type="password"
                  id="upw"
                  name="upw"
                  required
                  placeholder="비밀번호를 입력해주세요"
                  autoComplete="off"
                  ref={upwRef}
                  onChange={pwChange}
                />
              </div>
              {upwerr && <small>{upwmsg}</small>}
            </div>
            <div className="input_wrap">
              <label htmlFor="upwchk">비밀번호확인</label>
              <div className="input_wrapper">
                <input
                  type="password"
                  id="upwchk"
                  required
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  autoComplete="off"
                  ref={upwchkRef}
                  onChange={pwchkChange}
                />
                {upwchkerr && <small>{upwchkmsg}</small>}
              </div>
            </div>
            <div className="input_wrap">
              <label htmlFor="uname">이름</label>
              <div className="input_wrapper">
                <input
                  type="text"
                  id="uname"
                  name="uname"
                  required
                  placeholder="이름을 입력해주세요"
                  autoComplete="off"
                  ref={unameRef}
                  onChange={nameChange}
                />
              </div>
              {unerr && <small>{unmsg}</small>}
            </div>
            <div className="input_wrap">
              <label htmlFor="uemail">이메일</label>
              <div className="input_wrapper">
                <input
                  type="text"
                  id="uemail"
                  name="uemail"
                  required
                  placeholder="예)marketkurly@naver.com"
                  autoComplete="off"
                  ref={uemailRef}
                  onChange={emChange}
                />
              </div>
              <button onClick={handleEmCheck}>중복확인</button>
              {uemerr && <small>{uemsg}</small>}
            </div>
          </div>
          <div className="join">
            <button onClick={handleSubmit}>가입하기</button>
          </div>
        </div>
      </RegisterForm>
      <Popmenu
        idopen={idopen}
        emopen={emopen}
        setEmopen={setEmopen}
        setIdopen={setIdopen}
      >
        {popmsg}
      </Popmenu>
    </>
  );
};

export default Register;
