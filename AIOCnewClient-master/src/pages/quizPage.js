import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { GET_FINAL_QUIZ, GET_SCORE } from '../gql/query.js';
import { ADD_COURSE_SCORE } from '../gql/mutation.js';
import Loading from '../components/Loading.js';
import Quiz from '../components/Quiz.js';

export default function QuizPage(props) {
  const { loading, error, data } = useQuery(GET_SCORE, {
    variables: {
      courseId: props.id,
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error!! {error.message}</p>;
  if (
    data &&
    (!data.getScore ||
      !data.getScore.score ||
      !data.getScore.score[0].marks ||
      data.getScore.score[0].marks === 0)
  ) {
    return <QuizQuestions id={props.id} />;
  }

  if (
    data &&
    data.getScore.score &&
    data.getScore.score[0].marks &&
    data.getScore.score[0].marks !== 0
  ) {
    return (
      <div
        style={{
          margin: '4rem 0',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <span>You have already attempted the quiz</span>
        <h1 style={{ fontSize: '6rem' }}>{data.getScore.score[0].marks}</h1>
        <p>
          Your Score{' '}
          <span role="img" aria-label="hand">
            👆
          </span>
        </p>
      </div>
    );
  }
}

function QuizQuestions(props) {
  const { loading, error, data } = useQuery(GET_FINAL_QUIZ, {
    variables: {
      id: props.id,
    },
  });

  const [addCourseScore] = useMutation(ADD_COURSE_SCORE, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data) {
        // just chill
      }
    },
  });

  useEffect(() => {
    let effect = true;
    addCourseScore({
      variables: { courseId: props.id },
    });
    return () => {
      effect = false;
    };
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error!! {error.message}</p>;
  return (
    <div>
      <h1>
        Final Quiz <span>!!</span>
      </h1>
      <br />
      <br />
      {data.courseById.finalQuiz.map((quizQue) => (
        <Quiz
          key={quizQue._id}
          quiz={quizQue}
          final={true}
          courseId={props.id}
        />
      ))}
      <button
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          margin: '2rem',
        }}
        onClick={() => window.location.reload()}
      >
        End Quiz
      </button>
    </div>
  );
}
