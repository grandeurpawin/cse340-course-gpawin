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

const getProjectByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
        project_id,
        organization_id,,
        title,
        description,
        location,
        date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
        `;
    
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

export { getAllProjects, getProjectByOrganizationId };