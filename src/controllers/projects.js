import { getAllProjects } from "../models/project.js";

const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = "Service Projects";
    const description = "Explore the various service projects we have available for volunteers to participate in.";

    res.render("projects", { title, description, projects });
}

export { showProjectsPage };