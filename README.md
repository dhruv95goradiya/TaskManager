# Task Management Application

This is a simple Task Management Application with separate frontend and backend components.

## Features

- Frontend built with React.js
- Backend built with Node.js and Express
- PostgreSQL database for storing tasks

## Frontend

The frontend of the application is built with React.js and handles the user interface for managing tasks.

### Setup

1. Navigate to the `frontend` directory.
2. Install dependencies with `npm install`.
3. Start the development server with `npm start`.

### Structure

- `src/`: Contains the React components and styles.
- `public/`: Contains static assets and the HTML template.

### Usage

- Access the application at `http://localhost:3000`.

### Testing

- Run tests with `npm test`.

## Backend

The backend of the application is built with Node.js and Express, and it provides RESTful APIs to manage tasks.

### Setup

1. Navigate to the `backend` directory.
2. Install dependencies with `npm install`.
3. Set up your PostgreSQL database and update the configuration in `config/db.js`.
4. Start the server with `npm start`.

### Run frontend and backend togather

1. Navigate to the `backend` directory.
2. Run tests with `npm run start:dev`.


### Structure

- `src/`: Contains the server-side code.
- `config/`: Contains configuration files.
- `models/`: Contains the database models.
- `routes/`: Contains the route handlers for APIs.

### API Endpoints

- `GET /tasks`: Get all tasks.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update an existing task.
- `DELETE /tasks/:id`: Delete a task by ID.

### Testing

- Run tests with `npm test`.

## Database

This application uses PostgreSQL as the database to store tasks. Make sure to set up your PostgreSQL database and update the configuration in the backend.

## Contributing

Contributions are welcome! If you find any bugs or want to suggest improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
