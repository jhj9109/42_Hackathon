import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenteeSlots.css';

const MenteeSlots = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="MenteeSlots-Calendar">달력입니다</div>
      <div className="MenteeSlots-Tags"></div>
      <div className="MenteeSlots-Button-Container">
        {/* <Button
          className="MenteeSlots-Button"
          onClick={() => {
            navigate('/mentee/slots/mentoring');
          }}
        >
          멘토링 요청 슬롯 선택 완료
        </Button> */}
      </div>
    </>
  );
};

export default MenteeSlots;
