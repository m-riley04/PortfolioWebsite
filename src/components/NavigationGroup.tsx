import { Link } from "react-router-dom"

/** The properties of a button */
interface Button {
    title:string;
    path:string;
}

/**
 * @param {Array<Button>} buttons the buttons/links to display
 * @returns a row of buttons that navigate to their specified path when clicked 
 */
function NavigationGroup( { buttons } : { buttons:Array<Button> }) {
    return (
        <div className="navigation-group">
            {buttons.map((button, index) => <Link to={button.path} key={index} className="clickable navigation-group-button">{button.title}</Link>)}
        </div>
    );
}

export default NavigationGroup;