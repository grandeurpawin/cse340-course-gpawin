import express from "express";

import { showHomePage } from "./controllers/index.js";
import { showOrganizationsPage } from "./controllers/organizations.js";
import { showProjectsPage } from "./controllers/projects.js";
import { showCategoriesPage, showCategoryDetailsPage } from "./controllers/categories.js";
import { testErrorPage } from "./controllers/errors.js";
import { showOrganizationDetailsPage } from "./controllers/organizations.js";
import { showProjectDetailsPage } from "./controllers/projects.js";
import { showNewOrganizationForm } from "./controllers/organizations.js";
import { processNewOrganizationForm } from "./controllers/organizations.js";

const router = express.Router();

// Define the application routes
router.get("/", showHomePage);
router.get("/organizations", showOrganizationsPage);
router.get("/projects", showProjectsPage);
router.get("/categories", showCategoriesPage);
router.get("/category/:id", showCategoryDetailsPage);
router.get("/organization/:id", showOrganizationDetailsPage);
router.get("/project/:id", showProjectDetailsPage);
router.get("/new-organization", showNewOrganizationForm);
router.post("/new-organization", processNewOrganizationForm);
// Error-handling routes
router.get("/test-error", testErrorPage);

export default router;