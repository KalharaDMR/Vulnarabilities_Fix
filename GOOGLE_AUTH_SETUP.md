# Google Authentication Setup

## Create OAuth credentials

1. Open the [Google Cloud Console](https://console.cloud.google.com/) and select or create a project.
2. Configure the OAuth consent screen with the app name, support email, and required audience/test users.
3. Under **APIs & Services > Credentials**, create an **OAuth client ID** with application type **Web application**.
4. Add the frontend origin to **Authorized JavaScript origins** (for local development, `http://localhost:3000`). No redirect URI is needed for the Google Identity Services ID-token flow.
5. Copy the client ID. Do not put a client secret in the frontend.

## Configure the client ID

Set the same OAuth client ID in both applications:

- Backend: set `GOOGLE_CLIENT_ID` in `illegalFishingBackend-backup_development/.env`.
- Frontend: set `REACT_APP_GOOGLE_CLIENT_ID` in `illegalFishingFrontend-backup_development/.env`.

The frontend variable is public and is embedded in the browser build. The backend uses its own `GOOGLE_CLIENT_ID` value to verify ID tokens. Restart both development servers after setting environment variables.

## Run the project

From separate terminals, install dependencies and start each application:

```powershell
cd illegalFishingBackend-backup_development
npm install
npm run dev
```

```powershell
cd illegalFishingFrontend-backup_development
npm install
npm start
```

The frontend uses the existing API base URL at `http://localhost:5000/api`; the backend must be running with a valid `MONGO_URI` and `JWT_SECRET` in its `.env` file.
