/** @jsx jsx */
import { useContext } from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';
import { ThemeContext } from '../Context/theme/themeContext.js';

import LogoDiv from './Logo.js';

const NavLink = styled(Link)`
  padding: 0.4rem 1rem;
  margin: 0 0.2rem;
  border: none;
  border-radius: 25px;
  box-shadow: none;
  transition: box-shadow 0.3s linear;
  :hover,
  :focus {
    background: ${(props) => props.theme.secondaryBgColor};
    color: ${(props) => props.theme.secondaryFontColor};
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3);
  }
  :last-of-type {
    margin-right: 0;

    background: ${(props) => props.theme.secondaryBgColor};
    color: ${(props) => props.theme.secondaryFontColor};
  }
`;

const NavBar = () => {
  const { changeMode, themeColors, brandColors } = useContext(ThemeContext);
  return (
    <div
      css={css`
        padding: 1rem 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        * + * {
          margin: 0;
        }
      `}
    >
      <div
        css={css`
          max-width: 94vw;
          width: 1100px;
          padding: 0 calc(100% - 98vw);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            display: inline-flex;
          `}
        >
          <NavLink
            to="/"
            css={css`
              padding: 0;
            `}
          >
            {/* <div
              id="logo"
              css={css`
                flex: 0 1 1;
                width: 40px;
                height: 40px;
                background: #707070;
                border-radius: 8px;
              `}
            ></div> */}
            <LogoDiv />
          </NavLink>
          <div
            css={css`
              width: 30px;
              height: 30px;
              margin: auto 1rem;
              svg {
                fill: ${themeColors.fontColor};
                cursor: pointer;
              }
            `}
          >
            <svg
              onClick={() => changeMode()}
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              viewBox="0 0 24 24"
              width="30"
            >
              <path d="M24 0H0v24h24z" fill="none" />
              <path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z" />
            </svg>
          </div>
        </div>
        <ul
          css={css`
            display: flex;
            flex: 0 2 5;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
          `}
        >
          <NavLink to="/courses" theme={themeColors}>
            Courses
          </NavLink>
          <NavLink to="/signup" theme={themeColors}>
            Signup
          </NavLink>
          <NavLink to="/signin" theme={themeColors} brand={brandColors}>
            Login
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
