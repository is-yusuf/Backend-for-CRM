# Express API for Dynamic Table Interaction

This Express application provides a RESTful API for interacting with various database tables, supporting operations such as create, read, update, and delete (CRUD) for records in a SQL database. It includes user authentication, file upload, and CORS setup for integration with front-end applications.

## Features

- User registration and login
- Authentication middleware
- Profile image upload and retrieval
- Dynamic table access for CRUD operations
- Cookie-based session management
- CORS setup for front-end integration

## Getting Started

To get the server running locally:

1. Clone this repository
2. Install dependencies

```
npm install
```

3. Configure your database connection in `./config/config.json`
```
{
  "development": {
    "username": "postgres",
    "password": "password",
    "database": "CRM",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "password",
    "database": "CRM",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "password",
    "database": "CRM",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
   
4. Start the server
```
node server.ts
```

## API Endpoints

### Authentication

- POST `/register` - Register a new user
- POST `/login` - Login an existing user

### Profile Image

- PUT `/updateProfileImage` - Update user's profile image
- GET `/getProfileImage/:email` - Retrieve user's profile image

### Dynamic Table Access

- POST `/:table` - Create a new record in the specified table
- GET `/:table` - Fetch all records from the specified table
- PUT `/:table/:id` - Update a record in the specified table by ID
- DELETE `/:table/:id` - Delete a record from the specified table by ID

### Additional Endpoints

- POST `/getcalendar` - Retrieve calendar events for a user
- POST `/updatecalendar` - Update calendar events for a user

## Middleware

- `authenticate` - Verifies user session for protected routes

## File Upload

- Profile image upload is handled by Multer with in-memory storage.

## CORS

- Configured to allow requests from `http://localhost:5001`. Adjust `corsOptions` in the code to match your front-end domain.

## Development

This application uses Express for the backend, Sequelize for database interaction, and Multer for file handling. It is designed to be easily extendable for different database tables and operations.

## License

This project is open source and available under the [MIT License](LICENSE).
