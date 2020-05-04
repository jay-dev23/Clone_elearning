import React, { Suspense, useState } from 'react';
import { Router, Redirect } from '@reach/router';
import loadable, { lazy } from '@loadable/component';

import Loading from '../components/Loading.js';
import { PaddedDiv } from '../components/layout.js';
import NavBar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import HomePage from './home.js';
import Dashboard from './dashboard.js';
// lazy load these pages
const SignInPage = lazy(() => import('./signIn.js'));
const SignUpPage = lazy(() => import('./signUp.js'));
// split these into separate loadable components
//
const CourseFeedPage = loadable(() => import('./allcourse.js'));
const CourseDetailsPage = loadable(() => import('./courseDetail.js'));

function UnSigned() {
  const [Signed] = useState(() => {
    let token = localStorage.getItem('token');
    return token;
  });
  if (Signed) {
    return <Redirect to="/dashboard/courses" noThrow />;
  }

  return (
    <Suspense fallback={<Loading />}>
      {/* <Layout> */}
      <NavBar />
      <PaddedDiv>
        <Router>
          <HomePage exact path="/" />
          <SignInPage path="/signin" />
          <SignUpPage path="/signup" />
          <CourseFeedPage path="/courses" />
          <CourseDetailsPage path="/courses/:id" />
        </Router>
      </PaddedDiv>
      <Footer />
      {/* </Layout> */}
    </Suspense>
  );
}

const Signed = () => {
  const [Signed] = useState(() => {
    let token = localStorage.getItem('token');
    return token;
  });
  if (!Signed) {
    return <Redirect to="../signin" noThrow />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Dashboard path="/*" />
      </Router>
    </Suspense>
  );
};

const Pages = () => {
  return (
    <Router>
      <UnSigned path="/*" />
      <Signed path="/dashboard/*" />
    </Router>
  );
};

export default Pages;
