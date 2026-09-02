import express from "express";
import { fileURLToPath } from "url";
import path from "path";

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "production";

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


/**
  * Configure Express middleware
  */
// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));


// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));


/**
  * Routes
  */
app.get("/", async (req, res) => {
    const title = "Home";
    const description = "Welcome to the CSE 340 Service Network, a platform connecting volunteers with organizations and projects.";
    res.render("home", { title, description });
})

app.get("/organizations", async (req, res) => {
    const title = "Our Partner Organizations";
    const description = "Discover the amazing organizations we partner with to make a difference in our community.";
    res.render("organizations", { title, description });
});

app.get("/projects", async (req, res) => {
    const title = "Service Projects";
    const description = "Explore the various service projects we have available for volunteers to participate in.";
    res.render("projects", { title, description });
});

app.get("/categories", async (req, res) => {
    const title = "Service Project Categories";
    const description = "Browse our service project categories to find opportunities that match your interests and skills.";
    res.render("categories", { title, description });
});

// app.get("/volunteers", async (req, res) => {
//     const title = "Volunteers";
//     const description = "Learn more about our volunteer opportunities and how you can get involved.";
//     res.render("volunteers", { title, description });
// });

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});