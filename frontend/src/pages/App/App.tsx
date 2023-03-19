import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InLogo from '../../assets/42in_logo.png';
import GithubLogo from '../../assets/github-mark.png';
import styled from 'styled-components';
import { getToken, postRequest } from '../../api/axios';
import { ACCESS_TOKEN_STR, deleteCookie, mySetCookie } from '../../utils/cookieUtils';

const Image = styled.img`
  width: 6vh;
  height: 6vh;
  border-radius: 50%;
  grid-column: 2 / span 1;
  justify-self: center;
  cursor: pointer;
`;

const GithubImage = styled.img`
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  grid-column: 2 / span 1;
  justify-self: center;
  cursor: pointer;
  background-color: white;
`;

const UserInfoButton = styled.button`
  grid-column: 3 / span 1;
  justify-self: right;
  width: auto;
  height: auto;
  font-size: 3rem;
  padding-right: 1vw;
  color: white;
`;

const GITHUB_URL = "https://github.com/jhj9109/42_Hackathon";

function App() {
  const navigator = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getToken();
    console.log("최초 토큰 검사")
    // 인증을 위한 토큰 부재
    if (token === "") {
      navigator("/login");
    } else {
      postRequest(`user/login?intraId=${token}`)
      .then(res => {
        // 인증 성공 => 낫띵
        console.log("App에서 트리거된 토큰 인증 성공", res);
        if (location.pathname === "/login") {
          navigator("/");
        }
      })
      .catch(err => {
        // 토큰 인증 실패 => 삭제후 로그인 페이지로
        console.error(err);
        localStorage.removeItem(ACCESS_TOKEN_STR);
        deleteCookie(ACCESS_TOKEN_STR);
        navigator("/login");
      })
    }
  }, [])

  
  const onGithub = () => {
    window.open(GITHUB_URL);
  };

  return (
    <div className="App">
      <div className="body">
        <header className="header common">
          <Image onClick={() => navigator('/')} src={InLogo} />
          <UserInfoButton onClick={() => navigator('/mentoring-log/1')}>
            ⚙︎
          </UserInfoButton>
        </header>
        <main className="main">
          <Outlet />
        </main>
        <footer className="footer common">
          <GithubImage onClick={onGithub} src={GithubLogo}></GithubImage>
        </footer>
      </div>
    </div>
  );
}
export default App;
