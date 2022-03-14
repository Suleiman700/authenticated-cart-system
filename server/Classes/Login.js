class Login {

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
}

module.exports = Login;
