import { useState } from "react";
import { Dropdown } from "react-bootstrap";


interface Option {
    title: string,
    callback: ()=>void
}

/**
 * @param {string} title the title to be displayed on the dropdown
 * @param {Array<Option> | undefined} options the options to be displayed when the dropdown is clicked
 * @returns a dropdown component that displays options when clicked
 */
function RepositoryGridDropdown( {title, options} : {title:string, options?:Array<Option> | undefined} ) {
    const [selected, setSelected] = useState(title);
    
    return (
        <Dropdown>
            <Dropdown.Toggle className="clickable">
                {selected}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {options?.map((option, index) => <Dropdown.Item key={index} onClick={() => {
                    option.callback();
                    setSelected(option.title);
                }}>{option.title}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default RepositoryGridDropdown;