## <ins>Read Me</ins>

Hello there :)

I've tried to explain everything in the .md files, but due to the lack of time some things are not explained but can
understand just by looking at the source code.

---

Here are some information about the `.md` files that I have wrote.

| Folder | Description          |
|--------|----------------------|
| Client | Client `.md` files   |
| DB     | Database `.md` files |
| Notes  | Some important notes |
| Server | Server `.md` files   |


---

### Setting Up Server & Client

Server listens on port `3001`
* cd server
* npm install
* npm start

Client listens on port `3000`
* cd client
* npm install
* npm start

---

### .env File

`.env` file contains the base url of the server

`.env` file located in: `/client/.env`

```
.env file - in case it is missing:

# Server URL
REACT_APP_SERVER_URL=http://localhost:3001

Add to to: "/client/.env"

```

---

### Database

After staring the server, It will automatically create the database and collections.

You will just need to import the `products collection`

Pre-made products collection is located in: `/Collections/products.json`

Import the products json data to mongo: `abra-db/products`

---

### Contact Me
Email address: [soleman630@gmail.com](mailto:soleman630@gmail.com)

My GitHub: [GitHub](https://github.com/Suleiman700)
