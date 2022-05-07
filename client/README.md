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
> ng build
> cd ../server
> npm install
> npm start
> go to http://localhost:3005
```
**NOTE: Don't forget to read the documentation about the CUSTOM API, you can find it [here]().**

## Application Overview

# Permissions:

| **Permissions** | Guest   | Logged in User  | Admin           |
| --------------- | -----   | --------------  | --------------  |
| Login/ Register | ✅     | ❌              | ❌              |
| Home page       | ✅     | ✅              | ✅              |
| Details         | ✅     | ✅              | ✅              |
| Cart            | ✅     | ✅              | ✅              |
| Favorites       | ✅     | ✅              | ✅              |
| Checkout        | ✅     | ✅              | ✅              |
| Profile         | ❌     | ✅              | ✅              |
| My Orders       | ❌     | ✅              | ✅              |
| Create Product  | ❌     | ❌              | ✅              |
| Admin Users     | ❌     | ❌              | ✅              |
| Admin Orders    | ❌     | ❌              | ✅              |
| Admin Products  | ❌     | ❌              | ✅              |

## Application Structure

### Public part (accessible without authentication)
### Private part (available for registered users)
### Admin part (accessible for admin users)

## Pages:

### Public Pages (logged out users):

Navigation bar
![Navigation](https://github.com/MihailValkov/pizza-masterpiece/blob/main/pages/Navigation.png)

Home page
![Home Page]()

Login page
![Login Page](https://github.com/MihailValkov/pizza-masterpiece/blob/main/pages/Login.png)

Register page
![Register Page](https://github.com/MihailValkov/pizza-masterpiece/blob/main/pages/Register.png)

Detail page
![Detail Page](https://github.com/MihailValkov/pizza-masterpiece/blob/main/pages/Detail.png)

Cart page - empty
![Cart page](https://github.com/MihailValkov/pizza-masterpiece/blob/main/pages/Cart-empty.png)

Cart page
![Cart page](https://github.com/MihailValkov/pizza-masterpiece/blob/main/pages/Cart.png)

Favorites page - empty
![Favorites page](https://github.com/MihailValkov/pizza-masterpiece/blob/main/pages/Favorites-empty.png)

Favorites page
![Favorites page](https://github.com/MihailValkov/pizza-masterpiece/blob/main/pages/Favorites.png)

Not Found page
![Not Found Page]()



### Private Pages (logged in users):

### Admin Pages:
