## <ins>Security Notes</ins>

Security is the most important this in any project, And making project secured can be done in many ways.

---

#### Storing Data In DB

All the data should be checked and validated before storing it in the database.

Storing un-checked data can be harmful and causes bad things we don't want to happen.

---

#### A Better Login System

As we know, dealing with login session can be done in different ways, But in the end the are all the same.

Storing login session in `DB` and in `client side`, And need to be validated each time the user browse the website.

The stored sessions in the `DB` should have a `expiration time` which makes it more secure.

Removing login session every few days helps the user to keep remembering his password.

---

#### Sending data to the server

Each time we want to send data for the server, The client side should check and validate the data before sending it.

Checking the data in the client side can sometimes make the server less-busy.

Like checking the empty email field when trying to login, This should be done in client side before sending it to the server.

#### Server receiving data

Each time the server receives data, It should be checked and validated, **Especially** when want to store in `DB`.
