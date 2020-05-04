/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Router } from '@reach/router';

import AddCourseDetailsPage from './addCourseDetailsPage.js';

import AddCourseSectionPage from './addCourseSectionPage.js';

import AddFInalQuizPage from './addFInalQuizPage.js';

export default function addCoursePage() {
  return (
    <div
      css={css`
        width: 100%;
        height: 80vh;
      `}
    >
      <Router>
        <AddCourseDetailsPage path="/" />
        <AddCourseSectionPage path="addsection/:courseId" />
        <AddFInalQuizPage path="/addfinalquiz/:courseId" />
      </Router>
    </div>
  );
}
