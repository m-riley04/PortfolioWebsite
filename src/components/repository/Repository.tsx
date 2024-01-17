import RepositoryData from "../../classes/RepositoryData";

function Repository({ data } : { data:RepositoryData }) {


    return (
        <div className="container repo">
            <div className="row">
                <div className="col">
                    <h1>{data.name}</h1>
                </div>
                <div className="col">
                    
                </div>
                <div className="col">

                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>{data.language}</p>
                </div>
                <div className="col">

                </div>
                <div className="col">
                    
                </div>
            </div>
        </div>
    );
}

export default Repository;