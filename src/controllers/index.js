
const showHomePage = (req, res) => {
    const title = "Home";
    const description = "Welcome to the CSE 340 Service Network, a platform connecting volunteers with organizations and projects.";

    res.render("home", { title, description });
}

export { showHomePage };