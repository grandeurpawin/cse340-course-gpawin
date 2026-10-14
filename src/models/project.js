import db from "./db.js";

const getAllProjects = async () => {

    const query = `
        SELECT
            service_project.project_id,
            service_project.title,
            service_project.description,
            service_project.location,
            service_project.date,
            service_project.organization_id,
            organization.name AS organization_name
        FROM public.service_project
        JOIN public.organization
            ON service_project.organization_id = organization.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
        project_id,
        organization_id,
        title,
        description,
        location,
        date
        FROM public.service_project
        WHERE organization_id = $1
        ORDER BY date;
        `;
    
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
            service_project.project_id,
            service_project.title,
            service_project.description,
            service_project.date,
            service_project.location,
            service_project.organization_id,
            organization.name AS organization_name
        FROM public.service_project
        JOIN public.organization
            ON service_project.organization_id = organization.organization_id
        WHERE service_project.date >= CURRENT_DATE
        ORDER BY service_project.date ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects]; 
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            service_project.project_id,
            service_project.title,
            service_project.description,
            service_project.date,
            service_project.location,
            service_project.organization_id,
            organization.name AS organization_name
        FROM public.service_project
        JOIN public.organization
            ON service_project.organization_id = organization.organization_id
        WHERE service_project.project_id = $1
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
    INSERT INTO public.service_project (title, description, location, date, organization_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error("Failed to create project");
    }

    if (process.env.ENABLE_SQL_LOGGING === "true") {
        console.log("Created new projects with ID:", result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (id, title, description, location, date, organizationId) => {
    const query = `
    UPDATE public.service_project
    SET
    title = $1,
    description = $2,
    location = $3,
    date = $4,
    organization_id = $5
    WHERE project_id =$6
    RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId, id];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error("Failed to update project");
    }
}


const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO public.project_volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING;
    `;

    const queryParams = [userId, projectId];
    await db.query(query, queryParams);
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM public.project_volunteers
        WHERE user_id = $1 AND project_id = $2;
    `;

    const queryParams = [userId, projectId];
    await db.query(query, queryParams);
};

const getVolunteerProjectsByUserId = async (userId) => {
    const query = `
        SELECT
            service_project.project_id,
            service_project.title,
            service_project.description,
            service_project.location,
            service_project.date,
            service_project.organization_id,
            organization.name AS organization_name
        FROM public.project_volunteers
        JOIN public.service_project
            ON project_volunteers.project_id = service_project.project_id
        JOIN public.organization
            ON service_project.organization_id = organization.organization_id
        WHERE project_volunteers.user_id = $1
        ORDER BY service_project.date ASC;
    `;

    const queryParams = [userId];
    const result = await db.query(query, queryParams);

    return result.rows;
};


export {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject,
    addVolunteer,
    removeVolunteer,
    getVolunteerProjectsByUserId
};