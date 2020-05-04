/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import VideoPlayer from '../components/videoPlayer.js';
import { useQuery } from '@apollo/client';

import Loading from '../components/Loading.js';
import { GET_LESSON_CONTENT } from '../gql/query.js';
import Quiz from '../components/Quiz.js';

const VideoPlayerSection = (props) => {
  // according to get index get the data
  const { loading, error, data } = useQuery(GET_LESSON_CONTENT, {
    errorPolicy: 'all',
    variables: {
      courseId: props.id,
      topicId: props.topicId,
      contentId: props.contentId,
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error!! {error.message}</p>;

  const {
    topicName,
    videoContentDetail,
    videoUrl,
    sectionQuiz,
  } = data.getCourseSection.courseContent[0].content[0];
  return (
    <div
      css={css`
        p,
        span {
          font-size: 20px;
          margin: 1rem 0;
          word-break: break-word;
          padding: 0 0.5rem;
          letter-spacing: 1px;
          line-height: 30px;
        }
      `}
    >
      <div
        css={css`
          height: 80vh;
        `}
      >
        <VideoPlayer url={videoUrl} />
      </div>
      <div>
        <h1>{topicName}</h1>
        <br />
        <span>
          {props.coursename} -{data.getCourseSection.courseContent[0].title}{' '}
          &nbsp;&#8226;{data.getCourseSection.level}
        </span>
        <br />
        <p>{videoContentDetail}</p>
      </div>
      <br />
      <hr />
      <Quiz quiz={sectionQuiz} final={true} />
    </div>
  );
};

export default VideoPlayerSection;
