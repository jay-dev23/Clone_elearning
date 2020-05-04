/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from '@reach/router';

// import courseImg from '../images/course.jpg';

const CourseComponent = (props) => {
  let courseWords = props.coursename.split(' ');
  let remainingWords = courseWords.splice(1).join(' ');
  return (
    <Link to={props.url + `${props.id}/`}>
      <div
        css={css`
          width: 100%;
          text-align: center;
        `}
      >
        <img
          width="80%"
          height="150"
          src={props.image}
          alt={props.coursename}
          crossOrigin="anonymous"
        />
      </div>
      <div
        css={css`
          width: 96%;
          p.CourseName {
            font-size: 2rem;
            font-weight: bold;
            margin: 1rem 0;
            word-wrap: break-word;
          }
        `}
      >
        <p className="CourseName">
          <span>{courseWords[0]}</span>&nbsp;{remainingWords}
        </p>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
              font-size: 1.1rem;
            }
          `}
        >
          <p>{props.instructor}</p>
          <p>&#8226; {props.level}</p>
        </div>
        {props.tags.map((tag, key) => (
          <p key={key} className="tags">
            {tag}
          </p>
        ))}
      </div>
    </Link>
  );
};

export default CourseComponent;
