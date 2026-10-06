import { getAllCategories } from "../models/categories.js";

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = "Service Project Categories";
    const description = "Browse our service project categories to find opportunities that match your interests and skills.";

    res.render("categories", { title, description, categories });
}

export { showCategoriesPage };