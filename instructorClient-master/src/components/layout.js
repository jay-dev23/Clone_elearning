/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import { Fragment, useContext } from 'react';
import { ThemeContext } from '../Context/theme/themeContext.js';

const Layout = (props) => {
  const { themeColors, brandColors } = useContext(ThemeContext);

  return (
    <Fragment>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          html,
          body {
            margin: 0;
            padding: 0;
            background: ${themeColors.primaryBgColor};
            height: 100%;
            width: 100%;
            color: ${themeColors.fontColor};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 1.2;
            overflow: auto;
          }
          ::selection {
            background-color: ${themeColors.fontColor};
            color: ${themeColors.primaryBgColor};
          }
          ::-webkit-scrollbar {
            width: 3px;
            height: 3px;
            cursor: pointer;
          }
          ::-webkit-scrollbar-thumb {
            background: ${themeColors.fontColor};
            border-radius: 10px;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          strong {
            font-weight: bold;
            font-size: 2.4rem;
            letter-spacing: 0.05rem;
            margin: 1rem 0;
            color: ${themeColors.headingColor};
          }
          .brandSpan {
            color: ${brandColors.primaryBrandColor};
          }
          p {
            margin: 0;
            color: ${themeColors.fontColor};
            font-size: ;
          }
          span {
            padding: 0;
            margin: 0;
            color: ${brandColors.primaryBrandColor};
          }

          a,
          li,
          ul {
            text-decoration: none;
            list-style: none;
            color: ${themeColors.secondaryFontColor};
            :focus,
            :hover {
              border: none;
            }
          }
          a:hover {
            cursor: pointer;
          }

          button {
            cursor: pointer;
            padding: 0.6rem 2rem;
            margin: 1.5rem 0;
            background: ${brandColors.primaryBrandColor};
            border: none;
            border-radius: 25px;
            color: #eee;
          }
          .someShadow {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
              0 3px 6px rgba(0, 0, 0, 0.23);
          }
          p.gqerror {
            color: red;
            margin: 0 auto;
            text-align: center;
          }
          p.error {
            color: red;
          }
          ,
          .fullWidth {
            width: 100%;
            height: 100vh;
          }
        `}
      />
      <main
        css={css`
          max-width: 100vw;
          width: 100%;
          margin: 0 auto;
          padding: 0;
          ${'' /* padding: 0 calc(100% - 94vw); */}
        `}
      >
        {props.children}
      </main>
    </Fragment>
  );
};

export const PaddedDiv = ({ children }) => {
  return (
    <div
      css={css`
        margin: 0;
        padding: 0 calc(100% - 96vw);
      `}
    >
      {children}
    </div>
  );
};

export default Layout;
