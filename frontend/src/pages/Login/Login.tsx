import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigator = useNavigate();

  return (
    <Stack gap={3} className="Login">
      <div className="Login-Logo">42in</div>
      <Button size="lg" className="Login-Button" onClick={() => navigator('/')}>
        로그인
      </Button>
    </Stack>
  );
};

export default Login;
