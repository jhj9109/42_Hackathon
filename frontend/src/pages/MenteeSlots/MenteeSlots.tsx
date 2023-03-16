import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './MenteeSlots.css';

const MenteeSlots = () => {
  const navigate = useNavigate();
  return (
    <Stack className="MenteeSlots">
      <div className="MenteeSlots-Calendar">달력입니다</div>
      <div className="MenteeSlots-Tags"></div>
      <div className="MenteeSlots-Button-Container">
        <Button
          className="MenteeSlots-Button"
          onClick={() => {
            navigate('/mentee/slots/mentoring');
          }}
        >
          멘토링 요청 슬롯 선택 완료
        </Button>
      </div>
    </Stack>
  );
};

export default MenteeSlots;
