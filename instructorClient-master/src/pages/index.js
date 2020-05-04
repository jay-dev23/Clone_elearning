import React, { Suspense, useState } from 'react';
import { Router, Redirect } from '@reach/router';
import { lazy } from '@loadable/component';

import Loading from '../components/Loading.js';
import { PaddedDiv } from '../components/layout';
import Dashboard from './dashboard.js';

// lazy load these pages
const SignInPage = lazy(() => import('./signIn.js'));
const SignUpPage = lazy(() => import('./signUp.js'));
// split these into separate loadable components
//
function UnSigned() {
  const [Signed] = useState(() => {
    let token = localStorage.getItem('token');
    return token;
  });
  if (Signed) {
    return <Redirect to="/signed/dash/instructions" noThrow />;
  }

  return (
    <Suspense fallback={<Loading />}>
      {/* <Layout> */}

      <PaddedDiv>
        <Router>
          <SignInPage exact path="/" />
          <SignUpPage path="/signup" />
        </Router>
      </PaddedDiv>
    </Suspense>
  );
}

const Signed = () => {
  const [Signed] = useState(() => {
    let token = localStorage.getItem('token');
    return token;
  });
  if (!Signed) {
    return <Redirect to="../../" noThrow />;
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
      <Signed path="/signed/dash/*" />
    </Router>
  );
};

export default Pages;
