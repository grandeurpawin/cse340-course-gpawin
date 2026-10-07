import { getUpcomingProjects, getProjectDetails } from "../models/project.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = "Upcoming Service Projects";
    const description = "Explore the various service projects we have available for volunteers to participate in.";

    res.render("projects", { title, description, projects });
}

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const title = project.title;
    const description = project.description;

    res.render("project", { title, description, project });
}

export { showProjectsPage, showProjectDetailsPage };