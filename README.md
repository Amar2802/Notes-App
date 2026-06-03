# 📝 Notes App

A full-stack Notes Management Application built using **React.js** and **FastAPI**. The application allows users to register, log in securely using JWT authentication, and manage their personal notes through Create, Read, Update, and Delete (CRUD) operations.

---

## 🚀 Features

### Authentication

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Protected Routes

### Notes Management

* Create Notes
* View Notes
* Update Notes
* Delete Notes
* User-specific Notes Access

### Backend Features

* FastAPI REST APIs
* SQLite Database
* SQLAlchemy ORM
* Input Validation using Pydantic
* Structured Error Handling
* CORS Configuration
* Swagger API Documentation

### Frontend Features

* React.js User Interface
* React Router Navigation
* Axios API Integration
* Dashboard for Notes Management
* Responsive and Clean UI

### Testing

* Basic Unit Testing with Pytest

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Pydantic
* JWT (python-jose)
* Passlib & bcrypt

### Testing

* Pytest

---

## 📂 Project Structure

```text
Notes-App/

├── backend/
│   ├── app.py
│   ├── auth.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── notes.db
│   ├── requirements.txt
│   └── tests/
│       └── test_basic.py
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.js
│   │   └── App.css
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Setup

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / Mac

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Backend Server

```bash
python -m uvicorn app:app --reload
```

Backend will run on:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## ⚙️ Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run React App:

```bash
npm start
```

Frontend will run on:

```text
http://localhost:3000
```

---

## 🔐 Authentication Flow

1. User registers an account.
2. Password is securely hashed before storage.
3. User logs in using email and password.
4. Backend generates a JWT token.
5. Token is stored in localStorage.
6. Protected APIs require JWT token for access.

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint  | Description   |
| ------ | --------- | ------------- |
| POST   | /register | Register User |
| POST   | /login    | Login User    |

### Notes

| Method | Endpoint    | Description   |
| ------ | ----------- | ------------- |
| POST   | /notes      | Create Note   |
| GET    | /notes      | Get All Notes |
| PUT    | /notes/{id} | Update Note   |
| DELETE | /notes/{id} | Delete Note   |

---

## 🧪 Running Tests

Run the following command inside backend:

```bash
pytest
```

Expected Output:

```text
1 passed
```

---

## 🔮 Future Improvements

* Note Categories
* Search Notes
* Dark Mode
* Note Creation Timestamp
* User Profile Management
* PostgreSQL Support
* Docker Deployment

---

## 📸 Screenshots

Add screenshots of:

* Login Page
* Registration Page
* Dashboard
* Notes CRUD Operations
* Swagger Documentation
* Test Results

---

## 👨‍💻 Author

Amarnath Yadav

Built as a Backend Developer Internship Assignment using React and FastAPI.
