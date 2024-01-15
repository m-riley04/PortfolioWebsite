import "./ProjectGrid.css"
import ProjectCard from './ProjectCard'
import Project from '../classes/Project';

function ProjectGrid( {projects} : {projects:Array<Project>} ) {

    const html = [];
    for (let i = 0; i < projects.length; i++) {
        // Create the project's card component
        const project = projects[i];
        const projectCard = ProjectCard({title: project.title, description: project.description, image: project.image});

        // Push it to the html stack
        html.push(projectCard);
    }

    return (
        <div className="grid">
            {html}
        </div>
    );
}

export default ProjectGrid;