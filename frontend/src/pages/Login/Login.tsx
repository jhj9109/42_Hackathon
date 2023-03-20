import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import FlexBox from '../../components/FlexBox/FlexBox';
import logo from '../../assets/42in_logo.png';
import { getRequest, JAEHYUKI_URL, postRequest } from '../../api/axios';
import axios from 'axios';
import { ACCESS_TOKEN_STR, deleteCookie, mySetCookie } from '../../utils/cookieUtils';

const Div = styled.div`
  color: #292d39;
  height: 70vh;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 7rem;
  border-radius: 0.5rem;
`;

const Div2 = styled.div`
  background-color: #fafafa;
  color: #292d39;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  border-radius: 0.5rem;
`;



const Login = () => {
  const navigator = useNavigate();
  const goRedirect = () => { window.location.href = JAEHYUKI_URL + "/login/42"; }
  const [intraId, setIntraId] = useState(localStorage.getItem(ACCESS_TOKEN_STR) ?? "");
  const onLogin = () => {
    if (intraId !== "") {
      postRequest(`user/login?intraId=${intraId}`)
        .then(res => {
          console.log(res);
          localStorage.setItem(ACCESS_TOKEN_STR, intraId);
          mySetCookie(ACCESS_TOKEN_STR, intraId);
          axios.defaults.headers.common.Authorization = 'Bearer ' + intraId;
          alert("로그인 되었습니다.");
          navigator('/');
        })
        .catch(err => {
          console.error(err);
          localStorage.removeItem(ACCESS_TOKEN_STR);
          deleteCookie(ACCESS_TOKEN_STR)
          alert("42auth를 통해 가입 부탁드립니다.");
        })
    } else {
      alert("인트라 아이디를 입력해주세요.")
    }
  }
  return (
    <FlexBox
      flexDirection="column"
      width="98%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      gap="1vh"
    >
      <Div>
        <img style={{width: "inherit"}}src={logo} />
      </Div>
      <Div2>
        <label htmlFor='intraId'></label>
        <input style={{width: "inherit"}} placeholder={"회원가입 후, 인트라 아이디를 입력후 로그인해주세요."} name='intraId' value={intraId} onChange={(e) => setIntraId(e.target.value)} required></input>
      </Div2>
      <Button size="large" onClick={() => goRedirect()}>
        회원가입
      </Button>
      <Button size="large" onClick={() => onLogin()}>
        로그인
      </Button>
    </FlexBox>
  );
};

export default Login;
