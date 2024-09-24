# Event Finder App - Frontend

This is the frontend of the Event Finder App, a GPS-based service where users can search for and attend events or services near their location. The frontend is built with React and Leaflet for geolocation features, and Zustand for state management.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
5. [Available Scripts](#available-scripts)
6. [Folder Structure](#folder-structure)
7. [Usage](#usage)
   - [Authentication](#authentication)
   - [Event Creation](#event-creation)
   - [Reviews and Ratings](#reviews-and-ratings)
8. [API Endpoints](#api-endpoints)
9. [Contributing](#contributing)
10. [License](#license)

---

## Project Overview

The Event Finder App allows users to discover events and services near their current location in real-time using geolocation. Users can log in, bookmark events, leave reviews, and create new events. The app is designed to provide a seamless and intuitive experience, making it easier to find interesting activities nearby.

## Features

- Real-time event search based on user's GPS location.
- Users can filter and sort events based on type and distance.
- Secure user authentication (login, registration, and logout).
- Users can bookmark events and leave reviews.
- Event creation for authenticated users.
- Interactive map view using Leaflet.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Leaflet**: Open-source library for mobile-friendly interactive maps.
- **Zustand**: State management for managing authentication and event data.
- **Axios**: For making API requests to the backend.
- **React Router**: For navigation between different pages.
- **React-Toastify**: For showing notifications and alerts.
- **React Query** (optional): For managing server-state-heavy interactions.
- **CSS**: Custom styles for the application.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/event-finder-frontend.git
   cd event-finder-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```bash
REACT_APP_API_BASE_URL=
```

Make sure to replace `REACT_APP_API_BASE_URL` with your actual backend URL if it's hosted somewhere else.

---

## Available Scripts

In the project directory, you can run the following scripts:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits, and you will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for the best performance.

---

## Folder Structure

```
src/
│
├── api/                # Contains all the API logic
│   ├── auth.js         # API calls for authentication
│   └── events.js       # API calls for events and reviews
│
├── config/             # Contains all the config 
│   └── axiosConfig.js  
│
├── components/         # Reusable components
│   └── MapView.js      # Main map component to display events
│
├── hooks/              # Custom hooks for state and data handling
│   ├── useAuth.js      # Handles authentication logic
│   └── useEventDetail.js# Handles event detail fetching and review submission
│
├── pages/              # Main app pages (Login, Register, EventDetail, etc.)
│   ├── Login.js
│   └── EventCreation.js
│
├── store/              # Zustand store for state management
├── styles/             # CSS files for styling the app
└── App.js              # Main app component and routing setup
```

---

## Usage

### Authentication

- **Login**: Users can log in with their email and password. Upon login, the token is stored in Zustand for future authenticated requests.
- **Register**: New users can register by providing their name, email, and password.
- **Logout**: Users can log out, which clears the authentication token and redirects to the home page.

### Event Creation

- Authenticated users can create new events by providing event details (name, type, location, date, and description).
- Events are shown on the map after creation, and users can view detailed information about the event by clicking on the map marker.

### Reviews and Ratings

- Users can leave reviews and ratings for events they attend.
- Reviews are displayed in the event detail page, and users can rate events from 1 to 5 stars.

---

## API Endpoints

Here are some of the API endpoints that the frontend communicates with:

- **Login**: `POST /auth/login`
- **Register**: `POST /auth/register`
- **Create Event**: `POST /events`
- **Get Events Nearby**: `GET /events/search/nearby`
- **Submit Review**: `POST /reviews`

For more details, refer to the backend documentation.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
<!-- 
Feel free to provide your jotted notes, and I’ll add or modify this README based on your information!
npx create-react-app gps-location-frontend
cd gps-location-frontend
npm install axios react-router-dom leaflet react-leaflet
Let's integrate Zustand for state management.
npm install zustand
npm install react-spinners
npm install react-toastify -->

