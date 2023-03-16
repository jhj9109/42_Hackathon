import React from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigator = useNavigate();

  return (
    <Stack gap={3} className="Home">
      <div className="Home-Button-Group">
        <Button
          className="Home-Button"
          onClick={() => navigator('/mentee/mentors')}
        >
          멘티 슬롯
        </Button>
        <Button
          className="Home-Button"
          onClick={() => navigator('/mentor/slots')}
        >
          멘토 슬롯
        </Button>
      </div>
      <div className="Home-Container">
        <div className="Home-Row">
          <p className="Home-P">kangkim님의 minishell 멘토링 16시 30분</p>
          <button className="Home-Emoji">❌</button>
          <button
            className="Home-Emoji"
            onClick={() => navigator('/mentee/comment')}
          >
            ⭕️
          </button>
        </div>
      </div>
      <div className="Home-Container">
        <div className="Home-Row">
          <button
            className="Home-Question"
            onClick={() => alert('Mentoring Modal')}
          >
            minishell 파이프 설정법을 모르겠습니다. hyeonjan now
          </button>
        </div>
      </div>
    </Stack>
  );
};

export default Home;
