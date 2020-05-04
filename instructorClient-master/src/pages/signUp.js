import React from 'react';
import { useMutation } from '@apollo/client';

import UserForm from '../components/UserForm.js';
import { SIGN_UP } from '../gql/mutation.js';
import { navigate } from '@reach/router';

const SignUpPage = () => {
  const [signup, { loading, error }] = useMutation(SIGN_UP, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data && data.instructorSignUp) {
        navigate('/');
      }
    },
  });
  return (
    <React.Fragment>
      <UserForm
        formType="signup"
        action={signup}
        error={error}
        loading={loading}
      />
    </React.Fragment>
  );
};
export default SignUpPage;
