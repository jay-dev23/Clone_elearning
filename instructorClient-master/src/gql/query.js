import { gql } from '@apollo/client';

const GET_MY_DETAILS = gql`
  query {
    instructorMe {
      _id
      username
      email
    }
  }
`;

const GET_COURSE_BY_NAME = gql`
  query($courseName: String!) {
    courseByName(courseName: $courseName) {
      _id
      coursename
    }
  }
`;

export { GET_MY_DETAILS, GET_COURSE_BY_NAME };
