export default getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};

module.exports = {
    getHomepage: getHomepage
};