/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { useContext } from 'react';
import { useQuery } from '@apollo/client';

import { ThemeContext } from '../Context/theme/themeContext.js';
import { GET_COURSE_DETAILS_BY_ID } from '../gql/query';
import BuyCourse from '../components/BuyCourse.js';

function CourseDetail(props) {
  const { themeColors } = useContext(ThemeContext);

  const { loading, error, data } = useQuery(GET_COURSE_DETAILS_BY_ID, {
    variables: {
      id: props.id,
    },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error!! {error.message}</p>;
  return (
    <div
      css={css`
        width: 100%;
        padding: 2rem 4rem;
        font-size: 1.2rem;
        p {
          line-height: 1.8rem;
          color: ${themeColors.headingColor};
          text-align: justify;
        }
        p.about::first-letter {
          font-size: 2rem;
          font-weight: bold;
          color: #f28705;
        }
        ul,
        li {
          margin: 1rem;
          color: ${themeColors.headingColor};
          list-style-type: circle;
        }
      `}
    >
      <h1>
        {data.courseById.coursename}
        <span>.</span>
      </h1>
      <span>-{data.courseById.topic}</span>
      <br />
      <br />
      <p>{data.courseById.about}</p>
      <br />
      <span>Skills you will learn in this course</span>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin: 1rem 0;
          p {
            padding: 0.4rem 1rem;
            background: ${themeColors.secondaryBgColor};
            border-radius: 6px;
          }
        `}
      >
        {data.courseById.skills.map((skill, i) => (
          <p key={i}>{skill}</p>
        ))}
      </div>
      <p>
        Approximately <span>{data.courseById.approxTimeToComplete} </span>
        to complete this course.
      </p>
      <br />
      <BuyCourse
        cost={data.courseById.cost}
        checkoutCost={data.courseById.checkoutCost}
        courseId={data.courseById._id}
      />
    </div>
  );
}

export default CourseDetail;
