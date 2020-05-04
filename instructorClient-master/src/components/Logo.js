/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import { ReactComponent as Logo } from '../images/AIOC.svg';

function LogoDiv() {
  return (
    <div
      css={css`
        width: 60px;
        height: 60px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        margin: 3vh 0;
        padding: 0;
      `}
    >
      <Logo />
    </div>
  );
}

export default LogoDiv;
