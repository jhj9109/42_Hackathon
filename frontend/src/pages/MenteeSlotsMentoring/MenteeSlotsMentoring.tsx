import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MENTEE_SLOTS_FIRST_STEP_URL } from '../../api/uri';
import SubmitForm from '../../components/SubmitForm/SubmitForm';
import './MenteeSlotsMentoring.css';

const isInvalidTime = (time: string | null) =>
  time === null || isNaN(new Date(time).getTime());

const isInvalidTimes = (startTime: string | null, endTime: string | null) => 
  [startTime, endTime].some(isInvalidTime);

interface Data {
  title : string;
  content : string;
  startTime : string;
  endTime : string;
  tag : Tag[];
}
const setData = (startTime: string, endTime: string): Data => ({
  title: "타이틀",
  content: "내용",
  startTime,
  endTime,
  tag: [{tagId: 0, tagName: "Libft"}],
})

const MenteeSlotsMentoring = () => {
  const navigator = useNavigate();
  const location = useLocation();

  // 쿼리스트링에 저 두가지 정보가 있어야 한다
  const queryParams = new URLSearchParams(location.search)
  const [startTime, endTime] = ["startTime", "endTime"].map(key => queryParams.get(key));

  const onSubmit = () => {
    const data = setData(startTime as string, endTime as string);
    console.log(data)
  }
  
  useEffect(() => {
    // 두가지 time이 올바르지 않으면 이전 페이지로 팅궈내기
    if (isInvalidTimes(startTime, endTime)) {
      navigator(MENTEE_SLOTS_FIRST_STEP_URL, {replace: true});
    }
  });
  
  return (
    <
      SubmitForm
      type="mentoring"
      // mentor={}
      onSubmit={onSubmit}
    />
  );
};

export default MenteeSlotsMentoring;
