const bcrypt = require("bcrypt");

class Register {

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    // Check email address
    checkEmail() {
        let valid = true
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(this.email)) valid = false
        return valid
    }

    // Check password
    checkPassword() {
        let valid = true
        if (!this.password.length) valid = false
        return valid
    }

    // Create new user
    async createUser(tbl) {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);

        try {
            const user = new tbl({
                email: this.email,
                password: hashedPassword,
            });

            await user.save()
            return true;
        } catch (err) {
            return false;
        }
    }
}

module.exports = Register;
