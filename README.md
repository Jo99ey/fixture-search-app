# Fixture Search App

A simple Next.js application to upload match data and search fixtures by team name.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Database**: MongoDB (via `mongodb` driver)
- **CSV Parsing**: `csv-parse/sync` 
- **Components**:

  - Server Components: main page, search page
  - Client Components: file upload, data cleaner, search section

- **Deployment**: Vercel + MongoDB Atlas

## How to Use

1. Clone and install:

   ```bash
   git clone https://github.com/Jo99ey/fixture-search-app.git
   cd fixture-search-app
   npm install
   ```

2. Add environment variable in `.env.local`:

   ```env
   MONGODB_URI=<your MongoDB connection>
   ```

3. Run in development:

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` in your browser.

4. On the main page:

   - Upload a `.csv` file of fixtures.
   - Click **Search** to go to the search page.

5. On the search page:

   - Type a team name to see matching fixtures in real time.
   - Click a fixture card to view detailed information.

Enjoy!
© 2025 Joey ([LinkedIn](https://www.linkedin.com/in/joey-zhuyun-chen/))
