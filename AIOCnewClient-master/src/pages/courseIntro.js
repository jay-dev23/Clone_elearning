/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Fragment, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';

import Loading from '../components/Loading';
import { ThemeContext } from '../Context/theme/themeContext.js';

const GET_COURSE_CONTENT_BY_ID = gql`
  query($id: ID) {
    courseById(id: $id) {
      coursename
      skills
      about
      approxTimeToComplete
    }
  }
`;

export default function CourseIntro(props) {
  const { themeColors } = useContext(ThemeContext);

  const { loading, error, data } = useQuery(GET_COURSE_CONTENT_BY_ID, {
    variables: { id: props.id },
    errorPolicy: 'all',
    fetchPolicy: 'network-only',
  });
  if (loading) return <Loading />;
  if (error) return <p>Error!! {error.message}</p>;

  return (
    <Fragment>
      <h1>
        <span>"</span>
        {data.courseById.coursename}
        <span>"</span>
      </h1>
      <div
        css={css`
          width: 90%;
          margin: 2rem auto;
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
        <p className="about">{data.courseById.about}</p>
        <br />
        <span>Instructions</span>
        <ul>
          <li>
            Every course is divides into a number of sections depending upon the
            topics of the course.
          </li>
          <li>
            Each section contains a number of lectures that are covered using
            video tutorials in the same section.
          </li>
          <li>
            The lecture details and reading resources are provided within the
            same section, users are advised to scroll down the video to get the
            following.
          </li>
          <li>
            At the end of every course there will be a quiz that will be
            validated to appropriate scores.
          </li>
          <li>
            Inorder to complete the course and get the certificate minimum of
            70% of the score is required.
          </li>
          <li>
            Once a minimum of 70% is secured by the learner, they can get their
            certificate for the same in the " Achievements " panel.
          </li>
        </ul>
        <br />
        <span>Skill you will learn in this course</span>
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
        <br />
        <p>
          Approximately <span>{data.courseById.approxTimeToComplete}</span> to
          complete this course.
        </p>
      </div>
    </Fragment>
  );
}
