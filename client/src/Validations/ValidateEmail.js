// Validate email
const doValidateEmail = email => {
    const regex = /\S+@\S+\.\S+/;

    let response = {
        valid: true,
        response: ""
    }

    // Validate
    if (!regex.test(email)) {
        response.valid = false
        response.response = "Please enter a valid email address!"
    }
    return response
}

export default doValidateEmail;
