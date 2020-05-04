/** @jsx jsx */
import React, { useContext, useEffect, useState } from 'react';
import { jsx, css } from '@emotion/core';
import { ThemeContext } from '../Context/theme/themeContext.js';
import { ScreenReSizeContext } from '../Context/theme/screenResizeContext.js';

const HeaderSection = ({ heading, content, buttonContent, img }) => {
    const themeColors = useContext(ThemeContext);
    const { dimension } = useContext(ScreenReSizeContext);

    return (
        <div
            css={css`
                margin: 0rem auto;
                width: 96%;
                height: 86vh;
                border-radius: 25px;
                background: ${themeColors.secondaryBgColor};
                box-shadow: 0 1rem 1rem 0.5rem rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(1rem);
                display: flex;
                flex-flow: column wrap;
            `}
        >
            <div
                css={css`
                    height: 100%;
                    width: ${dimension.width >= 800 ? '55%' : '94%'};
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: ${dimension.width >= 800
                        ? '0 0 0 5rem'
                        : '2.5rem'};
                    & button {
                        margin-top: 3rem;
                    }
                `}
            >
                <div>
                    <h1>
                        <span>{heading.firstLetter}</span>
                        {heading.remainingLetters}
                        <span>.</span>
                    </h1>
                    <p
                        css={css`
                            width: 80%;
                        `}
                    >
                        {content}
                    </p>
                    <button>{buttonContent || 'Get Started'}</button>
                </div>
            </div>
            {dimension.width >= 800 ? <ImgComp img={img} /> : null}
        </div>
    );
};

const ImgComp = ({ img }) => {
    const [imgSrc, setImgSrc] = useState();
    const getImg = async () => {
        const { default: imgSrc } = await import(
            /* webpackPrefetch: true */ `../images/${img}.svg`
        );
        setImgSrc(imgSrc);
    };

    useEffect(() => {
        getImg();
    }, []);

    return (
        <div
            css={css`
                height: 100%;
                width: 45%;
                display: flex;
                flex-direction: column;
                padding-left: 0%;
                margin: 0;
                justify-content: flex-end;
            `}
        >
            <img
                src={imgSrc}
                alt={img}
                css={css`
                    width: 100%;
                    flex: 0 1 1ch;
                    height: auto;
                    background-size: cover;
                `}
            />
        </div>
    );
};

export default HeaderSection;
