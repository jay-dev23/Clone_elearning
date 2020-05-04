import React from 'react';
import { jsx, css } from '@emotion/core';
import { Link } from '@reach/router';

//components
import HeaderSection from '../components/HeaderSection.js';
import Coursefeed from './courseFeed.js';
import { Fragment } from 'react';

function allcourse()
{
    return(
            <Fragment>
                <HeaderSection
                heading={{
                    firstLetter: 'A',
                    remainingLetters:
                        'n investment in self always pays the best interset'
                }}
                content="Choose from our industry competitive courses and extract yourself"
                img="ReadingDoodle"
            />
            <Coursefeed />
            </Fragment>
    );
}
export default allcourse;