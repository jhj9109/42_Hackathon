import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MENTEE_SLOTS_NEXT_STEP_URL, USER_SESSION_POST_PATH } from '../../api/uri';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import SlotTable from '../../components/SlotTable/SlotTable';
import { isContinuousSlot, isSlot, notSlot, sampleOpenSlots, setToArr, sortedSlotToTime, updateSelected } from '../../components/SlotTable/slotTableUtils';

const ButtonContainer = styled.div`
  width: 100%;
`;

const MenteeSlotsStyle = styled.div`
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
  height: 85%;
  width: 100%;
  max-height: 70vh;
  overflow: auto;
`;

const MenteeSlots = () => {
  const navigator = useNavigate();
  const currDate = new Date();
  const [loading, setLoading] = useState(true);

  // TODO
  // axios 요청을 통해? 가져와야할 정보
  const [openSlots, setOpenSlots] = useState<Session[] | null>(null)
  
  const [selected, setSelected] = useState(() => new Set<number>());
  const [submitAbled, setSubmitAbled] = useState(false);
  
  const handleSelect = (rowIndex: number, colIndex: number) =>
    setSelected((prev) => updateSelected(prev, rowIndex + colIndex * 48))

  const calSubmitAbled = (selected: Set<number>) => selected.size !== 0
  
  const calIsLoading = (openSlots: Session[] | null) => openSlots === null;
  
  const slotCompareFn = (el: number, i: number, arr: number[]) =>
    i === 0 || arr[i - 1] + 1 === el;
  
  const onSubmit = () => {
    if (!(calSubmitAbled(selected))) {
      alert("올바르지 못한 시도입니다.");
      return;
    }
    const sortedSlot = setToArr(selected).sort((a, b) => a -b);
    if (!isContinuousSlot(sortedSlot, slotCompareFn)) {
      alert("연속된 슬롯만 가능합니다.");
      return;
    }
    const [startTime, endTime] = sortedSlotToTime(sortedSlot, currDate);
    navigator(MENTEE_SLOTS_NEXT_STEP_URL + "?startTime=" + startTime + "&endTime=" + endTime);
  }

  useEffect(() => {
    // TODO: axios 요청
    setTimeout(() => setOpenSlots(sampleOpenSlots), 500);
  }, [])

  useEffect(() => {
    setSubmitAbled(calSubmitAbled(selected));
  }, [selected])

  useEffect(() => {
    setLoading(calIsLoading(openSlots))
  }, [openSlots])
  
  return (
    <MenteeSlotsStyle>
      <Title>멘토링 시간 선택</Title>
      <Calrendar>
        {!openSlots ? <div>로딩중</div>
          : <SlotTable
              currDate={currDate}
              openSlots={openSlots}
              isSelectable={notSlot}
              selected={selected}
              onSelect={handleSelect}
            />
        }
      </Calrendar>
      <ButtonContainer>
      <Button size="large" disabled={!submitAbled} onClick={() => onSubmit()}>
        {/* <Button
          size="large"
          onClick={() => navigator('/mentee/slots/mentoring')}
        > */}
          멘토링 시간 선택 완료
        </Button>
      </ButtonContainer>
    </MenteeSlotsStyle>
  );
};

export default MenteeSlots;
