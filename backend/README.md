🌍 Traveller’s Handbook

Traveller’s Handbook is a full-stack travel planning web application that helps users explore famous places across India, view weather information, and build personalized itineraries by saving places of interest.

The application is built using React (Vite) for the frontend and Express + MongoDB for the backend, with authentication and deployment handled using modern cloud tools.

🔗 Live Deployment Links

Application (Frontend + Backend):
https://travellers-handbook.ue.r.appspot.com

 Note:
In production, the React frontend is built and served directly by the Express backend using express.static.
Therefore, a single deployment URL hosts both the frontend UI and backend APIs.

Tech Stack:

Frontend
React (Vite)
Context API for global state
Framer Motion (animations)
Axios / Fetch for API calls
Responsive UI design

Backend

Node.js
Express.js
MongoDB Atlas
RESTful API architecture

Deployment

Google App Engine (Node.js runtime)
MongoDB Atlas (cloud database)

🔐 Authentication

Google OAuth (Firebase Authentication)
User-specific saved places and itineraries
Secure authentication flow with session-based access

App Features:

🌏 Explore Destinations
 Browse famous places across selected Indian states
High-quality images and descriptions
 Personalized experience per user

🌦 Weather Integration
Live weather data for selected locations
Saved Places (CRUD)
Remove saved places
Persistent storage per authenticated user

🗺 Itinerary Builder
Create itineraries for trips
Delete and manage itinerary items
Backend-stored itineraries tied to user accounts

🎨 UI & Interactivity
Smooth animations using Framer Motion

🔌 API Endpoints

Places
GET /api/places
POST /api/places
DELETE /api/places/:id

Itineraries
GET /api/itineraries
POST /api/itineraries
PUT /api/itineraries/:id
DELETE /api/itineraries/:id

🗄 Database Design
MongoDB Atlas cloud database
Mongoose schemas with validation
User-linked documents for saved places and itineraries

📐 Design Pattern / Architecture

Pattern Used:

Client–Server Architecture
MVC-inspired backend structure
RESTful API design

Example Flow (Save Place)
User clicks “Save”
Frontend sends POST request to /api/places
Express controller validates request
MongoDB stores the place
Updated data returned to frontend
UI updates instantly

📦 Local Setup Instructions

# Clone repository
git clone https://github.com/Rakshitha2224/Travellers-handbook.git

# Backend setup
cd backend
npm install
npm start

# Frontend setup
cd frontend
npm install
npm run dev

🧪 Testing
End-to-end tests were implemented using Playwright to validate core user flows and UI behavior.
✅ Test Files
Location: /tests

Files used:
tests/
├── smoke.spec.js
├── screenshot.spec.js

📄 Test Case Details

1. Application Load Test

File: tests/smoke.spec.js
Test Name: App loads successfully
Verifies the homepage loads without errors
Confirms the main title “Traveller’s Handbook” is visible
Ensures deployment and routing are working correctly


2. Holidays Page Interaction Test

File: tests/smoke.spec.js
Test Name: Holidays page shows dropdown and reacts to selection
Navigates to the Holidays page
Verifies state selection dropdown is visible
Selects a state (e.g., Telangana)
Confirms UI updates based on selection

3. Screenshot Capture Test

File: tests/screenshot.spec.js
Test Name: Take homepage screenshot
Loads the homepage
Captures a screenshot for submission evidence

Files included:
tests/screenshots/
├── homepage.png
├── terminal-test-success.png
homepage.png

Screenshot of the application homepage loaded successfully in the browser.
terminal-test-success.png
Screenshot of terminal output showing all Playwright tests passing successfully.

▶️ Running the Tests
To run the Playwright tests locally:
npm run test:e2e

Expected result:
All tests pass successfully
Screenshots are generated for verification

## Design Artifact – Sequence Diagram
file: Sequence Diagram.drawio.png

The attached UML sequence diagram illustrates the **Save Place** workflow,
demonstrating how the frontend, backend, and database interact.

Flow explained:
1. User clicks the "Save" button on a place card
2. React frontend sends a POST request to `/api/places`
3. Express backend validates the request
4. MongoDB Atlas stores the place linked to the user
5. Backend returns the saved place
6. Frontend updates UI from "Save" → "Saved" and disables the button

This diagram represents the client–server architecture and RESTful API
communication used throughout the application.

🔐 Environment Variables

The application uses environment variables for sensitive configuration.
These values are intentionally not committed to the repository.

Required variables:

PORT=8080  
ATLAS_URI=your_mongodb_connection_string  

For deployment, these values are securely configured in the cloud environment.


📚 Attribution
Images sourced from publicly available travel resources
Weather API used for educational purposes
Icons and UI inspiration from open-source libraries

✅ Project Status

✔ Frontend deployed
✔ Backend deployed
✔ Database connected
✔ Authentication implemented
✔ CRUD functionality complete

video link: https://livealbany-my.sharepoint.com/:v:/g/personal/rramidi_albany_edu/IQDdh0VTL6wCTrnFQlnRJYgwAX3Wq8HPlxWQ0xE957RtYZA?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=sf6XGP