import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import SlotTable from '../../components/SlotTable/SlotTable';
import { isSlot, sampleOpenSlots, updateSelected } from '../../components/SlotTable/slotTableUtils';

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

const MenteeMentorSlots = () => {
  const navigator = useNavigate();
  const currDate = new Date();
  const [openSlots, setOpenSlots] = useState<Session[]>([])
  const [selected, setSelected] = useState(() => new Set<number>());
  const handleSelect = (rowIndex: number, colIndex: number) =>
    setSelected((prev) => updateSelected(prev, rowIndex + colIndex * 48))

  useEffect(() => {
    setTimeout(() => setOpenSlots(sampleOpenSlots))
  })
  return (
    <MenteeMentorSlotsStyle>
      <Title>멘토링 시간 선택</Title>
      <Calrendar>
        {!openSlots ? <div>로딩중</div>
          : <SlotTable
              currDate={currDate}
              openSlots={openSlots}
              isSelectable={isSlot}
              selected={selected}
              onSelect={handleSelect}
            />}
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
