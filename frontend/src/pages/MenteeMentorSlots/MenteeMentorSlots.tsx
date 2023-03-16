import React from 'react';
import { useNavigate } from 'react-router-dom';
import SlotTable from '../../components/SlotTable';
import './MenteeMentorSlots.css';

const MenteeMentorSlots = () => {
  const navigator = useNavigate();

  return (
    <>
      {/* <div className="MenteeMentorSlots-Calendar">달력입니다</div> */}
      <div className="MenteeMentorSlots-Calendar">
        <SlotTable />
      </div>
      <div className="MenteeMentorSlots-Tags">
        <div>과제 : minirt 작성자 : hyeonjan</div>
      </div>
      <div className="MenteeMentorSlots-Button-Container">
      <button
        className="MenteeMentorSlots-Button"
        onClick={() => navigator('/mentee/mentors/1/mentoring')}
      >
        멘토링 시간 선택 완료
      </button>
      </div>
    </>
  );
};

export default MenteeMentorSlots;
