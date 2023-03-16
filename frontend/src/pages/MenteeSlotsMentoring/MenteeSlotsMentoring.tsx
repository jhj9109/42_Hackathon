import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenteeSlotsMentoring.css';

const MenteeSlotsMentoring = () => {
  const navigator = useNavigate();
  return (
    <>
      <div className="MenteeSlotsMentoring-Content-Group">
        <div className="MenteeSlotsMentoring-Content">과제 : MiniRT</div>
        <div className="MenteeSlotsMentoring-Content">멘토 : hyeonjan</div>
        <div className="MenteeSlotsMentoring-Content">제목 : </div>
        <div className="MenteeSlotsMentoring-Content">장소 </div>
        <div className="MenteeSlotsMentoring-Textarea">
          질문을 작성해 주세요
        </div>
      </div>
      <div className="MenteeSlotsMentoring-Button-Container">
        {/* <Button
          className="MenteeSlotsMentoring-Button"
          onClick={() => navigator('/')}
        >
          멘토링 신청하기
        </Button> */}
      </div>
    </>
  );
};

export default MenteeSlotsMentoring;
