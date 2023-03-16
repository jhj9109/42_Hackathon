import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './MentorSlots.css';

const MentorSlots = () => {
  const navigator = useNavigate();

  return (
    <Stack className="MentorSlots">
      <div className="MentorSlots-Calendar">달력입니다</div>
      <div className="MentorSlots-Tags">
        <div>
          <input id="libft" type="checkbox" />
          <label htmlFor="libft">libft</label>
        </div>
        <div>
          <input id="GNL" type="checkbox" />
          <label htmlFor="GNL">GNL</label>
        </div>
      </div>
      <div className="MentorSlots-Button-Container">
        <Button className="MentorSlots-Button" onClick={() => navigator('/')}>
          멘토링 과제 선택 완료
        </Button>
      </div>
    </Stack>
  );
};

export default MentorSlots;
