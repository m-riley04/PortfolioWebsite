import './components/ProjectCard'
import ProjectGrid from './components/ProjectGrid';
import Project from './classes/Project';
import NavigationBar from "./components/NavigationBar";
import ProjectList from './components/ProjectList';

// Test data and projects
const testproject = new Project("Project 1", "This is a test project!", "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhuman&psig=AOvVaw2IwAZ477AIlNpviSfh4nwC&ust=1705374546489000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCKoqW13oMDFQAAAAAdAAAAABAQ");
const testproject2 = new Project("Project 2", "This is a test project!", "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhuman&psig=AOvVaw2IwAZ477AIlNpviSfh4nwC&ust=1705374546489000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCKoqW13oMDFQAAAAAdAAAAABAQ");
const testproject3 = new Project("Project 3", "This is a test project!", "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhuman&psig=AOvVaw2IwAZ477AIlNpviSfh4nwC&ust=1705374546489000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCKoqW13oMDFQAAAAAdAAAAABAQ");
const testproject4 = new Project("Project 4", "This is a test project!", "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhuman&psig=AOvVaw2IwAZ477AIlNpviSfh4nwC&ust=1705374546489000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCKoqW13oMDFQAAAAAdAAAAABAQ");
const testproject5 = new Project("Project 5", "This is a test project!", "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhuman&psig=AOvVaw2IwAZ477AIlNpviSfh4nwC&ust=1705374546489000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCKoqW13oMDFQAAAAAdAAAAABAQ");
const testproject6 = new Project("Project 6", "This is a test project!", "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhuman&psig=AOvVaw2IwAZ477AIlNpviSfh4nwC&ust=1705374546489000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCKoqW13oMDFQAAAAAdAAAAABAQ");
const testproject7 = new Project("Project 7", "This is a test project!", "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhuman&psig=AOvVaw2IwAZ477AIlNpviSfh4nwC&ust=1705374546489000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCKoqW13oMDFQAAAAAdAAAAABAQ");
const testproject8 = new Project("Project 8", "This is a test project!", "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhuman&psig=AOvVaw2IwAZ477AIlNpviSfh4nwC&ust=1705374546489000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCKoqW13oMDFQAAAAAdAAAAABAQ");
const testproject9 = new Project("Project 9", "This is a test project!", "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhuman&psig=AOvVaw2IwAZ477AIlNpviSfh4nwC&ust=1705374546489000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCKoqW13oMDFQAAAAAdAAAAABAQ");

const projects = [testproject, testproject2, testproject3, testproject4, testproject5, testproject6, testproject7, testproject8, testproject9];

function App() {
  return (
    <div className="bg-primary">
      <NavigationBar></NavigationBar>
      <div className="main-container">
        <ProjectList projects={projects}></ProjectList>
        <div className="container">
          <h1>Projects</h1>
          <ProjectGrid projects={projects}/>
        </div>
      </div>
    </div>
  );
}

export default App
