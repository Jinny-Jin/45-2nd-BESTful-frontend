import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Mypage from './pages/Mypage/Mypage';
import PostUpload from './pages/PostUpload/PostUpload';
import Contents from './pages/Contents/Contents';
import Users from './pages/Users/Users';
import Nav from './components/Nav/Nav';
import Container from './components/Container/Container';
import InvalidAccess from './pages/Contents/InvalidAccess';
import InfiniteFollowing from './pages/Following/InfiniteFollowing';
import InfiniteMain from './pages/Main/InfiniteMain';
import InfiniteBest from './pages/Best/InfiniteBest';
import { Provider } from 'react-redux';
import store from './store';

const Router = () => {
  const location = useLocation();

  const renderNav = () => {
    if (location.pathname !== '/login') {
      return <Nav />;
    }
  };

  return (
    <Provider store={store}>
      {renderNav()}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Container />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/users/:id" element={<Users />} />
          <Route path="/post-upload" element={<PostUpload />} />
          <Route path="/contents/:id" element={<Contents />} />
          <Route path="*" element={<InvalidAccess />} />
        </Route>
        <Route path="/best" element={<InfiniteBest />} />
        <Route path="/" element={<InfiniteMain />} />
        <Route path="/following" element={<InfiniteFollowing />} />
      </Routes>
    </Provider>
  );
};

export default Router;
