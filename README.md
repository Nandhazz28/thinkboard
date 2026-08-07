# 📝 Thinkboard

> A modern full-stack note-taking application built with React, Node.js, Express, MongoDB, and Upstash Rate Limiting.

Thinkboard is a full-stack CRUD note-taking application that allows users to create, view, edit, and delete notes through a clean and responsive interface.

The project demonstrates a practical **React + Express + MongoDB** architecture with REST APIs, reusable components, client-side routing, toast notifications, and API rate limiting using Upstash Redis.

---

## ✨ Features

### 📝 Note Management

* Create new notes
* View all notes
* View individual notes
* Edit existing notes
* Delete notes
* Automatic creation and update timestamps
* Validation for required title and content fields

### ⚡ Rate Limiting

Thinkboard uses **Upstash Redis** with `@upstash/ratelimit` to protect the API from excessive requests.

* Sliding-window rate limiting
* IP-based request identification
* HTTP `429` response when the limit is exceeded
* Dedicated rate-limit UI
* Graceful fallback if the rate-limit service encounters an error

### 🎨 User Interface

* Responsive React interface
* DaisyUI components
* Tailwind CSS
* Forest theme
* Responsive note-card grid
* Loading states
* Empty-state UI
* Toast notifications
* Interactive navigation
* Lucide icons

### 🔄 Client-Side Routing

The application uses React Router for navigation between:

* Home
* Create Note
* Note Details

### 🔌 REST API

The backend exposes RESTful endpoints for complete note CRUD operations:

* `GET`
* `POST`
* `PUT`
* `DELETE`

---

## 🧰 Tech Stack

### Frontend

* **React 19**
* **Vite**
* **React Router**
* **Axios**
* **Tailwind CSS**
* **DaisyUI**
* **Lucide React**
* **React Hot Toast**

### Backend

* **Node.js**
* **Express 5**
* **MongoDB**
* **Mongoose**
* **CORS**
* **dotenv**
* **Upstash Redis**
* **Upstash Rate Limit**

---

## 🏗️ Project Structure

```text
Thinkboard/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── upstash.js
│   │
│   ├── controllers/
│   │   └── notesController.js
│   │
│   ├── middleware/
│   │   └── ratelimiter.js
│   │
│   ├── models/
│   │   └── note.js
│   │
│   ├── routes/
│   │   └── NoteRoutes.js
│   │
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── NotesNotFound.jsx
│   │   │   └── RatelimitedUI.jsx
│   │   │
│   │   ├── lib/
│   │   │   ├── axios.js
│   │   │   └── utils.js
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreatePage.jsx
│   │   │   └── NoteDetailPage.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
└── .gitignore
```

---

## 🏛️ Architecture

Thinkboard follows a separated frontend/backend architecture.

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ React Frontend  │
                    │     + Vite      │
                    └────────┬────────┘
                             │
                         Axios API
                             │
                             ▼
                    ┌─────────────────┐
                    │ Express Server  │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
             Rate Limiter        Controllers
             Upstash Redis           │
                                     ▼
                              ┌─────────────┐
                              │  Mongoose   │
                              └──────┬──────┘
                                     │
                                     ▼
                              ┌─────────────┐
                              │   MongoDB   │
                              └─────────────┘
```

---

## 🔄 Application Flow

```text
User
 │
 ├── View Notes
 │      └── GET /api/notes
 │
 ├── Create Note
 │      └── POST /api/notes
 │
 ├── Open Note
 │      └── GET /api/notes/:id
 │
 ├── Edit Note
 │      └── PUT /api/notes/:id
 │
 └── Delete Note
        └── DELETE /api/notes/:id
```

Every request passes through the rate-limiting middleware before reaching the note controller.

---

# 🔌 REST API

Base URL:

```text
/api/notes
```

## Get All Notes

```http
GET /api/notes
```

Returns all notes sorted by newest first.

### Response

```json
[
  {
    "_id": "65f...",
    "title": "Learning React",
    "contents": "Study React hooks and component architecture.",
    "createdAt": "2026-08-07T10:00:00.000Z",
    "updatedAt": "2026-08-07T10:00:00.000Z"
  }
]
```

---

## Get Note by ID

```http
GET /api/notes/:id
```

Returns a specific note.

### Possible Responses

```text
200 OK
```

```text
404 Not Found
```

---

## Create Note

```http
POST /api/notes
```

### Request Body

```json
{
  "title": "My First Note",
  "contents": "This is my note."
}
```

Both `title` and `contents` are required.

### Response

```text
201 Created
```

---

## Update Note

```http
PUT /api/notes/:id
```

### Request Body

```json
{
  "title": "Updated Title",
  "contents": "Updated note content."
}
```

The API uses Mongoose validation when updating the document.

---

## Delete Note

```http
DELETE /api/notes/:id
```

Deletes the specified note.

### Response

```json
{
  "message": "Note deleted successfully"
}
```

---

# 🗄️ Database Model

Thinkboard uses a simple MongoDB `Note` schema.

```text
Note
│
├── title
│   └── String
│   └── Required
│
├── contents
│   └── String
│   └── Required
│
├── createdAt
│   └── Date
│
└── updatedAt
    └── Date
