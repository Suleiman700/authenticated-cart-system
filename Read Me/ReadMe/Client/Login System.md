## User Login System

User logging system is simple and comes through some steps:

1. Filling the login form

#### <ins>Client Side</ins>
All data will be processed before sending it to the server

2. Email & Password will be checked before sending it to the server (and can return error message if needed).
3. Login request will be sent to the server.

#### <ins>Server Side</ins>
4. Server receives the login request.
5. Email & Password will be checked (and can return error message if needed).
6. Server will check if the email exist (and can return error message if needed).
7. Server will compare request password with the stored hashed password (and can return error message if needed).
8. Server will store logged-in session in `DB`.
9. Server will `return success message`

#### <ins>Client Side</ins>
10. Client receives the success message
11. Client will store a local session that contains (user id and secret key)

---

### Note

Anytime the user enters the website, the website will redirect the user to home page if he's already logged-in.

How it works:

Lets say a user is already logged-in and visits the website, The client side will check the local session and send it to the server.

The server will compare that session data with the data that are stored in `DB` and `return success / false`.

And this happens in all website pages, This means that visiting and website page will trigger this function and prevent
non logged-in users from accessing the website and will redirect them to the login page.
