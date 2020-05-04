import { gql } from '@apollo/client';

const SIGN_IN = gql`
  mutation loginMutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SIGN_UP = gql`
  mutation signUpMutation(
    $username: String!
    $email: String!
    $tel: String!
    $password: String!
  ) {
    signUp(username: $username, tel: $tel, email: $email, password: $password)
  }
`;

const BUY_COURSE = gql`
  mutation buyCourseMutation($source: String, $email: String!, $courseId: ID!) {
    buyCourse(source: $source, email: $email, courseId: $courseId) {
      _id
      email
    }
  }
`;

const INC_SCORE = gql`
  mutation incrementScoreMutation($courseId: ID) {
    incrementScore(courseId: $courseId)
  }
`;

const ADD_COURSE_SCORE = gql`
  mutation addCourseScoreMutation($courseId: ID) {
    addCourseScore(courseId: $courseId)
  }
`;

export { SIGN_IN, SIGN_UP, BUY_COURSE, ADD_COURSE_SCORE, INC_SCORE };
