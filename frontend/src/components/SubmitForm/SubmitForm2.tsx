import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../Container/Container';
import { getRequest } from '../../api/axios';

interface Props {
  onSubmit?: () => void;
  type?: 'comment' | 'mentoring';
  mentor?: "";
}

const SubmitFormStyle = styled.div``;
const FormContainer = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`;
const Title = styled(Container)`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border: 600;
`;
const Subject = styled(Container)`
  height: 5%;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;
const Input = styled(Container)`
  height: 5%;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;
const Location = styled(Container)`
  height: 5%;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;
const InputTitle = styled(Container)`
  height: 5%;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;
const InputContent = styled(Container)`
  padding: 0.5rem;
`;
const ButtonContainer = styled.div`
  width: 100%;
`;

const urlRegexr = {
  comment: /^\/mentee\/comment\/([0-9]{1,})$/,
}

// interface FormInputData {
//   title: string;
//   tag: Tag;
//   mento: User;
//   location: string;
//   content: string;
// }

const BlockDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
  background-color: #fafafa;
`

interface InputContainerProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}
const labelName = (name: string) => {
  if (name === "title") {
    return "제목";
  } else if (name === "mento") {
    return "멘토";
  } else if (name === "")
  return ""
}
const InputContainer = ({name, value, onChange, disabled}: InputContainerProps) => {
  return (
    <BlockDiv>
      <label htmlFor={name}>{labelName(name)}</label>
      <div>
        <input id={name} name={name} value={value} onChange={onChange} disabled={disabled}></input>
      </div>
    </BlockDiv>
  )
}

interface FormInputData {
  title: { value: string, editable: boolean };
  tag: { value: Tag | null, editable: boolean };
  mento: { value: User | null, editable: boolean };
  location: { value: string, editable: boolean };
  content: { value: string, editable: boolean };
}

const getInitialObject = (): FormInputData => ({
  title: { value: "", editable: false },
  tag: { value: null, editable: false },
  mento: { value: null, editable: false },
  location: { value: "", editable: false },
  content: { value: "", editable: false },
})

// const updateInputData = (newObj: FormInputData) => {
//   (prev: FormInputData) => {

//     return {
//       ...prev, 
//     }
//   }
// }

const SubmitForm2 = ({ onSubmit, type, mentor }: Props) => {
  const navigator = useNavigate();
  const location = useLocation();
  
  const [question, setQuestion] = useState<Question | null>(null);
  const [inputData, setInputData] = useState(() => getInitialObject());
  const buttonText = type === 'mentoring' ? '멘토링 신청' : '후기 작성 완료';

  const [submitAbled, setSubmitAbled] = useState(false);

  const calSubmitAbled = () => true;
  
  // title : String
  // content : String
  // startTime : Date
  // endTime : Date
  // tag : Tag

  useEffect(() => {
    const urlPath = location.pathname;
    const result = urlRegexr.comment.exec(urlPath);
    if (result) {
      const questionId = result[1];
      getRequest(`question/${questionId}`)
        .then(res => {
          const data: Question = res.data;
          setQuestion(data);
        })
    }
  }, [])

  useEffect(() => {
    if (question === null) {
      return;
    }
    const urlPath = location.pathname;
    const result = urlRegexr.comment.exec(urlPath);
    if (result) {
      setInputData({
        title: { value: "", editable: true },
        tag: { value: question.tags[0], editable: false },
        mento: { value: question.menteeUser, editable: false },
        location: { value: "", editable: false },
        content: { value: "", editable: true },
      })
    }
  }, [question])

  // TODO: 의존성 필요
  useEffect(() => {
    // /mentee/mentors/3/mentoring?startTime=2023-03-20T16:00:00.000Z&endTime=2023-03-20T16:30:00.000Z
    // 1. 3:sessionId
    
    setSubmitAbled(calSubmitAbled());
  }, [])
  return (
    <>
      <FormContainer>
        <InputContainer name={"title"} value={inputData.title.value} onChange={() => console.log("change")} disabled={inputData.title.editable}/>
        <InputContainer name={"tag"} value={inputData.tag.value?.tagName ?? ""} onChange={() => console.log("change")} disabled={inputData.tag.editable}/>


        {/* <input name="title" value={inputData.title.value} placeholder={"제목"} onChange={handleInputChange}></input>
        <div style={{display: "flex", alignItems: "center"}}>
          <label htmlFor="mento">멘토: </label>
          <input type="text" id="mento" name="mento"/>
        </div> */}
        {/* <input name="mento" value={inputData.mento?.value?.intraId} onChange={handleInputChange}></input>
        <input disabled name="mento" value={inputData.mento?.value?.intraId ?? "123"} onChange={handleInputChange}></input>
        <input name="tag" value={inputData.tag.value?.tagName} onChange={handleInputChange}></input>
        <input name="tag" value={inputData.tag.value?.tagName} onChange={handleInputChange}></input> */}
        {/* <Title name={"title"} onChange={}></Title> */}
        
        
        
        {/* <Subject>과제</Subject>
        <Input>멘토</Input>
        {type === 'mentoring' && (
          <>
            <Location>장소</Location>
            <InputTitle>입력 제목</InputTitle>
          </>
        )} */}


        <InputContent height={type === 'mentoring' ? '65%' : '75%'}>
          입력 내용
        </InputContent>
      </FormContainer>
      <ButtonContainer>
        <Button size="large" disabled={!submitAbled} onClick={onSubmit}>
          {buttonText}
        </Button>
      </ButtonContainer>
    </>
  );
};

export default SubmitForm2;
