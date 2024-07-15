import React from 'react';

import styled from 'styled-components';

const Mainh = styled.div`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: #333;
  }
  .btnwrap {
    display: flex;
    align-items: center;
    gap: 10px;
    button {
      width: 70px;
      padding: 10px 0;
      &:first-of-type {
        background-color: #fd6064;
        color: #fff;
      }
      &:last-of-type {
        background-color: #acb8ca;
        color: #fff;
      }
    }
  }
`;

const Mainheader = () => {
    return (
        <Mainh>
            <span>마켓컬리 어드민 사이트</span>
            <div className="btnwrap">
                <button>저장하기</button>
                <button>로그아웃</button>
            </div>
        </Mainh>
    );
};

export default Mainheader;