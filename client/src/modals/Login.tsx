import React from 'react';
import { useState } from 'react';
import Button from '../components/Button/Button';
import styled from 'styled-components';
import axios from 'axios';
import { serverUrl } from '../utils/constants';
import Modal from './Modal';

const LoginWrapper = styled.div`
  width: 400px;
  background-color: white;
  border: solid 1px #dbdbdb;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LoginHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid palevioletred;
  padding: 15px;
  margin: 15px;
`;

const InputWrapper = styled.div`
  padding: 10px 0;
`;

const Label = styled.label`
  padding-right: 5px;
`;

const SocialButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const LoginFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = (event: React.FormEvent<HTMLInputElement>) => {
    const str = event.currentTarget && event.currentTarget.value;
    setUsername(str);
  };

  const handleChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    const str = event.currentTarget && event.currentTarget.value;
    setPassword(str);
  };

  const requestSignin = async () => {
    const result = await axios.post(`${serverUrl}/signin`, {
      username: username,
      password: password,
    });
    console.log(result);
  };

  return (
    <Modal>
      <LoginWrapper>
        <CloseButton>
          <Button close>X</Button>
        </CloseButton>
        <LoginHeader>로그인</LoginHeader>
        <LoginContainer>
          <InputWrapper>
            <Label>유저네임</Label>
            <input type="text" value={username} onChange={handleChangeUsername}></input>
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호</Label>
            <input type="password" value={password} onChange={handleChangePassword}></input>
          </InputWrapper>
          <SocialButtonContainer>
            <Button primary onClick={requestSignin}>
              로그인
            </Button>
            <Button>카카오로그인</Button>
            <Button>구글로그인</Button>
          </SocialButtonContainer>
        </LoginContainer>
        <LoginFooter>
          <span>아직 회원이 아니신가요?</span>
          <Button primary>회원가입</Button>
        </LoginFooter>
      </LoginWrapper>
    </Modal>
  );
}
