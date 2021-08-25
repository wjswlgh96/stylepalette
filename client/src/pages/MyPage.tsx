import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { handleModal, getUserInfo, getPost } from '../redux/actions/action';

import { PrimaryButton } from '../components/Button/Button.styled';
import { getUser } from '../redux/selectors';

const MyPageWrapper = styled.div`
  width: 100vw;
  display: flex;
  background-color: white;
  flex-direction: column;
  left: 0;
  top: 0;
`;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin: 15px;
  @media (max-width: 768px) {
    padding: 0px;
    margin: 0px;
  }
`;

const MyPageFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const UserInfoContainer = styled.div`
  display: flex;
  padding: 15px;
  margin: 0 15px 20px 15px;
  width: 70%;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.8);
  border: 2px groove black;
  border-width: 0 0 2px 0;
  border-radius: 5px;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0px;
    margin: 2px;
    width: 98%;
    justify-content: center;
  }
`;

const UserPhotoWrapper = styled.div`
  /* width: 355px;
  height: 355px; */
  padding: 10px 20px 10px 45px;

  @media (max-width: 768px) {
    padding: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 200px;
  }
`;

const UserInfoWrapper = styled.div`
  display: flex;
  /* height: 355px; */
  flex-direction: column;
  align-items: center;
  /* padding: 40px 50px; */
  @media (max-width: 768px) {
    height: auto;
  }
`;

const UserPostOuterWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 70%;
  /* text-align: left; */
  /* padding: 15px; */
  margin: 15px auto;
  box-shadow: 0 1px 5px 3px black;
  border-radius: 5px;
  @media (max-width: 768px) {
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin: 5px;
    width: 98%;
  }
`;

const NavIcon = styled.button`
  margin: 20px 12px 40px 12px;
  width: 300px;
  height: 300px;
  background-color: white;
  border-style: none;

  @media (max-width: 768px) {
    margin: 10px;
  }
`;

const PostPhoto = styled.img`
  border: 2px solid #777777;
  border-radius: 5px;
  width: 295px;
  height: 295px;
  object-fit: cover;

  &:hover {
    opacity: 80%;
    border-color: #ababab;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    /* width: 270px;
    height: 270px; */
  }
`;

const UserPhoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid black;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const UserInfoContent = styled.span`
  padding: 10px;
  font-size: 34px;

  @media (max-width: 768px) {
    font-size: 25px;
    display: inline-block;
    padding: 10px 0;
    max-width: 120px;
    word-wrap: break-word;
  }
`;

const UserEditButton = styled(PrimaryButton)`
  width: 175px;
  height: 60px;

  @media (max-width: 768px) {
    width: 85px;
    height: 45px;
  }
`;

function MyPage() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    // get user info
    dispatch(getUserInfo({ userid: user.userid }));
  }, [dispatch, user.userid]);

  const handleClickPostInfo = (postid: number | null) => {
    dispatch(handleModal({ isOpen: true, type: 'postInfo', data: postid }));
  };

  const handleClickProfileEditButton = () => {
    dispatch(handleModal({ isOpen: true, type: 'passwordCheck' }));
  };

  return (
    <MyPageWrapper>
      <MyPageContainer>
        <UserInfoContainer>
          <UserPhotoWrapper>
            <UserPhoto src={user.userimage} />
          </UserPhotoWrapper>
          <UserInfoWrapper>
            <UserInfoContent>{user.username}</UserInfoContent>
            <UserEditButton onClick={handleClickProfileEditButton}>정보 수정</UserEditButton>
          </UserInfoWrapper>
        </UserInfoContainer>
        <UserPostOuterWrapper>
          {user.post
            .map((el: any, idx: React.Key | null | undefined) => {
              return (
                <NavIcon key={idx} onClick={() => handleClickPostInfo(el.id)}>
                  <PostPhoto src={el.image} />
                </NavIcon>
              );
            })
            .reverse()}
        </UserPostOuterWrapper>
      </MyPageContainer>
      <MyPageFooter></MyPageFooter>
    </MyPageWrapper>
  );
}

export default MyPage;
