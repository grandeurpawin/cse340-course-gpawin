import { getAllCategories, getCategoryById, getProjectsByCategoryId, updateCategoryAssignments, getCategoriesByProjectId } from "../models/categories.js";
import { getProjectDetails } from "../models/project.js";

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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = "Assign Categories to Project";
    
    res.render("assign-categories", { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash("success", "Categories updated successfully.");
    res.redirect(`/project/${projectId}`);

};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };