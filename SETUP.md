# Oro-Invest-Sphere Investment Intelligence Dashboard

This is a React-based dashboard application for the Cagayan de Oro Trade and Investment Promotions Center (Oro-Invest-Sphere). It provides economic data, strategic maps, cost calculators, and incentive information for potential investors.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd oro-sphere
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Configuration

1.  **Supabase Setup**:
    - Create a new project on [Supabase](https://supabase.com/).
    - Go to your project settings and copy the **Project URL** and **anon / public Key**.

2.  **Environment Variables**:
    - Copy the example environment file:
      ```bash
      cp .env.example .env
      ```
      (Or manually create a `.env` file in the root directory).
    - Open `.env` and paste your Supabase credentials:
      ```env
      VITE_SUPABASE_URL=your_supabase_project_url
      VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
      ```

3.  **Database Schema**:
    - Go to the SQL Editor in your Supabase dashboard.
    - Copy the contents of `supabase/schema.sql` (located in this project).
    - Run the SQL query to set up the necessary tables and policies.

4.  **Authentication**:
    - In Supabase, go to **Authentication** -> **Providers**.
    - Ensure **Email** provider is enabled.
    - (Optional) For Google Login, configure the Google provider with your Google Cloud credentials.

## Running the Application

1.  **Start the development server**:
    ```bash
    npm run dev
    ```

2.  **Open the app**:
    - The terminal will show a local URL (usually `http://localhost:5173`).
    - Open this URL in your browser.

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist` directory, which can be deployed to any static hosting service (e.g., Vercel, Netlify, GitHub Pages).

## Project Structure

- `src/components/Landing`: Public landing page components.
- `src/components/Dashboard`: Private dashboard widgets (Economic Overview).
- `src/components/Map`: Interactive map component using Leaflet.
- `src/components/Tools`: Utility tools like the Cost Calculator.
- `src/components/Auth`: Authentication pages (Login, ProtectedRoute).
- `src/lib`: Utility functions and Supabase client configuration.

## Technologies Used

- **Frontend**: React, Vite
- **Styling**: CSS Modules / Standard CSS
- **Routing**: React Router DOM
- **Maps**: Leaflet, React-Leaflet
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Supabase (Auth & Database)
