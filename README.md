# Task Management System

The Task Management System is a web application built with Node.js, Express, Sequelize ORM, and JWT authentication. It allows users to log tasks, categorize them, assign tasks to users, and send notifications upon task completion.

## Features

- **User Authentication:** Users can register, login, and logout securely using JWT authentication.
- **Task Management:** Users can create tasks, categorize them by priority, assign tasks to users, and mark tasks as completed.
- **Role-Based Access:** Admin users have the privilege to create tasks, while regular users can only view and manage their assigned tasks.
- **Database Storage:** Data is stored in a SQLite database, ensuring reliability and scalability.
- **Data Validation:** Input data is validated using express-validator to ensure data integrity and security.
- **Rate Limiting:** Middleware is implemented to prevent abuse through rate limiting.
- **Email queuing:** Emails are queued using database as simple queue driver.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd task-management-system`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env`
5. Run the application: `npm run db:seed`
6. Start the server: `npm run start`

## Usage

- Register a new user using the `/api/auth/register` endpoint.
- Login with the registered user credentials using the `/api/auth/login` endpoint.
- Create tasks using the `/api/tasks` endpoint (accessible only to admin users).
- View and manage tasks using the `/api/tasks` endpoint (accessible to all authenticated users).
- Logout using the `/api/auth/logout` endpoint.

## Endpoints

- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Login with user credentials.
- **POST /api/auth/logout:** Logout the current user.
- **POST /api/tasks:** Create a new task (admin only).
- **GET /api/tasks:** Get all tasks for the authenticated user.
- **PUT /api/tasks/:id:** Update task status.

## Contributors

- [Karani](https://github.com/karani12)


