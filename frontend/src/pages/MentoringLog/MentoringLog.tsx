import React from 'react';
import styled from 'styled-components';
import Container from '../../components/Container/Container';

const MentoringLogStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`;

const Title = styled(Container)`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border: 600;
`;
const Logs = styled(Container)`
  height: 90%;
  padding: 0.5rem;
  overflow-y: auto;
`;
const Log = styled.div`
  font-size: 1.5rem;
  border-bottom: 0.1rem solid white;
`;

const MentoringLog = () => {
  return (
    <MentoringLogStyle>
      <Title>멘토링 로그</Title>
      <Logs>
        <Log>멘토링 로그입니다.</Log>
      </Logs>
    </MentoringLogStyle>
  );
};

export default MentoringLog;
