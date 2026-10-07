import db from "./db.js";

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category;
    `;
    const { rows } = await db.query(query);
    return rows;
};

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            name
        FROM public.category
        WHERE category_id = $1
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            category.category_id,
            category.name
        FROM public.category
        JOIN public.project_category
            ON category.category_id = project_category.category_id
        WHERE project_category.project_id = $1
        ORDER BY category.name
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            service_project.project_id,
            service_project.title,
            service_project.description,
            service_project.location,
            service_project.date,
            service_project.organization_id
        FROM public.service_project
        JOIN public.project_category
            ON service_project.project_id = project_category.project_id
        WHERE project_category.category_id = $1
        ORDER BY service_project.date
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId };