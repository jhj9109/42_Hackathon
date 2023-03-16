import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import FlexBox from '../../components/FlexBox/FlexBox';

const Div = styled.div`
  background-color: #d6d6d6;
  color: white;
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 7rem;
  border-radius: 0.5rem;
`;

const Login = () => {
  const navigator = useNavigate();

  return (
    <FlexBox
      flexDirection="column"
      width="80%"
      height="80%"
      justifyContent="space-around"
      alignItems="center"
    >
      <Div>42in</Div>
      <Button size="middle" onClick={() => navigator('/')}>
        로그인
      </Button>
    </FlexBox>
  );
};

export default Login;
