# Track Flow Frontend

This is the frontend Angular application for the Track Flow music management system.

## Features

- User authentication using JWT
- Browse music genres
- Manage artists, tracks, and playlists (when authenticated)
- Upload audio files
- Create custom playlists from available tracks

## Requirements

- Node.js 14.x or higher
- Angular CLI 16.x
- Backend API server running

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Configure the API URL:
   - Edit `src/environments/environment.ts` to point to your backend API server

3. Start the development server:
   ```
   npm start
   ```

4. The application will be available at http://localhost:4200

## Building for Production

Run `npm run build` to build the project for production. The build artifacts will be stored in the `dist/` directory.

## Project Structure

- `src/app/components/` - All component files grouped by feature
- `src/app/services/` - Services for API communication
- `src/app/models/` - TypeScript interfaces for data models
- `src/app/guards/` - Route guards for authentication
- `src/app/interceptors/` - HTTP interceptors for JWT handling

## Authentication

The application uses JWT token-based authentication:
- Login at `/login`
- Tokens are stored in localStorage
- Protected routes are guarded by AuthGuard
- Token refresh is handled automatically 