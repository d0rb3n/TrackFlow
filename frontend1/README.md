<<<<<<< HEAD
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
=======
# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
>>>>>>> f5679b1027489cb14e5391a2bbf76a4aa0e0f772
