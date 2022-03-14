## <ins>Error handling</ins>

Error handling is very important in each project, And making a good error handling makes it
easier to keep track of errors and their reasons.

I've added my own way of error handling.

Error handling file is location in `server/Helpers/Errors.js`

---

Example of error handling:
```
    "FAILED_TO_CREATE_ACCOUNT": {
        code: 400001,
        text: "Sorry, An error occurred while creating your account!",
        info: "An error occurred while creating user account => Error in (createUser) function",
        call: "POST::SubmitRegister",
        ans: "Classes/Register::createUser()"
    },
    "ACCOUNT_CREATED_SUCCESSFULLY": {
        code: 400002,
        text: "Account has been successfully created!",
        call: "POST::SubmitRegister",
        ans: "Classes/Register::createUser()"
    },
```

More description about the error

| #    | Description                                                         |
|------|---------------------------------------------------------------------|
| code | The error code                                                      |
| text | The error text that will be showed in the frontend                  |
| info | More description about the error for the developer (optional)       |
| call | The main function that calls another function (optional)            |
| ans  | The function that received the call and causes the error (optional) |


---
#### How it works

When server faces an error, It will get the error description from the example above.

Lets say that a user is trying to register but the server faces an error while creating his account,

The server will get all the description for error code `FAILED_TO_CREATE_ACCOUNT` and returns the `text` to the frontend.

---

#### How it makes developers life easier

When a user gets an error code, He will contact website owner and give him the error code `Eample: 400001`

The website owner will tell the developer about the error code `400001` and the developer will know ecatly
what is the reason of this error.
