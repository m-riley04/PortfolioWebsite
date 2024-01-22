import RepositoryData from "../classes/RepositoryData";

const DUMMY_REPO_COUNT = 20;
const DummyRepositories:RepositoryData[] = [];

for (let i = 0; i < DUMMY_REPO_COUNT; i++) {
    const repo = new RepositoryData(
        `Repository ${i}`, 
        "This is a little description of the repository. They could get a little long at times!", 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        "../src/assets/crying-cat.jpg"
    );
    DummyRepositories.push(repo);
}

export default DummyRepositories;