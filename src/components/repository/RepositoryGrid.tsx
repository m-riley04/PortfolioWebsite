import RepositoryCard from './RepositoryCard'
import RepositoryData from '../../classes/RepositoryData';


function RepositoryGrid( {repos, onCardClicked} : {repos:Array<RepositoryData>, onCardClicked:(e:MouseEvent, data:RepositoryData) => void} ) {

    const html = [];
    for (let i = 0; i < repos.length; i++) {
        // Create the project's card component
        const repo = repos[i];
        const repoCard = RepositoryCard({data: repo, onClick:(e, data) => onCardClicked(e, data)});

        // Push it to the html stack
        html.push(repoCard);
    }

    return (
        <>
            <h1>Repositories</h1>
            <div className="grid">
                {html}
            </div>
        </>
    );
}

export default RepositoryGrid;