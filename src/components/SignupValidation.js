function Validation(values) {
    let error = {}
    const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const password_pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if(values.email === "") {
        error.username = "Username Should not be empty"
    } else {
        error.username = ""
    }

    if(values.email === "") {
        error.email = "Email Should not be empty"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    } else {
        error.email = ""
    }

    if(values.password === "") {
        error.password = "Password Should not be empty"
    } else if(!password_pattern.test(values.password)) {
        error.password = "Password didn't match"
    } else {
        error.password = ""
    }

    if(values.confirmPassword === "") {
        error.confirmPassword = "Confirm Password Should not be empty"
    }else {
        error.confirmPassword = ""
    }

    return error;
}

export default Validation;