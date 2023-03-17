import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';

const MenteeMentorsStyle = styled.div`
  width: 100%;
  height: 95%;
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

const Element = styled.button`
  border-radius: 1rem;
  background-color: #fafafa;
  height: 12%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.5rem;
`;

const Nickname = styled.p`
  width: 100%;
  text-align: start;
  font-size: 1.2rem;
`;
const Tag = styled.p`
  width: 100%;
  text-align: start;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
`;
const MenteeMentors = () => {
  const navigator = useNavigate();
  return (
    <>
      <MenteeMentorsStyle>
        <Title>멘토 리스트</Title>
        <Element onClick={() => navigator('/mentee/mentors/1/slots')}>
          <Nickname>hyeonjan</Nickname>
          <Tag>libft, minishell</Tag>
        </Element>
        <Element onClick={() => navigator('/mentee/mentors/1/slots')}>
          <Nickname>hyeonjan</Nickname>
          <Tag>libft, minishell</Tag>
        </Element>
      </MenteeMentorsStyle>
      <ButtonContainer>
        <Button size="large" onClick={() => navigator('/mentee/slots')}>
          멘토링 요청 슬롯 열기
        </Button>
      </ButtonContainer>
    </>
  );
};

export default MenteeMentors;
