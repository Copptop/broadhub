# BroadHub
## Technologies Used
- [Node.js 18](https://nodejs.org/en/) 
- [TypeScript](https://www.typescriptlang.org/) 
- [Next.js 14.1](https://nextjs.org/) 
- [Prisma](https://www.prisma.io/) 
- [Tailwind CSS](https://tailwindcss.com/) 

## Installation & Running
To ensure that the project is fairly reflected please use the **deployed** instance of the project. As the project is hosted on vercel, the deployment instance can be accessed via the following link: [BroadHub](https://broadhub.vercel.app/)

Please note that no matter the environment you are running the project the following things have been disabled:
 - Email verification required for login 
 - Password reset functionality
 - All other Email related functionality

 This is due to a domain not being purchased and set up for the project, and as such the email functionality will not work.
If you with to run the project locally however, please follow the steps below:

### IF CLONED FROM GITHUB - PLEASE FOLLOW THE BELOW STEPS
1. Install Node.js 18 or later
2. Clone the repo and navigate to the project directory via the terminal
3. Get the `.env` file from the source code found in supporting materials - cannot be shared in the public repo due to security reasons
4. Place the `.env` file in the root of the project ie `broadhub/.env`
5. Install dependencies by running `npm ci`
6. Start the server with `npm run dev`
7. Navigate to [http://localhost:3000](http://localhost:3000) in your browser


### IF RUN USING SORUCE CODE FROM SUPPORTING MATERIALS
1. Install Node.js 18 or later and navigate to the project directory via the terminal
2. Install dependencies by running `npm ci`
3. Start the server with `npm run dev`
4. Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## Defaults
### Users Login credentials
These are the default credentials for the users in the system. and can be used to login to the system.

**Please note that if you are running the project locally you will need to init the data into your database instance (please see above steps).**

#### Credential User Info @ Credential 
| Email             | Password  |
| ----------------- | --------- |
| Dev.Coppertop+Broadhub.AyrtonSenna@gmail.com | Password@1 |
| Dev.Coppertop+Broadhub.MikaHakkinen@gmail.com | Password@1 |
| Dev.Coppertop+Broadhub.SebastianVettel@gmaiI.com | Password@1 |
| Dev.Coppertop+Broadhub.MichaelSchumacher@gmaiI.com | Password@1 |
| Dev.Coppertop+Broadhub.LewisHamilton@gmail.com | Password@1 |

#### OAuth2.0 User Info @ Okta 
| Email             | Password  |
| ----------------- | --------- |
| Dev.Coppertop+Broadhub.SkyJackson@gmail.com | OAuthPass |
| Dev.Coppertop+Broadhub.BenGreen@gmail.com | OAuthPass |
| Dev.Coppertop+Broadhub.RebeccaDeer@gmaiI.com | OAuthPass |
| Dev.Coppertop+Broadhub.DaveBIack@gmaiI.com | OAuthPass |
| Dev.Coppertop+Broadhub.JohnDoe@gmail.com | OAuthPass |