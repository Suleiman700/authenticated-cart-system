// Used to check data inside database

module.exports = {
    // Check if email exist in DB
    checkEmailExist: async function (tbl, email) {
        return await tbl.findOne({email: email})
    },
    // Get user cart data
    getUserCart: async function(tbl, user_id) {
        return await tbl.find({user_id: user_id})
    },
    // Get product data
    getProductData: async function (tbl, product_id) {
        return await tbl.findOne({_id: product_id})
    }
}
