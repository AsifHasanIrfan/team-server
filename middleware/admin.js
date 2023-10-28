// verify a admin
const admin = async (req, res, next) => {
    if (req.user.role !== "admin") {
       return res.json({ message: "Contact Admin for more information!", success: false });
    } else {
       next();
    }
}
module.exports = admin;