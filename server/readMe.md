# Custom Server

## 🛠 Libraries and tools used
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Cookie Parser](https://github.com/expressjs/cookie-parser)
- [Cors](https://github.com/expressjs/cors)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Cloudinary](https://github.com/cloudinary/cloudinary_npm)
- [Multer](https://github.com/expressjs/multer)
- [Nodemon](https://github.com/remy/nodemon)

## Getting Started
Clone this repository and install dependencies
```
> git clone https://github.com/MihailValkov/pizza-masterpiece.git
> cd server
> npm install
> create '.env' file.
> npm run dev
```
### Create '.env' file in the main directory and populate the following data:

* `USER` -- MongoDB Cloud user;
* `PASSWORD` -- MongoDB Cloud password;
* `DB_NAME` -- Database name;
* `SECRET` -- Secret for JWT;
* `AUTH_COOKIE` -- Name of the cookie;
* `ROUNDS` -- Number of bcrypt rounds for hashing a password;
* `CLOUDINARY_NAME` -- Your cloudinary name;
* `CLOUDINARY_API_KEY` -- Your cloudinary api key;
* `CLOUDINARY_API_SECRET` -- Your cloudinary api secret;

If you do not have a MongoDB Cloud account, you can set the value of the `dbConnection` variable to `'mongodb://localhost:27017/{DB_NAME}'`

If you do not have a [cloudinary](https://cloudinary.com/) account, you need to register. After successful registration you need to visit Account Details to get the information about `Cloud Name`,` API Key` and `API Secret`.
You need to create "Upload presets". To do this you need to click on the "Settings" button in the navigation, then select "Upload" and at the end of the page you will find a link "Add upload preset". After clicking on this link, it will take you to the required page and you will be able to create "Upload presets"


You need to create the following `Upload presets`:

```
Upload preset name: pizza-masterpiece-products
Signing Mode: Signed
Folder: pizza-masterpiece/images/products
```

```
Upload preset name: pizza-masterpiece-users
Signing Mode: Signed
Folder: pizza-masterpiece/images/users
```

## Base URL

The Base URL for the API is:

```https://localhost:3005/api```

The documentation below assumes you are pre-pending the Base URL to the endpoints in order to make requests.

# Endpoints: Users

* ```/auth/register``` -- signing up;
* ```/auth/login``` -- signing in;
* ```/auth/logout``` -- logging out;
* ```/auth/edit-profile``` -- edit `user` information;
* ```/auth/edit-user-photo``` -- edit `user` **cover** or **avatar** photo;

## Register
Create a new user by sending a `POST` request to `/auth/register` with properties `email`, `password`, `repeatPassword` and `gender`.
