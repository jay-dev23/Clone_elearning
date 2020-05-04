// /** @jsx jsx */
// import { jsx, css } from '@emotion/core';
// import { Fragment, useContext } from 'react';
// import { ThemeContext } from '../Context/theme/themeContext.js';
// import { Link } from '@reach/router';
// import { useFormik } from 'formik';

// // import GET_User check if user exist in DB then send a mail to link

// const validate = (value) => {
//   let errors = {};
//   if (!value.email) {
//     errors.email = 'Email is required to find your account';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }

//   return errors;
// };

// const EmailForm = (props) => {
//   const formik = useFormik({
//     initialValues: {
//       emial: '',
//     },
//     validate,
//     onSubmit: (value) => {},
//   });

//   return <h1>Email</h1>;
// };
