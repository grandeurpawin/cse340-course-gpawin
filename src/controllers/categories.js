import { getAllCategories, getCategoryById, getProjectsByCategoryId, updateCategoryAssignments, getCategoriesByProjectId, createCategory, updateCategory } from "../models/categories.js";
import { getProjectDetails } from "../models/project.js";
import { body, validationResult } from "express-validator";


const categoryValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required.")
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage("Category name must be between 3 and 100 characters.")
];


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


const showNewCategoryForm = (req, res) => {
    const title = "Create New Category";
    res.render("new-category", { title });
};

const processNewCategoryForm = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash("error", error.msg);
        });
        return res.redirect("/new-category");
    }

    try {
        const { name } = req.body;
        await createCategory(name);

        req.flash("success", "Category created successfully.");
        res.redirect("/categories");
    } catch (error) {
        console.error("Error creating category:", error);
        req.flash("error", "Unable to create category.");
        res.redirect("/new-category");
    }
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);

    if (!category) {
        return res.status(404).render("errors/404", {
            title: "Category Not Found"
        });
    }

    const title = "Edit Category";
    res.render("edit-category", { title, category });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash("error", error.msg);
        });
        return res.redirect(`/edit-category/${categoryId}`);
    }

    try {
        const { name } = req.body;
        await updateCategory(categoryId, name);

        req.flash("success", "Category updated successfully.");
        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        console.error("Error updating category:", error);
        req.flash("error", "Unable to update category.");
        res.redirect(`/edit-category/${categoryId}`);
    }
};


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



export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, categoryValidation, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm };