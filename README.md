<h3>This is a Auth template Built with the help of NextAuth V5 (Auth.js), Next.js, Postgres (neon.tech), drizzle, shadcn...</h3>

<h4>Clone this repo, Populate .env and get Started! </h4>
To add any new route to the project head to the /routes.ts file and if the route is public then append the public routes list and if it is private then you are already done cause every unmentioned route is private by-default.

<br>
<h5>Note : For this project UI is not a center of focus, so i hope you know what i mean.</h5>
<h3> Features :</h3>
- Credentials, Google, GitHub login <br>
- 2 Factor Authentication (through email only)<br>
- Role-Based Access <br>
- Client & Server Components Examples <br>
- Forgot Password (for Credentials Providers Only)<br>
- Change Email (for Credentials Providers Only)<br>
- Email Verification for credentials provider <br>
- Reusable Components <br>
- Upcoming : [Organizations, workspaces, 2FA through SMS...] (If interested in building them feel free to reach out.)

<br><br>
This is how .env will look like :

```
// create a postgres project on neon.tech and get it from there
DB_URI=

// put a strong secret or make it generate by NextAuth
AUTH_SECRET=

// head to GitHub and create a OAuth app & Generate a secret
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

// head to GC and create a OAuth client & put credentials here
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=


// head to myaccounts.google.com and get "app password" (might have to turn on 2FA if not)
EMAIL_USER=
EMAIL_PASS=

// Change it in production
ORIGIN="http://localhost:3000"
```
