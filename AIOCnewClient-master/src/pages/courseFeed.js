/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useContext, useState } from 'react';
import { ThemeContext } from '../Context/theme/themeContext.js';
import { lazy } from '@loadable/component';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';

import { GET_COURSES } from '../gql/query';
import Loading from '../components/Loading.js';
const Course = lazy(() => import('../components/Course'));

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const CourseFeed = (props) => {
  const { loading, error, data } = useQuery(GET_COURSES, {
    errorPolicy: 'all',
    fetchPolicy: 'network-only',
  });
  const [url, setUrl] = useState(() => {
    let token = localStorage.getItem('token');
    if (token) {
      return '/dashboard/courses/';
    } else {
      return '/courses/';
    }
  });

  const { themeColors } = useContext(ThemeContext);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error!! {error.message}</p>;
  }
  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <div
        css={css`
          width: 100%;
          margin: 0;
          padding: 1rem 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <h1>
          <span>Courses</span> offered
        </h1>
      </div>
      <motion.div
        variants={stagger}
        css={css`
          width: 100%;
          margin: 0;
          padding: 1rem;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        `}
      >
        {data.courses.map(
          ({ _id, image, instructor, coursename, level, tags, topic }) => (
            <motion.div
              key={_id}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              variants={fadeInUp}
              css={css`
                max-width: 22rem;
                padding: 1.5rem;
                margin: 6rem 0;
                border-radius: 8px;
                background: ${themeColors.secondaryBgColor};
                color: ${themeColors.secondaryFontColor};
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                display: inline-flex;
                flex-direction: column;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                img {
                  height: 150px;
                  border: none;
                  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
                  border-radius: 8px;
                  margin-top: -20%;
                  background: ${themeColors.primaryBgColor};
                }
                p.tags {
                  background: ${themeColors.primaryBgColor};
                  color: ${themeColors.secondaryFontColor};
                  border-radius: 4px;
                  display: inline-flex;
                  margin: 0.8rem 0.5rem 0.5rem 0;
                  padding: 0.2rem 0.5rem;
                }
              `}
            >
              <Course
                coursename={coursename}
                id={_id.toString()}
                tags={tags}
                topic={topic}
                level={level}
                image={image}
                instructor={instructor.username}
                url={url}
              />
            </motion.div>
          )
        )}
      </motion.div>
    </motion.div>
  );
};

export default CourseFeed;
