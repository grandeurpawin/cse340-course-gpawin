import db from "./db.js";

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category;
    `;
    const { rows } = await db.query(query);
    return rows;
};

const getCategoriesWithProjects = async () => {
    const query = `
        SELECT
            category.name AS category_name,
            service_project.title AS project_title
        FROM public.category
        JOIN public.project_category
            ON category.category_id = project_category.category_id
        JOIN public.service_project
            ON project_category.project_id = service_project.project_id
        ORDER BY category.name, service_project.title;
    `;

    const { rows } = await db.query(query);
    return rows;
};

export { getAllCategories };
export { getCategoriesWithProjects };