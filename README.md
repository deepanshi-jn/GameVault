# Game Library App - RAWG API Integration

This project is a responsive front-end website that fetches and displays game data using the RAWG API.

## Technologies Used

- React (with Vite)
- React-Bootstrap & Bootstrap
- Redux (with Redux Toolkit)
- Clerk Auth
- React Router
- Axios

## Project Setup

### Prerequisites

- Node.js (version 16 or later)
- NPM or Yarn
- RAWG API key (get one at https://rawg.io/apidocs)
- Clerk account and publishable key (https://clerk.dev)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/rawg-game-library.git
cd rawg-game-library
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_RAWG_API_KEY=your_rawg_api_key_here
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. Start the development server
```
npm run dev
```

## Features

- Browse games with filtering options (categories, tags, release year, popularity)
- Search functionality
- Detailed game pages with screenshots, description, and system requirements
- User authentication with Clerk
- Bookmarking system for saving favorite games
- Responsive design for all device sizes

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Page components
- `src/redux`: Redux store and slices
- `src/services`: API service layer