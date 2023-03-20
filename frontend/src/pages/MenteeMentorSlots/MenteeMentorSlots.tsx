import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRequest } from '../../api/axios';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import SlotTable from '../../components/SlotTable/SlotTable';
import { isClamp, isContinuousSlot, isSlot, setToArr, sortedSlotToTime, updateSelected } from '../../components/SlotTable/slotTableUtils';
import { sampleOpenSlots } from '../../sampleDatas/slotData';

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

const Time = styled.p`
  width: 100%;
  text-align: start;
  font-size: 1.2rem;
`;


const MenteeMentorSlots = () => {
  const navigator = useNavigate();
  const location = useLocation();
  // TODO
  const currDate = new Date();
  const [openSlots, setOpenSlots] = useState<Session[] | null>(null)
  const [selected, setSelected] = useState(() => new Set<number>());
  const [mentoId, setMentoId] = useState(0);
  // const handleSelect = (rowIndex: number, colIndex: number) =>
  //   setSelected((prev) => updateSelected(prev, rowIndex + colIndex * 48))

  // TODO: 임시로 하나만.
  const handleSelect = (rowIndex: number, colIndex: number) =>
    setSelected(prev => new Set([rowIndex + colIndex * 48]))
  
  const slotCompareFn = (el: number, i: number, arr: number[]) =>
    i === 0 || arr[i - 1] + 1 === el

  // POST /user/question/{sessionId}

  const onSubmit = () => {
    const sortedSlot = setToArr(selected).sort((a, b) => a -b);
    if (!isContinuousSlot(sortedSlot, slotCompareFn)) {
      alert("연속된 슬롯만 가능합니다.");
      return;
    }
    
    console.log("비교대상", openSlots)
    console.log("타겟", sortedSlot)
    const session = openSlots?.find(({startTime, endTime}) => {
      const [startDate, endDate] = [startTime, endTime].map(t => new Date(t));
      const [t0, t1] = [
        sortedSlot[0],
        sortedSlot[sortedSlot.length - 1]
      ].map(i => new Date(currDate.getFullYear(),
                          currDate.getMonth(),
                          currDate.getDate(),
                          0,
                          currDate.getMinutes() - 1 + (i * 30)));
      
      console.log(startDate.toISOString(), "<<<<", t0.toISOString(), t1.toISOString(), "<<<<", endDate.toISOString());
      return startDate <= t0 && t0 < endDate && startDate <= t0 && t1 < endDate;
    })
    // const session = openSlots?.find(({startTime, endTime}) =>
    //   sortedSlot.every(i =>
    //     isClamp({
    //       rowIndex: Math.floor(i / 48),
    //       colIndex: i % 48,
    //       currDate,
    //       startTime,
    //       endTime})));
    // console.log("s: ", session)
    if (!session) {
      // TODO: 경계만 문제발생.
      alert("하나의 세션만 동시에 신청가능합니다.");
      return ;
    }
    const [startTime, endTime] = sortedSlotToTime(sortedSlot, currDate);
    // To => /mentee/mentors/${session}/mentoring
    navigator(
      `/mentee/mentors/${session.sessionId}/mentoring`
      + "?startTime=" + startTime
      + "&endTime=" + endTime
      + "&tag=" + session.tags[0]
      + "&sessionId=" + session.sessionId
    );
    
    // postRequest(USER_SESSION_PATH, data)
    //   .then(res => {
    //     console.log(res.data);
    //     alert("멘토링 슬롯 등록에 성공하였습니다.");
    //     navigator("/");
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     alert("멘토링 슬롯 등록에 실패하였습니다.");
    //   })
  }

  useEffect(() => {
    // /mentee/mentors/${userId}/slots`;
    console.log("123j12h312jh312liu3h12u31l")
    const result = /\/mentee\/mentors\/([0-9]{1,})\/slots/.exec(location.pathname);
    console.log(location.pathname)
    console.log(result)
    if (result) { 
      const mentoId = result[1];
      setMentoId(Number(mentoId));
      getRequest(`session/${mentoId}`)
        .then(res => {
          console.log("멘토님의 세션: ",res.data);
          setOpenSlots(res.data as Session[])
        })
        .catch(err => console.error(err))
    }
  }, [])
  
  return (
    <MenteeMentorSlotsStyle>
      <Title>멘토링 시간 선택2</Title>
      <Calrendar>
        {!openSlots ? <div>로딩중</div>
          : <SlotTable
              currDate={currDate}
              openSlots={openSlots}
              isSelectable={isSlot}
              selected={selected}
              onSelect={handleSelect}
            />
        }
      </Calrendar>
      <MentoringContentContainer>
        <Tag>멘토링하는 사람의 태그 보여주기</Tag>
        <Time>시작시간 : 09:00</Time>
        <Time>종료시간 : 09:30</Time>
      </MentoringContentContainer>
      <ButtonContainer>
        <Button
          size="large"
          onClick={() => onSubmit()}
          // onClick={() => navigator('/mentee/mentors/1/mentoring')}
        >
          멘토링 시간 선택 완료
        </Button>
      </ButtonContainer>
    </MenteeMentorSlotsStyle>
  );
};

export default MenteeMentorSlots;
