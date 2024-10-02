
# Chat Application

This is a real-time messaging application with features like user registration, JWT-secured login, real-time chat with any user, and logout, built using Socket.io, Tailwind CSS, React.js, Node.js, Express.js, MongoDB, and Redux Toolkit.

[Visit Now](https://bharatchat.netlify.app) 🚀
## 🖥️ Tech Stack 

**Frontend:** React.js, Tailwind CSS

**Backend:** Node.js, Express.js, Socket.io, Redux Toolkit

**Database:** MongoDB


## 🚀 Features

**User Registration and Login:**
- Secure authentication with JWT tokens.
- Register and log in with email and password.

**Real-Time Chat Conversations:**
- Engage in real-time chat with any user.
- Instant messaging powered by Socket.io for seamless communication.

**User Profiles:**
- View and manage user profiles.
- Keep track of chat interactions and online status.

**State Management:**
- Redux Toolkit for efficient state management across the app.

**Logout:** 
- Secure logout functionality to end sessions safely.






## Installation

**1. Clone the repository:**
```
git clone https://github.com/vishalranjan0988/MERN-Chat-Application.git
```
**2. Install server-side dependencies:**
``` 
cd server
npm install
```
**3. Install client-side dependencies:**
``` 
cd clients
npm install
```
**4. Set up environment variables:**

*server side :*

```
PORT=8000
URL= //put mongoURL
SECRET=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
BASE_URL=http://localhost:3000
```
*client side :*
```
REACT_APP_SERVER_URL=http://localhost:8000
``` 

**5. Start the development servers:**

Start the backend and frontend concurrently:

- Open one terminal to start the backend:
```
cd server
nodemon index.js
```

- Open a second terminal for the frontend:
```
cd clients
npm start
```
