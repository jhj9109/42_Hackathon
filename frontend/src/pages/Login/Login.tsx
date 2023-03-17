import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import FlexBox from '../../components/FlexBox/FlexBox';

const Div = styled.div`
  background-color: #fafafa;
  color: #292d39;
  height: 45%;
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
      width="98%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      gap="1vh"
    >
      <Div>42in</Div>
      <Button size="large" onClick={() => navigator('/')}>
        로그인
      </Button>
    </FlexBox>
  );
};

export default Login;
