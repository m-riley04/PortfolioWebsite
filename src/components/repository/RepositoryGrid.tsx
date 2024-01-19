import RepositoryGridCard from './RepositoryGridCard'
import RepositoryData from '../../classes/RepositoryData';

function RepositoryGrid( {repos} : {repos:Array<RepositoryData>} ) {
    return (
        <>
            <h1>Repositories</h1>
            <div className="grid">
                {repos.map((repo, index) => <RepositoryGridCard data={repo} key={index}></RepositoryGridCard>)}
            </div>
        </>
    );
}

export default RepositoryGrid;