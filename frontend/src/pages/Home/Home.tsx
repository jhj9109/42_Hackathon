import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRequest, putRequest } from '../../api/axios';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Modal from '../../components/Modal/Modal';
import { ALL_QUESTION_PATH, USER_MATCHED_PATH, USER_QUESTION_PATH } from '../../api/uri';
import { getIntervalDateString } from '../../utils/dateUtils';

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

const QuestionBlock = styled.button`
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

const MATCHING_STATUS = "매칭 중";


// TODO: 데이터 형식에 따라 적절한 수정 필요
const notMine = (myUserId: number) => (question: Question) => question.menteeUser.userId !== myUserId;
const isMatching = (matched: Matched) => matched || true; // question.status === MATCHING_STATUS

const fetchMatched = async (setMatched: React.Dispatch<React.SetStateAction<Matched[]>>) => {
  try {
    const response = await getRequest(USER_MATCHED_PATH);
    const matched: Matched[] = response.data;
    console.log("matched: ", matched);
    setMatched(matched);
  } catch (error) {
    console.error(error);
  }
}

const fetchQuestion = async (intraId: number, setQuestion: React.Dispatch<React.SetStateAction<Question[]>>) => {
  try {
    const response = await getRequest(ALL_QUESTION_PATH);
    const allQuestions: Question[] = response.data;
    // const allQuestions = questions.filter(notMine(intraId));
    console.log("allQuestions: ", allQuestions);
    setQuestion(allQuestions);
  } catch (error) {
    console.error(error)
  }
}

// email: "hyeonjan@student.42seoul.kr"
// id: 1
// imageUri: "https://cdn.intra.42.fr/users/0e75906fded18d89beb90c5f861da003/hyeonjan.jpg"
// intraId: "hyeonjan"
// roleType: "USER"
// totalExp: 0

const fetchUserDetail = async (setUserDetail: React.Dispatch<React.SetStateAction<UserDetail | null>>) => {
  try {
    const response = await getRequest('user/detail');
    const userDetail: UserDetail = response.data;
    setUserDetail(userDetail);
    console.log("userDetail: ", userDetail);
  } catch (err) {
    console.error(err);
  }
}

const Home = () => {
  const currDate = new Date();
  const navigator = useNavigate();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [matched, setMatched] = useState<Matched[]>(() => []);
  const [questions, setQuestions] = useState<Question[]>(() => []);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [isMentoringOpen, setIsMentoringOpen] = useState(false);
  const [modalQustionId, setModalQuestionId] = useState(0);
  const onOpenQuestion = (questionId: number) => {
    setIsQuestionOpen(true);
    setModalQuestionId(questionId)
  };
  const onOpenMentoring = (questionId: number) => {
    setIsQuestionOpen(true);
    setModalQuestionId(questionId)
  };

  // 데이터 가져오기 from token => 1.유저디테일 정보 2.매칭 3.질문들
  useEffect(() => {
    void fetchUserDetail(setUserDetail);
  }, []);
  useEffect(() => {
    void fetchQuestion(1, setQuestions);
  }, [])
  useEffect(() => {
    void fetchMatched(setMatched);
  }, [])

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
          {
            matched.map((m, idx) => (
              <Row key={m.questionId}>
                {
                  m.menteeUser.userId === userDetail?.userId
                  ? <P>{m.session?.mentoUser?.intraId}님에게 {m.tags[0]?.tagName} 한수 배우기 {getIntervalDateString(new Date(m.startTime), currDate)}</P>
                  : <P>{m.menteeUser.intraId}님의 {m.tags[0]?.tagName ?? "과제"} 멘토링 {getIntervalDateString(new Date(m.startTime), currDate)}</P>
                }
                <Emoji onClick={() => navigator(`/mentee/comment/${m.questionId}`)}>⭕️</Emoji>
                <Emoji onClick={() => onOpenMentoring(m.questionId)}>❌</Emoji>
              </Row>
            ))
          }
        </HomeContainer>
        <HomeContainer>
          {
            // TODO: 필터 불필요하면 삭제
            // questions.map(question => (
            questions.filter(notMine(userDetail?.userId ?? 0)).map(question => (
              <Row key={question.questionId}>
                <QuestionBlock onClick={() => onOpenQuestion(question.questionId)}>
                  {question.menteeUser.intraId}님의 {question.tags[0]?.tagName}: 파이프 설정법을 모르겠습니다.
                  {getIntervalDateString(new Date(question.startTime), currDate)}
                </QuestionBlock>
              </Row>
            ))
          }
        </HomeContainer>
      </HomeStyle>
      {isQuestionOpen && <Modal onConfirm={() => console.log("Click confirm.")} onClose={() => setIsQuestionOpen(false)} />}
      {isMentoringOpen && <Modal onConfirm={() => console.log("Click confirm.")} onClose={() => setIsMentoringOpen(false)} />}
    </>
  );
};

export default Home;
