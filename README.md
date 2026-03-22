# Mini Compliance Tracker (MERN)

![Dashboard Overview](./screenshot.png)

A clean, full-stack compliance task management system built with the MERN stack (MongoDB, Express, React, Node.js). 
This project allows managing compliance requirements across multiple clients, featuring an intuitive UI inspired by modern dashboards with intelligent overdue tracking.

## 🚀 Features
- **Client Management:** Clean sidebar selection of multiple clients.
- **Task Tracking:** Full CRUD for compliance tasks (Tax, Filing, Legal, Audit).
- **Intelligent Overdue Highlight:** Any task marked "Pending" with a due date strictly before today is visually flagged in red with a pulsating badge.
- **Advanced Filtering:** Filter tasks instantly by Status or Category.
- **Premium UI:** Built with Tailwind CSS and Lucide React icons, featuring smooth hover states, structured layouts, and responsive design.

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite), Tailwind CSS, `date-fns` for robust date handling.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (using Mongoose).

## 🐳 Docker Setup (Recommended)
The easiest way to run the entire stack is using Docker Compose:

1. Ensure you have Docker and Docker Compose installed.
2. Clone the repository.
3. Run:
   ```bash
   docker-compose up --build
   ```
4. Access the frontend at [http://localhost](http://localhost) and the API at [http://localhost:5000](http://localhost:5000).

## 📄 Local Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Set your MongoDB URI in a `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://balajikundrapu:Balaji123456@cluster0.xgh87ph.mongodb.net/mini-compliance-tracker?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   ```
4. **Seed the database:** Run `node seed.js` to populate dummy clients.
5. Start the server: `npm run start`

### 2. Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite dev server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧠 Tradeoffs & Decisions
1. **Separation of Concerns:** Chosen a decoupled frontend/backend structure (Vite + Express on separate ports) rather than Next.js to strictly adhere to traditional MERN stack requirements and make API design modular.
2. **Date Handling:** Adopted `date-fns` and `startOfDay()` locally. Overdue logic relies on strict day-comparisons to prevent tasks from artificially becoming overdue midway through the day (e.g., 5 PM). 
3. **Seed Script:** Included a `seed.js` script to instantly hydrate the MongoDB database with `LedgersCFO` and other clients, removing the initial friction for reviewers testing the application for the first time.
4. **Limitations:** The assignment didn't specify a "Create Client" form, so it was deliberately omitted to keep the project focused strictly on the compliance task workflow. Security (JWT Auth) was also omitted to conform to the scope.
