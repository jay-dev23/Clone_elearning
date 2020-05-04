/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Fragment, useContext } from 'react';
import { useQuery } from '@apollo/client';

import { ThemeContext } from '../Context/theme/themeContext.js';

const AchievementPage = (props) => {
  return (
    <Fragment>
      <h1>
        My Achievements <span>.</span>
      </h1>
    </Fragment>
  );
};

export default AchievementPage;
