import { initialState } from './initialState';
import {
  GET_POSTS_SUCCESS,
  GET_POST_FAILURE,
  GET_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  UPDATE_LIKE_LIST_SUCCESS,
} from '../actions/action';
import { LikeList } from './initialState';

export const postsReducer = (
  state = initialState.posts,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS: {
      const newState = action.payload;
      return newState;
    }

    case DELETE_POST_SUCCESS: {
      const newState = state.filter((el) => el.id !== action.payload);
      return newState;
    }

    default:
      return state;
  }
};

export const postReducer = (state = initialState.post, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GET_POST_SUCCESS: {
      const newState = action.payload;
      return newState;
    }

    case GET_POST_FAILURE: {
      console.log('postReducer failure');
      const message = action.payload;
      const newState = Object.assign({}, state, {
        apiMessage: message,
      });
      return newState;
    }

    case UPDATE_LIKE_LIST_SUCCESS: {
      const { userid, like } = action.payload;
      const likeList: LikeList[] = state.like;
      let newLikeList: LikeList[] = [];
      if (like) {
        newLikeList = [...likeList, { userId: userid }];
      } else {
        newLikeList = likeList!.filter((el) => el.userId !== userid);
      }
      const newState = Object.assign({}, state, {
        like: newLikeList,
      });
      return newState;
    }

    // case DELETE_POST_SUCCESS: {
    //   const newState = Object.assign({}, state, {
    //     id: null,
    //     title: '',
    //     image: '',
    //     topcolor: '',
    //     bottomcolor: '',
    //     likeCount: 0,
    //     like: [],
    //     userId: null,
    //     user: {
    //       username: '',
    //       userimage: '',
    //     },
    //     isPublic: false,
    //   });
    //   return newState;
    // }

    default:
      return state;
  }
};

// export const likeReducer = (state = initialState.isLiked, action: { type: string }) => {
//   switch (action.type) {
//     case UPDATE_LIKE_LIST_SUCCESS: {
//       if (!state) {
//         const newState = true;
//         return newState;
//       } else {
//         const newState = false;
//         return newState;
//       }
//     }
//     default:
//       return state;
//   }
// };
