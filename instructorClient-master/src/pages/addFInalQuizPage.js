/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { navigate } from '@reach/router';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FINAL_QUIZ } from '../gql/mutation.js';

import Loading from '../components/Loading.js';

import { ThemeContext } from '../Context/theme/themeContext.js';

const dataContentToSend = [];

export default function AddFInalQuizPage(props) {
  const [addFinalQuiz, { loading, error }] = useMutation(ADD_FINAL_QUIZ, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data) {
        if (data && data.addFinalQuiz) {
          alert('Final Quiz added successfully');
          navigate('/signed/dash/instructions');
        }
      }
    },
  });

  const { themeColors } = useContext(ThemeContext);

  const [noQues, setNoQues] = useState(1);
  const [count, setCount] = useState(noQues);
  const [quizSec, setquizSec] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSectionQuizChange = (e) => {
    setquizSec({
      ...quizSec,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAnotherSec = (e) => {
    if (selectedOption === null) {
      alert('select an option');
    }
    e.preventDefault();
    let content = {
      question: quizSec.question,
      options: [
        quizSec.option1,
        quizSec.option2,
        quizSec.option3,
        quizSec.option4,
      ],
      answer: selectedOption,
    };

    if (count < noQues) {
      dataContentToSend.push(content);
      setCount(count + 1);
      setquizSec({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
      });
      setSelectedOption(null);
    } else if (count === Number(noQues)) {
      dataContentToSend.push(content);
      // then call the mutation with the data to send
      // console.log(dataContentToSend);
      const dataToSend = {
        courseId: props.courseId,
        quiz: dataContentToSend,
      };
      addFinalQuiz({
        variables: {
          input: dataToSend,
        },
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error!! {error.message}</p>;
  }

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding: 1rem;
        p {
          font-size: 20px;
        }
        input {
          padding: 0.4rem 1rem;
          border: none;
          border-radius: 4px;
          margin: 0.5rem 0;
          background: ${themeColors.primaryBgColor};
          color: ${themeColors.fontColor};
          font-size: 1rem;
        }
        label {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: center;
          margin: 0.5rem 0;
          color: ${themeColors.secondaryFontColor};
        }
        .flexSpaceBtw {
          display: flex;
          justify-content: space-between;
        }
        .option {
          margin: 0.5rem 0;
          display: inline-flex;
          align-items: center;
          input {
            margin: 0.2rem;
          }
        }
        button {
          align-self: flex-end;
          width: 20%;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }
      `}
    >
      <h1>
        Add final quiz Here <span>.</span>
      </h1>
      <br />
      <p>Number of questions in the final quiz</p>
      <input
        type="number"
        name="noQues"
        value={noQues}
        onChange={(e) => setNoQues(e.target.value)}
      />
      <span>*this is to be entered only once</span>
      <br />
      <hr />
      <br />
      <div
        css={css`
          margin: 2rem 0;
          background: ${themeColors.secondaryBgColor};
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
        `}
      >
        <p>
          Add Question {count} for the lesson <span>.</span>
        </p>
        <div>
          <label htmlFor="question">
            Question
            <input
              type="text"
              name="question"
              value={quizSec.question}
              onChange={(e) => handleSectionQuizChange(e)}
              placeholder="Index of first element of array is ?"
              id="question"
            />
          </label>
        </div>
        <div className="flexSpaceBtw">
          <label htmlFor="option1">
            option 1
            <div className="option">
              <input
                type="radio"
                name={quizSec.option1}
                onChange={(e) => setSelectedOption(e.target.name)}
                checked={selectedOption === quizSec.option1}
              />
              <input
                type="text"
                name="option1"
                value={quizSec.option1}
                onChange={(e) => handleSectionQuizChange(e)}
                placeholder="-1"
                id="option1"
              />
            </div>
          </label>
          <label htmlFor="option2">
            option 2
            <div className="option">
              <input
                type="radio"
                name={quizSec.option2}
                onChange={(e) => setSelectedOption(e.target.name)}
                checked={selectedOption === quizSec.option2}
              />
              <input
                type="text"
                name="option2"
                value={quizSec.option2}
                onChange={(e) => handleSectionQuizChange(e)}
                placeholder="0"
                id="option2"
              />
            </div>
          </label>
          <label htmlFor="option3">
            option 3
            <div className="option">
              <input
                type="radio"
                name={quizSec.option3}
                onChange={(e) => setSelectedOption(e.target.name)}
                checked={selectedOption === quizSec.option3}
              />
              <input
                type="text"
                name="option3"
                value={quizSec.option3}
                onChange={(e) => handleSectionQuizChange(e)}
                placeholder="1"
                id="option3"
              />
            </div>
          </label>
          <label htmlFor="option4">
            option 4
            <div className="option">
              <input
                type="radio"
                name={quizSec.option4}
                onChange={(e) => setSelectedOption(e.target.name)}
                checked={selectedOption === quizSec.option4}
              />
              <input
                type="text"
                name="option4"
                value={quizSec.option4}
                onChange={(e) => handleSectionQuizChange(e)}
                placeholder="2"
                id="option4"
              />
            </div>
          </label>
        </div>
      </div>
      <button type="submit" onClick={(e) => handleAddAnotherSec(e)}>
        {Number(noQues) === count
          ? 'submit'
          : 'Save and proceed to next question'}
      </button>
    </div>
  );
}
