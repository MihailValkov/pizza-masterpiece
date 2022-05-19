# Angular Application - Pizza Masterpiece

## 🛠 Libraries and tools used

- [Angular](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [NGRX Store](https://ngrx.io/guide/store)
- [NGRX Effects](https://v10.ngrx.io/guide/effects)
- [NGRX Devtools](https://ngrx.io/guide/store-devtools)
- [Angular Material](https://material.angular.io/)
- [Cloudinary](https://cloudinary.com/)
- [Rxjs](https://rxjs.dev/guide/overview)
- [Angular Infinite Scroll](https://www.npmjs.com/package/ngx-infinite-scroll)
- [Custom API]()

## Getting Started

Clone this repository and install dependencies

```
> git clone https://github.com/MihailValkov/pizza-masterpiece.git
> cd client
> npm install
> ng serve
> cd ../server
> npm install
> read the server documentation and make the necessary configuration
> npm run dev
> go to http://localhost:4200
```

**NOTE: Don't forget to read the documentation about the CUSTOM API, you can find it [here](https://github.com/MihailValkov/pizza-masterpiece/blob/main/server/readMe.md).**

## Application Overview

The application allows visitors to browse through the catalog (list of products).
Guest and logged-in users can save products to wishlist (favorites) or cart and can make orders.
Guest users may register with an email and password which allows them to view their own profile by clicking [Account -> Your Profile] in the navigation bar and the opportunity to edit their own profile information. Also can access their own orders page and add review to the products. Admin users can access the "Administrator" menu and they can create a new product, update users and orders information.

# Permissions:

| **Permissions** | Guest | Logged in User | Admin |
| --------------- | ----- | -------------- | ----- |
| Login/ Register | ✅    | ❌             | ❌    |
| Home page       | ✅    | ✅             | ✅    |
| Details         | ✅    | ✅             | ✅    |
| Cart            | ✅    | ✅             | ✅    |
| Favorites       | ✅    | ✅             | ✅    |
| Checkout        | ✅    | ✅             | ✅    |
| Profile         | ❌    | ✅             | ✅    |
| My Orders       | ❌    | ✅             | ✅    |
| Create Product  | ❌    | ❌             | ✅    |
| Admin Users     | ❌    | ❌             | ✅    |
| Admin Orders    | ❌    | ❌             | ✅    |
| Admin Products  | ❌    | ❌             | ✅    |

## Application Structure

### Public part (accessible without authentication)

- Catalog (Home page) - This page is `loading lazily`. When the user open the page for the first time, up to 8 products from the database are displayed and the data will continue to load when the user reaches the bottom of the content.
- Login - allows a user to gain access to an application by entering their `email` and `password`;
- Register - allows a visitors to create a new account by entering their `email`, `password` and `repeat password`;
- Product detail - A product detail page provides information for a specific product. This information includes `size`, `dough`, `ingredients`, `possible extras`, `final price`, and other relevant information customers want to know before purchasing;
- Cart - The shopping cart is a place where customers can store the products they can buy after viewing the goods.
- Favorites - A wishlist of products that a customer can save to transfer to the cart later;
- Checkout - This process starts the moment a customer decides they've filled their cart with everything they wanted and are ready to place their order;

### Private part (available for registered users)

- Profile - Detail page that provides information about the current user. Allows the user to attach a profile picture, change their personal information, delivery address and current password;
- My Orders - Table of all created orders for the current user;
- Order detail - Detail information about the current orders and list of all products;
- Rate product - Allows customers to share more detail about their purchase and to leave product review, which includes the consumer's star rating as well as a short explanation for its score.

### Admin part (accessible for admin users)

- Creating a new product
- All users - Table of all registered users;
- User detail - Detail information about the current user and opportunity to update user status/role;
- All Orders - Table of all created orders;
- Order detail - Detail information about the current order and opportunity to update order status;
- All Products - Table of all created products;