# InOut QR - Backend Server

Welcome to the backend server of **InOut QR**, a modern attendance tracking and timesheet management application using QR code scanning.

This backend is built with:

- Node.js
- Express.js
- PostgreSQL (via pg and pg.Pool)

---

## 📊 Project Structure

```
/backend
  /config
    db.js           # Database connection (using pg.Pool)
  /controllers
    employeeController.js
    adminController.js
  /middleware
    authMiddleware.js
  /models
    employeeModel.js
    adminModel.js
  /routes
    employeeRoutes.js
    adminRoutes.js
  server.js          # Entry point for the backend server
.env                  # Environment variables
package.json          # Project dependencies and scripts
.gitignore            # Ignored files (node_modules, .env, etc.)
```

---

## 👨‍💼 Setup Instructions

### 1. Install dependencies

Navigate to the backend directory and install the required node modules:

```bash
npm install express cors body-parser dotenv pg
```

---

### 2. Create a `.env` file

Create a `.env` file in your backend root with the following content:

```env
PORT=5000
DATABASE_URL=postgresql://youruser:yourpassword@yourhost:yourport/yourdbname
NODE_ENV=development
```

> Example:
>
> `DATABASE_URL=postgresql://admin:password123@localhost:5432/inoutqr`

---

### 3. Database Connection

We use a PostgreSQL database with connection pooling via `pg.Pool`.

The connection is established inside `config/db.js` and used throughout the project.

---

### 4. Starting the Server

To start the server:

```bash
node server.js
```

If you prefer development with auto-reloading:

```bash
npm install --save-dev nodemon
npx nodemon server.js
```

The server will be running at:

```
http://localhost:5000
```

Test if server is working by visiting:

```
http://localhost:5000/test-db
```

---

## 🎓 Technologies Used

- Node.js
- Express.js
- PostgreSQL (pg, pg.Pool)
- pgAdmin (for managing database manually)
- dotenv (for environment variables)
- cors, body-parser

---

## 📌 Notes

- Make sure your PostgreSQL database is running.
- Tables such as `users`, `attendance` must be created via pgAdmin.
- SSL is automatically handled depending on `NODE_ENV` (for production on platforms like Render, Heroku, etc.)

---

## 📖 Future Enhancements

- JWT authentication for secure login
- Admin dashboard analytics
- Scheduled QR code refresh every quarter

---

# ✨ Happy Building InOut QR!

