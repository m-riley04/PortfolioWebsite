import RepositoryCard from './RepositoryCard'
import RepositoryData from '../../classes/RepositoryData';


function RepositoryGrid( {repos} : {repos:Array<RepositoryData>} ) {

    const html = [];
    for (let i = 0; i < repos.length; i++) {
        // Create the project's card component
        const repo = repos[i];
        const repoCard = RepositoryCard({title: repo.name, description: repo.description, image: repo.image});

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