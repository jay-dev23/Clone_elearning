import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation loginMutationpMutation($email: String!, $password: String!) {
    instructorSignIn(email: $email, password: $password)
  }
`;

export const SIGN_UP = gql`
  mutation instructorSignUpMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    instructorSignUp(username: $username, email: $email, password: $password)
  }
`;

export const ADD_COURSE_SECTION_CONTENT = gql`
  mutation addCourseSectionContentMutation($input: CourseSectionContentInput) {
    addCourseSectionContent(input: $input)
  }
`;

export const ADD_COURSE_DETAILS = gql`
  mutation addCourseDetailMutation($input: CourseDetailsInput!) {
    addCourseDetail(input: $input)
  }
`;

export const ADD_FINAL_QUIZ = gql`
  mutation addFinalQuizMutation($input: AddFinalQuizInput!) {
    addFinalQuiz(input: $input)
  }
`;
