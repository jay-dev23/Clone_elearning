/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useContext, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

import { ThemeContext } from '../Context/theme/themeContext.js';
import { Link } from '@reach/router';

const AccordionElem = (props) => {
  const { themeColors, brandColors } = useContext(ThemeContext);
  const isOpen = props.i === props.expanded;

  return (
    <Fragment>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isOpen
            ? brandColors.primaryBrandColor
            : themeColors.ternaryBgColor,
        }}
        onClick={() => props.setExpanded(isOpen ? false : props.i)}
        css={css`
          cursor: pointer;
          height: auto;
          border-radius: 8px;
          margin: 5px 0;
          word-wrap: break-word;
          box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
          p {
            font-size: 16px;
            font-weight: normal;
            letter-spacing: 0;
            word-wrap: break-word;
          }
        `}
      >
        <p>{props.data.title}</p>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <Content
              data={props.data.content}
              bg={themeColors.primaryBgColor}
              color={themeColors.fontColor}
              id={props.id}
              topicId={props.data._id}
            />
          </motion.section>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

const Content = (props) => {
  const NavLink = styled(Link)`
    display: block;
    width: 100%;
    border-radius: 8px;
    background: ${props.bg};
    color: ${props.color};
    padding: 0.5rem 1rem;
    margin: 0.5rem auto;
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
  `;

  const isActive = ({ isCurrent }) => {
    return isCurrent
      ? {
          style: {
            color: '#f28705',
          },
        }
      : {};
  };

  return (
    <motion.div
      variants={{
        collapsed: { scale: 0.96 },
        open: { scale: 1 },
      }}
      transition={{ duration: 0.4 }}
    >
      <ul
        css={css`
          padding: 1rem 0;
        `}
      >
        {props.data.map((lesson) => (
          <NavLink
            to={`/dashboard/courses/${props.id}/player/${props.topicId}/${lesson._id}`}
            key={lesson._id}
            getProps={isActive}
          >
            {lesson.topicName} &rarr;
          </NavLink>
        ))}
      </ul>
    </motion.div>
  );
};

const Accordion = (props) => {
  const [expanded, setExpanded] = useState(0);
  return (
    <div
      css={css`
        width: 96%;
        margin: auto;
        padding: 1rem 0.5rem;
      `}
    >
      {props.accordionContent.map((content, i) => (
        <AccordionElem
          key={i}
          i={i}
          expanded={expanded}
          setExpanded={setExpanded}
          data={content}
          id={props.id}
          // setIndex={props.setIndex}
        />
      ))}
    </div>
  );
};

export default Accordion;
