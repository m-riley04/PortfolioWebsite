import { useState } from "react";
import { Dropdown } from "react-bootstrap";


interface Option {
    title: string,
    callback: ()=>void
}

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