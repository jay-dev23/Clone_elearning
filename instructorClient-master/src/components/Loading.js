/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { ReactComponent as Loader } from '../images/loader.svg';

const Loading = () => {
  const delay = 200;
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), delay);
    return () => clearTimeout(timer);
  });

  return showLoader ? (
    <div
      css={css`
        width: inherit;
        height: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <Loader style={{ width: '40px', height: '40px', fill: '#707070' }} />
    </div>
  ) : null;
};

export default Loading;
