import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** 
 * A component that allows the user to scroll to the top of the body/window when clicked. Appears after the user scrolls for a while.
 */
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        document.body.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [pathname]);

    return null;
}

export default ScrollToTop;