import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
    const location = useLocation();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const prevPath = useRef(location.pathname);

    useEffect(() => {
        if (prevPath.current !== location.pathname) {
            setIsTransitioning(true);
            // Wait for exit animation
            const timeout = setTimeout(() => {
                setDisplayChildren(children);
                setIsTransitioning(false);
                window.scrollTo({ top: 0, behavior: 'instant' });
                prevPath.current = location.pathname;
            }, 250);
            return () => clearTimeout(timeout);
        } else {
            setDisplayChildren(children);
        }
    }, [children, location.pathname]);

    return (
        <div
            className={`page-transition ${isTransitioning ? 'page-exit' : 'page-enter'}`}
            style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'translateY(12px)' : 'translateY(0)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                minHeight: '100vh',
            }}
        >
            {displayChildren}
        </div>
    );
};

export default PageTransition;
