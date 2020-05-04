/** @jsx jsx */
import React, { useContext, Fragment } from 'react';
import { jsx, css } from '@emotion/core';
//
//components
import { ThemeContext } from '../Context/theme/themeContext.js';
import HeaderSection from '../components/HeaderSection.js';
import { ScreenReSizeContext } from '../Context/theme/screenResizeContext.js';
//images
import web_developer from '../images/web_developer.svg';
import cloud_computing from '../images/cloud_computing.svg';
import mobile_marketing from '../images/mobile_marketing.svg';
import twitter_1 from '../images/twitter_1.jpeg';
import twitter_2 from '../images/twitter_2.jpeg';
import ReadingSideDoodle from '../images/ReadingSideDoodle.svg';
import adelaide from '../images/adelaide-logo.svg';
import columbia from '../images/columbia-logo.svg';
import lpu from '../images/lpulogo.svg';
import amity from '../images/amity.svg';
import galgotias from '../images/galgotias.svg';
import sw from '../images/sw.svg';
import un from '../images/un.svg';
import undraw_g1 from '../images/undraw_g1.svg';
import undraw_g2 from '../images/undraw_g2.svg';
import undraw_g3 from '../images/undraw_g3.svg';
import undraw_g4 from '../images/undraw_g4.svg';

// import data from '../data.js';
//dynamically load the images

// const getImg = async img => {
//     const { default: imgSrc } = await import(
//         /* webpackPrefetch: true */ `../assets/${img}.svg`
//     );
//     // console.log(imgSrc);
//    return imgSrc;

