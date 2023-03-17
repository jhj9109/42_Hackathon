import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InLogo from '../../assets/42in_logo.png';
import GithubLogo from '../../assets/github-mark.png';
import styled from 'styled-components';

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

function App() {
  const navigator = useNavigate();
  const onGithub = () => {
    window.open('https://github.com/kangmin5505/42In');
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
