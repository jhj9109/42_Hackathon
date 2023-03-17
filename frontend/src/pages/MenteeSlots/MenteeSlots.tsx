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

  // TODO
  const currDate = new Date();
  const [openSlots, setOpenSlots] = useState<Session[]>([])
  const [selected, setSelected] = useState(() => new Set<number>());
  const handleSelect = (rowIndex: number, colIndex: number) =>
    setSelected((prev) => updateSelected(prev, rowIndex + colIndex * 48))

  useEffect(() => {
    setTimeout(() => setOpenSlots(sampleOpenSlots))
  })
  
  return (
    <MenteeSlotsStyle>
      <Title>멘토링 시간 선택</Title>
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
      <ButtonContainer>
        <Button
          size="large"
          onClick={() => navigator('/mentee/slots/mentoring')}
        >
          멘토링 시간 선택 완료
        </Button>
      </ButtonContainer>
    </MenteeSlotsStyle>
  );
};

export default MenteeSlots;
