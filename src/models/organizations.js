import { name } from "ejs";
import db from "./db.js";

const getAllOrganizations = async () => {
    const query =
        `SELECT organization_id, name, description, contact_email, logo_filename
    FROM public.organization;
    `;

    const result = await db.query(query);
    return result.rows;
}

const getOrganizationDetails = async (organizationId) => {
    const query =
        `SELECT
        organization_id,
        name,
        description,
        contact_email,
        logo_filename
    FROM public.organization
    WHERE organization_id = $1;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const createOrganization = async (name, description, contact_email, logo_filename) => {
    const query = ` 
    INSERT INTO organization (name, description, contact_email, logo_filename)
    VALUES ($1, $2, $3, $4)
    RETURNING organization_id
    `;

    const queryParams = [name, description, contact_email, logo_filename];
    const result = await db.query(query, queryParams);

    if (result.rows.lenght === 0) {
        throw new Error("Failed to create organization");
    }
    if (process.env.ENABLE_LOGGING === "true") {
        console.log(`Created new organization with ID:`, result.rows[0].organization_id);
    }
    return result.rows[0].organization_id;
};

const updateOrganization = async (organizationId, name, description, contact_email, logoFilename) => {
    const query = `
    UPDATE organization
    SET name = $1, description = $2, contactEmail = $3, logoFilename = $4
    WHERE organization_id = $5
    RETURNING organization_id;
    `;

    const queryParams = [name, description, contact_email, logoFilename, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error("Organization not found");
    }

    if (process.env.ENABLE_SQL_LOGGING === "true") {
        console.log("Updated organization with ID:", organizationId);
    }
    return result.rows[0].organizationId
};

export { getAllOrganizations, getOrganizationDetails, createOrganization, updateOrganization };