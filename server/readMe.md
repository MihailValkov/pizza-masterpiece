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
```
### Create '.env' file in the main directory and populate the following information:

- `USER` -- MongoDB Cloud user;
- `PASSWORD` -- MongoDB Cloud password;
- `DB_NAME` -- Database name;
- `SECRET` -- Secret for JWT;
- `AUTH_COOKIE` -- Name of the cookie;
- `ROUNDS` -- Number of bcrypt rounds for hashing a password;
- `CLOUDINARY_NAME` -- Your cloudinary name;
- `CLOUDINARY_API_KEY` -- Your cloudinary api key;
- `CLOUDINARY_API_SECRET` -- Your cloudinary api secret;

If you do not have a MongoDB Cloud account, you can set the value of the `dbConnection` variable to `'mongodb://localhost:27017/{DB_NAME}'`

If you do not have a [cloudinary](https://cloudinary.com/) account, you need to register one. After successful registration you need to visit Account Details to get the information about `Cloud Name`,` API Key` and `API Secret`.
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

To start the server, you must run the following command in your terminal:
```
> npm run dev
```

## Base URL

The Base URL for the API is:

`https://localhost:3005/api`

The documentation below assumes you are pre-pending the Base URL to the endpoints in order to make requests.

# Endpoints: Users

- `/auth/register` -- signing up;
- `/auth/login` -- signing in;
- `/auth/logout` -- logging out;
- `/auth/authenticate` -- authenticate the user;
- `/auth/update-user-image` -- add/update user avatar photo;
- `/auth/update-user-info` -- update user personal information;
- `/auth/update-user-address` -- update user delivery address;
- `/auth/update-user-password` -- change user password;

## Register

Create a new user by sending a `POST` request to `/auth/register` with properties `email`, `password`, `repeatPassword`. The service will respond with an object, containing newly created user and set http only cookie to the user browser.

### Body

```
{
  email: string,
  password: string,
  repeatPassword: string
}
```

## Login

Login by sending a `POST` request with `email` and `password` to `/auth/login`. The service will respond with an user object.

### Body

```
{
  email: string,
  password: string
}
```

## Logout

Send an authorized `POST` request with empty object to `/auth/logout`. The service will respond with an object `{ message: 'Logout is successful' }`, clear a user session, and an HTTP-only cookie.

### Body

```
{}
```

## Authenticate

Send an authorized `GET` request to `/auth/authenticate`. The service will respond with an user object.

## Upload user image

Update current user image by sending an authorized `POST` request to `/auth/update-user-image` with property `image`. The service will respond with an object `{ _id: string, url: string }`

### Body
```
{
  image: File
}
```

## Update personal information

Update current user personal information by sending an authorized `POST` request to `/auth/update-user-info` with properties `firstName`, `lastName` and `phoneNumber`. The service will respond with an object containing newly updated properties.

### Body
```
{
  firstName: string,
  lastName: string,
  phoneNumber:string
}
```

## Update user address

Update current user address by sending an authorized `POST` request to `/auth/update-user-address` with properties `country`, `city`, `street` and `streetNumber`. The service will respond with an object containing newly updated properties.

### Body
```
{
  country: string,
  city: string,
  street: string,
  streetNumber: number
}
```
## Update user password

Update current user password by sending an authorized `POST` request to `/auth/update-user-password` with properties `oldPassword`, `password`, and `repeatPassword`. The service will respond with an object `{ message: 'Password has been changed successfully!' }`.

### Body
```
{
  oldPassword: string,
  password: string,
  repeatPassword: string,
}
```

In case of a validation error, the service will respond with an error status code and an object containing the error message.
```
{
  message: string
}
```

# Endpoints: Products

- `/products` -- get all products;
- `/products/:productId` -- get/update product by provided id;

## Get all products

Send a `GET` request to `/products`. The service will respond with an object containing properties `products` (an array) and `count` (number of all records). This endpoint can accept queries `page` and `limit` for lazy loading the data from the service.

Send a `GET` request to `/products?page=1&&limit=10`. The service will respond with an object, containing properties `products` (an array with maximum 10 records) and `count` (number of all records).
## Get product by id

Send a `GET` request to `/products/{productId}`. The service will respond with an product object.

## Rate product

Send an authorized `PATCH` request to `/products/{productId}` with properties `rate` and `comment`. The service will respond with an object, containing newly calculated rating.
### Body
```
{
  rate: number,
  comment: string,
}
```

# Endpoints: Orders

- `/orders` -- get all orders for the currently logged in user;
- `/orders/:orderId` -- get specific order for the currently logged in user by provided order ID;
- `/orders/:orderId/:productId` -- get an ordered product for a specific order using the provided order ID and product ID for the currently logged in user.

## Get all orders

Send an authorized `GET` request to `/orders`. The service will respond with an object containing properties `ordersList` (an array) and `count` (number of all records). This endpoint can accept queries `page`, `limit`, `sort` and `order`.

Send an authorized `GET` request to `/orders?page=1&limit=5&sort=createdAt&order=desc`. The service will respond with an object, containing properties `ordersList` (an array with a maximum of 5 records, sorted in descending order by createdAt - creation date) and `count` (number of all records).

## Get order

Send an authorized `GET` request to `/orders/{orderId}`. The service will respond with an order object.

## Get product

Send an authorized `GET` request to `/orders/{orderId}/{productId}`. The service will respond with an object, containing information about the desired product.


