## User Register System

User registering system is simple and comes through some steps:

1. Filling the register form

#### <ins>Client Side</ins>
All data will be processed before sending it to the server

2. Email & Password will be checked before sending it to the server (and can return error message if needed).
3. Register request will be sent to the server.

#### <ins>Server Side</ins>
4. Server receives the register request.
5. Email & Password will be checked before saving it in `DB` (and can return error message if needed).
6. Server will check if the email is already in use (and can return error message if needed).
7. Server will create new user with hashes password and `return success message`.