```

Mongoose timestamps automatically maintain:

* `createdAt`
* `updatedAt`

---

# ⚡ Rate Limiting

Thinkboard integrates **Upstash Redis** with the Upstash Rate Limit library.

The application uses a sliding-window limiter:

```text
10 requests / 20 seconds
```

Requests are identified using the client's IP address.

### Rate Limit Flow

```text
Request
   │
   ▼
Express Server
   │
   ▼
Rate Limit Middleware
   │
   ├── Allowed ───────► Controller ───► MongoDB
   │
   └── Exceeded
          │
          ▼
       HTTP 429
          │
          ▼
   Rate Limited UI
```

When the limit is exceeded, the API returns:

```json
{
  "message": "Too many requests, please try again later"
}
```

with HTTP status:

```text
429 Too Many Requests
```

---

# 🎨 Frontend Pages

## 🏠 Home Page

The Home Page provides:

* Navigation bar
* List of notes
* Responsive grid layout
* Loading state
* Empty-state message
* Rate-limit feedback
* Note cards

Notes are displayed in a responsive layout:

```text
Desktop:    3 columns
Tablet:     2 columns
Mobile:     1 column
```

---

## ➕ Create Page

Users can create a new note by entering:

* Title
* Content

The page validates empty fields before sending the API request.

Successful creation displays a toast notification and redirects the user back to the Home Page.

---

## 📄 Note Detail Page

The Note Detail Page allows users to:

* View a note
* Edit the title
* Edit the content
* Save changes
* Delete the note
* Return to the notes list

Loading states are displayed while retrieving the note.

---

# 🔔 User Feedback

Thinkboard uses **React Hot Toast** for application feedback.

Examples include:

```text
✓ Note created successfully!
✓ Note updated successfully
✓ Note deleted

✕ Failed to create note
✕ Failed to update note
✕ Failed to delete note
```

Rate-limit notifications are also displayed when the API returns HTTP `429`.

---

# 🌐 Axios Configuration

The frontend uses a centralized Axios instance.

```javascript
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api";
```

This allows the API base URL to change automatically based on the application environment.

API requests can therefore be made through:

```javascript
api.get("/notes");
api.post("/notes", data);
api.put(`/notes/${id}`, data);
api.delete(`/notes/${id}`);
```

---

# ⚙️ Environment Variables

The backend requires environment variables for MongoDB and Upstash.

Create:

```text
backend/.env
```

Example:

```env
PORT=5001

MONGO_URI=your_mongodb_connection_string

UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

> Keep `.env` files private and never commit credentials to GitHub.

---

# 🚀 Getting Started

## Prerequisites

Install the following before running Thinkboard:

* Node.js
* npm
* MongoDB
* Upstash Redis account

---

## 1. Clone the Repository

```bash
git clone https://github.com/Nandhazz28/Thinkboard.git
```

```bash
cd Thinkboard
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Configure Backend Environment

Create:

```text
backend/.env
```

Add your MongoDB and Upstash credentials:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

---

## 4. Start Backend

Development mode:

```bash
npm run dev
```

Or:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5001
```

---

## 5. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

## 6. Start Frontend

```bash
npm run dev
```

Vite will provide the local development URL.

---

# 📦 Available Scripts

## Frontend

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Build

```bash
npm run build
```

Creates an optimized production build.

### Preview

```bash
npm run preview
```

Previews the built application.

### Lint

```bash
npm run lint
```

Runs ESLint against the frontend source.

---

## Backend

### Development

```bash
npm run dev
```

Starts the Express server using Nodemon.

### Start

```bash
npm start
```

Starts the backend using Node.js.

---

# 🔒 Backend Error Handling

The API provides appropriate HTTP responses for common scenarios.

| Status | Meaning               |
| ------ | --------------------- |
| `200`  | Request successful    |
| `201`  | Resource created      |
| `400`  | Invalid request       |
| `404`  | Note not found        |
| `429`  | Rate limit exceeded   |
| `500`  | Internal server error |

---

# 🧩 Key Concepts Demonstrated

This project demonstrates practical full-stack development concepts:

* React component architecture
* React Router
* REST API development
* CRUD operations
* MongoDB
* Mongoose schemas
* Express middleware
* API controllers
* API routing
* Axios API integration
* Environment configuration
* Rate limiting
* Redis
* Upstash
* Responsive UI
* Loading states
* Error handling
* Toast notifications
* Client/server separation

---

# 📈 CRUD Architecture

```text
              THINKBOARD CRUD
                    │
       ┌────────────┼────────────┐
       │            │            │
       ▼            ▼            ▼
     CREATE         READ        UPDATE
       │            │            │
 POST /notes    GET /notes   PUT /notes/:id
       │            │            │
       └────────────┼────────────┘
                    │
                    ▼
                  DELETE
                    │
              DELETE /notes/:id
```

---

# 🎯 Project Objective

The primary goal of Thinkboard is to build a simple but practical full-stack application while demonstrating how a modern frontend communicates with a RESTful backend and persistent database.

The project also introduces an important production-oriented concept: **API rate limiting**, using Upstash Redis to protect backend endpoints from excessive requests.

---

## 👨‍💻 Author

**Nandha**

GitHub: **Nandhazz28**

---

## ⭐ Thinkboard

A simple, modern, and scalable note-taking application built with:

**React + Node.js + Express + MongoDB + Upstash Redis**
