import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRequest } from '../../api/axios';
import { USER_MENTORING_LOG_PATH } from '../../api/uri';
import Container from '../../components/Container/Container';
import { getShortDate } from '../../utils/dateUtils';

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


// USER_MENTORING_LOG_PATH
const extractLogs = (logs: MentoringLogs[]) => {
  // noSessionQuestionDtos
  const dtos = logs.flatMap(log => log.noSessionQuestionDtos);
  const filteredDto = dtos.filter(log => !!(log.comments?.length));
  const comments = filteredDto.flatMap(dto => dto.comments as Comment[])
  console.log(comments);
  return comments;
}
const MentoringLog = () => {
  const [dtos, setDtos] = useState<NoSessionQeustionDto[]>(() => []);

  useEffect(() => {
    getRequest(USER_MENTORING_LOG_PATH)
      .then(res => {
        const data: MentoringLogs[] = res.data;
        console.log("data", data);
        const dtoList = data.flatMap(d => d.noSessionQuestionDtos)
                            .flat()
                            // .filter(dto => !!dto.comments?.length);
        console.log("dtoList", dtoList);
        setDtos(dtoList);
      })
  }, [])
  
  return (
    <MentoringLogStyle>
      <Title>멘토링 로그</Title>
      <Logs>
        {
          dtos?.map((dto, idx) => (
            <>
              { idx !== 0 && <hr style={{borderTop: "3px solid $bbb"}}></hr> }
              <Log style={{marginBottom: "1rem"}}>{dto.menteeUser.intraId}님의 {dto.tags[0]?.tagName ?? "과제"} {getShortDate(dto.startTime)}</Log>
              <Log>{dto.title} {dto.content}</Log>
              {
                <>
                  {dto.comments?.map((comment, i) =>
                    (<Log key={i}>{comment.content}</Log>))}
                </>
              }
            </>
          ))
        }
      </Logs>
    </MentoringLogStyle>
  );
};

export default MentoringLog;
