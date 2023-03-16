import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenteeMentors.css';

const MenteeMentors = () => {
  const navigator = useNavigate();

  return (
    <>
      <div className="MenteeMentors-Content-Container">
        <div className="MenteeMentors-Title">멘토 리스트</div>
        <div className="MenteeMentors-Contents">
          <button
            className="MenteeMentors-Content"
            onClick={() => navigator('/mentee/mentors/1/slots')}
          >
            <p>hyeonjan</p>
            <p>libft, minishell</p>
          </button>
          <button className="MenteeMentors-Content">
            <p>hyeonjan</p>
            <p>libft, minishell</p>
          </button>
        </div>
      </div>
      <div className="MenteeMentors-Button-Container">
        {/* <Button
          className="MenteeMentors-Button"
          onClick={() => navigator('/mentee/slots')}
        >
          멘토링 요청 슬롯 열기
        </Button> */}
      </div>
    </>
  );
};

export default MenteeMentors;
