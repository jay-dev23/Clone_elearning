/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Fragment, useContext } from 'react';

import { ThemeContext } from '../Context/theme/themeContext.js';

export default function InstructionPage(props) {
  const { themeColors } = useContext(ThemeContext);

  return (
    <Fragment>
      <h1>
        <span>"</span>
        Instructions to upload course
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
        <br />
        <span>Course structure</span>
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
        <span>Course upload instructions</span>
        <ul>
          <li>
            Once you have started to upload course dont leave it in between
          </li>
          <li>Kindly fill all the required inputes</li>
          <li>if some error occurs delete the course on do it again</li>
        </ul>
      </div>
    </Fragment>
  );
}
