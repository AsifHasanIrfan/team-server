// internal import
const MarketplaceApply = require("../../models/marketplaceApply");

module.exports = async (req, res) => {
    try {
        // copying req query
        const queryObject = { ...req.query };

        // excluding fileds
        const excludeFileds = ['sort', 'page', 'limit'];
        excludeFileds.forEach(filed => delete queryObject[filed]);

        const datas = await MarketplaceApply.find(queryObject).populate("marketplaceId", "-__v").populate("user", "firstName lastName dgCoin appliedMarketplaceJobs assigneddMarketplacesJobs").sort("-createdAt");

        res.json({
            count: datas.length,
            datas: datas,
            message: "Successfully get all data",
            success: true,
        });
    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to get marketplace apply data",
            success: false
        })
    }
};
