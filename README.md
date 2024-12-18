# ARC-Automated Report Creator

## Overview
ARC-Automated Report Creator is a project designed to simplify the process of generating automated reports. The project is divided into two main components:
1. **Frontend**: Built with Next.js for a seamless and interactive user experience.
2. **Backend**: Powered by Python with FastAPI for robust and efficient backend functionality.

---

## Prerequisites

### General Requirements
- **Node.js**: Required to run the frontend.
- **Python 3.x**: Required to run the backend.
- **Groq Account**: Required for backend functionality.
  - Generate a Groq API key and paste it into the `backend/.env` file.

### Tools
- **npm**: For managing frontend dependencies.
- **Python Virtual Environment**: To isolate backend dependencies.

---

## Setup Instructions

### Frontend

1. Open a terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the required Node.js modules (only required on the first run):
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The development server will run locally. You can access it in your browser.

### Backend

1. Open a new terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a Python virtual environment (recommended for dependency management):
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
4. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

---

## Notes
- Ensure that Node.js is installed before setting up the frontend.
- Ensure that Python and virtual environment tools are installed before setting up the backend.
- For the backend to function correctly:
  1. Create a Groq account.
  2. Generate a Groq API key.
  3. Save the API key in the `backend/.env` file.

---

## Directory Structure
```
ARC-Automated-Report-Creator/
|
|-- frontend/   # Frontend application built with Next.js
|
|-- backend/    # Backend application powered by FastAPI
|
|-- README.md   # Project documentation
```

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

