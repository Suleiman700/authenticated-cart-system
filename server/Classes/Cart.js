class Cart {

    constructor(tbl, user_id, product_id) {
        this.tbl = tbl
        this.user_id = user_id;
        this.product_id = product_id;
    }

    async checkProductInCart() {
        try {
            return await this.tbl.find({
                $and: [
                    {user_id: this.user_id},
                    {product_id: this.product_id}
                ]
            });
        } catch (err) {
            return err;
        }
    }

    async saveProductInCart() {
        try {
            const fav = new this.tbl({
                user_id: this.user_id,
                product_id: this.product_id
            });

            await fav.save()
            return true;
        } catch (err) {
            return false;
        }
    }

    async removeProductFromCart() {
        try {
            await this.tbl.deleteOne({
                user_id: this.user_id,
                product_id: this.product_id
            })
            return true;
        } catch (err) {
            return false;
        }
    }
}

module.exports = Cart;
