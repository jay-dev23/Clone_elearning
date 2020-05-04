/**@jsx jsx */
import { useContext, useState } from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeContext } from '../Context/theme/themeContext.js';
import { Link, Router } from '@reach/router';
import loadable from '@loadable/component';

import ModeBtn from '../components/ModeBtn.js';

import { ReactComponent as Add } from '../images/add.svg';
import { ReactComponent as MyCourses } from '../images/mycourses.svg';
import { ReactComponent as HamMenu } from '../images/menu.svg';
import { ReactComponent as Profile } from '../images/profile.svg';
import { ReactComponent as AddSec } from '../images/addSec.svg';

import LogoDiv from '../components/Logo.js';
import ProfilePage from './profilePage.js';
import AddCoursePage from './addCoursePage.js';
import AddSection from './AddSection.js';
const InstructionPage = loadable(() => import('./instructionsPage.js'));

const NavLink = styled(Link)`
  display: flex;
            justify-content: flex-start;
            align-items: center;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            color: ${({ themecolors }) => themecolors.fontColor};
            padding: 0.4rem 0.7rem;
            svg {
              margin-right: 1.1rem;
              fill: '#707070';
            }
            :hover {
              background: ${({ themecolors }) => themecolors.secondaryBgColor};
            }
          }
`;

const Dashboard = () => {
  const { themeColors } = useContext(ThemeContext);

  const isActive = ({ isCurrent }) => {
    return isCurrent
      ? {
          style: {
            background: themeColors.secondaryBgColor,
          },
        }
      : {};
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      css={css`
        width: 100%;
        height: 100vh;
        max-height: 100vh;
        max-width: 100vw;
        margin: 0;
        padding: 0 1.5rem 0 0;
        display: flex;
        * + * {
          margin: 0;
          padding: 0;
        }
        header {
          width: 100%;
          padding: 0.5rem;
          background: ${themeColors.primaryBgColor};
          display: flex;
          align-items: center;
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 2px;
        }
        main {
          border-radius: 10px;
          padding: 1rem;
          width: 100%;
          height: 94vh;
          margin: 3vh 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          overflow: auto;
          background: ${themeColors.ternaryBgColor};
        }
        nav {
          width: 100%;
          flex: 2;
          padding: 1rem 0.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          ul {
            width: 94%;
            height: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }
        }
      `}
    >
      <div
        css={css`
          width: 200px;
          display: flex;
          flex-direction: column;
          z-index: 1;
        `}
      >
        <header>
          <LogoDiv />
          <span>A</span>IOC
        </header>
        <nav>
          <ul>
            <NavLink
              to="/signed/dash/instructions"
              themecolors={{
                fontColor: themeColors.fontColor,
                secondaryBgColor: themeColors.secondaryBgColor,
              }}
              getProps={isActive}
            >
              <MyCourses
                style={{ width: '32px', height: '32px', fill: '#707070' }}
              />
              Instructions
            </NavLink>
            <NavLink
              to="/signed/dash/addCourse/"
              themecolors={{
                fontColor: themeColors.fontColor,
                secondaryBgColor: themeColors.secondaryBgColor,
              }}
              getProps={isActive}
            >
              <Add style={{ width: '32px', height: '32px', fill: '#707070' }} />
              add Courses
            </NavLink>
            <NavLink
              to="/signed/dash/addCourseSection/"
              themecolors={{
                fontColor: themeColors.fontColor,
                secondaryBgColor: themeColors.secondaryBgColor,
              }}
              getProps={isActive}
            >
              <AddSec
                style={{ width: '32px', height: '32px', fill: '#707070' }}
              />
              add Courses Section
            </NavLink>
            <NavLink
              to="/signed/dash/profile"
              themecolors={{
                fontColor: themeColors.fontColor,
                secondaryBgColor: themeColors.secondaryBgColor,
              }}
              getProps={isActive}
            >
              <Profile
                style={{ width: '32px', height: '32px', fill: '#707070' }}
              />
              Profile
            </NavLink>
          </ul>
        </nav>
      </div>
      <div
        css={css`
          z-index: 99999;
          transition: margin 0.2s ease-in-out;
          flex: 2;
        `}
        style={{ marginLeft: isOpen ? '0' : '-136px' }}
      >
        <main>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <div
              onClick={() => setIsOpen(!isOpen)}
              css={css`
                border-radius: 4px;
                cursor: pointer;
                :hover {
                  background: ${themeColors.primaryBgColor};
                }
              `}
            >
              <HamMenu
                style={{ width: '32px', height: '32px', fill: '#707070' }}
              />
            </div>
            <ModeBtn />
          </div>
          <div>
            <Router>
              <AddCoursePage path="/addCourse/*" />
              <AddSection path="/addCourseSection" />
              <InstructionPage path="/instructions" />
              <ProfilePage path="/profile" />
            </Router>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
