import { gql } from '@apollo/client';

const GET_MY_DATA = gql`
  query {
    me {
      username
      email
      tel
      coursesBought {
        coursename
      }
    }
  }
`;

const GET_MY_COURSES = gql`
  query {
    me {
      coursesBought {
        _id
        coursename
      }
    }
  }
`;

const GET_COURSES = gql`
  query {
    courses {
      _id
      coursename
      topic
      tags
      level
      image
      instructor {
        username
      }
    }
  }
`;

const GET_COURSE_DETAILS_BY_ID = gql`
  query($id: ID) {
    courseById(id: $id) {
      _id
      coursename
      topic
      tags
      cost
      checkoutCost
      about
      approxTimeToComplete
      skills
      courseContent {
        title
      }
    }
  }
`;

const GET_FINAL_QUIZ = gql`
  query($id: ID) {
    courseById(id: $id) {
      _id
      finalQuiz {
        _id
        question
        options
        answer
      }
    }
  }
`;

const GET_SCORE = gql`
  query($courseId: ID) {
    getScore(courseId: $courseId) {
      score {
        _id
        courseId
        marks
      }
    }
  }
`;

const GET_COURSE_CONTENT_BY_ID = gql`
  query($id: ID) {
    courseById(id: $id) {
      coursename
      courseContent {
        _id
        title
        content {
          _id
          topicName
        }
      }
    }
  }
`;

const CHECK_COURSE_BOUGHT = gql`
  query($id: ID) {
    isCourseBought(id: $id)
  }
`;

const GET_LESSON_CONTENT = gql`
  query($courseId: ID, $topicId: ID, $contentId: ID) {
    getCourseSection(
      courseId: $courseId
      topicId: $topicId
      contentId: $contentId
    ) {
      level
      courseContent {
        title
        content {
          topicName
          videoUrl
          videoContentDetail
          sectionQuiz {
            question
            options
            answer
          }
        }
      }
    }
  }
`;

export {
  GET_COURSES,
  GET_COURSE_DETAILS_BY_ID,
  GET_COURSE_CONTENT_BY_ID,
  CHECK_COURSE_BOUGHT,
  GET_LESSON_CONTENT,
  GET_FINAL_QUIZ,
  GET_SCORE,
  GET_MY_DATA,
  GET_MY_COURSES,
};
