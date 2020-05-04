import React, { useEffect, useState, createContext, Children } from 'react';

export const ScreenReSizeContext = createContext({});

function debounce(fn, ms) {
    let timer;
    return _ => {
        clearTimeout(timer);
        timer = setTimeout(_ => {
            timer = null;
            fn.apply(this, arguments);
        }, ms);
    };
}

function Resize({ children }) {
    const [dimension, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        }, 1000);
        console.log(dimension);
        window.addEventListener('resize', debouncedHandleResize);

        return _ => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    });

    return (
        <ScreenReSizeContext.Provider value={{ dimension }}>
            {children}
        </ScreenReSizeContext.Provider>
    );
}

export default Resize;
