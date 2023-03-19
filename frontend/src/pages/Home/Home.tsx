import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRequest, putRequest } from '../../api/axios';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Modal from '../../components/Modal/Modal';

const HomeStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vh;
`;

const ButtonGroup = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-around;
`;

const HomeContainer = styled(Container)`
  width: 100%;
  height: 45%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr);
`;

const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 0.05rem solid white;
`;

const P = styled.p`
  font-size: 1rem;
  width: 80%;
`;

const Emoji = styled.button`
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

const Question = styled.button`
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

const Home = () => {
  const navigator = useNavigate();
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [isMentoringOpen, setIsMentoringOpen] = useState(false);
  const onOpenQuestion = () => {
    setIsQuestionOpen(true);
  };
  const onOpenMentoring = () => {
    setIsQuestionOpen(true);
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await getRequest('user/detail');
  //       console.log(response);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   })();
  // }, []);

  // TODO: axios 요청으로 보여줄 데이터 가져오기
  useEffect(() => {
    getRequest("question")
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      })
  })

  // TODO: 매칭 성사 로직 구현 필
  // const onClick = () => {
  //   const url = `question/${4}/answer`;
  //   putRequest(url)
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  // }
  
  return (
    <>
      <HomeStyle>
        <ButtonGroup>
          <Button size="small" onClick={() => navigator('/mentee/mentors')}>
            멘티 슬롯
          </Button>
          <Button size="small" onClick={() => navigator('/mentor/slots')}>
            멘토 슬롯
          </Button>
        </ButtonGroup>
        <HomeContainer>
          <Row>
            <P>kangkim님의 minishell 멘토링 16시 30분</P>
            <Emoji onClick={() => navigator('/mentee/comment')}>⭕️</Emoji>
            <Emoji onClick={onOpenMentoring}>❌</Emoji>
          </Row>
          <Row>
            <P>kangkim님의 minishell 멘토링 16시 30분</P>
            <Emoji onClick={() => navigator('/mentee/comment')}>⭕️</Emoji>
            <Emoji onClick={onOpenMentoring}>❌</Emoji>
          </Row>
        </HomeContainer>
        <HomeContainer>
          <Row>
            <Question onClick={onOpenQuestion}>
              minishell 파이프 설정법을 모르겠습니다. hyeonjan now
            </Question>
          </Row>
          <Row>
            <Question onClick={onOpenQuestion}>
              minishell 파이프 설정법을 모르겠습니다. hyeonjan now
            </Question>
          </Row>
        </HomeContainer>
      </HomeStyle>
      {isQuestionOpen && <Modal onClose={() => setIsQuestionOpen(false)} />}
      {isMentoringOpen && <Modal onClose={() => setIsMentoringOpen(false)} />}
    </>
  );
};

export default Home;
