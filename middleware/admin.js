// verify a admin
const admin = async (req, res, next) => {
    if (req.user.role !== "admin") {
       return res.json({ message: "Contact Digital Gregg for more information!", success: false });
    } else {
       next();
    }
}
module.exports = admin;