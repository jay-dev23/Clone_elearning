/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { navigate } from '@reach/router';
import { Fragment, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';

import { ThemeContext } from '../Context/theme/themeContext.js';
import Loading from '../components/Loading';
import { ADD_COURSE_DETAILS } from '../gql/mutation.js';

function AddCourseDetailsPage(props) {
  const { themeColors } = useContext(ThemeContext);
  const [imageUrl, setImageUrl] = useState('');
  const [values, setValues] = useState({
    coursename: '',
    topic: '',
    about: '',
    tags: '',
    skills: '',
    level: 'Beginner',
    cost: '',
    checkoutCost: '',
    approxTimeToComplete: '',
  });

  const [addCourseDetails, { loading, error }] = useMutation(
    ADD_COURSE_DETAILS,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        if (data && data.addCourseDetail) {
          navigate(`addsection/${data.addCourseDetail}`);
        }
      },
    }
  );

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: 'aiocuniversity-com',
        upload_preset: 'AIOCuniversity',
        tags: ['AIOC'],
        sources: ['local', 'url', 'image_search'],
        searchBySites: ['all', 'cloudinary.com'],
      },
      function (error, result) {
        if (result && result.event === 'success') {
          // console.log(result.info.public_id);
          setImageUrl(result.info.url);
        }
      }
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error!! {error.message}</p>;
  }

  return (
    <Fragment>
      <h1>
        Add Course Details Here
        <span>.</span>
      </h1>
      <form
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          padding: 1rem;
          label {
            width: 30%;
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
          label.textArea {
            width: 100%;
          }
          input,
          textarea,
          select {
            padding: 0.4rem 1rem;
            border: none;
            border-radius: 4px;
            margin: 0.5rem 0;
            background: ${themeColors.primaryBgColor};
            color: ${themeColors.fontColor};
            font-size: 1rem;
          }
          #image {
            corsor: pointer;
            background: #f28705;
            padding: 0.2rem 1rem;
            margin: 0.5rem 0;
            border-radius: 8px;
          }
          button {
            width: 20%;
            align-self: flex-end;
            margin: 1rem 0;
            padding: 0.6rem 1rem;
            border: none;
            border-radius: 4px;
          }
        `}
      >
        <div className="flexSpaceBtw">
          <label htmlFor="coursename">
            Course name
            <input
              type="text"
              id="coursename"
              name="coursename"
              value={values.coursename}
              onChange={(e) => handleChange(e)}
              placeholder="Intro to datastructure and algorithm"
            />
          </label>

          <label htmlFor="topic">
            Topic
            <input
              type="text"
              id="topic"
              name="topic"
              value={values.topic}
              onChange={(e) => handleChange(e)}
              placeholder="Programming"
            />
          </label>
          <label htmlFor="tags">
            Tags
            <input
              type="text"
              id="tags"
              name="tags"
              value={values.tags}
              onChange={(e) => handleChange(e)}
              placeholder="Software development, Programming"
            />
          </label>
        </div>
        <div
          className=""
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <label htmlFor="about" className="textArea">
            Adout this course
            <textarea
              id="about"
              name="about"
              rows="10"
              value={values.about}
              onChange={(e) => handleChange(e)}
              placeholder="Let the users know what they will learn and how this course will impact them..."
            />
          </label>
        </div>

        <div className="flexSpaceBtw">
          <label htmlFor="level">
            Level
            <select
              name="level"
              id="level"
              value={values.level}
              onChange={(e) => {
                setValues({
                  ...values,
                  level: e.target.value,
                });
              }}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advance">Advance</option>
            </select>
          </label>
          {/* Image wala */}
          <label htmlFor="image">
            course image
            <p onClick={() => uploadImage()} id="image">
              Upload Image
            </p>
            <span>{imageUrl ? 'uploaded successful' : null}</span>
          </label>
          <label htmlFor="skills">
            Skills learnt in this course
            <input
              type="text"
              id="skills"
              name="skills"
              value={values.skills}
              onChange={(e) => handleChange(e)}
              placeholder="DataStructure, Programming"
            />
          </label>
        </div>
        <div className="flexSpaceBtw">
          <label htmlFor="cost">
            Cost in Rupees
            <input
              type="number"
              id="cost"
              name="cost"
              value={values.cost}
              onChange={(e) => handleChange(e)}
              placeholder="2000"
            />
          </label>
          <label htmlFor="checkoutCost">
            Checkout cost in Rupees
            <input
              type="number"
              id="checkoutCost"
              name="checkoutCost"
              value={values.checkoutCost}
              onChange={(e) => handleChange(e)}
              placeholder="1800"
            />
          </label>
          <label htmlFor="approxTimeToComplete">
            Approx time to complete
            <input
              type="text"
              id="approxTimeToComplete"
              name="approxTimeToComplete"
              value={values.approxTimeToComplete}
              onChange={(e) => handleChange(e)}
              placeholder="6 weeks"
            />
          </label>
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            let dataToSend = {
              ...values,
              image: imageUrl,
              tags: values.tags.split(','),
              skills: values.skills.split(','),
              cost: Number(values.cost),
              checkoutCost: Number(values.checkoutCost),
            };
            addCourseDetails({
              variables: {
                input: dataToSend,
              },
            });
          }}
        >
          Submit and proceed
        </button>
      </form>
    </Fragment>
  );
}

export default AddCourseDetailsPage;
