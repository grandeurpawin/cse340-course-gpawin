import { getUpcomingProjects, getProjectDetails } from "../models/project.js";
import { getCategoriesByProjectId } from "../models/categories.js";
import { createProject } from "../models/project.js";
import { getAllOrganizations } from "../models/organizations.js";

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
    const categories = await getCategoriesByProjectId(projectId);

    const title = project.title;
    const description = project.description;

    res.render("project", { title, description, project, categories });
}

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = "Add New Service Project";

    res.render("new-project", { title, organizations });
}

const processNewProjectForm = async (req, res) => {
    //Extract form data from req.body
    const { title, description, location, date, organizationId } = req.body;

    try {
        //Create the new project in the database
        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash(("success", "New service project created successfully!"));
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error("Error creating new project:", error);
        req.flash("error", "There was an error creating the service project.");
        res.redirect(`/new-project`);
    }
}

export { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm };