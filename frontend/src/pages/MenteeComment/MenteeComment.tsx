import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './MenteeComment.css';

const MenteeComment = () => {
  const navigator = useNavigate();

  return (
    <Stack gap={2} className="MenteeComment">
      <div className="MenteeComment-Content-Group">
        <div className="MenteeComment-Content">멘토링 후기 남기기</div>
        <div className="MenteeComment-Content">과제 : MiniRT</div>
        <div className="MenteeComment-Content">멘토 : hyeonjan</div>
        <div className="MenteeComment-Content">후기 작성</div>
        <div className="MenteeComment-Textarea">후기를 작성해 주세요</div>
      </div>
      <div className="MenteeComment-Button-Container">
        <Button className="MenteeComment-Button" onClick={() => navigator('/')}>
          후기 작성 완료
        </Button>
      </div>
    </Stack>
  );
};

export default MenteeComment;
