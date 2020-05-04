/** @jsx jsx */
import { useContext } from 'react';
import { jsx, css } from '@emotion/core';
import { ThemeContext } from '../Context/theme/themeContext.js';
import Search from './Search';

//images
import AiocUniversity from '../images/AIOCUniversity.svg';

function Footer() {
  const { themeColors } = useContext(ThemeContext);

  return (
    <div
      css={css`
        width: 100%;
        background: ${themeColors.primaryBgColor};
        display: flex;
        align-items: center;
        jusify-content: center;
        margin: 0;
      `}
    >
      <div
        css={css`
          max-width: 94vw;
          width: 1100px;
          margin: 2rem auto;
        `}
      >
        <h2>
          AIOC<span>.</span>
        </h2>
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 0;
          `}
        >
          {' '}
          <div
            css={css`
              flex: 2;
              display: flex;
              flex-wrap: wrap;
              align-items: center;

              jusify-content: center;
              p,
              ul {
                margin: 0 1rem;
                flex: 1;
              }
              li {
                margin: 0.5rem 0;
              }
            `}
          >
            <div>
              <p>Contact us</p>
              <ul>
                <a href="https://t.me/joinchat/AAAAAEps1TJyU8MJKwnyyQ" target="_blank"><li>Telegram</li></a>
                <a href="https://www.instagram.com/allinonecyberteam/" target="_blank"><li>Instagram</li></a>
                <a href="https://www.facebook.com/allinonecyberteam/" target="_blank" ><li>Facebook</li></a> 
              </ul>
            </div>
            <div>
              <p>About</p>
              <ul>
                <li>Pricing</li>
                <li>Instructor</li>
                <li>Success Stories</li>
              </ul>
            </div>
            <div>
              <p>Legal</p>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms of service</li>
                <li>Copyright</li>
              </ul>
            </div>
          </div>
          <div
            css={css`
              flex: 1;
            `}
          >
            <img  css={css`width:280px;height:280px`}src={AiocUniversity}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
