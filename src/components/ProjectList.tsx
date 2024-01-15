import ProjectListItem from '../components/ProjectListItem';
import Project from '../classes/Project';

function ProjectList( { projects } : { projects:Array<Project>}) {
    return (
        <ul className="list-group sidebar">
            {projects.map(project => <ProjectListItem title={project.title}/>)}
        </ul>
    );
}

export default ProjectList;