/*
An item in a ProjectList that contains information about a project

Properties:
    - title: The title of the project
    - thumbnail: The thumbnail of the project
*/
function ProjectListItem({
  title = "title",
  thumbnail = "",
}: {
  title: string;
  thumbnail: string;
}) {
  return (
    <li className="list-group-item project-list-item">
        <img className="img-thumbnail" src={thumbnail} style={{minWidth:"25px", minHeight:"25px"}}></img>
        <h4 className="project-list-item-title">{title}</h4>
    </li>
  );
}

export default ProjectListItem;
