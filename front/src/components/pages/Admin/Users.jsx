import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { IoMdClose } from "react-icons/io";

import axios from "axios";

const User = styled.div`
  background-color: #eeeeee;
  padding: 15px;
  height: 100vh;
  display: flex;
  .menuwrap {
    width: 25%;
    margin-right: 5%;
    ul.menu {
      background-color: #fff;
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.15);
      li {
        &.useron {
          a {
            background-color: #e8f1ff;
            color: #6ba1ff;
            font-weight: 700 !important;
          }
        }
        a {
          display: block;
          padding: 10px 20px;
          color: #333;
          &:hover {
            background-color: #e8f1ff;
            color: #6ba1ff;
            font-weight: 700 !important;
          }
        }
      }
    }
  }
  .filter_user {
    width: 70%;
    .inputpart {
      width: 100%;
      display: flex;
      .input_wrap {
        padding: 10px;
        width: 70%;
        background-color: #fff;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: row-reverse;
        margin-right: 5%;
        input {
          width: 90%;
          border: none;
          background-color: transparent;
          outline: none;
        }
        button {
          flex: 1;
        }
      }
      .export {
        width: 25%;
        background-color: #fff;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          display: flex;
          align-items: center;
        }
      }
    }
    .userlist {
      background-color: #fff;
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.15);
      margin-top: 20px;
      > h2 {
        padding: 15px 10px;
        font-size: 14px;
        font-weight: 500 !important;
      }
      ul.table {
        li.head {
          display: flex;
          border-bottom: 1px solid rgba(0, 0, 0, 0.15);
          span {
            display: block;
            text-align: center;
            flex: 1;
            padding: 10px 0;
            color: #ccc;
          }
        }
        li {
          display: flex;
          border-bottom: 1px solid rgba(0, 0, 0, 0.15);
          span {
            flex: 1;
            display: block;
            padding: 10px 0;
            color: #333;
            text-align: center;
          }
        }
      }
    }
  }
`;

const Users = () => {
  const [usermenu, setUsermenu] = useState({
    boolean: true,
    index: 0,
  });

  const [users, setUsers] = useState([]);

  const UserAPI = async () => {
    const userapi = await axios.post("/users");
    if (userapi.data) setUsers(userapi.data);
  };

  useEffect(() => {
    UserAPI();
    console.log(users);
  }, [users]);

  const del = async (mainid) => {
    const deldata = users.find((users) => users.main_id === mainid);
    const data = {
      mainid: deldata && deldata.main_id,
    };
    try {
      const delaxios = await axios.post("/users/del", data);
      if (delaxios.data) {
        setUsers(users.filter((user) => user.main_id !== mainid));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <User>
      <div className="menuwrap">
        <ul className="menu">
          <li
            onClick={() => {
              setUsermenu({ ...usermenu, index: 0 });
            }}
            className={`${
              usermenu.boolean && usermenu.index == 0 ? "useron" : ""
            }`}
          >
            <Link to="/admin">전체 사용자</Link>
          </li>
          <li
            onClick={() => {
              setUsermenu({ ...usermenu, index: 1 });
            }}
            className={`${
              usermenu.boolean && usermenu.index == 1 ? "useron" : ""
            }`}
          >
            <Link to="/admin">일반 회원</Link>
          </li>
          <li
            onClick={() => {
              setUsermenu({ ...usermenu, index: 2 });
            }}
            className={`${
              usermenu.boolean && usermenu.index == 2 ? "useron" : ""
            }`}
          >
            <Link to="/admin">운영진</Link>
          </li>
        </ul>
      </div>
      <div className="filter_user">
        <div className="inputpart">
          <div className="input_wrap">
            <input type="text" placeholder="검색" />
            <button>
              <PersonSearchIcon />
            </button>
          </div>
          <div className="export">
            <button>
              <span>내보내기</span>
              <FileDownloadDoneIcon />
            </button>
          </div>
        </div>
        <div className="userlist">
          <h2>전체 사용자 {users.length}명</h2>
          <ul className="table">
            <li className="head">
              <span>닉네임</span>
              <span>아이디</span>
              <span>회원유형</span>
              <span>가입일</span>
            </li>
            {users &&
              users.map((users) => (
                <li key={users.main_id}>
                  <span>{users.uname}</span>
                  <span>{users.uid}</span>
                  <span>{users.levels}</span>
                  <span>{users.nowt}</span>
                  <button
                    onClick={() => {
                      del(users.main_id);
                    }}
                  >
                    <IoMdClose />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </User>
  );
};

export default Users;
