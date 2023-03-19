import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import Container from '../Container/Container';

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

const SubmitForm = ({ onSubmit, type, mentor }: Props) => {
  const navigator = useNavigate();
  const buttonText = type === 'mentoring' ? '멘토링 신청' : '후기 작성 완료';

  const [submitAbled, setSubmitAbled] = useState(false);

  const calSubmitAbled = () => true;

  useEffect(() => {
    setSubmitAbled(calSubmitAbled());
  }, [])

  return (
    <>
      <FormContainer>
        <Title>제목</Title>
        <Subject>과제</Subject>
        <Input>멘토</Input>
        {type === 'mentoring' && (
          <>
            <Location>장소</Location>
            <InputTitle>입력 제목</InputTitle>
          </>
        )}
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

export default SubmitForm;
