class Session {

    constructor(tbl, userid, secretKey) {
        this.tbl = tbl;
        this.userid = userid;
        this.secret = secretKey;
    }

    async saveSession() {
        try {
            const session = new this.tbl({
                userid: this.userid,
                secret: this.secret,
            });

            await session.save()
            return true;
        } catch (err) {
            return false;
        }
    }

    async checkSession() {
        try {
            const sessionExist = await this.tbl.find({userid: this.userid, secret: this.secret});
            return !!sessionExist.length;
        } catch (err) {
            return err;
        }
    }

    async deleteSession() {
        try {
            await this.tbl.deleteOne({
                userid: this.userid,
                secret: this.secret
            })
            return true;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
}

module.exports = Session;
