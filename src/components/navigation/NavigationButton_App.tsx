import React from 'react';
import AppPageSwitcher from "../switchers/AppPageSwitcher"
function NavigationButton_App({title, target} : {title:string, target:string}) {

    return (
        <AppPageSwitcher title={title} target={target}>
            
        </AppPageSwitcher>
    );
}

export default NavigationButton_App;