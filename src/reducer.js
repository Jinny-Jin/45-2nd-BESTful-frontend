const initialState = {
  followOrFollowing: '팔로워',
  userCategoryNumber: 0,
  myPageCategoryNumber: 0,
  feedOrLike: '피드',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH':
      return { ...state, followOrFollowing: action.userFollowOrFollowing };
    case 'CHOOSE_USER_CATEGORY':
      return { ...state, userCategoryNumber: action.catNumb };
    case 'CHOOSE_MYPAGE_CATEGORY':
      return {
        ...state,
        myPageCategoryNumber: action.myCatNumb,
        feedOrLike: action.feedOrLike !== null && action.feedOrLike,
      };
    default:
      return state;
  }
};

export default reducer;
