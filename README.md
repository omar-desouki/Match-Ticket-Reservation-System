# Match-Ticket-Reservation-System
this is a repo for a web project. the project is a ticket reservation website for the Egyptian football league.

# Notes
1. <Link></Link> tags to link between pages for faster navigation.
2. Use ('use client';) to the convert a component from server to client component.
3. Client
   1. Large bundle size, Resource intensive
   2. No SEO
   3. Less Secure
   4. Fetch using
      1. useState(), useEffect(); Hooks
      2. React Query,
4. To make a folder cannot be accessable in routing use -> /(folderName), ex. (components)
5. Variables in the url can ba used as props.
   1. By creating a nested folder /[varName] inside the route we want
   2. Add it in the props of the page. (don't forget to move the page.jsx inside the /[varName] folder)
6. Authentication: Who is logged in username and password.
7. Authorization: Who can access this page.
8. Data Fetching
   1. SSR: Server-side Rendering
      1. { cache: 'no-store' } as option
   2. SSG: Static Site Generation (default)
      1. cache is stored by default
   3. ISR: Incremental Static Generation (Mix)
      1. SSR each n secends
      2. { next: { revalidate: n } } as option
9. APIs can be done without requiring external server (to run simultaneously)
   1. Using regular express framework placed in the app/api/express.js
   2. Using Direct API Route Handler using the route.js file convention (same as page.js(x) in webpages routing)
      1. Cannot have both page.js and route.js inside the same directory (Next.js wouldn't be able to figure if it is a page or an api)
10. Metadata (SEO)
    1. Static
       1. In the page.js(x) file export also a variable called metadata as follows
          1. `export const metadata = { title: "Title" }`
    2. Dynamic
       1. In the page.js(x) file export also another function and return an object as follows
          1. `export async function generateMetadata({params, searchParams}) { return {title: get(params).title} } `
11. [URL Object](https://developer.mozilla.org/en-US/docs/Web/API/URL)
    1. url.pathname (path relative to root)
    2. urlhostname (root, ex. http://localhost:3000)
12. To nest a server compontent inside a client oneClient must accept childern as props.
    1. [Source](https://stackoverflow.com/questions/76455367/is-it-normal-that-all-components-in-next-js-are-client-components)
13. Websockets providers for vercel [Source](https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections)
14. Remove a file from all previous commits [Source](https://stackoverflow.com/questions/32715034/removing-files-from-git-history-bad-revision-error)
    1. Take care it
    2. git filter-branch --force --index-filter "git rm --cached --ignore-unmatch <filename>" --prune-empty --tag-name-filter cat -- --all
    3. git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all

# Resources

1. [Source](https://www.youtube.com/watch?v=ZVnjOPwW4ZA&ab_channel=ProgrammingwithMosh)
2. [Source](https://www.youtube.com/watch?v=H0vhkoXljq0&ab_channel=freeCodeCamp.org)
3. [React in 40 mins](https://www.youtube.com/watch?v=Rh3tobg7hEo&ab_channel=WebDevSimplified)
4. [Mongodb Playlist](https://youtube.com/playlist?list=PL4RCxklHWZ9v2lcat4oEVGQhZg6r4IQGV&si=w_Y2lPoxKK2hoZ3y)
5. [DaisyUI Themes](https://dev.to/kunalukey/how-to-add-dark-mode-toggle-in-reactjs-tailwindcss-daisyui-1af9)
6. [Authentication and Authorization](https://blog.logrocket.com/implement-authentication-authorization-next-js/#using-credentials)

# Database

1. Users: Each user should have the following personal data:
   1. Username (Must be Unique)
   2. Password
   3. First Name
   4. Last Name
   5. Birth Date
   6. Gender
   7. City
   8. Address (Optional and could be skipped by the user).
   9. Email Address.
   10. Role: Manager/ Fan
2. Match: Each match should have the following details:
   1. Home Team. (One of possible 18 teams)
   2. Away Team. (One of possible 18 teams, should not be the same as the hometeam).
   3. Match Venue / Stadium (One of the stadiums approved by the EFA managers)
      1. Stadium id (reference): no 2 matches can reference the same stadium in the same time period
         1. 1:start (2:start | 2:end or both) 1:end
      2. Seats
   4. Date & Time. ()
   5. Main Referee.
   6. Two Linesmen.
3. Stadiums
   1. Name
   2. Shape
      1. Number of rows
      2. Number of seats per row
4. Teams (will be hardcoded in a function in the Teams api)

# Optional

1. [Football teams details](https://www.football-data.org/pricing)

   1. Can get club image/logo to use in `<MatchCard />`

2. api/login.js (route.js)
3. /api/auth/[...nextauth].js
4. page/index.js (app/login/)

# Authentication using credentials

1. API: that handles POST requests (which is the backend code that will handle our login request.)
   1. Sucess: return response.json(user)
   2. Fail: return response.send({message: "Error message"})
2. next-auth library ([...nextauth].js file)
   1. export authOptions
      1. providers
         1. CredentialsProvider
            1. name
            2. credentials (email, password)
         2. async authorize(credentials, req) function
            1. fetch API by passing credentials came from client (frontend)
      2. callbacks
         1. async jwt({token, user}) function (json web token)
            1. return spreed the token and user -> return { ...token, ...user }
         2. async session({ session, token, user })
            1. Send properties to the client -> session.user = token; return session;
      3. pages
         1. signIn: "customLogin"
         2. signOut: "customLogout"
   2. export default NextAuth(authOptions)

# React Hooks

1. useState -> const [var, setVar] = useState(initialize)
2. useEffect -> keep track of changes happens to variables in the dependency list
   1. useEffect(() => { // Code exectutes every time changes happens to variables }, [var1, var2, ...])

# API

1. Request Helpers
   1. req.cookies - An object containing the cookies sent by the request. Defaults to {}
   2. req.query - An object containing the query string. Defaults to {}
   3. req.body - An object containing the body parsed by content-type, or null if no body was sent
