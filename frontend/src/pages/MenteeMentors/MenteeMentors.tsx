import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRequest } from '../../api/axios';
import { ALL_SESSION_PATH } from '../../api/uri';
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

const isOthersSession = (userId: number) => (session: Session) =>
  !(session.mentoUser?.userId === userId)

const getUrlToMentoSlot = (userId: number) =>
  `/mentee/mentors/${userId}/slots`;

const MenteeMentors = () => {
  const navigator = useNavigate();
  const [mentorList, setMentorList] = useState<Session[]>(() => [])
  // TODO: myUserId 바꾸기
  const myUserId = 1;
  useEffect(() => {
    getRequest(ALL_SESSION_PATH)
      .then(res => {
        const sessions: Session[] = res.data;
        // TODO: 임시용 교체하기 && myUserId 바꾸기
        // const othersSessions = sessions;
        const othersSessions = sessions.filter(isOthersSession(myUserId));
        console.log("othersSessions: ", othersSessions);
        setMentorList(othersSessions)
      })
  }, [])

  return (
    <>
      <MenteeMentorsStyle>
        <Title>멘토 리스트</Title>
        {
          mentorList?.map(mentor => (
            // TODO: myUserId 바꾸기
            <Element key={mentor.sessionId} onClick={() =>
              navigator(getUrlToMentoSlot(mentor?.mentoUser?.userId ?? 0))}>
              <Nickname>{mentor?.mentoUser?.intraId ?? "유저"}</Nickname>
              <Tag>{mentor.tags?.map(tag => tag.tagName).reduce((prev, el) => prev + ", " + el)}</Tag>
            </Element>
          ))
        }
        
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
