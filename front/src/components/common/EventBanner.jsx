import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import styled from 'styled-components';

const EBanner = styled.div`
  background-color: #5f0080;
  position: relative;
  padding: 10px 0;
  button {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    right: 15%;
    border: none;
    background-color: transparent;
    font-size: 20px;
    color: #fff;
    display: flex;
    align-items: center;
  }
  a {
    display: block;
    text-align: center;
    text-decoration: none;
    p {
        margin: 0;
        color: #fff;
        font-size: .95rem;
    }
  }

  @media (max-width: 768px) {
    a {
        p {
            font-size: .85rem;
        }
    }
    button {
        font-size: 16px;
    }
  }

  @media (max-width: 460px) {
    a {
        p {
            font-size: .75rem;
        }
    }
    button {
        font-size: 14px;
    }
  }
  @media (max-width:360px) {
    a {
        p {
            font-size: .65rem;
        }
    }
    button {
        font-size: 12px;
    }
  }
`;

const EventBanner = () => {
    return (
        <EBanner>
            <Link to="/event">
                <p>지금 가입하고,<b>1만원 할인 쿠폰</b> 받아가세요!</p>
            </Link>
            <button><IoMdClose /></button>
        </EBanner>
    );
};

export default EventBanner;