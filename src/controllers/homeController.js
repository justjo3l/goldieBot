let getHomepage = (req, res) => {

    console.log("GH runs");

    return res.render("homepage.ejs");
};

module.exports = {
    getHomepage: getHomepage
};