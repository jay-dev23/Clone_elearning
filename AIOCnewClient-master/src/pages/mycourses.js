/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from '@reach/router';
import { motion } from 'framer-motion';

import Loading from '../components/Loading';
import { GET_MY_COURSES } from '../gql/query';
import { ThemeContext } from '../Context/theme/themeContext.js';

const MyCoursesPage = (props) => {
  const { themeColors } = useContext(ThemeContext);
  const { loading, error, data } = useQuery(GET_MY_COURSES, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  if (loading) return <Loading />;
  if (error) return <p>Error!! {error.message}</p>;
  return (
    <div
      css={css`
        padding: 2rem;
      `}
    >
      <h1>
        My Courses <span>.</span>
      </h1>
      <div
        css={css`
          display: inline-flex;
          border-radius: 8px;
          background: ${themeColors.secondaryBgColor};
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          margin: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          h1 {
            font-size: 4rem;
          }
        `}
      >
        <h1>{data.me.coursesBought.length}</h1>
        <span>courses bought</span>
      </div>
      {data.me.coursesBought.length !== 0 && (
        <div
          css={css`
            width: 100%;
            padding: 1rem;
            display: flex;
            overflow-x: auto;
          `}
        >
          {data.me.coursesBought.map((course) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              key={course._id}
              css={css`
                max-width: 30%;
                cursor: pointer;
                word-wrap: break-word;

                margin: 1rem;
                border-radius: 8px;
                background: ${themeColors.secondaryBgColor};
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                h1 {
                  font-size: 2.5rem;
                }
              `}
            >
              <Link key={course._id} to={`/dashboard/courses/${course._id}/`}>
                <div
                  css={css`
                    width: 100%;
                    height: 100%;
                    padding: 2rem 1rem;
                  `}
                >
                  <h1>{course.coursename}</h1>
                  <span>&rarr;</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
