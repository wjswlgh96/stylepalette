import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import axios from 'axios';
import { serverUrl } from '../utils/constants';

import { getUserPickColor, getMainResultImage, getUser } from '../redux/selectors';
import { UserPickColor, MainResultImage } from '../redux/reducers/initialState';
import { getUserInfo, getAllPosts, handleModal } from '../redux/actions/action';

const PostWrapper = styled.div`
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

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 15px;
  margin: 15px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const InputWrapper = styled.div`
  padding: 10px 0;
`;

const PostImage = styled.img`
  width: 300px;
  height: 300px;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const PostInput = styled.input`
  width: 300px;
  height: 36px;
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;
  border-color: #dbdbdb;
  padding: 10px;
  margin: 3px;
  background-color: #fafafa;
  text-align: center;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px #a8a8a8;
    background-color: #fafafa;
  }

  @media (max-width: 768px) {
    width: 280px;
  }
`;

function PostSharing() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const userPickColor: UserPickColor = useSelector(getUserPickColor);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [mainResultBlob, setMainResultBlob] = useState<any>(null);

  const [postTitle, setPostTitle] = useState<string>('');

  useEffect(() => {
    // get user info
    dispatch(getUserInfo({ userid: user.userid }));
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const imgSrc = localStorage.getItem('imgLocation');

    setImageSrc(imgSrc);
    handleSetMainResultBlob(imgSrc);
  }, []);

  const handleSetMainResultBlob = async (imgSrc: any) => {
    const imageBlob = await fetch(imgSrc).then((res) => {
      return res.blob();
    });

    setMainResultBlob(imageBlob);
  };

  function handleChangePostName(e: React.FormEvent<HTMLInputElement>) {
    setPostTitle(e.currentTarget.value);
  }

  const requestSignup = async (isPublic: boolean) => {
    const newPost = {
      isPublic,
      title: postTitle,
      userId: user.userid,
      topcolor: userPickColor.topcolor,
      bottomcolor: userPickColor.bottomcolor,
    };

    const postId = await axios
      .post(`${serverUrl}/post`, newPost, {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data;
        return data;
      })
      .catch((res) => {
        console.log(res.data);
      });

    let formData = new FormData();
    formData.append('result', mainResultBlob, `${postId.postid}.png`);

    await axios
      .post(`${serverUrl}/post/${postId.postid}/result`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res.data);
      });

    await dispatch(getAllPosts());

    alert('????????? ?????? ??????!');
    dispatch(handleModal({ isOpen: false, type: 'postSharing' }));
  };

  return (
    <PostWrapper>
      {/* <PostHeader>????????? ??????</PostHeader> */}
      <PostContainer>
        <InputWrapper>
          <PostInput
            type="text"
            name="????????? ??????"
            placeholder="????????? ????????? ??????????????????"
            autoComplete="off"
            value={postTitle}
            onChange={handleChangePostName}
          ></PostInput>
        </InputWrapper>
        <InputWrapper>
          <PostImage src={imageSrc} />
        </InputWrapper>
      </PostContainer>
      <PostFooter>
        <Button primary onClick={() => requestSignup(true)}>
          ????????????
        </Button>
        <Button primary onClick={() => requestSignup(false)}>
          ????????????
        </Button>
      </PostFooter>
    </PostWrapper>
  );
}

export default PostSharing;
