import RepositoryGridCard from './RepositoryGridCard'
import RepositoryData from '../../classes/RepositoryData';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';

function RepositoryGrid( { repos } : { repos:Array<RepositoryData> } ) {
    const [repositories, setRepositories] = useState([new RepositoryData()]);

    useEffect(() => {
        if (repos != null && repos != undefined) {
            setRepositories(repos);
        } else {
            console.warn("Repos is null.")
        }
    }, []);

    return (
        <>
            <h1>Repositories</h1>
            <div className="grid">
                {repositories.map((repository, index) => <RepositoryGridCard data={repository} key={index}></RepositoryGridCard>)}
            </div>
            <Outlet/>
        </>
    );
}

export default RepositoryGrid;