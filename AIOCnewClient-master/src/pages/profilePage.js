/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { navigate } from '@reach/router';

import Loading from '../components/Loading';
import { GET_MY_DATA } from '../gql/query';
import { ThemeContext } from '../Context/theme/themeContext.js';

const ProfilePage = (props) => {
  const { themeColors } = useContext(ThemeContext);
  const { loading, error, data } = useQuery(GET_MY_DATA, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loading />;
  if (error) return <p>Error!! {error.message}</p>;
  return (
    <Fragment>
      <h1>
        My Profile <span>.</span>
      </h1>
      <div
        css={css`
          margin: 2rem;
          padding: 1rem;
          p {
            font-size: 32px;
          }
          button {
            padding: 0.5rem 1rem;
            margin: 0 4rem;
          }
        `}
      >
        <span>Username</span>
        <p>{data.me.username}</p>
        <br />
        <span>Email</span>
        <p>{data.me.email}</p>
        <br />
        <span>Phone number</span>
        <p>{data.me.tel}</p>
        <br />
        <br />
        <div
          css={css`
            display: inline-flex;
            border-radius: 8px;
            background: ${themeColors.secondaryBgColor};
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            margin: 2rem 0;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            h1 {
              font-size: 4rem;
            }
          `}
        >
          <h1>{data.me.coursesBought.length}</h1>
          <span>courses bought</span>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
        >
          Logout
        </button>
      </div>
    </Fragment>
  );
};

export default ProfilePage;
