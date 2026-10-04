import db from "./db.js";

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category;
    `;
    const { rows } = await db.query(query);
    return rows;
};

export { getAllCategories };