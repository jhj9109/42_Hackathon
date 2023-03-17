import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import SlotTable from '../../components/SlotTable';

const ButtonContainer = styled.div`
  width: 100%;
`;

const MenteeMentorSlotsStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`;

const Title = styled(Container)`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border: 600;
`;

const Calrendar = styled.div`
  background-color: aliceblue;
  height: 75%;
  width: 100%;
  max-height: 65vh;
  overflow: auto;
`;

const MentoringContentContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Tag = styled.p`
  width: 100%;
  text-align: start;
  font-size: 1.2rem;
`;

  /* Session[]
    Session: {
      sessionId : Integer
      startTime : Date
      endTime : Date
      tags : Tag[]
    }
    Tag: {
      tagId : Integer
      tagName : string
    }
  */
type KstDate = Date;
interface TagType {
  tagId: number;
  tagName: string;
}
interface Session {
  sessionId : number;
  startTime: string;
  endTime: string;
  tags: TagType[];
}
interface IsSelectableParams {
  rowIndex: number;
  colIndex: number;
  openSlots: Session[];
  currDate: Date;
}
interface IsClampParams {
  rowIndex: number;
  colIndex: number;
  currDate: Date;
  startTime: string;
  endTime: string;
}

const utcOffset = 9 * 60 * 60 * 1000; // UTC+9
const getKstDate = (date: Date) => new Date(date.getTime() + utcOffset)

const isClamp = ({rowIndex, colIndex, currDate, startTime, endTime}: IsClampParams) => {
  // 2023-03-17T05:30:17.828Z

  const target = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      currDate.getDate() + colIndex,
      Math.floor(rowIndex / 2),
      (rowIndex % 2) * 30
   );
  const start = new Date(startTime)
  const end = new Date(endTime)
  
  const [sTime, tTime, eTime] = [
    start.getTime() / (60 * 1000),
    target.getTime() / (60 * 1000),
    end.getTime() / (60 * 1000)
  ]
  
  return (sTime <= tTime && tTime <= eTime);
}

const isSlot = ({rowIndex, colIndex, openSlots, currDate}: IsSelectableParams) =>
  openSlots.some(session => isClamp({rowIndex, colIndex, currDate, startTime: session.startTime, endTime:session.endTime}))

const sampleOpenSlots: Session[] = [
  {sessionId: 1, startTime: "2023/03/18/09:00", endTime: "2023/03/18/12:00", tags: [{tagId: 1, tagName: "libft"}]},
  {sessionId: 2, startTime: "2023/03/18/15:00", endTime: "2023/03/18/18:00", tags: [{tagId: 2, tagName: "gnl"}]},
]

const MenteeMentorSlots = () => {
  const navigator = useNavigate();
  const currDate = new Date();
  const [openSlots, setOpenSlots] = useState<Session[]>([])

  useEffect(() => {
    setTimeout(() => setOpenSlots(sampleOpenSlots))
  })
  return (
    <MenteeMentorSlotsStyle>
      <Title>멘토링 시간 선택</Title>
      <Calrendar>
        {!openSlots ? <div>로딩중</div>
        : <SlotTable currDate={currDate} openSlots={openSlots} isSelectable={isSlot}/>}
      </Calrendar>
      <MentoringContentContainer>
        <Tag>본인의 태그 리스트 가져오기</Tag>
      </MentoringContentContainer>
      <ButtonContainer>
        <Button size="large" onClick={() => navigator('/')}>
          멘토링 시간 선택 완료
        </Button>
      </ButtonContainer>
    </MenteeMentorSlotsStyle>
  );
};

export default MenteeMentorSlots;
