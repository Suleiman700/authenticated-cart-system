import RequestsFunc from "./RequestsFunc"

// Check if logged
const checkLogged = async () => {
    const session = getSession()
    if (!session) return false
    else {
        // Check if local session matches DB session
        const requestOptions = {
            endpoint: "CheckLogged",
            method: "POST",
            body: JSON.stringify({id: session.id, secret: session.secret,})
        }

        const data = await RequestsFunc.sendRequest(requestOptions)
        const statusCode = data.statusCode

        if (statusCode === 200) {
            return true
        } else {
            // Since local session is found but not found in DB => remove local session
            removeSession()
        }
    }
}

// Store local session
const storeSession = (data) => {
    // Session object
    const sessionObj = {
        id: data.data.id,
        secret: data.data.secret
    }

    // Store session
    sessionStorage.setItem('session', JSON.stringify(sessionObj));

    // We can validate if the session has been successfully set (future plan), meanwhile we will return true
    return true
}

// Get local session
const getSession = () => {
    return JSON.parse(sessionStorage.getItem('session'))
}

// Remove local session
const removeSession = () => {
    sessionStorage.removeItem('session')
}

// Remove DB session
const removeDBSession = async () => {
    const session = getSession()
    if (!session) return false
    else {
        const requestOptions = {
            endpoint: "DeleteUserSession",
            method: "DELETE",
            body: JSON.stringify({id: session.id, secret: session.secret,})
        }

        const data = await RequestsFunc.sendRequest(requestOptions)
        return data.statusCode === 200;
    }
}

// Get user id from session
const getSessionUserID = () => {
    const session = getSession()
    if (!session) return false
    return session.id
}

export default {checkLogged, storeSession, getSession, getSessionUserID, removeSession, removeDBSession};
