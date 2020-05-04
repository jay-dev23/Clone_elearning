import React from 'react';
import loadable from '@loadable/component';
import { useQuery } from '@apollo/client';

import { CHECK_COURSE_BOUGHT } from '../gql/query.js';
import Loading from '../components/Loading.js';
const CourseContentPage = loadable(() => import('./courseContentPage'));
const CourseDetailsPage = loadable(() => import('./courseDetail.js'));

const CourseClicked = (props) => {
  const { loading, error, data: bought } = useQuery(CHECK_COURSE_BOUGHT, {
    fetchPolicy: 'no-cache',
    variables: { id: props.id },
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error!! {error.message}</p>;
  }
  if (bought.isCourseBought) {
    return <CourseContentPage id={props.id} />;
  } else {
    return <CourseDetailsPage id={props.id} />;
  }
};

export default CourseClicked;
