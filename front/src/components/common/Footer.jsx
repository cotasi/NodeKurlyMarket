import React from 'react';

import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <footer>
        <div className="wrap">
          <div className="center">
            <h1>고객행복센터</h1>
            <p>
              <span>1644-1077</span>
              월~토요일 오전 7시 ~ 오후 6시
            </p>
            <ul>
              <li>
                <button>카카오톡 문의</button>
                <div className="des">
                  <p>
                    <span>월~토요일</span>
                    <span>오전 7시 ~ 오후 9시</span>
                  </p>
                  <p>
                    <span>일/공휴일</span>
                    <span>오전 7시 ~ 오후 1시</span>
                  </p>
                </div>
              </li>
              <li>
                <button>1:1 문의</button>
                <div className="des">
                  <span>365일</span>
                  <span>고객센터 운영시간에 순차적으로 답변드리겠습니다.</span>
                </div>
              </li>
              <li>
                <button>대량주문 문의</button>
                <div className="des">
                  <p>
                    <span>월~금요일</span>
                    <span>오전 9시 ~ 오후 6시</span>
                  </p>
                  <p>
                    <span>점심시간</span>
                    <span>낮 12시 ~ 오후 1시</span>
                  </p>
                </div>
              </li>
            </ul>
            <b>비회원 문의: help@kurlycurp.com</b>
          </div>
          <div className="menu">
            <ul>
              <li>
                <Link to="/intro">컬리소개</Link>
              </li>
              <li>
                <Link to="/intromovie">컬리소개영상</Link>
              </li>
              <li>
                <a href="https://ir.kurly.com/">투자정보</a>
              </li>
              <li>
                <Link to="/recruit">인재채용</Link>
              </li>
              <li>
                <Link to="/howtouse">이용약관</Link>
              </li>
            </ul>
            <div className="company">
                <p>
                    <span>법인명 (상호): 주식회사 컬리</span>
                    사업자등록번호: 261-8123567
                    <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2618123567&apv_perm_no=" target="_blank">사업자번호확인</a>
                    <br/>
                    통신판매업: 제 2018-서울강남-01646 호
                    <br/>
                    <span>주소: 서울특별시 강남구 테헤란로 133,18층(역삼동)</span>
                    대표이사: 김슬아
                    <br/>
                    채용문의: recruit@kurlycorp.com
                    <br/>
                    팩스: 070-7500-6098
                </p>
            </div>
          </div>
          <div className="center_mo">
            <ul>
                <li>
                    <button>카카오톡 문의</button>
                    <div className="des_mo">
                        <dl>
                            <dd>월~토요일</dd>
                            <dt>오전 7시 ~ 오후 6시</dt>
                        </dl>
                        <dl>
                            <dd>일/공휴일</dd>
                            <dt>오전 7시 ~ 오후 1시</dt>
                        </dl>
                    </div>
                </li>
                <li>
                    <button>1:1 문의</button>
                    <div className="des_mo">
                        <span>365일</span>
                        <span>고객센터 운영시간에 순차적으로 답변드리겠습니다.</span>
                    </div>
                </li>
                <li>
                    <button>대량주문 문의</button>
                    <div className="des_mo">
                        <dl>
                            <dd>월~금요일</dd>
                            <dt>오전 9시 ~ 오후 6시</dt>
                        </dl>
                        <dl>
                            <dd>점심시간</dd>
                            <dt>낮 12시 ~ 오후 1시</dt>
                        </dl>
                    </div>
                </li>
            </ul>
          </div>
        </div>
      </footer>
    );
};

export default Footer;