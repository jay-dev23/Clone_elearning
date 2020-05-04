/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useContext } from 'react';
import { ThemeContext } from '../Context/theme/themeContext.js';

import { ReactComponent as Loader } from '../images/search.svg';

const Search = (props) => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <div
      css={css`
        display: flex;
        max-width: 20rem;
        height: 2.4rem;
        margin: 0.5rem 0;
        border-radius: 8px;
        font-size: 1rem;
        box-shadow: 0 0.5rem 8px rgba(0, 0, 0, 0.3);
        input {
          width: 90%;
          background: ${themeColors.secondaryBgColor};
          border: none;
          color: ${themeColors.secondaryFontColor};
          padding: 0.4rem 0.5rem;
          border-radius: 8px 0 0 8px;
        }
        #search {
          border-radius: 0 8px 8px 0;
          border: 0 4px 4px 0;
          background: #f28705;
        }
      `}
    >
      <input type="text" placeholder="search for courses" />
      <div id="search">
        <Loader
          fill="#121212"
          css={css`
            ${'' /* background: red; */}
            margin: 0.4rem 1rem;
          `}
        />
      </div>
    </div>
  );
};

export default Search;
