// File that contains all request that can be sent to the server

const sendRequest = async (data) => {
    const requestOptions = {
        method: data.method,
        headers: {'Content-Type': 'application/json'},
        body: data.body
    }
    return await fetch(`${process.env.REACT_APP_SERVER_URL}/${data.endpoint}`, requestOptions).then(res => res.json())
}


export default {sendRequest};
