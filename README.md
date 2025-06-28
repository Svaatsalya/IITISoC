# Project Title

This project is a full-stack web application consisting of a React frontend and an Express.js backend. The backend provides RESTful API endpoints for user authentication and resume management, while the frontend offers a visually appealing user interface with multiple components.

## Backend

The backend is built with Node.js and Express.js. It connects to a database (connection details in `backend/config/db.js`) and exposes the following main API routes:

- **User Authentication Routes** (`/api/auth`):
  - `POST /register`: Register a new user with name, email, and password.
  - `POST /login`: Authenticate a user and receive a JWT token.
  - `GET /profile`: Get the authenticated user's profile (protected route, requires token).

- **Resume Routes** (`/api/resume`):
  - Routes related to resume management (details not covered here).

The backend serves static files from the `/uploads` directory with CORS enabled for the frontend origin.

The backend server listens on port 4000.

## Frontend

The frontend is built with React and includes the following main components:

- `Header`: The top navigation/header section.
- `Hero`: The hero/banner section.
- `About`: About section describing the project or user.
- `Carousel` (ImageSlider): A carousel component for displaying images or content.
- `FloatingShapes`: Visual floating shapes for decoration.
- `AboutUs`: Additional about us section.

The React app is mounted on an HTML element with id `root` and uses global styles from `index.css`.

## Installation and Setup

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following variables:
   ```
   JWT_SECRET=your_jwt_secret_key
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```
   The server will start on `http://localhost:4000`.

### Frontend

1. Navigate to the root project directory (if not already there).

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server (assuming Vite is used):
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## Usage

- Use the frontend interface to interact with the application.
- The frontend communicates with the backend API for authentication and resume management.
- Uploads are served from the backend `/uploads` directory.

## Additional Information

- The backend uses JWT tokens for authentication with a 7-day expiration.
- Passwords are hashed using bcryptjs.
- CORS is configured to allow requests from the frontend origin.
- Static files are served with appropriate CORS headers.




