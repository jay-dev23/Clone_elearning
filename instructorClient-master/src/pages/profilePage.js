/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { useQuery } from '@apollo/client';
import { navigate } from '@reach/router';

import { GET_MY_DETAILS } from '../gql/query.js';
import Loading from '../components/Loading.js';

function ProfilePage() {
  const { loading, error, data } = useQuery(GET_MY_DETAILS);

  if (loading) return <Loading />;
  if (error) return <p>Error!! {error.message}</p>;

  return (
    <div
      css={css`
        button {
          padding: 0.5rem 1rem;
          margin: 2rem 0;
          border-radius: 8px;
        }
      `}
    >
      <br />
      <span>username</span>
      <h1>{data.instructorMe.username}</h1>
      <br />
      <span>email</span>
      <p>{data.instructorMe.email}</p>

      <button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/');
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