// };
const hotCourses = [
  {
    imgsrc: web_developer,
    courseName: 'Server-Side Development',
    content: 'Server side development with NodeJs,Express and mongoDB',
  },
  {
    imgsrc: cloud_computing,
    courseName: 'Digital Marketng',
    content: 'search engine optimization, social media, pay-per-click',
  },
  {
    imgsrc: mobile_marketing,
    courseName: 'Cloud Computing',
    content:
      'search engine optimization, social media, pay-per-click, conversion optimization',
  },
];
const courseintro = [
  {
    imgsrc: undraw_g2,
    courseName: '3000+',
    content: 'Satisfied Students and Freshers',
  },
  {
    imgsrc: undraw_g1,
    courseName: '10000+',
    content: 'Persnalized Coaching Sessions',
  },
  {
    imgsrc: undraw_g3,
    courseName: '700+',
    content: 'Job and Internship Offers',
  },
  {
    imgsrc: undraw_g4,
    courseName: '600+',
    content: 'industry Expert and & Advisors ',
  },
];
const WhatPeople = [
  {
    imgsrc: twitter_1,
    twitterResponse:
      'Its the best institute in India to kick start your CYBER SECURITY career. All the faculties are dedicated to build up your career,GREAT THANKS TO @AIOC..🤘',
  },
  {
    imgsrc: twitter_2,
    twitterResponse:
      'What a great investment of time and money made by students for their careers. ALL IN ONE CYBERTEAM is a great platform for enthusiastic learners.GREAT THANKS TO @AIOC..🤘 ',
  },
];
const logos = [
  {
    img: lpu,
  },
  {
    img: sw,
  },
  {
    img: amity,
  },
];
const otherlogo = [
  {
    img: lpu,
  },
  {
    img:amity,
  },
  {
    img: galgotias ,
  },
];
function Home() {
  const { themeColors } = useContext(ThemeContext);
  const { dimension } = useContext(ScreenReSizeContext);
  return (
    <Fragment>
      <HeaderSection
        heading={{
          firstLetter: 'L',
          remainingLetters:
            'earn the best tools and frameworks from industry pros',
        }}
        content="Choose your course to success -Build skills with courses,grab certificates"
        img="SitReadingDoodle"
      />
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-start;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <p css={css``}></p>
          {otherlogo.map((course, index) => (
            <img
              css={css`
                margin: 2px;
                margin-left:5px;
                width: 110px;
                height: 100px;
                @media (min-width: 480px) {
                  margin-left:18px;
                  width: 180px;
                  height: 150px;
                }
              `}
              src={course.img}
            />
          ))}
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          {logos.map((course, index) => (
            <img
              css={css`
                margin: 0px;
                margin-left:5px;
                width: 110px;
                height: 100px;
                @media (min-width: 480px) {
                  margin-left:0px;
                  width: 180px;
                  height: 150px;
                }
              `}
              src={course.img}
            />
          ))}
        </div>
      </div>

      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          h4 {
            font-size: 1.5rem;
            margin: 2rem 0;
          }
          h5 {
            font-size: 1rem;
          }
        `}
      >
        <h4>
          <span>Hot</span> courses
        </h4>
        <div
          css={css`
            display: flex;
            margin-bottom: 2rem;
            flex-flow: row wrap;
          `}
        >
          {hotCourses.map((course, index) => (
            <div
              key={index}
              css={css`
                flex: 1;
                padding: 1rem;
                margin: 3rem 1rem;
                background: ${themeColors.secondaryBgColor};
                text-align: center;
                border-radius: 8px;
                box-shadow: 0 0.5rem 0.6rem rgba(0, 0, 0, 0.3);
              `}
            >
              <img
                css={css`
                  margin-top: calc(-150px + 4rem);
                `}
                src={course.imgsrc}
                width="150rem"
                height="150rem"
              />
              <div
                css={css`
                  width: 80%;
                  margin: auto;
                `}
              >
                <h5>{course.courseName}</h5>
                <p>{course.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        css={css`
          width: 100%;
          height: 10%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          border-radius: 10px;
          h4 {
            font-size: 2.5rem;
            margin: 1rem 0;
          }
          h5 {
            font-size: 1.6rem;
          }
        `}
      >
        {courseintro.map((course, index) => (
          <div
            key={index}
            css={css`
              flex: 1;
              padding: 1rem;
              margin: 1.5rem 1rem 0rem;
              background: ${themeColors.secondaryBgColor};
              text-align: center;
              border-radius: 8px;
              box-shadow: 0 0.5rem 0.6rem rgba(0, 0, 0, 0.3);
            `}
          >
            <img src={course.imgsrc} width="150rem" height="150rem" />
            <div
              css={css`
                width: 80%;
                margin: auto;
              `}
            >
              <h5>{course.courseName}</h5>
              <p>{course.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          h4 {
            font-size: 1.5rem;
            margin: 2rem 0;
          }
          h5 {
            font-size: 1rem;
          }
        `}
      >
        <h4>
          <span>Why</span> Learners enjoy AIOC
        </h4>
        <div
          css={css`
            display: flex;
            margin-bottom: 2rem;
            flex-flow: row wrap;
          `}
        >
          {WhatPeople.map((course, index) => (
            <div
              key={index}
              css={css`
                flex: 1;
                padding: 1rem;
                margin: 3rem 1rem;
                background: ${themeColors.secondaryBgColor};
                text-align: center;
                border-radius: 8px;
                box-shadow: 0 0.5rem 0.6rem rgba(0, 0, 0, 0.3);
              `}
            >
              <img
                css={css`
                  margin-top: calc(-150px + 4rem);
                  border-radius: 80px;
                `}
                src={course.imgsrc}
                width="120rem"
                height="120rem"
              />
              <div
                css={css`
                  width: 80%;
                  margin: auto;
                `}
              >
                <h5>{course.twitterResponse}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          h4 {
            font-size: 1.5rem;
            margin: 2rem 0;
            text-align:center;
          }
          h5 {
            font-size: 1rem;
          }
        `}
      >
        <div
          css={css`
            width: 100%;
          `}
        >
          <h4>
            What is AIOC <span>?</span>
          </h4>
          <p style={{ color: '#707070 ',textAlign:'center' }}>
            <span>AIOC</span> is group of working web devlopment professional
            and open source{<br />} contibutors that provide you with
            concise,information dense video course{<br />} on the best tools in
            the industry.{<br />}
            {<br />}We are dedicate to respecting your time. This means that
            AICO courses ge {<br />}to the point and deliver knowledge.
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;

