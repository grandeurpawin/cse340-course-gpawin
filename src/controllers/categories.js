import { getAllCategories, getCategoryById, getProjectsByCategoryId } from "../models/categories.js";

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = "Service Project Categories";
    const description = "Browse our service project categories to find opportunities that match your interests and skills.";

    res.render("categories", { title, description, categories });
}

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);

    const title = category.name;
    const description = `Service projects in the ${category.name} category.`;

    res.render("category", { title, description, category, projects });
}

export { showCategoriesPage, showCategoryDetailsPage };