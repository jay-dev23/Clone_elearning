/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useContext } from 'react';
import { ThemeContext } from '../Context/theme/themeContext.js';
import { Link } from '@reach/router';
import { useFormik } from 'formik';
import Loading from './Loading.js';

const validate = (values) => {
  const errors = {};
  // username and phone
  if (values.hasOwnProperty('username') && values.hasOwnProperty('tel')) {
    if (!values.username) {
      errors.username = 'Required';
    }
  }
  // email and password
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

function UserForm(props) {
  const { themeColors } = useContext(ThemeContext);
  // formik
  const formik = useFormik({
    initialValues:
      props.formType === 'signup'
        ? {
            username: '',
            tel: '',
            email: '',
            password: '',
          }
        : { email: '', password: '' },
    validate,
    onSubmit: (values) => {
      props.action({
        variables: {
          ...values,
        },
      });
    },
  });
  return (
    <div
      css={css`
        height: 100vh;
        background: ${themeColors.primaryBgColor};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        form {
          display: flex;
          flex-direction: column;
          background: ${themeColors.secondaryBgColor};
          border-radius: 4px;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
          padding: 1rem 2rem;
          label {
            display: inline-flex;
            margin: 0;
            color: ${themeColors.secondaryFontColor};
            :first-of-type {
              margin-top: 1.5rem;
            }
          }

          input {
            padding: 0.4rem 1rem;
            border: none;
            border-radius: 4px;
            margin: 0.5rem 0 1rem 0;
            background: ${themeColors.primaryBgColor};
            color: ${themeColors.fontColor};
            font-size: 1rem;
          }
          button {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 1rem 0;
            padding: 0.6rem 1rem;
            border: none;
            border-radius: 4px;
          }
        }
      `}
    >
      <form onSubmit={formik.handleSubmit}>
        {/* {props.error &&
          props.error.graphQLErrors.map(({ message }, i) => (
            <p className="gqerror" key={i}>
              {message}
            </p>
          ))} */}
        {props.error && <span>{props.error.message}</span>}
        <h5>
          Sign {props.formType === 'signup' ? 'up' : 'in'} with AIOC{' '}
          <span>.</span>
        </h5>
        <p>
          <span>Enter</span> your details below
        </p>
        {props.formType === 'signup' ? (
          <Fragment>
            <label htmlFor="username">
              Username
              {formik.touched.username && formik.errors.username ? (
                <p className="error">&nbsp;: {formik.errors.username}</p>
              ) : null}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="John Doe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
          </Fragment>
        ) : null}
        <label htmlFor="email">
          Email
          {formik.touched.email && formik.errors.email ? (
            <p className="error">&nbsp;: {formik.errors.email}</p>
          ) : null}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@xyz.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        <label htmlFor="password">
          Password
          {formik.touched.password && formik.errors.password ? (
            <p className="error">&nbsp;: {formik.errors.password}</p>
          ) : null}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />

        <button type="submit">
          {props.formType === 'signup' ? 'Signup' : 'Login'}
        </button>
        {props.formType === 'signup' ? (
          <Link to="/">
            Already registered before...? Please login <span>&rarr;</span>
          </Link>
        ) : (
          <Link to="/signup">
            Not registered yet...? Please register before signing in{' '}
            <span>&rarr;</span>
          </Link>
        )}
        <br />
        {props.loading && <Loading />}
      </form>
    </div>
  );
}
export default UserForm;
