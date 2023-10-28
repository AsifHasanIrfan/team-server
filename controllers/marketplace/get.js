// internal import
const Marketplace = require("../../models/marketplace");

module.exports = async (req, res) => {
  try {

    // copying req query
    const queryObject = { ...req.query };

    // excluding fileds
    const excludeFileds = ['sort', 'page', 'limit'];
    excludeFileds.forEach(filed => delete queryObject[filed]);

    const marketplaces = await Marketplace.find(queryObject).sort("-createdAt");
    res.json({
      count: marketplaces.length,
      datas: marketplaces,
      message: "Successfully get all data",
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to get marketplace data",
      success: false
    })
  }
};
