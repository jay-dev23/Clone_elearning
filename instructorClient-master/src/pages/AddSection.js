/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { navigate } from '@reach/router';
import { Fragment, useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { GET_COURSE_BY_NAME } from '../gql/query.js';
import { ADD_COURSE_SECTION_CONTENT } from '../gql/mutation.js';

import Loading from '../components/Loading.js';

import { ThemeContext } from '../Context/theme/themeContext.js';

const dataContentToSend = [];

function AddCourseSectionPage(props) {
  const { themeColors } = useContext(ThemeContext);
  const [courseName, setCourseName] = useState('');
  const [courseData, setCourseData] = useState('');

  const { loading: loadingCourse, error: errorCourse, data: course } = useQuery(
    GET_COURSE_BY_NAME,
    {
      skip: !courseData,
      variables: {
        courseName: courseData.toString(),
      },
    }
  );
  if (loadingCourse) return <p>Loading...</p>;
  if (course && course.courseByName && course.courseByName.coursename) {
    return (
      <AddCourseSection
        courseId={course.courseByName._id}
        courseName={courseData}
      />
    );
  }
  return (
    <Fragment>
      <h1>
        Add Course Name Here<span>.</span>
      </h1>
      {errorCourse ? (
        <p style={{ color: 'red' }}>{errorCourse.message.split(':')[1]}</p>
      ) : null}
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          padding: 1rem;
          p {
            display: inline-flex;
            font-size: 20px;
            background: #f28705;
            padding: 0.5rem 1rem;
            border-radius: 8px;
          }
          p.error {
            font-size: 20px;
            color: red;
            background: none;
          }
          label {
            ${'' /* width: 30%; */}
            display:flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            margin: 0.5rem 0;
            color: ${themeColors.secondaryFontColor};
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
        `}
      >
        <label htmlFor="courseName">
          Enter your course name you want to update
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={courseName}
            placeholder="Intro to JS"
            onChange={(e) => setCourseName(e.target.value)}
          />
        </label>
        <p onClick={() => setCourseData(courseName)}>Find course</p>
      </div>
    </Fragment>
  );
}

function AddCourseSection(props) {
  const [addSectionContent, { loading, error }] = useMutation(
    ADD_COURSE_SECTION_CONTENT,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        if (data && data.addCourseSectionContent) {
          alert('added section successfully');
          navigate('/signed/dash/instructions');
        }
      },
    }
  );
  const { themeColors } = useContext(ThemeContext);

  const [title, setTitle] = useState('');
  const [noLesson, setnoLesson] = useState(1);
  const [count, setCount] = useState(noLesson);
  const [sectionValues, setSectionValues] = useState({
    topicName: '',
    videoContentDetail: '',
  });
  const [videoUrl, setVideoUrl] = useState('');
  const [sectionQuiz, setsectionQuiz] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSectionContentChange = (e) => {
    setSectionValues({
      ...sectionValues,
      [e.target.name]: e.target.value,
    });
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: 'aiocuniversity-com',
        upload_preset: 'AIOCuniversity',
        tags: ['AIOC'],
        sources: ['local'],
      },
      function (error, result) {
        if (result && result.event === 'success') {
          // console.log(result.info.url);
          // console.log(result.info.public_id);
          setVideoUrl(result.info.url);
        }
      }
    );
  };

  const handleSectionQuizChange = (e) => {
    setsectionQuiz({
      ...sectionQuiz,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAnotherSec = (e) => {
    e.preventDefault();
    let content = {
      topicName: sectionValues.topicName,
      videoUrl: videoUrl,
      videoContentDetail: sectionValues.videoContentDetail,
      sectionQuiz: {
        question: sectionQuiz.question,
        options: [
          sectionQuiz.option1,
          sectionQuiz.option2,
          sectionQuiz.option3,
          sectionQuiz.option4,
        ],
        answer: selectedOption,
      },
    };
    if (count < noLesson) {
      dataContentToSend.push(content);
      setCount(count + 1);
      setSectionValues({
        topicName: '',
        videoContentDetail: '',
      });
      setsectionQuiz({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
      });
      setSelectedOption(null);
      setVideoUrl('');
    } else if (count === Number(noLesson)) {
      dataContentToSend.push(content);
      // then call the mutation with the data to send
      // console.log(dataContentToSend);
      const dataToSend = {
        _id: props.courseId,
        title: title,
        content: dataContentToSend,
      };
      addSectionContent({
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
    <Fragment>
      <p>Found Course by name : {props.courseName}</p>
      <h1>
        Add Course Section Here<span>.</span>
      </h1>
      <form
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
          label {
            ${'' /* width: 30%; */}
            display:flex;
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
          textarea {
            padding: 0.4rem 1rem;
            border: none;
            border-radius: 4px;
            margin: 0.5rem 0;
            background: ${themeColors.primaryBgColor};
            color: ${themeColors.fontColor};
            font-size: 1rem;
          }

          button {
            align-self: flex-start;
            margin: 1rem 0;
            padding: 0.6rem 1rem;
            border: none;
            border-radius: 4px;
          }
          p.upload {
            cursor: pointer;
            margin: 1rem 0;
            width: 15%;
            padding: 0.4rem 1rem;
            display: inline-flex;
            justify-content: center;
            background: #f28705;
            border: none;
            border-radius: 4px;
          }
          .option {
            margin: 0.5rem 0;
            display: inline-flex;
            align-items: center;
            input {
              margin: 0.2rem;
            }
          }
        `}
      >
        <div className="flexSpaceBtw">
          <label htmlFor="title">
            Section title name
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={(e) => setTitle(e.target.value)}
              placeholder="Getting Started with Arrays"
            />
          </label>
          <label htmlFor="noLesson">
            No of lessons in this section
            <input
              type="number"
              id="noLesson"
              name="noLesson"
              min="1"
              max="5"
              value={noLesson}
              onChange={(e) => {
                if (e.target.value > 5) {
                  window.confirm('Cannot be greater than 5');
                } else {
                  setnoLesson(e.target.value);
                }
              }}
              onBlur={(e) => {
                if (e.target.value > 5) {
                  window.confirm('Cannot be greater than 5');
                } else {
                  setnoLesson(e.target.value);
                }
              }}
            />
          </label>
        </div>
        <span>*change the above data only once</span>
        <hr />
        <br />
        <p>
          Add Lesson {count} content here <span>.</span>
        </p>
        <div>
          <label htmlFor="topicName">
            Lesson topic name
            <input
              type="text"
              name="topicName"
              value={sectionValues.topicName}
              onChange={(e) => handleSectionContentChange(e)}
              onBlur={(e) => handleSectionContentChange(e)}
              placeholder="What is Array?"
              id="topicName"
            />
          </label>

          <label>
            Upload lesson Video
            <p className="upload" onClick={() => uploadWidget()}>
              Upload Video
            </p>
            <span>{videoUrl ? 'Uploaded video' : null}</span>
          </label>
          <p>--- OR ---</p>
          <label htmlFor="videoUrl">
            video url
            <input
              type="text"
              name="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              onBlur={(e) => setVideoUrl(e.target.value)}
              placeholder="http://youtube.com/..."
              id="videoUrl"
            />
          </label>
          <label htmlFor="videoContentDetail">
            Lesson Details about topic
            <textarea
              name="videoContentDetail"
              value={sectionValues.videoContentDetail}
              onChange={(e) => handleSectionContentChange(e)}
              onBlur={(e) => handleSectionContentChange(e)}
              placeholder="Details of the video content"
              id="videoContentDetail"
              rows="5"
            />
          </label>
        </div>
        <br />
        <p>
          Add a Question for the lesson <span>.</span>
        </p>
        <div>
          <label htmlFor="question">
            Question
            <input
              type="text"
              name="question"
              value={sectionQuiz.question}
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
                name={sectionQuiz.option1}
                onChange={(e) => setSelectedOption(e.target.name)}
                checked={selectedOption === sectionQuiz.option1}
              />
              <input
                type="text"
                name="option1"
                value={sectionQuiz.option1}
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
                name={sectionQuiz.option2}
                onChange={(e) => setSelectedOption(e.target.name)}
                checked={selectedOption === sectionQuiz.option2}
              />
              <input
                type="text"
                name="option2"
                value={sectionQuiz.option2}
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
                name={sectionQuiz.option3}
                onChange={(e) => setSelectedOption(e.target.name)}
                checked={selectedOption === sectionQuiz.option3}
              />
              <input
                type="text"
                name="option3"
                value={sectionQuiz.option3}
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
                name={sectionQuiz.option4}
                onChange={(e) => setSelectedOption(e.target.name)}
                checked={selectedOption === sectionQuiz.option4}
              />
              <input
                type="text"
                name="option4"
                value={sectionQuiz.option4}
                onChange={(e) => handleSectionQuizChange(e)}
                placeholder="2"
                id="option4"
              />
            </div>
          </label>
        </div>
        <button type="submit" onClick={(e) => handleAddAnotherSec(e)}>
          {Number(noLesson) === count
            ? 'submit'
            : 'Save and proceed to next lesson'}
        </button>
      </form>
    </Fragment>
  );
}

export default AddCourseSectionPage;
