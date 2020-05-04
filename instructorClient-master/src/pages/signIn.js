import React from 'react';
import { useMutation } from '@apollo/client';

import UserForm from '../components/UserForm.js';
import { SIGN_IN } from '../gql/mutation.js';
import { navigate } from '@reach/router';

const SignInPage = (props) => {
  const [signin, { loading, error }] = useMutation(SIGN_IN, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data && data.instructorSignIn) {
        localStorage.setItem('token', data.instructorSignIn);
        navigate('/signed/dash/instructions');
      }
    },
  });
  return (
    <React.Fragment>
      <UserForm
        formType="signin"
        action={signin}
        error={error}
        loading={loading}
      />
    </React.Fragment>
  );
};

export default SignInPage;
