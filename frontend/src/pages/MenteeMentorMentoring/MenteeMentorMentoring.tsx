import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import './MenteeMentorMentoring.css';

const MenteeMentorMentoring = () => {
  return (
    <Stack gap={2} className="MenteeMentorMentoring">
      <div className="MenteeMentorMentoring-Content-Group">
        <div className="MenteeMentorMentoring-Content">과제 : MiniRT</div>
        <div className="MenteeMentorMentoring-Content">멘토 : hyeonjan</div>
        <div className="MenteeMentorMentoring-Content">제목 : </div>
        <div className="MenteeMentorMentoring-Content">장소 </div>
        <div className="MenteeMentorMentoring-Textarea">
          질문을 작성해 주세요
        </div>
      </div>
      <div className="MenteeMentorMentoring-Button-Container">
        <Button className="MenteeMentorMentoring-Button">
          멘토링 신청하기
        </Button>
      </div>
    </Stack>
  );
};

export default MenteeMentorMentoring;
