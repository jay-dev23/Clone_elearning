/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { useContext, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { navigate } from '@reach/router';
import StripeCheckout from 'react-stripe-checkout';

import { BUY_COURSE } from '../gql/mutation.js';
import { ThemeContext } from '../Context/theme/themeContext.js';
import Loading from './Loading.js';

const GET_MY_EMAIL = gql`
  query {
    me {
      username
      email
    }
  }
`;
function BuyCourse(props) {
  const { themeColors } = useContext(ThemeContext);
  const [Stoken] = useState(() => {
    return localStorage.getItem('token');
  });

  const {
    loading: loadingEmail,
    error: errorEmail,
    data: emailData,
  } = useQuery(GET_MY_EMAIL, { errorPolicy: 'all', skip: !Stoken });

  const [buyThisCourse, { loading, error }] = useMutation(BUY_COURSE, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',

    onCompleted: (data) => {
      if (data && data.buyCourse && data.buyCourse.email) {
        console.log(data.buyCourse);
        navigate('/dashboard/mycourses', { replace: true });
      }
    },
  });

  if (loadingEmail) return <Loading />;
  if (loading) return <Loading />;
  if (errorEmail) return <p>Error!! {errorEmail.message}</p>;
  if (error) return <p>Error!! {error.message}</p>;

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2rem 0;
        padding: 1rem;
      `}
    >
      <div
        css={css`
          background: ${themeColors.secondaryBgColor};
          border-radius: 8px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          text-align: center;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          margin: 0 auto;
          button {
            margin: 1.5rem 0;
            padding: 0.5rem 1rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
        `}
      >
        <p>Buy this course</p>
        <p>--------------------------</p>
        <span>Just only at</span>
        <div
          css={css`
            display: flex;
            align-items: center;
            p {
              text-decoration: line-through;
            }
            h1 {
              font-size: 3rem;
            }
          `}
        >
          <p>{props.cost}</p>
          <h1>{props.checkoutCost} Rs</h1>
        </div>
        (life time access)
        <br />
        {Stoken && emailData.me.email ? (
          props.checkoutCost !== 0 ? (
            <StripeCheckout
              name="AIOCuniversity"
              description={`Never Stop Learning ${emailData.me.username}`}
              amount={props.checkoutCost * 100}
              currency="INR"
              email={emailData.me.email}
              token={(token) => {
                console.log(token);
                return buyThisCourse({
                  variables: {
                    source: token.id,
                    email: emailData.me.email,
                    courseId: props.courseId,
                  },
                });
              }}
              stripeKey={process.env.REACT_APP_STRIPE_PBKEY}
            >
              <button>Buy this course</button>
            </StripeCheckout>
          ) : (
            <button
              onClick={() => {
                return buyThisCourse({
                  variables: {
                    email: emailData.me.email,
                    courseId: props.courseId,
                  },
                });
              }}
            >
              Start Learning
            </button>
          )
        ) : (
          <button onClick={() => navigate('/signin')}>Buy this course</button>
        )}
      </div>
    </div>
  );
}

export default BuyCourse;
