import RepositoriesPageSwitcher from "../switchers/RepositoriesPageSwitcher"
function NavigationButton_App({title, target} : {title:string, target:string}) {

    return (
        <RepositoriesPageSwitcher title={title} target={target}>
            
        </RepositoriesPageSwitcher>
    );
}

export default NavigationButton_App;