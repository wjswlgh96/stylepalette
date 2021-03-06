import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import Text from '../components/Text/Text';
import { validPassword } from '../utils/validator';
import { passwordChange, handleModal } from '../redux/actions/action';
import { getUser } from '../redux/selectors';
import { UserState } from '../redux/reducers/initialState';

const PasswordWrapper = styled.div`
  width: 400px;
  background-color: white;
  border-radius: 10px;
  border: solid 1px #dbdbdb;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 320px;
  }
`;

const PasswordChangeHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
`;

const InputOuterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid #09214c;
  padding: 15px;
  margin: 15px;
`;

const Label = styled.label`
  padding: 5px;
`;

const InputWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const Input = styled.input`
  margin: 5px;
  width: 98%;
`;

const MessageWrapper = styled.div`
  color: red;
  margin: 5px;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0 10px;
`;

export default function PasswordChange() {
  const dispatch = useDispatch();
  const user: UserState = useSelector(getUser);
  const { userid } = user;
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
  const [passwordMsg, setPasswordMsg] = useState<string>('');
  const [passwordStrengthMsg, setPasswordStrengthMsg] = useState<string>('');
  const disabled =
    newPassword === '' ||
    newPasswordConfirm === '' ||
    passwordMsg !== '' ||
    passwordStrengthMsg !== '' ||
    (newPassword !== '' && newPasswordConfirm === '') ||
    (newPassword === '' && newPasswordConfirm !== '');

  const handleChangeNewPassword = (event: React.FormEvent<HTMLInputElement>) => {
    const str = event.currentTarget && event.currentTarget.value;
    setNewPassword(str);
    if (validPassword(event.currentTarget.value) || event.currentTarget.value === '') {
      setPasswordStrengthMsg('');
    } else if (event.currentTarget.value.length < 8 || event.currentTarget.value.length > 15) {
      setPasswordStrengthMsg('????????? 8??? ?????? 15??? ???????????? ?????????.');
    } else {
      setPasswordStrengthMsg('?????????, ??????, ???????????? ??????????????? ?????????.');
    }
  };

  const handleChangeNewPasswordConfirm = (event: React.FormEvent<HTMLInputElement>) => {
    const str = event.currentTarget && event.currentTarget.value;
    setNewPasswordConfirm(str);
    if (newPassword === event.currentTarget.value) {
      setPasswordMsg('');
    } else {
      setPasswordMsg('??????????????? ???????????? ????????????.');
    }
  };
  const requestPasswordChange = () => {
    const userNewPassword = {
      userid: userid,
      password: newPassword,
    };
    dispatch(passwordChange(userNewPassword));
  };

  const handleClickProfileEdit = () => {
    dispatch(handleModal({ isOpen: true, type: 'profileEdit' }));
  };

  return (
    <PasswordWrapper>
      <PasswordChangeHeader>???????????? ??????</PasswordChangeHeader>
      <InputOuterWrapper>
        <InputWrapper>
          <Label>??? ????????????</Label>
          <Input type="password" onChange={handleChangeNewPassword}></Input>
          <MessageWrapper>
            <Text size="small" color="red">
              {passwordStrengthMsg}
            </Text>
          </MessageWrapper>
          <Label>??? ???????????? ??????</Label>

          <Input type="password" onChange={handleChangeNewPasswordConfirm}></Input>
          {newPassword !== '' && newPasswordConfirm !== '' ? (
            <MessageWrapper>
              <Text size="small" color="red">
                {passwordMsg}
              </Text>
            </MessageWrapper>
          ) : (
            <MessageWrapper></MessageWrapper>
          )}
        </InputWrapper>
      </InputOuterWrapper>
      <SubmitButtonWrapper>
        <Button primary onClick={requestPasswordChange} disabled={disabled}>
          ?????? ??????
        </Button>
        <Button secondary onClick={handleClickProfileEdit}>
          ?????? ?????? ??????
        </Button>
      </SubmitButtonWrapper>
    </PasswordWrapper>
  );
}
