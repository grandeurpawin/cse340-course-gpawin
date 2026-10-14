import {
    getUpcomingProjects,
    getProjectDetails,
    addVolunteer,
    removeVolunteer,
} from "../models/project.js";
import { getCategoriesByProjectId } from "../models/categories.js";
import { createProject } from "../models/project.js";
import { getAllOrganizations } from "../models/organizations.js";
import { body, validationResult } from "express-validator";
import { updateProject, getVolunteerProjectsByUserId } from "../models/project.js";

const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];


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

    const user = req.session.user;
    let isVolunteer = false;

    if (user) {
        const volunteerProjects = await getVolunteerProjectsByUserId(user.user_id);

        isVolunteer = volunteerProjects.some(
            volunteerProject =>
                Number(volunteerProject.project_id) === Number(projectId)
        );
    }

    const title = project.title;
    const description = project.description;

    res.render("project", {
        title,
        description,
        project,
        categories,
        user,
        isVolunteer
    });
};


const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = "Add New Service Project";

    res.render("new-project", { title, organizations });
}

const processNewProjectForm = async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-project');
    }

    //Extract form data from req.body
    const { title, description, location, date, organizationId } = req.body;

    try {
        //Create the new project in the database
        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash("success", "New service project created successfully!");
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error("Error creating new project:", error);
        req.flash("error", "There was an error creating the service project.");
        res.redirect("/new-project");
    }
}

const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();

    const title = "Edit Service Project";

    res.render("edit-project", {
        title,
        project,
        organizations
    });
};

const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash("error", error.msg);
        });

        return res.redirect(`/edit-project/${projectId}`);
    }

    const { title, description, location, date, organizationId } = req.body;

    try {
        await updateProject(
            projectId,
            title,
            description,
            location,
            date,
            organizationId
        );

        req.flash("success", "Service project updated successfully!");
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error("Error updating service project:", error);
        req.flash("error", "There was an error updating the service project.");
        res.redirect(`/edit-project/${projectId}`);
    }
};


const processVolunteerSignup = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    try {
        await addVolunteer(userId, projectId);

        req.flash("success", "You are now volunteering for this project!");
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error("Error signing up to volunteer:", error);

        req.flash("error", "Unable to sign up for this project.");
        res.redirect(`/project/${projectId}`);
    }
};

const processVolunteerRemoval = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    try {
        await removeVolunteer(userId, projectId);

        req.flash("success", "You have removed yourself from this project.");
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error("Error removing volunteer signup:", error);

        req.flash("error", "Unable to remove your volunteer signup.");
        res.redirect(`/project/${projectId}`);
    }
};


export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm,
    processVolunteerSignup,
    processVolunteerRemoval
};