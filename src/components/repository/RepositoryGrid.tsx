import RepositoryGridCard from './RepositoryGridCard'
import RepositoryData from '../../classes/RepositoryData';
import NavigationButton_App from '../navigation/NavigationButton_App'

function RepositoryGrid( {repos, onCardClicked} : {repos:Array<RepositoryData>, onCardClicked:(e:MouseEvent, data:RepositoryData) => void} ) {

    const html = [];
    for (let i = 0; i < repos.length; i++) {
        // Create the project's card component
        const repo = repos[i];
        const repoCard = RepositoryGridCard({data: repo, onClick:(e, data) => onCardClicked(e, data)});

        // Push it to the html stack
        html.push(repoCard);
    }

    return (
        <>
            <h1>Repositories</h1>
            <NavigationButton_App title="Home" target="#home"></NavigationButton_App>
            <div className="grid">
                {html}
            </div>
        </>
    );
}

export default RepositoryGrid;