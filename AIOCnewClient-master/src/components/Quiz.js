/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';

import { ThemeContext } from '../Context/theme/themeContext.js';
import { INC_SCORE } from '../gql/mutation.js';

export default function Quiz({ quiz, final, courseId }) {
  const { themeColors } = useContext(ThemeContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [clicked, setClicked] = useState(false);

  const [incScore] = useMutation(INC_SCORE, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data) {
        // console.log(data);
      }
    },
  });

  return (
    <div
      css={css`
        width: 90%;
        margin: 1rem auto;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        background: ${themeColors.secondaryBgColor};
        p {
          font-size: 18px;
        }
        .inline {
          display: flex;
          align-items: center;
          span {
            margin: 0 0.5rem;
          }
        }
        .options {
          width: 100%;
          margin: 2rem 0;
          display: flex;
          padding: 0 1rem;
          align-items: center;
          justify-content: space-between;
          p {
            padding: 0.5rem 1rem;
            border-radius: 8px;
            background: ${themeColors.primaryBgColor};
            :hover {
              background: ${themeColors.fontColor};
              color: ${themeColors.primaryBgColor};
            }
          }
        }
      `}
    >
      <div className="inline">
        <span>Question : </span>
        <p>{quiz.question}</p>
      </div>
      <div className="options">
        {quiz.options.map((option, i) => (
          <p
            key={i}
            onClick={() => {
              if (!clicked) {
                setSelectedOption(option);
                if (option === quiz.answer && final) {
                  incScore({
                    variables: { courseId: courseId },
                  });
                }
              }
              setClicked(true);
            }}
          >
            {option}
          </p>
        ))}
      </div>
      {selectedOption && (
        <div className="inline">
          <span>Your answer : </span>
          <p>{selectedOption}</p>
          <span>Correct answer : </span>
          <p>{quiz.answer}</p>
        </div>
      )}
    </div>
  );
}
