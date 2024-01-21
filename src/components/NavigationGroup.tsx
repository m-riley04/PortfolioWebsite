import { Link } from "react-router-dom"

interface Button {
    title:string;
    path:string;
}
function NavigationGroup( { buttons } : { buttons:Array<Button> }) {
    return (
        <div className="navigation-group">
            {buttons.map((button, index) => <Link to={button.path} key={index} className="clickable navigation-group-button">{button.title}</Link>)}
        </div>
    );
}

export default NavigationGroup;