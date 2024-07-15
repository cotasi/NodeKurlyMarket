import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GridViewIcon from "@mui/icons-material/GridView";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InventoryIcon from "@mui/icons-material/Inventory";
import SmsIcon from "@mui/icons-material/Sms";

import { AdminConsumer } from '../../../context/AdminContext';

const Adminheaders = styled.div`
  width: 20%;
  height: 100vh;
  background-color: #353535;
  .logoparts {
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    a {
      display: block;
      img {
        max-width: 70px;
      }
    }
  }
  .siteman {
    padding: 10px 0;
    > button {
      padding: 10px 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #4d4d4d;
      font-size: 16px;
      svg {
        font-size: 18px;
      }
    }
    ul.submenu {
      li {
        a {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          &.menuon {
            background-color: #1a6dff;
          }
          &:hover {
            background-color: #1a6dff;
          }
          span {
            color: #fff;
            margin-left: 1rem;
          }
          svg {
            color: #8c8c8c;
            font-size: 16px;
          }
        }
      }
    }
  }
`;

const Adminheader = () => {
  return (
    <Adminheaders>
      <AdminConsumer>
        {({ real, actor }) => (
          <>
            <div className="logoparts">
              <Link to="/admin" onClick={()=>{actor.setidx(0); actor.setmenuon(false);}}>
                <img src="./images/kurly_white.svg" alt="화이트로고" />
              </Link>
            </div>
            <div className="siteman">
              <button>
                <span>사이트 관리</span>
                <AddCircleOutlineIcon />
              </button>
              <ul className="submenu">
                <li>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => {
                      actor.setmenuon(true);
                      actor.setidx(0);
                    }}
                    className={`${
                      real.menuon && real.idx === 0 ? "menuon" : ""
                    }`}
                  >
                    <GridViewIcon />
                    <span>대쉬보드</span>
                  </Link>
                  <Link
                    to="/admin/userinfo"
                    onClick={() => {
                      actor.setmenuon(true);
                      actor.setidx(1);
                    }}
                    className={`${
                      real.menuon && real.idx === 1 ? "menuon" : ""
                    }`}
                  >
                    <PersonAddIcon />
                    <span>사용자 관리</span>
                  </Link>
                  <Link
                    to="/admin/products"
                    onClick={() => {
                      actor.setmenuon(true);
                      actor.setidx(2);
                    }}
                    className={`${
                      real.menuon && real.idx === 2 ? "menuon" : ""
                    }`}
                  >
                    <InventoryIcon />
                    <span>상품 관리</span>
                  </Link>
                  <Link
                    to="/admin/userinfo"
                    onClick={() => {
                      actor.setmenuon(true);
                      actor.setidx(3);
                    }}
                    className={`${
                      real.menuon && real.idx === 3 ? "menuon" : ""
                    }`}
                  >
                    <SmsIcon />
                    <span>댓글 관리</span>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </AdminConsumer>
    </Adminheaders>
  );
};

export default Adminheader;