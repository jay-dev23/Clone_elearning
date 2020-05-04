import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import { ThemeContext } from '../Context/theme/themeContext.js';

const VideoPlayer = (props) => {
  const { themeColors } = useContext(ThemeContext);
  return (
    <ReactPlayer
      url={props.url}
      controls={true}
      light={true}
      width="100%"
      height="100%"
      pip={true}
      config={{
        youtube: {
          playerVars: { showinfo: 1, crossorigin: 'anonymous' },
        },
        file: {
          attributes: {
            controlslist: 'nodownload',
            crossorigin: 'anonymous',
            autoPictureInPicture: true,
            preload: 'auto',
          },
        },
      }}
      style={{ background: themeColors.secondaryBgColor }}
      onContextMenu={(e) => {
        e.preventDefault();
        return false;
      }}
    />
  );
};
export default VideoPlayer;
