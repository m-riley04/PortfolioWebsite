function ProjectCard({title="Project Name", description="This is the project description.", image="", url=""}) {
    return (
        <a href={url} style={{color:"white"}}>
            <div style={{backgroundColor:"red", padding:"20px", borderRadius:"20px"}}>
                <img src={image} width="300px" height="300px" ></img>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </a>
    );
}

export default ProjectCard;