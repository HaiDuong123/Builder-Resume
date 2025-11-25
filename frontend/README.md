# 📄 Professional Resume Builder Web App

A full-stack web application designed to help users create, manage, and download professional resumes. The application features authentication, real-time preview, image uploads, and PDF export capabilities.

## 🚀 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB.
- **Others:** JWT for authentication, Multer for image uploads.

---

## 🛠️ Prerequisites

Before running the project, please ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (Make sure MongoDB is running locally or have a connection string ready)

---

## ⚙️ Installation & Setup Guide

To run the project, you need to set up and start both the **Backend** and **Frontend** servers.

### 1. Backend Setup

1.  Open a terminal and navigate to the `backend` folder:
    ```bash
    cd backend
    ```

2.  Install the required dependencies:
    ```bash
    npm install
    ```

3.  **Create the Environment File (.env):**
    Create a new file named `.env` inside the `backend` folder and paste the following configuration:

    ```env
    # Server Port (As defined in server.js)
    PORT=4000

    # JWT Secret Key (For Authentication)
    JWT_SECRET="DUONG NGO"

    # MongoDB Connection String
    # If running locally:
    MONGO_URI=mongodb://localhost:27017/resume_builder
    # If using MongoDB Atlas, replace the line above with your connection string.
    ```

4.  **Create Uploads Folder (Important):**
    Ensure there is a folder named `uploads` inside the `backend` directory to store resume images.
    ```bash
    mkdir uploads
    ```

5.  Start the Backend server:
    ```bash
    npm start
    ```
    > **Success:** You should see `Server Started on http://localhost:4000` in the terminal.

---

### 2. Frontend Setup

1.  Open a **new** terminal window (keep the backend terminal running) and navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```