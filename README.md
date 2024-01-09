# RESTful Notes API

This project is a secure and scalable RESTful API for managing notes. It provides endpoints for user authentication, CRUD operations on notes, sharing notes, and searching for notes based on keywords.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Services](#services)
- [Routes](#routes)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/vinayakkakkar/notes-backend.git
   cd notes-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB database and update the `config.js` file with your database URI.

4. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. To access protected endpoints, include the JWT token in the `Authorization` header.

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in to an existing user account and receive an access token.

### Note Endpoints

- `GET /api/notes`: Get a list of all notes for the authenticated user.
- `GET /api/notes/:id`: Get a note by ID for the authenticated user.
- `POST /api/notes`: Create a new note for the authenticated user.
- `PUT /api/notes/:id`: Update an existing note by ID for the authenticated user.
- `DELETE /api/notes/:id`: Delete a note by ID for the authenticated user.
- `POST /api/notes/:id/share`: Share a note with another user for the authenticated user.
- `GET /api/search?q=:query`: Search for notes based on keywords for the authenticated user.

## Models

- `Note`: Represents a note with fields such as title, content, creation date, update date, owner, and sharedWith.
- `User`: Represents a user with fields like username, email, passwordHash, and token.

## Services

Services handle the business logic for each endpoint. They include pre-process, process, and post-process steps.

## Routes

- `userRoutes.js`: Defines routes related to user authentication (signup and login).
- `noteRoutes.js`: Defines routes for note-related operations (CRUD, sharing, and searching).

## Middleware

- `authMiddleware.js`: Authentication middleware using JWT.

## Error Handling

The API handles errors gracefully with meaningful error messages and appropriate HTTP status codes.

## Security Considerations

- JWT for secure authentication.
- Passwords are hashed using Bcrypt.
- Rate limiting and request throttling to handle high traffic.

## Contributing

Contributions are welcome! Fork the repository, create a branch, make your changes, and submit a pull request.

