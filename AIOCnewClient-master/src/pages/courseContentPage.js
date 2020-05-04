/**@jsx jsx */
import { useContext } from 'react';
import { jsx, css } from '@emotion/core';
import { useQuery } from '@apollo/client';
import { Router, Link } from '@reach/router';
import styled from '@emotion/styled';

import { ThemeContext } from '../Context/theme/themeContext.js';
import { GET_COURSE_CONTENT_BY_ID } from '../gql/query.js';
import Loading from '../components/Loading.js';
import Accordion from '../components/Accordion.js';
import CourseIntro from './courseIntro.js';
import CourseQuiz from './quizPage.js';
import VideoPlayerSection from './VideoPlayerSection.js';

const CourseContentPage = (props) => {
  const { themeColors } = useContext(ThemeContext);
  const { loading, error, data } = useQuery(GET_COURSE_CONTENT_BY_ID, {
    variables: { id: props.id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error!! {error.message}</p>;
  }

  // styled comp
  const NavLink = styled(Link)`
    display: block;
    width: 90%;
    margin: 0 auto;
    padding: 0.5rem;
    background: ${themeColors.ternaryBgColor};
    color: ${themeColors.fontColor};
    border-radius: 8px;
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
  `;

  // to check the active route
  const isActive = ({ isCurrent }) => {
    return isCurrent
      ? {
          style: {
            background: '#f28705',
          },
        }
      : {};
  };

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        height: 82vh;
      `}
    >
      <div
        css={css`
          flex: 1 0 75%;
          height: 100%;
          overflow: auto;
        `}
      >
        <Router>
          <CourseIntro path="/" />
          <VideoPlayerSection
            coursename={data.courseById.coursename}
            path="/player/:topicId/:contentId"
          />
          <CourseQuiz path="/quiz" />
        </Router>
      </div>
      <div
        css={css`
          flex: 1 0 25%;
          height: 100%;
          background: ${themeColors.secondaryBgColor};
          border-radius: 0 8px 8px 0;
          padding: 1rem 0;
          overflow: auto;
        `}
      >
        <NavLink to={`/dashboard/courses/${props.id}/`} getProps={isActive}>
          Introduction
        </NavLink>
        <Accordion
          accordionContent={data.courseById.courseContent}
          id={props.id}
        />
        <NavLink to={`/dashboard/courses/${props.id}/quiz`} getProps={isActive}>
          Final Quiz
        </NavLink>
      </div>
    </div>
  );
};

export default CourseContentPage;
