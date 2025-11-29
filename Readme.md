# React Native, Redux & Express – Server Setup (Spotify Project)

## 1. Project Initialization

- Create a new project folder (e.g., `Spotify`).
- Inside it, create a **`server`** folder for backend files.
- Open the `server` folder in terminal.
- Initialize npm with default values:

```bash
npm init -y
```

- This creates `package.json` with default settings.

---

## 2. Install Dependencies

### Main Dependency:

```bash
npm install express
```

### Dev Dependencies:

```bash
npm install -D @types/express typescript @types/node ts-node-dev
```

**Purpose of each:**

- `@types/express` → Type definitions for Express
- `typescript` → TypeScript compiler (installed locally so project runs anywhere)
- `@types/node` → Node.js type definitions
- `ts-node-dev` → Runs TypeScript directly (like nodemon, but for TS)

---

## 3. Update `package.json` Scripts

Replace `"test": "..."` with:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --pretty --transpile-only src/index.ts"
}
```

**Flags explained:**

- `--respawn` → Restart server on file change
- `--pretty` → Prettified terminal output
- `--transpile-only` → Skips type checking for faster dev mode
- Entry file: `src/index.ts`

---

## 4. Create Project Structure

```
server/
  ├─ src/
  │   └─ index.ts
  ├─ package.json
  ├─ tsconfig.json
```

---

## 5. Create `tsconfig.json`

Use the same settings as learned in previous section (customize if needed).  
Example minimal setup:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

## 6. Basic Express Server (`src/index.ts`)

```ts
import express from "express";

const app = express();
const PORT = 8989;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

---

## 7. Run the Server

```bash
npm run dev
```

Expected terminal output:

```
Server is listening on port 8989
```

If errors occur, review previous section setup instructions or ask for help.

---

**✅ Key Points:**

- Installed **TypeScript locally** so collaborators don't need a global TS install.
- Used `ts-node-dev` for live reload in development.
- Organized server code inside `src/` for clarity.
- Configured scripts & `tsconfig.json` for TypeScript backend development.

---

---

# React Native, Redux & Express – Feature Planning & Auth Requirements (Spotify API)

## 1. Planned Core Features

- **Upload audio files**
- **Listen to single audio**
- Add audio to **favorites**
- **Create playlists**
  - Playlists can be **public** or **private**
- **Remove playlists**
- **Remove audios**
- Follow the **author**
- Support for many other typical features ("...and many more")

---

## 2. Authorization & User Roles

- Operations (create/remove audio/playlists, add to favorite, etc.) should only be performed by **authorized users**
- Access control based on **ownership**:
  - Users should only be able to modify/delete their own data (audio files, playlists, favorites)
- Must assign and enforce user **roles** and permissions in the API

---

## 3. Authentication Workflow

- Implement **Sign Up** route (user registration)
- Implement **Sign In** route (user login)
- Only **authenticated/verified users** can access privileged features (upload, create, modify, delete)

---

## 4. Database Setup

- Need a database to **store user info** (for authentication, ownership, favorites, playlists, etc.)
- On user login:
  - Validate credentials (email & password) against stored records
  - Authorize access based on successful validation

---

## 5. Next Steps

- **Set up the database** (for user storage & authentication)
- Database configuration and routes for auth will be handled in the next video

---

**✅ Key Points:**

- App will support uploads, favorites, playlists, follows, and more—behind authentication
- **User authorization and role enforcement** is required for secure data operations
- Authentication is fundamental—be sure to set up DB before moving forward!

---

Here is a quick reference cheat sheet for the key features and authentication flow in your Spotify API project with React Native, Redux & Express:

---

# Quick Reference Cheat Sheet – Spotify API Features & Auth

## Core Features

- Upload audio files
- Listen to single audio tracks
- Add audio files to favorites
- Create playlists (public or private)
- Remove playlists
- Remove audio files
- Follow authors/users

---

## Authentication & Authorization

### User Authentication

- **Sign Up route**: Register new users
- **Sign In route**: Authenticate existing users
- Users must be signed in (authenticated) to perform protected operations

### Authorization & Access Control

- Users can only modify/delete their own data (audio, playlists, favorites)
- Implement user roles and permissions to enforce these restrictions in the API

---

## Database Setup

- Store user credentials (email, password) and profile data
- Validate credentials on sign-in for user authentication
- Store playlists, favorites, and audio ownership info associated with users

---

## API Operations Overview

| Operation         | Requires Authentication  | Ownership Check Needed?        |
| ----------------- | ------------------------ | ------------------------------ |
| Upload audio file | Yes                      | Yes                            |
| Listen to audio   | Depends (public/private) | No for public; Yes for private |
| Add to favorites  | Yes                      | Yes                            |
| Create playlist   | Yes                      | N/A (creates new)              |
| Remove playlist   | Yes                      | Yes                            |
| Remove audio      | Yes                      | Yes                            |
| Follow author     | Yes                      | No                             |

---

## Next Steps

- Set up database for user & media storage
- Implement authentication routes (Sign Up & Sign In)
- Apply middleware for authorization on protected routes
- Handle ownership verification within route controllers

---

Core Features
Upload audio files

    Listen to single audio tracks

    Add audio files to favorites

    Create playlists (public or private)

    Remove playlists

    Remove audio files

    Follow authors/users

Authentication & Authorization
User Authentication
Sign Up route: Register new users

    Sign In route: Authenticate existing users

    Users must be signed in (authenticated) to perform protected operations

Authorization & Access Control
Users can only modify/delete their own data (audio, playlists, favorites)

    Implement user roles and permissions to enforce these restrictions in the API

Database Setup
Store user credentials (email, password) and profile data

    Validate credentials on sign-in for user authentication

    Store playlists, favorites, and audio ownership info associated with users

---

---

# React Native, Redux & Express – MongoDB Setup with Mongoose and Environment Variables

## 1. Installing Required Packages

- Install **Mongoose** for MongoDB connection and data handling:
  ```bash
  npm install mongoose
  ```
- Install TypeScript types for Mongoose as a dev dependency:
  ```bash
  npm install -D @types/mongoose
  ```
- Install **dotenv** for environment variable management:
  ```bash
  npm install dotenv
  ```
- Install TypeScript types for dotenv as a dev dependency:
  ```bash
  npm install -D @types/dotenv
  ```

## 2. Setup Database Connection Folder and File

- Create a folder named `db` in your project root.
- Inside `db`, create a file named `index.ts`.

## 3. Establish MongoDB Connection in `db/index.ts`

- Import Mongoose:
  ```ts
  import mongoose from "mongoose";
  ```
- Define the connection URI using environment variables:
  ```ts
  const URI: string = process.env.MONGO_URI as string;
  ```
- Connect to MongoDB:
  ```ts
  mongoose
    .connect(URI)
    .then(() => console.log("DB is connected"))
    .catch((err) => console.log("DB connection failed", err));
  ```
- Handle errors and successful connection with console logging.

## 4. Use the Database Connection in Your Application Entry Point

- Import the DB connection at the top of your entry file (e.g., `src/index.ts`) **after** importing Express:
  ```ts
  import "./db";
  ```
- The order of this import matters to ensure the DB connection is established before the app starts.

## 5. Configure Environment Variables

- Create a `.env` file in your project root.
- Add the MongoDB URI to `.env`:
  ```
  MONGO_URI=mongodb://localhost:27017/Spotify
  ```
  - `localhost:27017` is the default MongoDB server URI for local setup.
  - `Spotify` is the name of your database.
- Make sure MongoDB is installed and running locally on your system to use this URI.

## 6. Load Environment Variables

- Import and configure dotenv at the top of your entry file (before using any environment variables):
  ```ts
  import "dotenv/config";
  ```

## 7. Run Your Project

- Restart your server with:
  ```bash
  npm run dev
  ```
- If everything is set up correctly, you should see:
  ```
  DB is connected
  ```
- If the URI is missing or incorrect, you will see an error logged.

---

## Notes

- Using environment variables keeps sensitive info like DB URIs secure and configurable.
- Installing TypeScript types locally helps prevent errors for contributors who don’t have global TS installed.
- The dotenv package automatically loads variables from `.env` into `process.env`.

---

---

Got it ✅  
Here are **clear, structured notes** from the transcript, ready for your **README.md** or personal reference in VS Code:

---

# MongoDB Installation on macOS (Community Edition) – Monster Course "M"

## 1. Accessing the Installation Guide

- Go to **[mongodb.com](https://www.mongodb.com)**
- Navigate:
  1. **Resources** → **Developer Center**
  2. **Documentation**
  3. **Use MongoDB**
  4. **Installation** (left sidebar)
  5. Select **Community Edition**
  6. Choose **macOS** as the operating system

---

## 2. Prerequisites

- Installing **Homebrew** also installs required **Xcode Command Line Tools**, so no extra steps for Mac if Homebrew is already set up.

---

## 3. Install MongoDB via Homebrew

```bash
# Add MongoDB official tap
brew tap mongodb/brew

# (Optional) Update Homebrew
brew update

# Install MongoDB Community Edition
brew install mongodb-community
```

🕑 Installation time: ~2 minutes at normal internet speed.

---

## 4. Start MongoDB Server (macOS)

> The `mongod` server must be running before you can interact with MongoDB.

- Depending on your Mac’s CPU architecture, commands vary slightly:
  - Use the provided **Intel Mac** or **Apple Silicon Mac** command from MongoDB docs.
- Example to run MongoDB server in foreground:

<!-- db error fix  -->

```bash
mongod --config /opt/homebrew/etc/mongod.conf --fork
```

_(Replace path according to your installation)_

---

## 5. Verify MongoDB Installation

- After starting the server, in another terminal, check the MongoDB shell:

```bash
mongosh
```

If connected, you’ll see options and server details, including:

- Listening port (default **27017**)
- MongoDB version

---

## 6. View Default Databases

From `mongosh`, run:

```bash
show dbs
```

This lists default databases supplied by MongoDB.

---

## 7. Stopping MongoDB Server

- If running MongoDB in the foreground, stop with:

```
CTRL + C
```

- If running as a service, stop with:

```bash
brew services stop mongodb-community
```

---

### ✅ Key Points:

- Always **start MongoDB server** before trying to connect from your application.
- Default port: **27017**
- Use `show dbs` to see current databases.
- You’ll create custom databases later during development.

---

---

---

# Understanding `.env` and Environment Variables in Node.js

## 1. Purpose of `.env` File

- `.env` stands for **environment file**.
- Stores **sensitive information** for your application.  
  Examples:
  - Database connection URLs
  - Database usernames & passwords
  - API keys
  - Secret tokens
- Keeps sensitive data **out of your source code** to avoid accidental leaks (e.g., via GitHub).

---

## 2. How It Works in Our Project

- In previous setup, we added:
  ```
  MONGO_URI=mongodb://localhost:27017/Spotify
  ```
  - This holds our **local MongoDB connection string**.
  - In the future, for production, this will store the **real database URI with username & password**.
- Environment variables declared in `.env` are **only available inside this project** when loaded.

---

## 3. Why We Need the `dotenv` Package

- **Node.js** does **not read `.env` files natively**.
- We use [`dotenv`](https://www.npmjs.com/package/dotenv) to load variables from `.env` into `process.env`.
- Steps:
  1. Install:
     ```bash
     npm install dotenv
     ```
  2. Import and configure in your entry file (`src/index.ts`):
     ```ts
     import "dotenv/config";
     ```
  3. **Order matters**:
     - Load dotenv **before** using `process.env`.
     - Example:
       ```ts
       import "dotenv/config";
       import "./db"; // uses process.env.MONGO_URI
       ```

---

## 4. Example Usage

Instead of hardcoding:

```ts
const URI = "mongodb://localhost:27017/Spotify";
```

We use:

```ts
const URI = process.env.MONGO_URI as string;
```

Another example for **Port number**:

```ts
const PORT = process.env.PORT || 8989;
```

- Uses server's port in production.
- Falls back to **8989** in local development.

---

## 5. Important Notes

- `.env` file should be in **root directory**.
- **Never commit your `.env` file** to source control.  
  Add to `.gitignore`:
  ```
  .env
  ```
- Always import `dotenv` **before** trying to use environment variables.
- Variables in `.env` are **strings** by default—convert if you need numbers/booleans.

---

✅ **Key Takeaways**:

- `.env` = secure location for sensitive data.
- `dotenv` loads it into `process.env`.
- The import order is critical—load it before usage.
- Works for **both local** and **production** environments with different variable values.

---

---

---

# Refactoring Environment Variables Handling in Node.js (with TypeScript)

## 1. Warnings in Mongoose

- Mongoose is **actively maintained**, so warnings are common and often temporary.
- Solutions for warnings are usually provided in the message itself—copy and apply them if needed.
- Restarts may clear warnings once fixed.

---

## 2. Current Setup Recap

- Previously used environment variables directly:
  ```ts
  const URI = process.env.MONGO_URI as string;
  ```
- This works, but is less organized and may require repeating code.

---

## 3. Creating a Centralized `variables.ts`

To improve maintainability:

1. Create a folder:
   ```
   src/utils/
   ```
2. Inside it, create:
   ```
   variables.ts
   ```
3. Move the variable extraction there:

   ```ts
   const mongoUri: string = process.env.MONGO_URI as string;

   export { mongoUri };
   ```

4. Import wherever needed:
   ```ts
   import { mongoUri } from "../utils/variables";
   ```

---

## 4. Improving Type Safety with Destructuring

Instead of accessing `process.env` directly everywhere:

```ts
// src/utils/variables.ts
const { env }: { env: { [key: string]: string } } = process;

export const { MONGO_URI: mongoUri } = env;
```

But here You are telling TypeScript:

“Nope, env will only have string values, never undefined.”

TypeScript says:

“That’s not safe — some keys might be missing.”

You have two options:

1️⃣ Allow undefined in the type

```
const { env }: { env: { [key: string]: string | undefined } } = process;
export const { MONGO_URI: mongoUri } = env;

```

OR

```
export const mongoUri = process.env.MONGO_URI as string;

```

### Benefits:

- **Type safety**: Each env variable is typed as `string`.
- **No need to cast** with `as string` every time.
- **Centralized variables** for easier management.
- **Cleaner imports** across the project.

---

## 5. Notes on Usage

- This approach **requires** that the variable exists in `.env`.
- If the variable is missing, it will cause problems at runtime—always define required vars in `.env` or the deployment environment.
- Works for any new variable, not just `MONGO_URI`.
- Example `.env`:
  ```env
  MONGO_URI=mongodb://localhost:27017/Spotify
  PORT=8989
  JWT_SECRET=your_jwt_secret_here
  ```

---

## 6. Example: Using `mongoUri` in DB Connection

```ts
// src/db/index.ts
import mongoose from "mongoose";
import { mongoUri } from "../utils/variables";

mongoose
  .connect(mongoUri)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.error("DB connection failed", err));
```

---

✅ **Key Takeaways**

- Centralizing `process.env` access makes code cleaner & type-safe.
- Use destructuring to avoid repetitive casting.
- Always **import and configure dotenv** (`import 'dotenv/config'`) before using env variables.
- Keep `.env` in `.gitignore` to protect sensitive info.

---

---

---

# Using Path Aliases in a TypeScript Node.js Project

## Problem with Relative Paths

- Deeply nested file structures result in cumbersome imports like:
  ```ts
  import { something } from "../../../models/users";
  ```
  - Multiple `../` make code hard to read and maintain.
- This complexity increases as more nested folders are added.

## Solution: Path Aliases

- Use **path aliases** to replace relative paths with simple, consistent symbols.
- Example: replace `../../../models/users` with `#models/users` or similar.

---

## Steps to Implement Path Aliases

### 1. Install `tsconfig-paths` for Development

- This package integrates with TypeScript to resolve aliases during development.
- Install as a dev dependency:
  ```bash
  npm install -D tsconfig-paths
  ```

### 2. Define Aliases in `tsconfig.json`

- Open `tsconfig.json` and add/update the `paths` option inside `compilerOptions`:
  ```json
  {
    "compilerOptions": {
      ...
      "baseUrl": "./src",
      "paths": {
        "#/*": ["*"]
      }
    }
  }
  ```
- This configuration means:  
  `#` alias maps to the `src` folder root, so `#models/users` points to `src/models/users`.

### 3. Modify `package.json` Dev Script

- Update your dev start script to register the `tsconfig-paths` module so aliases work at runtime:
  ```json
  "scripts": {
    "dev": "ts-node-dev -r tsconfig-paths/register --respawn --pretty --transpile-only src/index.ts"
  }
  ```
- The `-r tsconfig-paths/register` ensures runtime resolves the aliases.

### 4. Usage Example in Code

- Instead of:
  ```ts
  import { User } from "../../models/users";
  ```
- Use:
  ```ts
  import { User } from "#models/users";
  ```
- This simplifies import statements and improves maintainability.

---

## 5. Build & Production Considerations

- TypeScript understands aliases, but compiled JavaScript does not.
- After building the project, aliases remain in JS imports and will fail at runtime without transformation.

### 6. Use `tsc-alias` to Fix Paths in Compiled JS

- Install `tsc-alias` as dev dependency:
  ```bash
  npm install -D tsc-alias
  ```
- Modify your build script in `package.json`:
  ```json
  "scripts": {
    "build": "tsc && tsc-alias"
  }
  ```
- This runs TypeScript compilation (`tsc`) then replaces alias paths in output files with relative paths.

---

## 7. After Build

- The compiled JavaScript files in `dist/` will have fixed import paths without aliases.
- This ensures Node.js runtime can successfully resolve all imports.

---

## Summary

| Step | Action                                              | Purpose                                 |
| ---- | --------------------------------------------------- | --------------------------------------- |
| 1    | Install `tsconfig-paths`                            | Enable alias resolution during dev      |
| 2    | Configure `paths` in `tsconfig.json`                | Define alias mappings                   |
| 3    | Update dev script with `-r tsconfig-paths/register` | Enable aliases at runtime in dev mode   |
| 4    | Import modules using aliases                        | Simplify import statements              |
| 5    | Install `tsc-alias`                                 | Fix aliases in compiled JS              |
| 6    | Update build script with `tsc-alias`                | Ensure production build works correctly |

---

This setup will make your imports clean and scalable for large projects while maintaining compatibility during development and production builds.

---

---

# **User Model Setup in Mongoose with TypeScript**

## **1. Purpose of a User Model**

- Acts as a **blueprint** for storing and managing user data in MongoDB.
- Just like a building needs a **blueprint** for layout (rooms, windows, doors), an application needs a **schema** to define:
  - The structure of the data
  - Required vs optional fields
  - Data types

---

## **2. Creating the User Model File**

- Location: `src/models/user.ts`
- Structure:
  - Define **TypeScript interface** for type safety
  - Create **Mongoose Schema** with validation rules
  - Export **Mongoose Model** for usage in controllers

---

## **3. TypeScript Interface**

```ts
import { ObjectId } from "mongoose";

export interface UserDocument {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  avatar?: {
    url: string;
    public_id: string;
  };
  tokens: string[];
  favorites: ObjectId[];
  followers: ObjectId[];
  followings: ObjectId[];
}
```

- `avatar` is **optional** (`?`)
- `tokens` is an **array** of strings for multi-device auth
- `favorites`, `followers`, `followings` are arrays of `ObjectId`

---

## **4. Creating the Mongoose Schema**

```ts
import { Schema, model, Model } from "mongoose";
import { UserDocument } from "../types";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      url: String,
      public_id: String,
    },
    verified: { type: Boolean, default: false },
    favorites: [{ type: Schema.Types.ObjectId, ref: "audio" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "user" }],
    followings: [{ type: Schema.Types.ObjectId, ref: "user" }],
    tokens: [String],
  },
  { timestamps: true }
);
```

**Key Points:**

- `unique: true` on email → only one account per email
- `default: false` on `verified`
- `ref` is used to **populate related documents**:
  - `favorites` → refers to `audio` collection
  - `followers` / `followings` → refers to `user` collection
- `timestamps: true` → automatically adds `createdAt` & `updatedAt`

---

## **5. Creating and Exporting the Model**

```ts
const User: Model = model("user", userSchema);

export default User;
```

- Model name `'user'` **must match** the `ref` values used above

---

## **6. Why References Are Important**

- **Example:** When fetching a user's `favorites`, Mongoose can automatically populate details from the **audio model** instead of just returning ObjectIds.
- Ensures relationships between collections.

---

## **7. Summary Table**

| Field        | Type                      | Required | Default | Unique | Notes                     |
| ------------ | ------------------------- | -------- | ------- | ------ | ------------------------- |
| `name`       | String                    | ✅       | -       | ❌     | Trimmed before saving     |
| `email`      | String                    | ✅       | -       | ✅     | Trimmed, unique per user  |
| `password`   | String                    | ✅       | -       | ❌     | Stored hashed             |
| `avatar`     | Object `{url, public_id}` | ❌       | -       | ❌     | Profile picture info      |
| `verified`   | Boolean                   | ❌       | false   | ❌     | Email verification status |
| `tokens`     | Array\                    | ❌       | -       | ❌     | JWT or session tokens     |
| `favorites`  | Array\                    | ❌       | -       | ❌     | Ref to `audio` model      |
| `followers`  | Array\                    | ❌       | -       | ❌     | Ref to `user` model       |
| `followings` | Array\                    | ❌       | -       | ❌     | Ref to `user` model       |

---

## **8. Best Practices**

- Always **match** `ref` values to the target model names.
- Use `timestamps` to track data changes.
- Mark fields optional in **TypeScript interface** if they are not required in schema.
- Store sensitive info (like hashed passwords) securely.
- Keep schema in `models/` folder, separated from controllers.

---

✅ With this user model in place:

- You can create, query, and update users
- Easily populate related `favorites`, `followers`, `followings`
- Maintain clean, type-safe code

---

---

---

# **User Registration Route Setup (Express + TypeScript + Mongoose)**

## **1. Goal**

- Connect the previously created **User schema/model** to an **API route** so users can be created from HTTP requests.

---

## **2. Steps Implemented**

### **a. Registering Auth Router in `index.ts`**

```ts
// src/index.ts

import express from "express";
import authRouter from "./routers/auth"; // using path alias if configured

const app = express();

// Middleware for JSON and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// All auth endpoints start with /auth
app.use("/auth", authRouter);

app.listen(process.env.PORT || 8989, () => {
  console.log("Server is running...");
});
```

**Why these middleware?**

- `express.json()` → parse incoming JSON request bodies.
- `express.urlencoded({ extended: false })` → parse form URL-encoded data.

---

### **b. Creating the Auth Router (`src/routers/auth.ts`)**

```ts
import { Router } from "express";
import User from "#/models/user"; // Path alias or relative import

const router = Router();

// Create (Sign Up) route
router.post("/create", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Option 1: Using new User + save()
    // const newUser = new User({ name, email, password });
    // await newUser.save();

    // Option 2: Using User.create()
    const newUser = await User.create({ name, email, password });

    // Send created user back as JSON (will include default fields)
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
```

**Key Points:**

- `await User.create(...)` is **simpler** than using `new User()` + `.save()`.
- `async/await` is required for asynchronous Mongoose operations.
- No validation logic yet — raw values from `req.body` are saved.

---

### **c. Required Fields at This Stage**

From the `User` model:

- **Required now:**  
  `name`, `email`, `password`
- **Auto-handled / defaults now:**  
  `verified = false`, `avatar` not required, `tokens` empty, relational arrays empty.
- Validation for correct email/password format isn't done yet — will be added later.

---

## **3. Testing with Postman**

### **Postman Setup**

- **Create a collection:**  
  Name: `Spotify Server`
- **Create request inside collection:**  
  Name: `Create User`  
  Method: **POST**  
  URL:
  ```
  http://localhost:8989/auth/create
  ```
- **Body** → **raw** JSON:
  ```json
  {
    "name": "John Doe",
    "email": "john@email.com",
    "password": "123456"
  }
  ```

---

**Expected Response Example**:

```json
{
  "_id": "66d0a41dec898a7ceff73e67",
  "name": "John Doe",
  "email": "john@email.com",
  "password": "123456",
  "verified": false,
  "favorites": [],
  "followers": [],
  "followings": [],
  "tokens": [],
  "createdAt": "2025-08-14T14:25:33.123Z",
  "updatedAt": "2025-08-14T14:25:33.123Z",
  "__v": 0
}
```

---

## **4. Common Errors & Fixes**

- **`req.body is not a function`** → Happens if you accidentally invoke `req.body()` instead of treating it like an object.
- **Empty fields being accepted** → Because Mongoose only enforces `"required"` for missing fields, not for trimming/format validation, explicit validation middleware is needed.
- **Duplicate variable names (`user` vs `User`)** → Capitalized `User` for model, lowercase for object instance (to avoid confusion).

---

## **5. MongoDB Compass Check**

- Connect to your MongoDB instance.
- Database: `Spotify`
- Collection: `users`
- You’ll see the inserted users with required/default fields populated.

---

## **6. Next Steps**

- Fix `any` type issue in controller input by creating a **typed request body interface**.
- Add **validation middleware** for:
  - Email format
  - Password strength
  - Duplicate emails
- Encrypt password before saving (e.g., with bcrypt).
- Return a cleaner response (omit password field).

---

✅ **At this stage:** You can send POST requests to `/auth/create` to insert new user documents into MongoDB.

---

---

---

# **Type-Safe Request Body for `Create User` Route (Express + TypeScript)**

## **1. Problem**

- In the `/auth/create` route, `req.body` properties (`name`, `email`, `password`) were inferred as `any`.
- Without proper typing, we lose:
  - IntelliSense support
  - Compile-time error checking
  - Developer clarity

---

## **2. Solution Overview**

- Create a **custom type** that extends `express.Request` and defines the shape of `req.body` specifically for the **Create User** request.

---

## **3. Folder Structure (Convention)**

```
src/
 ├─ @types/
 │    └─ user.ts    # Custom request type for user routes
 ├─ routers/
 │    └─ auth.ts
 ├─ models/
 │    └─ user.ts
```

> `@types` is just a naming convention — the folder can be called anything.

---

## **4. Defining the Type**

```ts
// src/@types/user.ts
import { Request } from "express";

export interface CreateUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}
```

**Key Points:**

- Extends `Request` from `express`
- Overrides the `body` type with our expected fields
- Only includes fields needed for **creating a user** (not all from User model)

---

## **5. Using the Type in the Router**

```ts
// src/routers/auth.ts
import { Router } from "express";
import User from "#/models/user";
import { CreateUserRequest } from "#/@types/user";

const router = Router();

router.post("/create", async (req: CreateUserRequest, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({ name, email, password });
    res.json(newUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
```

**Now:**

- Hovering over `name`, `email`, or `password` shows `string` type.
- TypeScript will complain if a property is missing or has the wrong type.

---

## **6. Benefits**

- **Type Safety** — catches invalid fields at compile time
- **Better IntelliSense** — auto-complete for `req.body` properties
- **Code Clarity** — quick understanding of required request fields
- **Scalability** — easier to manage request types for each controller

---

## **7. Next Steps**

- Apply similar typing for other request types (`LoginRequest`, `UpdateProfileRequest`, etc.)
- Combine with **validation middleware** (Joi, Zod, or express-validator) to validate values at runtime, not just compile-time.

---

✅ **Takeaway:**  
Extending `express.Request` with an interface for the route-specific body is a clean way to enforce type safety in your controllers.

---

---

# **User Input Validation – Preparing for Yup Integration (Express + TypeScript)**

## **1. The Problem**

- Currently, even if:
  - **`password` is missing**
  - **Invalid email** format
- The API can still create a user in MongoDB.
- This is because we have **no validation logic** on the incoming request data beyond Mongoose “required” schema rules (which don’t validate format).

---

## **2. Basic Manual Validation (Middleware Example)**

- In Express, a middleware function can be added **between the route path and the controller**.
- Middleware signature:

```ts
(req, res, next) => { ... }
```

- We can destructure required fields from `req.body`:

```ts
const { name, email, password } = req.body;
```

- Example manual validation for **`name`**:

```ts
if (!name.trim()) {
  return res.json({ error: "Name is missing" });
}

if (name.length < 3) {
  return res.json({ error: "Invalid name" });
}

next();
```

- Here:
  - `.trim()` removes leading/trailing spaces → catches cases like `"   "`.
  - `return` stops execution if the validation fails.
  - Without manual checks for each field, invalid data still gets stored.

---

## **3. Why Not Write All Validations Manually?**

- Validating values like **email format** or **password complexity** requires **regex patterns** and custom code.
- Doing this manually is time-consuming, repetitive, and prone to inconsistent error-handling.
- As the number of fields & complexity grows → manual approach becomes messy.

---

## **4. Introducing `Yup` for Schema Validation**

- [`Yup`](https://github.com/jquense/yup) is a **schema builder for value parsing and validation**.
- Benefits:
  1. ✏️ **Declarative Rules** – Define how each field should look in one place.
  2. ⚡ **Reusable** – Define once, use in multiple routes.
  3. 🛠 **Rich Validators** – Email, min/max length, regex patterns, etc.
  4. 🔄 **Shared** – Can be used **in both backend and frontend**.

---

## **5. Yup Example (from Docs)**

```ts
import * as yup from "yup";

const userSchema = yup.object({
  name: yup.string().min(3).required(),
  email: yup.string().email("Invalid email format").required(),
  password: yup.string().min(6).required(),
});

// Validate incoming data
try {
  await userSchema.validate(req.body);
  next();
} catch (err) {
  res.status(400).json({ error: err.errors[0] });
}
```

---

## **6. Why Yup is the Chosen Validator**

- Many schema validators exist (e.g., Joi, Zod, class-validator), but:
  - **Yup** works **seamlessly** with:
    - **Backend** (Express/Node)
    - **Frontend** (React/React Native)
  - **Formik** (popular form state library) has built‑in support for Yup:
    ```jsx
    validationSchema = { userSchema };
    ```
  - This means **one validation schema** can be shared across the **entire stack**.

---

## **7. Next Steps**

- In the next step, the manual `name` checks will be **replaced** with a Yup validation middleware.
- This middleware will:
  - Define schema (`name`, `email`, `password`) rules in one place.
  - Automatically send a response with custom error messages if validation fails.
  - Let the request body pass through to the controller only if it’s valid.

---

✅ **Key Takeaway:**  
Instead of duplicating input validation logic for every field and route:

- Use **middleware** + **Yup** schema validation.
- This ensures concise, reusable, and consistent validation in **both backend and frontend** apps.

---

---

---

# **Validation Schema with Yup for User Registration**

## **1. Why Yup?**

- Required because manual checks for `name`, `email`, and `password` are repetitive and error-prone.
- Yup lets us:
  - Build **declarative schemas**
  - Chain constraints (required, min/max length, regex, etc.)
  - Provide **custom error messages**
  - Reuse validations across backend and frontend (Formik supports Yup out-of-the-box 🚀)

---

## **2. Setup**

Install Yup in the project:

```bash
npm i yup
```

Create a **utility file** to store validation schemas:

```bash
src/utils/validationSchema.ts
```

---

## **3. Create User Validation Schema**

```ts
// src/utils/validationSchema.ts
import * as yup from "yup";

// Strong password regex pattern
// At least one letter, one number, and one special character
const strongPasswordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;

export const createUserSchema = yup.object({
  // Name validation
  name: yup
    .string()
    .trim()
    .required("Name is missing")
    .min(3, "Name is too short")
    .max(50, "Name is too long"),

  // Email validation
  email: yup
    .string()
    .trim()
    .email("Invalid email ID")
    .required("Email is missing"),

  // Password validation
  password: yup
    .string()
    .trim()
    .required("Password is missing")
    .min(8, "Password is too short")
    .matches(strongPasswordRegex, "Password is too simple"),
});
```

---

## **4. Password Policy (with Regex)**

- Must include:
  - At least **one alphabetic character** (`A-Z` or `a-z`)
  - At least **one number** (`0-9`)
  - At least **one special character** (`@$!%*#?&`)
- Example **valid password**:  
  `Ninja#123`

- Example **invalid password**:
  - `"12345678"` ❌ (only digits)
  - `"password"` ❌ (only alphabets)

---

## **5. How to Use the Schema**

In your route, instead of manually checking fields:

```ts
import { createUserSchema } from "#/utils/validationSchema";

router.post("/create", async (req, res) => {
  try {
    // Validate against schema
    await createUserSchema.validate(req.body, { abortEarly: false });

    // If valid → create user
    const user = await User.create(req.body);
    res.json(user);
  } catch (error: any) {
    // Collect Yup error messages (can be multiple)
    return res.status(400).json({ errors: error.errors });
  }
});
```

**Note:**

- `{ abortEarly: false }` ensures Yup reports **all validation errors** instead of stopping at the first one.
- `error.errors` is an array with custom error messages.

---

## **6. Example Failures**

### Request:

```json
{
  "name": "Jo",
  "email": "not-an-email",
  "password": "123456"
}
```

### Response (Yup Errors):

```json
{
  "errors": ["Name is too short", "Invalid email ID", "Password is too simple"]
}
```

---

## **7. Benefits**

- Centralized reusable validation (all in `validationSchema.ts`)
- Clean, readable rules
- Rich error messages for clients / Postman testing
- Shared across **Express backend** and **React Native frontend (via Formik)**

---

✅ **At this stage:**  
We now have a **strong schema-based validation system** for `name`, `email`, and `password` using Yup.

---

👉 Next step in your flow (as hinted):  
Integrate this schema as an **Express middleware** so validation happens **before reaching the controller**.

---

---

---

# **Reusable Yup Validation Middleware (Express + TypeScript)**

## **1. The Problem**

- Previously: Each controller (e.g. `/auth/create`) had to call:
  ```ts
  await createUserSchema.validate(req.body);
  ```
- This caused duplication across **every route** that needed validation.
- We need a **centralized middleware** to validate request bodies automatically.

---

## **2. What We Want**

- Use route like this:
  ```ts
  router.post("/create", validate(createUserSchema), createUserController);
  ```
- ✅ `validate()` is a generic middleware factory that:
  - Runs the schema rules
  - Returns **errors immediately** with proper JSON
  - Calls `next()` if validation passed

---

## **3. Middleware Implementation**

### File: `src/middleware/validator.ts`

```ts
import { RequestHandler } from "express";
import * as yup from "yup";

export const validate = (schema: yup.ObjectSchema<any>): RequestHandler => {
  return async (req, res, next) => {
    // Ensure body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Empty body is not accepted" });
    }

    try {
      // Validate request body against schema
      await schema.validate(req.body, { abortEarly: false });

      // ✅ If valid → go to next middleware/controller
      return next();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        // Collect all validation error messages
        return res.status(400).json({ errors: err.errors });
      }

      // Fallback in case of unknown errors
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};
```

---

## **4. Using the Middleware**

### In your Auth Router:

```ts
// src/routers/auth.ts
import { Router } from "express";
import User from "#/models/user";
import { validate } from "#/middleware/validator";
import { createUserSchema } from "#/utils/validationSchema";

const router = Router();

router.post("/create", validate(createUserSchema), async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser); // 201 = Created
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
```

---

## **5. Test Cases (Postman / Thunder Client)**

### Request with missing password:

```json
{
  "name": "Jane Doe",
  "email": "jane@email.com"
}
```

### Response:

```json
{
  "errors": ["Password is missing"]
}
```

➡ **Status Code: `400 Bad Request`**

---

### Request with invalid email OR too-short name:

```json
{
  "name": "Jo",
  "email": "not-an-email",
  "password": "123"
}
```

### Response:

```json
{
  "errors": [
    "Name is too short",
    "Invalid email ID",
    "Password is too short",
    "Password is too simple"
  ]
}
```

➡ **Status Code: `400 Bad Request`**

---

### Request with valid details:

```json
{
  "name": "John Smith",
  "email": "john@email.com",
  "password": "Pass@123"
}
```

### Response:

```json
{
  "_id": "66c9fe67...",
  "name": "John Smith",
  "email": "john@email.com",
  "verified": false,
  "createdAt": "...",
  "updatedAt": "...",
  "__v": 0
}
```

➡ **Status Code: `201 Created`**

---

## **6. Key Improvements**

- ✅ Centralized validation logic (no duplication per route)
- ✅ Flexible: different schemas = different routes
- ✅ Better error reporting (can return multiple errors at once with `abortEarly: false`)
- ✅ Correct HTTP status codes (400 = validation error, 201 = created, 500 = unexpected error)

---

## **7. Next Step**

➡ Currently, validation errors return **200 OK**, which is misleading.  
→ Next step is to standardize HTTP responses:

- `400 Bad Request` for validation failures
- `401 Unauthorized` for login/auth errors
- `404 Not Found` for missing resources
- `500 Internal Server Error` for server crashes

---

✅ With this middleware in place, **every route can have its own schema** while validation stays consistent across the API.

---

---

Standardize your error handling middleware so that:

Yup validation errors → 422

Auth errors → 401/403

Not found → 404

Success create → 201

Normal success → 200

This keeps your entire API predictable and clean for frontend developers.

---

---

# **Email Verification Setup (Mailtrap for Development)**

## **1. Why Do We Need Email Verification?**

- Validating email **format** (via Yup schema) ≠ validating that the **email actually exists**.
- To confirm ownership → must send a token/OTP/link to the provided email.
- This prevents fake accounts and ensures **real users** only.

---

## **2. The Challenge**

- Sending emails **directly from your Node.js/Express app** is not reliable:
  - Mail providers (Gmail, Outlook, Yahoo, etc.) will treat it as spam.
  - Spammers could misuse open relay servers if raw SMTP was allowed universally.
- Therefore → need a **trusted third-party email service provider**.

---

## **3. The Solution**

- Use verified **transactional email services** (SMTP/API based). Examples:
  - Mailtrap (best for **development/testing**)
  - SendGrid
  - AWS SES
  - Postmark / Mailgun

---

## **4. Why Mailtrap (for Dev)?**

- Specially built for **testing emails in dev/staging** environments.
- Emails sent go into a **sandbox/inbox** you control.
- Simulates real delivery without spamming real email addresses.
- Useful to confirm:
  - Email is being sent
  - Template formatting looks good
  - Tokens/OTPs contain correct data

---

## **5. Setup Instructions**

1. **Sign up** at [Mailtrap](https://mailtrap.io/)

   - Use "Sign up with Google" for quick onboarding.
   - Your Google account is already verified, so fewer steps.

2. **Verify Mailtrap Account**

   - Mailtrap itself will send you a validation email (same process you’re trying to build).

3. **Create an Inbox**

   - Navigate to **Email Testing → Inboxes** in Mailtrap dashboard.
   - Click **New Inbox** → give it a name (e.g., `Dev Emails`).
   - You’ll see connection settings (SMTP host, port, username, password).

4. **Next Step (in app)**
   - Configure your Express app (via `nodemailer` or similar) to use **Mailtrap SMTP credentials**.
   - This way, whenever you send a signup/verification email → Mailtrap inbox will capture it.

---

## **6. Summary**

- Direct email sending is blocked by all major providers due to spam risks.
- Use **Mailtrap for dev** → to **test email flow** safely.
- Later in production → switch to a real service (like SendGrid/SES).
- At this stage, we're preparing to:
  - **Create inbox in Mailtrap**
  - **Configure our backend with Mailtrap SMTP**
  - **Send verification link/OTP emails to test inbox**

---

✅ **Next Video Goal:** Configure **Nodemailer** (or another SMTP client) in `services/email.ts` using the Mailtrap credentials, and test sending verification email from backend.

---

---

---

# **Sending Verification Emails (Mailtrap + Nodemailer)**

## **1. Why Mailtrap + Nodemailer?**

- **Nodemailer** = Node.js package for sending emails via SMTP.
- **Mailtrap** = Sandbox service for testing emails during development.
- Benefits:
  - Safe: emails don’t go to real inboxes (avoids spamming).
  - Fully debuggable: you can see subject, body, recipients, tokens.
  - Prepares you for production switch (SendGrid, Mailgun, SES, etc.).

---

## **2. Setup Guide**

### **Step 1: Install Nodemailer**

```bash
npm install nodemailer
npm install -D @types/nodemailer   # for TS projects
```

---

### **Step 2: Configure .env File**

From Mailtrap inbox → Settings → Integrations → copy credentials:

```env
MAILTRAP_USER=<your-mailtrap-username>
MAILTRAP_PASS=<your-mailtrap-password>
```

---

### **Step 3: Export Variables**

File: `src/config/variables.ts`

```ts
export const { MAILTRAP_USER, MAILTRAP_PASS, MONGODB_URI } = process.env;
```

---

### **Step 4: Setup Transporter**

Inside your controller (temporary test):

```ts
import nodemailer from "nodemailer";
import { MAILTRAP_USER, MAILTRAP_PASS } from "#/config/variables";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
});
```

---

## **3. Sending the Verification Email**

Inside your **user controller → createUser**:

```ts
import { RequestHandler } from "express";
import User from "#/models/user";
import { transporter } from "#/services/email"; // recommend extracting transporter setup

export const createUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.create(req.body);

    // 🔑 Send verification email
    await transporter.sendMail({
      from: "auth@myapp.com",
      to: user.email,
      subject: "Verify your email",
      html: `<h1>12345</h1>`, // Will later be a token or OTP
    });

    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
```

---

## **4. Test with Postman**

- Create a new user with a unique email:

```json
{
  "name": "John",
  "email": "johnagain@gmail.com",
  "password": "Pass@123"
}
```

- `201 Created` response should return user object.
- On Mailtrap dashboard → **Inbox → Message** → see the email (with subject + dummy OTP HTML).

---

## **5. What We Achieved**

✅ Successfully integrated **Nodemailer with Mailtrap**  
✅ New users trigger a **verification email**  
✅ Email is viewable in Mailtrap test inbox

---

## **6. What’s Next?**

- Right now: email contains a **dummy OTP (`12345`)**.
- Next step:
  - Generate **unique tokens or OTPs** dynamically.
  - Store them in the database (linked to the user).
  - Verify them when a user clicks the link or enters the OTP.
  - Update `user.verified = true` after confirmation.

---

---

---

# **Email Verification Token Model (Mongoose + TypeScript)**

## **1. Why Do We Need This?**

- To validate email ownership, we must:
  1. Generate a **verification token (or OTP)** when a user signs up.
  2. Send that token via email.
  3. Store the token in the database temporarily.
  4. When the user clicks the link or submits the token, verify it against DB.
- Tokens should **expire after a short period** (e.g., 1 hour) for security.

---

## **2. Creating the Token Model**

### File: `src/models/emailVerificationToken.ts`

```ts
import { Schema, model, Model, Document } from "mongoose";

// Step 1: Define TypeScript interface
export interface EmailVerificationTokenDocument extends Document {
  owner: Schema.Types.ObjectId; // user who this token belongs to
  token: string; // actual token string
  createdAt: Date; // created timestamp (auto-remove after TTL)
}

// Step 2: Create Schema
const emailVerificationTokenSchema = new Schema<EmailVerificationTokenDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user", // must match the User model name exactly
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // 3600s = 1 hour TTL
    },
  }
);

// Step 3: Export Model
const EmailVerificationToken: Model<EmailVerificationTokenDocument> =
  model<EmailVerificationTokenDocument>(
    "emailverificationtoken",
    emailVerificationTokenSchema
  );

export default EmailVerificationToken;
```

---

## **3. Key Fields**

- **owner** → `ObjectId` of the user this token belongs to.
  - `ref: "user"` links this token to the `User` collection.
- **token** → Unique verification token (string).
  - Later you can hash this before saving for extra security.
- **createdAt** → Stores creation timestamp.
  - Uses `expires: 3600` → MongoDB TTL index auto-deletes documents after 1 hour.

---

## **4. TTL (Time-To-Live) Behavior in MongoDB**

- TTL indexes are checked approximately **once per minute**:
  - If `expires: 60`, the document might live **up to 119 seconds**.
  - If `expires: 3600` (1 hour), it might be 1h + up to 1min.
- Always keep this in mind if testing small values — deletion isn’t _instant_, it’s polled every ~60s.

---

## **5. Example Usage (During Signup)**

Later in the controller:

```ts
import crypto from "crypto";
import EmailVerificationToken from "#/models/emailVerificationToken";

// Inside signup logic:
const token = crypto.randomBytes(32).toString("hex");

await EmailVerificationToken.create({
  owner: user._id,
  token,
});

// Send token to user via email (Mailtrap for dev)
await transporter.sendMail({
  from: "auth@myapp.com",
  to: user.email,
  subject: "Verify your account",
  html: `<h1>Your OTP: ${token}</h1>`,
});
```

---

## **6. Summary**

- `emailVerificationToken` model stores:
  - Who the token belongs to (`owner`)
  - The **token** string
  - A `createdAt` timestamp with MongoDB TTL for expiry
- Expires automatically after **1 hour (3600s)**.
- Will be used in upcoming steps to:
  1. Generate token on signup
  2. Email token to the user
  3. Validate token on verification endpoint
  4. Delete expired/used tokens

---

✅ **Next Step**: Integrate this model into the **user signup flow** → generate & save a fresh token before sending the email.

---

---

---

# **Sending Verification Emails (Mailtrap + Nodemailer)**

## **1. Why Mailtrap + Nodemailer?**

- **Nodemailer** = Node.js package for sending emails via SMTP.
- **Mailtrap** = Sandbox service for testing emails during development.
- Benefits:
  - Safe: emails don’t go to real inboxes (avoids spamming).
  - Fully debuggable: you can see subject, body, recipients, tokens.
  - Prepares you for production switch (SendGrid, Mailgun, SES, etc.).

---

## **2. Setup Guide**

### **Step 1: Install Nodemailer**

```bash
npm install nodemailer
npm install -D @types/nodemailer   # for TS projects
```

---

### **Step 2: Configure .env File**

From Mailtrap inbox → Settings → Integrations → copy credentials:

```env
MAILTRAP_USER=<your-mailtrap-username>
MAILTRAP_PASS=<your-mailtrap-password>
```

---

### **Step 3: Export Variables**

File: `src/config/variables.ts`

```ts
export const { MAILTRAP_USER, MAILTRAP_PASS, MONGODB_URI } = process.env;
```

---

### **Step 4: Setup Transporter**

Inside your controller (temporary test):

```ts
import nodemailer from "nodemailer";
import { MAILTRAP_USER, MAILTRAP_PASS } from "#/config/variables";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
});
```

---

## **3. Sending the Verification Email**

Inside your **user controller → createUser**:

```ts
import { RequestHandler } from "express";
import User from "#/models/user";
import { transporter } from "#/services/email"; // recommend extracting transporter setup

export const createUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.create(req.body);

    // 🔑 Send verification email
    await transporter.sendMail({
      from: "auth@myapp.com",
      to: user.email,
      subject: "Verify your email",
      html: `<h1>12345</h1>`, // Will later be a token or OTP
    });

    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
```

---

## **4. Test with Postman**

- Create a new user with a unique email:

```json
{
  "name": "John",
  "email": "johnagain@gmail.com",
  "password": "Pass@123"
}
```

- `201 Created` response should return user object.
- On Mailtrap dashboard → **Inbox → Message** → see the email (with subject + dummy OTP HTML).

---

## **5. What We Achieved**

✅ Successfully integrated **Nodemailer with Mailtrap**  
✅ New users trigger a **verification email**  
✅ Email is viewable in Mailtrap test inbox

---

## **6. What’s Next?**

- Right now: email contains a **dummy OTP (`12345`)**.
- Next step:
  - Generate **unique tokens or OTPs** dynamically.
  - Store them in the database (linked to the user).
  - Verify them when a user clicks the link or enters the OTP.
  - Update `user.verified = true` after confirmation.

---

---

---

# **1. Install bcrypt and its Types**

```bash
npm install bcrypt
npm install -D @types/bcrypt
```

---

# **2. Hashing the Token in Your EmailVerificationToken Schema**

**File:** `models/emailVerificationToken.ts`

```ts
import { Schema, model, Document } from "mongoose";
import bcrypt, { hash, compare } from "bcrypt";

// Interface for methods
interface EmailVerificationTokenMethods {
  compareToken(token: string): Promise<boolean>;
}

// Document interface includes our methods
export interface EmailVerificationTokenDocument
  extends Document,
    EmailVerificationTokenMethods {
  owner: Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

// The schema
const emailVerificationTokenSchema = new Schema<
  EmailVerificationTokenDocument,
  {},
  EmailVerificationTokenMethods
>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // 1 hour TTL
  },
});

// Pre-save hook for hashing token
emailVerificationTokenSchema.pre("save", async function (next) {
  // Only hash if the token has been modified/new
  if (!this.isModified("token")) return next();
  this.token = await hash(this.token, 10);
  next();
});

// Instance method for comparing tokens
emailVerificationTokenSchema.methods.compareToken = async function (
  candidate: string
): Promise<boolean> {
  // this.token is already hashed in DB
  return compare(candidate, this.token);
};

// Export the model
const EmailVerificationToken = model<EmailVerificationTokenDocument>(
  "emailverificationtoken",
  emailVerificationTokenSchema
);

export default EmailVerificationToken;
```

---

# **3. Usage in Your Controller**

### Generating and Saving a Plaintext Token (OTP)

**File:** `controllers/user.ts` (or equivalent)

```ts
import EmailVerificationToken from "#/models/emailVerificationToken";
import { generateToken } from "#/utils/helper"; // Your OTP generator

// ... inside your signup endpoint

const otp = generateToken(); // e.g., '2144'

// Save OTP (it will be auto-hashed by pre('save'))
const verificationRecord = new EmailVerificationToken({
  owner: user._id,
  token: otp, // Will be hashed by hook!
});
await verificationRecord.save();

// Send plaintext OTP to email
await transporter.sendMail({
  from: "auth@myapp.com",
  to: user.email,
  subject: "Verify your email",
  html: `<h1>Your verification token is ${otp}</h1>`,
});
```

---

# **4. Verifying the Token**

**File:** `controllers/verify.ts` (or similar)

```ts
// ...in your token verification handler

const { userId, token } = req.body;

// Find token record
const verificationRecord = await EmailVerificationToken.findOne({
  owner: userId,
});
if (!verificationRecord)
  return res.status(400).json({ error: "Token expired or invalid." });

// Compare submitted OTP with hashed DB value
const isMatch = await verificationRecord.compareToken(token); // uses our instance method
if (!isMatch) return res.status(400).json({ error: "Invalid token." });

// Mark user as verified, etc.

// Remove token record to prevent reuse
await verificationRecord.deleteOne();

return res.status(200).json({ message: "Email verified!" });
```

---

# **5. What About the User Password?**

Repeat the same **pattern** in your `User` schema:

**models/user.ts**

```ts
import bcrypt from "bcrypt";

// ...userSchema definition

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};
```

---

# **6. Why This Is Best Practice**

- **No sensitive info stored in plaintext.**
- Hashing is automatically enforced at the schema/model layer (never forget!).
- Comparing uses the same algorithm, comparing the hash against user input at runtime.
- Works for both passwords and single-use tokens.

---

## **Summary Table**

| Field     | Stored as   | Hashed in...           | Verified with method           |
| --------- | ----------- | ---------------------- | ------------------------------ |
| Password  | bcrypt hash | User pre('save')       | `user.comparePassword(...)`    |
| OTP/Token | bcrypt hash | EmailToken pre('save') | `emailToken.compareToken(...)` |

---

## **Usage Recap**

- **Send:** Save `otp` (will hash); email the **plain** `otp`.
- **Verify:** User submits **plain** `otp`; call `compareToken(plainOtp)`; method checks match with **hashed** DB value.

---

---

Make sure the post request is POST and not GET

Here are the step-by-step instructions and code snippets to implement the "verify email" route and controller method for validating an OTP (One-Time Password) in a MERN stack app, as explained in your lecture:

---

### Implementing Email Verification Endpoint

This will allow users to submit an OTP and their `userId` to verify their email address.

---

### 1. Create the Verify Email Route

**Code Snippet:** (`routes/auth.ts`)

```typescript
import { Router } from "express";
import { verifyEmail } from "../controllers/user";

const router = Router();

router.post("/verify-email", verifyEmail);

export default router;
```

- **Explanation:**
  - Adds a POST endpoint `/verify-email` which calls the `verifyEmail` controller method.
  - Remove unrelated code or duplicate only what’s necessary for this route.

---

### 2. Update or Create the Request Type

**Code Snippet:** (`types/user.ts`)

```typescript
export interface VerifyEmailRequest extends Request {
  body: {
    userId: string;
    token: string;
  };
}
```

- **Explanation:**
  - Defines the TypeScript type for the verify email request, expecting both `userId` and `token` in the body.

---

### 3. Implement the Controller Logic

**Code Snippet:** (`controllers/user.ts`)

```typescript
import { Request, Response } from "express";
import EmailVerificationToken from "../models/emailVerificationToken";
import User from "../models/user";

export const verifyEmail = async (req: Request, res: Response) => {
  const { userId, token } = req.body;

  // Find email verification token by owner (user ID)
  const verificationToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (!verificationToken) {
    return res.status(403).json({ error: "Invalid token" });
  }

  // Compare provided token with stored token
  const matched = await verificationToken.compareToken(token);
  if (!matched) {
    return res.status(403).json({ error: "Invalid token" });
  }

  // Set user as verified
  await User.findByIdAndUpdate(userId, { verified: true });

  // Remove the used verification token
  await EmailVerificationToken.findByIdAndDelete(verificationToken._id);

  // Respond with success
  res.json({ message: "Your email is verified" });
};
```

- **Explanation:**
  - Looks up the verification token for the user.
  - Compares the submitted OTP (`token`) to what’s stored, using a method like `compareToken`.
  - Verifies the user on match, deletes the used verification token from the database.
  - Sends success response back to the client.

---

### 4. Make a Test Request

With Postman or any API tool:

- **POST** to `/verify-email`
- **Body:** (raw, JSON)
  ```json
  {
    "userId": "PUT_USER_ID_HERE",
    "token": "PUT_OTP_HERE"
  }
  ```
- **Expected Response:**
  ```json
  { "message": "Your email is verified" }
  ```
- **Explanation:**
  - Replace `"userId"` and `"token"` with actual values as received by the user.
  - Ensure the user’s `verified` flag in the database is now `true`.
  - The used token should be deleted after verification.

---

### 5. Summary of Logic

- Receives `userId` and `token` in request body.
- Finds verification token for user.
- If not found or no match, responds with error.
- If match:
  - Marks user as verified (`verified: true`)
  - Deletes verification token (for security, prevents token reuse)
  - Sends confirmation message.

---

---

To add robust validation for your `/verify-email` route, the goal is to ensure that both the `token` and `userId` are present and valid before your controller logic runs. If validation fails, a clear error (like "invalid user ID" or "invalid token") is returned instead of a server or MongoDB error.

Here are the steps and a sample code snippet, matching what was shown in your lecture:

---

### Step-by-Step: Add Email Verification Validation Schema

#### 1. **Create the Validation Schema**

Create a file, e.g., `validations/emailVerification.ts`.

```typescript
import * as yup from "yup";
import mongoose from "mongoose";

export const emailVerificationBody = yup.object().shape({
  token: yup.string().trim().required("Invalid token"),

  userId: yup
    .string()
    .transform(function (value) {
      // Validate: must be string and valid ObjectId
      if (typeof value === "string" && mongoose.Types.ObjectId.isValid(value)) {
        return value;
      }
      return "";
    })
    .required("Invalid user ID"),
});
```

**Explanation:**

- Checks that `token` is a string and required.
- `userId` must be a string _and_ a valid MongoDB ObjectId, or it turns into an empty string to trigger a validation error.

---

#### 2. **Plug the Schema into the Route**

In your router file (e.g., `routes/auth.ts`), use a validation middleware (can be custom or from a package) to validate request bodies with your new schema:

```typescript
import { Router } from "express";
import { verifyEmail } from "../controllers/user";
import { emailVerificationBody } from "../validations/emailVerification";
import validate from "../middlewares/validate"; // Your custom validate middleware

const router = Router();

router.post(
  "/verify-email",
  validate(emailVerificationBody), // This runs validation before controller
  verifyEmail
);

export default router;
```

_If you use your own validation middleware, it likely looks like:_

```typescript
// middlewares/validate.ts
export default (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
```

**Explanation:**

- The middleware checks the request body against your schema, responds with a message **before** reaching the actual controller if validation fails.

---

#### 3. **What This Achieves**

- If `userId` is not a valid ObjectId, the error will be: `"Invalid user ID"`.
- If `token` is missing/empty, the error will be: `"Invalid token"`.
- Prevents nasty server/database errors from malformed input–users get clear, early feedback.

---

### How it works in Postman or Frontend

- If you send a request with a malformed or missing `userId`, you get `{ "error": "Invalid user ID" }`.
- If you send a request with a missing/empty `token`, you get `{ "error": "Invalid token" }`.
- If both are valid, the request proceeds to the controller for actual OTP verification.

---

---

To implement "re-verify email" (resend OTP) correctly, **avoid duplicate verification tokens** and **ensure the mail sending function does not also create tokens**. Here’s a concise, step-by-step summary and code guide based on your lecture for the ideal workflow:

---

### Re-Verify Email Route Logic

#### 1. **Router Setup**

```typescript
router.post("/re-verify-email", sendReVerificationToken);
```

This registers the endpoint `/re-verify-email` for POST requests (expects `{ userId }` in the body).

---

#### 2. **Controller Implementation**

```typescript
import { isValidObjectId } from "mongoose";
import EmailVerificationToken from "../models/emailVerificationToken";
import User from "../models/user";
import { sendVerificationMail } from "../utils/mail";
import generateToken from "../utils/generateToken"; // Your own token generator

export async function sendReVerificationToken(req, res) {
  const { userId } = req.body;

  // Validate ObjectId
  if (!isValidObjectId(userId)) {
    return res.status(403).json({ error: "Invalid request" });
  }

  // Fetch user
  const user = await User.findById(userId);
  if (!user) {
    return res.status(403).json({ error: "Invalid request" });
  }

  // Remove any old verification tokens
  await EmailVerificationToken.findOneAndDelete({ owner: userId });

  // Generate new token and save
  const token = generateToken();
  await EmailVerificationToken.create({ owner: userId, token });

  // Send verification mail (DO NOT create token here!)
  await sendVerificationMail(token, {
    name: user.name,
    email: user.email,
    userId: user._id.toString(),
  });

  return res.json({ message: "Please check your mail." });
}
```

- **Validation:** Ensures only valid user IDs trigger this flow, and a real user exists.
- **Cleanup:** Always deletes any previous token before creating a new one so there is a single, current token per user.
- **Decoupled mail logic:** The mail-sending utility only sends emails—it doesn’t touch the database or generate tokens.

---

#### 3. **Bug Fix: Remove DB Token Creation from Mail Sender**

**Old mistake (caused two tokens):**

```typescript
// sendVerificationMail(token, profile) erroneously created new verification token
```

**Correct version:**

```typescript
export async function sendVerificationMail(token, profile) {
  // Only sends email using nodemailer (or similar) and does NOT create any database token!
  // ...
}
```

- The **controller** (or create/signup flow) alone controls token creation and deletion, keeping database state correct.

---

#### 4. **Testing**

- If you POST to `/re-verify-email` with a valid existing user ID, the user receives a new OTP email, and only one verification token exists per user in the database.
- If you resend multiple times, old tokens are deleted—no duplicates.
- Invalid IDs show a `403` error with `{ error: 'Invalid request' }`.

---

### Summary Table

| Action                                      | Result                                             |
| ------------------------------------------- | -------------------------------------------------- |
| POST /re-verify-email with valid ID         | New token created, old tokens wiped, email sent    |
| POST /re-verify-email with invalid/non-user | 403 error, no action                               |
| Multiple re-verification attempts           | Only one token per user; newest token always valid |
| Token created in mail utility (old bug)     | Multiple tokens, confusion                         |
| Token created only in controller (fixed)    | One token, clean logic                             |

---

This pattern **fixes the double-token bug**, gives users the power to re-verify easily, and maintains a clean separation of concerns in your project.Here’s how to build a robust “re-verify email” (resend OTP) feature for your users, while avoiding token duplication:

---

### 1. Route Registration

Add in your `auth` router:

```typescript
router.post("/re-verify-email", sendReVerificationToken);
```

This expects a request body like `{ userId: "...MongoDB ObjectId..." }`.

---

### 2. Controller Implementation

```typescript
import { isValidObjectId } from "mongoose";
import EmailVerificationToken from "../models/emailVerificationToken";
import User from "../models/user";
import { sendVerificationMail } from "../utils/mail";
import generateToken from "../utils/generateToken";

export async function sendReVerificationToken(req, res) {
  const { userId } = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(403).json({ error: "Invalid request" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(403).json({ error: "Invalid request" });
  }

  await EmailVerificationToken.findOneAndDelete({ owner: userId });

  const token = generateToken();
  await EmailVerificationToken.create({ owner: userId, token });

  await sendVerificationMail(token, {
    name: user.name,
    email: user.email,
    userId: user._id.toString(),
  });

  res.json({ message: "Please check your mail." });
}
```

**Essential points:**

- Validates the user ID format and user existence.
- Deletes any old verification tokens before creating a new one—this guarantees only one token per user.
- Calls the mail sender only to email the token—**never to create or save a token**.

---

### 3. Bug Fix: Decouple Token Creation from Mail Sending

**Wrong (old):**

```typescript
// sendVerificationMail also creates and saves token—avoid this!
```

**Right (new):**

```typescript
export async function sendVerificationMail(token, profile) {
  // Only handles sending emails
  // ... (no DB writes here!)
}
```

All token lifecycle management is done in the controller, not helper functions.

---

### 4. Results

- Re-verification flow always results in only one token per user.
- Users can request new OTPs any time; old tokens are removed first.
- No data clutter or confusion; just clean single-use records.
- If an invalid ID is supplied, the controller responds with a clear error message.

---

To implement a "Forgot Password" workflow in your MERN stack app, you need to build a backend route that generates a secure reset link and sends it to the user's email. This link will include a token and user ID, allowing the user to reset their password securely by verifying both later.

Here is a clear step-by-step breakdown and sample code to set up the logic described in your lecture:

---

### Forgot Password Route Logic

#### 1. **Route Setup**

Register the route in your auth router:

```typescript
router.post("/generate-forget-password-link", generateForgetPasswordLink);
```

- The route should accept a POST request containing `{ email }` in its body.

---

#### 2. **Controller Implementation**

Here’s how your controller method (`generateForgetPasswordLink`) should work:

```typescript
import User from "../models/user";
// You will need to create and import a model for password reset tokens, e.g., PasswordResetToken
import { sendResetPasswordMail } from "../utils/mail"; // Mail helper for sending reset link
import generateToken from "../utils/generateToken"; // Token generator function

export async function generateForgetPasswordLink(req, res) {
  const { email } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    // Return 404 if not found
    return res.status(404).json({ error: "Account not found." });
  }

  // Generate token (see next section for schema/model storage)
  const token = generateToken();

  // Save token and associate with user (see next step for model creation)
  // await PasswordResetToken.create({ owner: user._id, token });

  // Construct reset URL (customize domain)
  const resetUrl = `https://yourapp.com/reset-password?token=${token}&userId=${user._id}`;

  // Send email
  await sendResetPasswordMail(resetUrl, user.email);

  // Respond success
  res.json({ message: "Password reset link sent to your email." });
}
```

- **Finds** the user by email. If not found, returns a 404 error.
- **Generates** a secure token.
- **Builds** the reset link with query parameters for token and userId (`/reset-password?token=TOKEN&userId=ID`).
- **Sends** the email with the reset link.
- **Responds** with success message if all is well.

---

#### 3. **Next Steps: Build the Password Reset Token Model**

Your next step (as mentioned in the lecture) is to create a new schema/model (e.g., `PasswordResetToken`) similar to your email verification tokens. This model will:

- **Store** new reset tokens with an expiration (e.g., 1 hour).
- **Associate** tokens with users via their user ID.
- **Secure** token flow so only one token per user is stored at a time (optional).

**Example Schema stub:**

```typescript
import { Schema, model } from "mongoose";

const passwordResetTokenSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // 1 hour
  },
});

export default model("PasswordResetToken", passwordResetTokenSchema);
```

---

### How Password Reset Flow Works

1. **User requests password reset** (submits email at `/generate-forget-password-link`).
2. **Backend checks email**, generates secure token, stores it associated with user, sends email with link (containing token & userId).
3. **User clicks link** in email, goes to `/reset-password` page in frontend.
4. **Frontend extracts token and userId** from URL parameters, submits them to backend for verification.
5. **If valid**, user can **reset password**.

---

---

Update Password route

Perfect 👌 — here’s the **complete TypeScript code snippets** (cleaned, organized, and production-ready) for the **“Update Password”** route, middleware, controller, and mail utility — exactly as described in your Udemy “React Native, Redux & Express - Full Stack React Native” lecture.

---

## 🗂️ Folder Structure (for reference)

```
src/
 ├── controllers/
 │    └── user.controller.ts
 ├── middlewares/
 │    └── auth.ts
 ├── models/
 │    ├── user.ts
 │    └── passwordResetToken.ts
 ├── routes/
 │    └── auth.ts
 ├── utils/
 │    └── mail.ts
 ├── validation/
 │    └── schemas.ts
 ├── config/
 │    └── env.ts
```

---

## 🧩 1. **Route** — `routes/auth.ts`

```ts
import express from "express";
import { updatePassword, grantValid } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import {
  tokenAndIdValidation,
  updatePasswordSchema,
} from "../validation/schemas";
import { isValidPasswordResetToken } from "../middlewares/auth";

const router = express.Router();

// ✅ Validate token route
router.post(
  "/verify-password-reset-token",
  validate(tokenAndIdValidation),
  isValidPasswordResetToken,
  grantValid
);

// ✅ Update password route
router.post(
  "/update-password",
  validate(updatePasswordSchema),
  isValidPasswordResetToken,
  updatePassword
);

export default router;
```

---

## 🧠 2. **Middleware** — `middlewares/auth.ts`

```ts
import { Request, Response, NextFunction } from "express";
import PasswordResetToken from "../models/passwordResetToken";

export const isValidPasswordResetToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, userId } = req.body;

  const resetToken = await PasswordResetToken.findOne({ owner: userId });
  if (!resetToken)
    return res
      .status(403)
      .json({ error: "Unauthorized access, invalid token." });

  const matched = await resetToken.compareToken(token);
  if (!matched)
    return res
      .status(403)
      .json({ error: "Unauthorized access, invalid token." });

  next();
};
```

---

## 🧑‍💻 3. **Controller** — `controllers/user.controller.ts`

```ts
import { Request, Response } from "express";
import User from "../models/user";
import PasswordResetToken from "../models/passwordResetToken";
import { sendPasswordResetSuccessEmail } from "../utils/mail";

// ✅ Just returns valid: true if token passes middleware
export const grantValid = (req: Request, res: Response) => {
  return res.json({ valid: true });
};

// ✅ Actual password update logic
export const updatePassword = async (req: Request, res: Response) => {
  const { password, userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(403).json({ error: "Unauthorized access." });

  const matched = await user.comparePassword(password);
  if (matched)
    return res.status(422).json({
      error: "The new password must be different from the old password.",
    });

  user.password = password;
  await user.save();

  await PasswordResetToken.findOneAndDelete({ owner: user._id });

  // Send success email
  sendPasswordResetSuccessEmail({
    name: user.name,
    email: user.email,
  });

  return res.json({ message: "Password reset successfully." });
};
```

---

## ✉️ 4. **Mail Utility** — `utils/mail.ts`

```ts
import nodemailer from "nodemailer";
import path from "path";
import { signInUrl } from "../config/env";

interface PasswordResetSuccessOptions {
  name: string;
  email: string;
}

export const sendPasswordResetSuccessEmail = async ({
  name,
  email,
}: PasswordResetSuccessOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset Successful",
    html: `
      <div>
        <h3>Dear ${name},</h3>
        <p>We just updated your password successfully. You can now sign in using your new password.</p>
        <a href="${signInUrl}" 
          style="padding: 10px 15px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 6px;">
          Login
        </a>
      </div>
    `,
    attachments: [
      {
        filename: "forget_password.png",
        path: path.join(__dirname, "../assets/forget_password.png"),
        cid: "forget_password",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};
```

---

## 🧾 5. **Validation Schemas** — `validation/schemas.ts`

(using `yup`)

```ts
import * as yup from "yup";

export const tokenAndIdValidation = yup.object({
  body: yup.object({
    token: yup.string().required("Token is missing."),
    userId: yup.string().required("User ID is missing."),
  }),
});

export const updatePasswordSchema = yup.object({
  body: yup.object({
    token: yup.string().required(),
    userId: yup.string().required(),
    password: yup
      .string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-z]/, "Password must contain a lowercase letter.")
      .matches(/[A-Z]/, "Password must contain an uppercase letter.")
      .matches(/[0-9]/, "Password must contain a number.")
      .matches(/[@$!%*?&]/, "Password must contain a special character.")
      .required("Password is required."),
  }),
});
```

---

## ⚙️ 6. **Config Example** — `config/env.ts`

```ts
export const signInUrl = process.env.SIGNIN_URL || "https://yourapp.com/signin";
```

---

✅ **Flow Summary**

1. `/update-password` route first validates schema → middleware checks token validity.
2. If token valid → controller updates password, deletes reset token, sends success email.
3. Email includes a “Login” button linking back to your frontend sign-in page.

---

---

Creating a public route

Exactly 👍 — you’re following that **Udemy "Full Stack React Native + Express"** lecture perfectly.
Let’s continue from where the instructor left off — the part where you create the **frontend (update password form)** inside your **Node.js app’s `public/` folder**, and serve it statically.

---

## 🪜 Step-by-Step Guide (to match your lecture progress)

### ✅ 1. Create `public` folder

Inside your **project root**, create:

```
src/public/index.html
```

Now, add this base HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Modify Password</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

---

### ✅ 2. Serve the `public` folder as static files

Go to your main entry file, usually:

```
src/index.ts
```

Add this near the other middlewares (after `app.use(express.json())`, etc.):

```ts
import path from "path";
import express from "express";

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));
```

Now restart your server (`npm run dev` or `npx ts-node src/index.ts`).

Then open:

```
http://localhost:8989/
```

You should see **Hello World** 🎉
That confirms your static hosting works.

---

### ✅ 3. Why this is needed

When a user clicks on the reset password link (something like):

```
http://localhost:8989/reset-password?token=XYZ&userId=123
```

you’ll serve a static HTML page that can **verify the token** (via API call to `/verify-password-reset-token`)
and if valid, show the **Update Password Form** — all directly from Node.js, without needing React or a frontend app.

---

### 🧠 4. Next Lecture (Preview)

In the next video, you’ll:

- Replace that “Hello World” with an HTML + JS form.
- Write a simple frontend script inside that HTML that:

  - Extracts `token` and `userId` from the URL.
  - Sends them to your backend `/verify-password-reset-token`.
  - If valid → displays “Set new password” form.
  - Submits new password to `/update-password`.

---

---

Create public routes

---

# ✅ Folder Structure (TypeScript Project)

```
src/
 ├─ index.ts
 ├─ public/
 │    ├─ reset-password.html
 │    ├─ style.css
 │    └─ script.js
```

---

# ✅ 1. `reset-password.html`

_(This is the same structure your instructor pasted — ready to use)_

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- Loader -->
    <h1 id="loader">Please wait...</h1>

    <!-- Error + Success Messages -->
    <div id="error" class="error">Something went wrong</div>
    <div id="success" class="success">Success!</div>

    <!-- Form Container -->
    <div class="container" id="form-container">
      <h2>Reset Password</h2>

      <form id="reset-form">
        <div class="form-group">
          <label for="password">New Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter new password"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirm">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            placeholder="Confirm password"
            required
          />
        </div>

        <button type="submit" class="btn">Update Password</button>
      </form>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

---

# ✅ 2. `style.css`

_(Same as instructor: layout + hidden error/success styles)_

```css
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

#loader {
  text-align: center;
  margin-top: 40px;
}

.container {
  width: 400px;
  margin: 40px auto;
  background: #f7f7f7;
  padding: 25px;
  border-radius: 8px;
}

.error,
.success {
  padding: 10px;
  margin: 10px auto;
  width: 400px;
  text-align: center;
  border-radius: 4px;
}

.error {
  background: #ffdddd;
  color: #c00;
  border: 1px solid #c00;
}

.success {
  background: #ddffdd;
  color: #0a0;
  border: 1px solid #0a0;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
}

.btn {
  padding: 10px;
  width: 100%;
  background: #000;
  color: #fff;
  border: none;
}
```

---

# ✅ 3. `script.js`

_(Matches exactly what instructor did so far — hide error/success)_

```js
const error = document.getElementById("error");
const success = document.getElementById("success");

// Hide initially
error.style.display = "none";
success.style.display = "none";
```

This is exactly where the instructor stops in this video:
✔ error + success referenced
✔ both `.style.display = 'none'`
✔ loader + form untouched yet

Next video will extract token from URL & call backend to validate — I can generate that too when you're ready.

---

# ✅ 4. Update your Express server (TypeScript)

Inside `src/index.ts`, add:

```ts
import path from "path";
import express from "express";

app.use(express.static(path.join(__dirname, "public")));
```

⚠️ IMPORTANT
When using TypeScript + ts-node-dev, final build folder becomes:

```
dist/
 ├─ public/
 ├─ index.js
```

So ensure copy of public folder is included in your build OR use this if you want src-level access during dev:

```ts
app.use(express.static(path.join(process.cwd(), "src", "public")));
```

---

# ✅ 5. Access the HTML

Open:

```
http://localhost:8989/reset-password.html
```

---

Perfect — here are the **exact code snippets** from the transcript, cleanly structured and ready to paste into your `script.js`.

I am giving ONLY the snippets (no explanations), exactly matching what the instructor implemented.

---

```javascript
// DOM Elements
const error = document.getElementById("error");
const success = document.getElementById("success");
const loader = document.getElementById("loader");
const formContainer = document.getElementById("form-container");
const form = document.getElementById("reset-form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm");

// Hide error & success initially
error.style.display = "none";
success.style.display = "none";

// ------------------------------------------
// Display Error
// ------------------------------------------
function displayError(message) {
  // remove success if any
  success.style.display = "none";

  // set error text
  error.innerText = message;

  // show error
  error.style.display = "block";
}

// ------------------------------------------
// Display Success
// ------------------------------------------
function displaySuccess(message) {
  // remove error if any
  error.style.display = "none";

  // set success text
  success.innerText = message;

  // show success
  success.style.display = "block";
}

// ------------------------------------------
// Password Regex From Validation Schema
// ------------------------------------------
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// ------------------------------------------
// Form Submit
// ------------------------------------------
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault(); // stop default form submit
  console.log("submitting");

  // ---------------------------
  // Validations
  // ---------------------------

  if (!password.value.trim()) {
    displayError("Password is missing");
    return;
  }

  if (!passwordRegex.test(password.value)) {
    displayError(
      "Password is too simple. Use alphanumeric with special characters."
    );
    return;
  }

  if (password.value !== confirmPassword.value) {
    displayError("Passwords do not match");
    return;
  }

  // -----------------------------------
  // Disable button & show loader text
  // -----------------------------------
  const button = form.querySelector("button");
  button.disabled = true;
  button.innerText = "Please wait...";

  // -----------------------------------
  // Submit Updated Password
  // -----------------------------------
  try {
    const res = await fetch("/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        token,
        userId,
        password: password.value,
      }),
    });

    // Handle errors
    if (!res.ok) {
      const { error: errMsg } = await res.json();
      displayError(errMsg);
      button.disabled = false;
      button.innerText = "Reset Password";
      return;
    }

    // Success
    displaySuccess("Your password is reset successfully!");

    // Reset form fields
    password.value = "";
    confirmPassword.value = "";
  } catch (err) {
    displayError("Something went wrong. Try again.");
  }

  // Enable button again
  button.disabled = false;
  button.innerText = "Reset Password";
}
```

---

# ❗ IMPORTANT

Your script **also needs** the `token` and `userId` that were extracted earlier when validating the link.
If you want, I can also generate that piece — it comes from:

```js
const params = new URLSearchParams(window.location.search);
const token = params.get("token");
const userId = params.get("id");
```

---

sign in flow

---

## **1. What is JWT (JSON Web Token)?**

A JWT has **3 parts**:

1. **Header**

   - Algorithm (HS256 etc.)
   - Token type (JWT)

2. **Payload**

   - Contains data you want to encode (e.g., userId)
   - ⚠️ Do NOT add sensitive information
   - Visible to anyone on jwt.io

3. **Signature**

   - Ensures token validity
   - Generated using a **secret key**
   - Prevents tampering

---

## **2. Installing JWT**

```bash
npm i jsonwebtoken
npm i -D @types/jsonwebtoken
```

---

## **3. Why store token in DB?**

- JWTs cannot be manually expired.
- If user logs out → remove token from DB.
- At authentication time:

  - Check **token exists in DB**
  - Then verify JWT signature

- Protects against using old/logged-out tokens.

---

## **4. Sign-In Flow Summary**

1. Validate request (email + password existence check).
2. Find user by email.
3. Compare password using model method `comparePassword()`.
4. If match → generate JWT token:

   ```ts
   jwt.sign({ userId: user._id }, JWT_SECRET);
   ```

5. Save token to `user.tokens`.
6. Send response with user profile + token.

# ⭐ **1. Validation Schema (sign-in)**

```ts
export const signInValidationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});
```

---

# ⭐ **2. Controller: signIn()**

```ts
import jwt from "jsonwebtoken";
import User from "../models/user";
import { JWT_SECRET } from "../utils/variables";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({ error: "Email/Password mismatch" });
  }

  // 2. Compare password
  const matched = await user.comparePassword(password);
  if (!matched) {
    return res.status(403).json({ error: "Email/Password mismatch" });
  }

  // 3. Generate JWT token
  const token = jwt.sign(
    { userId: user._id },
    JWT_SECRET
    // optional: { expiresIn: "30d" }
  );

  // 4. Save token in DB
  user.tokens.push(token);
  await user.save();

  // 5. Respond with user profile + token
  res.json({
    profile: {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      avatar: user?.avatar?.url,
      followers: user.followers.length,
      followings: user.following.length,
    },
    token,
  });
};
```

---

# ⭐ **3. Add Route**

```ts
router.post("/sign-in", validate(signInValidationSchema), signIn);
```

---

# ⭐ **4. Add JWT Secret in .env**

```env
JWT_SECRET=your_generated_secret_here
```

Generate via:

```js
node;
require("crypto").randomBytes(36).toString("hex");
```

---

# ⭐ **5. User Model Snippet (comparePassword)**

```ts
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
```

---

# ⭐ **6. variables.ts**

```ts
export const JWT_SECRET = process.env.JWT_SECRET as string;
```

---

# ⭐ **7. Example Postman Request**

```
POST /auth/sign-in
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "123456"
}
```

---

# **🔐 Sign-In Flow Diagram (Textual)**

```
                 ┌──────────────────────────┐
                 │  Client Sends Request    │
                 │  POST /auth/sign-in      │
                 │  { email, password }     │
                 └─────────────┬────────────┘
                               │
                               ▼
                 ┌──────────────────────────┐
                 │ Validate input using     │
                 │ signInValidationSchema   │
                 └─────────────┬────────────┘
                               │
                   Valid? ─────┼────── No ───────────►
                               │                     Return 403
                               ▼
                 ┌──────────────────────────┐
                 │ Find user by email       │
                 │ User.findOne({ email })  │
                 └─────────────┬────────────┘
                               │
                    Found? ────┼────── No ───────────►
                               │                     Return 403
                               ▼
                 ┌──────────────────────────┐
                 │ Compare Password         │
                 │ user.comparePassword()   │
                 └─────────────┬────────────┘
                               │
                 Matched? ─────┼────── No ───────────►
                               │                     Return 403
                               ▼
                 ┌──────────────────────────┐
                 │ Create JWT Token         │
                 │ jwt.sign( { userId },    │
                 │            JWT_SECRET )  │
                 └─────────────┬────────────┘
                               │
                               ▼
                 ┌──────────────────────────┐
                 │ Save Token in DB         │
                 │ user.tokens.push(token)  │
                 │ user.save()              │
                 └─────────────┬────────────┘
                               │
                               ▼
                 ┌──────────────────────────┐
                 │ Send Response             │
                 │ {                        │
                 │   profile: {...},        │
                 │   token: token           │
                 │ }                        │
                 └──────────────────────────┘
```

---

# **🔥 Summary of the Flow (Very Simple)**

1. **User sends email + password**
2. **Validate email + password exists**
3. **Check user exists in DB**
4. **Compare password with hashed password**
5. **If correct → Generate JWT**
6. **Store JWT in user.tokens array**
7. **Send profile + token back to client**

---

---

# ✅ **NOTES: JWT Verification + isAuth Flow**

### **1. After Sign-In Response**

When user logs in successfully, server returns:

- **profile** (id, name, email, followers, following…)
- **token (JWT)**

This JWT will act like the password for all future “protected routes”.

---

# ✅ **2. How Authorization Token Is Sent**

Token is sent through **request headers**, NOT body.

```
Authorization: Bearer <token>
```

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

# ✅ **3. How to Read Authorization Header**

In your route:

```ts
const { authorization } = req.headers;
```

Authorization header looks like:

```
"Bearer <token>"
```

So you split it by `"Bearer "`:

```ts
const token = authorization?.split("Bearer ")[1];
```

This gives you the pure JWT.

---

# ✅ **4. Verifying JWT**

Use:

```ts
const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
```

JWT contains the payload you signed earlier:

```ts
{
  userId: "65kjd9839dj9d...";
  iat: 1283938993;
}
```

---

# ✅ **5. After Decoding – Get User**

```ts
const user = await User.findById(payload.userId);
```

If user does not exist → unauthorized.

---

# 🔥 **Final Response Structure**

If token is valid → return same profile object as sign-in.

---

# 🧩 **COMPLETE isAuth ROUTE **

```ts
router.get("/is-auth", async (req, res) => {
  try {
    const { authorization } = req.headers;

    const token = authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(403).json({ error: "Unauthorized request" });
    }

    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(403).json({ error: "Unauthorized request" });
    }

    return res.json({
      profile: {
        id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified,
        avatar: user.avatar?.url,
        followers: user.followers.length,
        followings: user.following.length,
      },
    });
  } catch (err) {
    return res.status(403).json({ error: "Unauthorized request" });
  }
});
```

---

# 📝 **Why Token Must Start with “Bearer ”**

Because many systems send multiple types of tokens, so:

```
Bearer <token>
Basic <token>
Digest <token>
```

"Bearer" = JWT token.

---

# 🧠 **JWT Verify Throws Error If Token Is Tampered**

Example:

- Missing characters
- Changed characters

So always wrap verification inside `try / catch`.

---

# ⭐ Middleware Version (clean & reusable)

```ts
import { NextFunction } from "express";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(403).json({ error: "Unauthorized request" });
    }

    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(403).json({ error: "Unauthorized request" });
    }

    req.user = user; // attach for next middleware
    next();
  } catch (error) {
    return res.status(403).json({ error: "Unauthorized request" });
  }
};
```

---

===============================================================
AUTHENTICATED REQUEST (is-auth flow)
===============================================================

┌───────────────────────────┐
│ Client sends request │
│ GET /auth/is-auth │
│ with Header: │
│ Authorization: Bearer xxx │
└──────────────┬────────────┘
│
▼
┌───────────────────────────┐
│ 1. Extract token │
│ authorization?.split │
└──────────────┬────────────┘
token OK │ no token
│
▼
┌────────────────────┐
│ Return 403 │
│ "Unauthorized" │
└────────────────────┘
▲
│
│ token exists
▼
┌──────────────────────────────┐
│ 2. Verify Token │
│ jwt.verify(token, SECRET) │
└──────────────┬───────────────┘
valid token │ invalid token
│
▼
┌────────────────────┐
│ Throw error → │
│ Unauthorized │
└────────────────────┘
▲
│ valid userId
▼
┌──────────────────────────────┐
│ 3. Extract userId from │
│ payload (decoded token) │
│ e.g. payload.userId │
└──────────────┬───────────────┘
│ user found?
▼
┌──────────────────────────────┐
│ 4. Find user in DB │
│ User.findById(userId) │
└──────────────┬───────────────┘
exists │ not exists
│
▼
┌────────────────────────┐
│ Return 403 Unauthorized│
└────────────────────────┘
▲
│
│ valid user
▼
┌──────────────────────────────┐
│ 5. Respond with profile │
│ (same format as sign-in) │
└──────────────────────────────┘

---

Below are **clean study notes + TypeScript code snippets** _exactly matching your Udemy lecture_ (Middleware → mustAuth → attaching user to request → fixing `req.user` type → using JWT → verifying authorization header → Postman testing).

This is structured so you can revise easily + plug code directly into your project.

---

# 📘 **STUDY NOTES — Authentication vs Authorization (TypeScript + JWT)**

### **1. Authentication**

- Verifies **who the user is**.
- Happens during **sign-in**.
- User sends **email + password**.
- Server:

  - Finds user by email.
  - Compares hashed passwords (bcrypt).
  - If valid → generates **JWT token**.
  - Sends token to client.

### **2. Authorization**

- Determines **what the user can do**.
- Happens on protected routes (upload audio, edit playlist, remove audio etc.).
- Instead of sending email/password again:

  - Client sends **token** in `Authorization` header.
  - Format:

    ```
    Authorization: Bearer <token>
    ```

### **3. Why JWT**

- Avoids asking password repeatedly.
- Encodes userId inside token payload.
- Can be verified using the secret key.

---

# 📘 **HOW Authorization Header Works**

Client sends:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Server receives:

```
req.headers.authorization → "Bearer <token>"
```

We:

1. Split by `"Bearer "`
2. Extract token
3. Verify using `jwt.verify(token, JWT_SECRET)`
4. Extract payload → `{ userId }`

---

# 📘 **mustAuth Middleware (Full Flow)**

Purpose:

- Validate token
- Find user
- Attach user to request (`req.user`)
- Go to next middleware

---

## **2️⃣ Fixing `req.user` Type Error**

### ✔ Create a global type declaration

Create file:

```
src/types/express.d.ts
```

Add:

```ts
import { UserDocument } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
```

Add to `tsconfig.json`:

```json
"include": ["src"]
```

Now TypeScript knows `req.user` exists everywhere.

---

## **3️⃣ mustAuth Middleware (final version from lecture)**

`src/middleware/mustAuth.ts`

```ts
import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import { JWT_SECRET } from "../config";

export const mustAuth: RequestHandler = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(403).json({
        error: "Unauthorized request",
      });
    }

    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const id = payload.userId;

    const user = await User.findOne({
      _id: id,
      tokens: token,
    });

    if (!user) {
      return res.status(403).json({
        error: "Unauthorized request",
      });
    }

    // Attach user to req
    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({
      error: "Unauthorized request",
    });
  }
};
```

---

## **4️⃣ Using mustAuth in Router**

`auth.router.ts`:

```ts
router.get("/is-auth", mustAuth, (req, res) => {
  return res.json({
    profile: req.user,
  });
});
```

---

# 🧪 **Testing is-auth in Postman**

### Step 1: Sign In

Send POST:

```
POST /auth/sign-in
```

Body:

```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

Copy token from response.

---

### Step 2: Test is-auth

Make a GET request:

```
GET /auth/is-auth
```

In **Headers**:

| KEY           | VALUE          |
| ------------- | -------------- |
| Authorization | Bearer <token> |

Hit **Send**.

You should get:

```json
{
  "profile": {
    "_id": "abc123",
    "email": "test@test.com",
    ...other fields
  }
}
```

If you get **Unauthorized request**, these are reasons:

- Token missing
- Token malformed
- Token not in DB (tokens array)
- Using wrong "Bearer " format

---

# 📘 **FULL FLOW DIAGRAM — SIGN-IN + AUTHORIZATION + MUSTAUTH**

```
          ┌─────────────────────────┐
          │   User enters Email+Pw   │
          └──────────────┬──────────┘
                         ▼
                 ┌──────────────┐
                 │  Auth Route   │
                 └───────┬──────┘
                         ▼
               Find user by email
                         ▼
                Compare password
                bcrypt.compare()
                         ▼
              If match → generate JWT
                     token = jwt.sign()
                         ▼
         Send token to client (FE / Mobile App)
                         ▼
            Client stores token (AsyncStorage)
                         ▼
──────────────────────────────────────────────────────────────
           LATER, USER CALLS PROTECTED ROUTE
──────────────────────────────────────────────────────────────
                         ▼
          Client sends token in Authorization header:
          "Bearer <token>"
                         ▼
           mustAuth Middleware Triggered
                         ▼
      Extract token from req.headers.authorization
                         ▼
         jwt.verify(token, JWT_SECRET)
                         ▼
           Extract userId from payload
                         ▼
   Find user in DB → User.findOne({ _id, tokens: token })
                         ▼
         If no user → Unauthorized (403)
                         ▼
         If user found → req.user = user
                         ▼
                   next()
                         ▼
         Protected controller runs successfully
```

---

# ✅ **Notes: Public vs Private Routes + mustAuth Middleware**

### **1. What is mustAuth middleware?**

- A middleware that verifies whether a user is authenticated.
- It checks the **Authorization header**.
- If the token is valid → allow access.
- If NOT valid → return 401 Unauthorized.

---

### **2. What is a Public Route?**

- A route accessible to anyone.
- No need for token.
- Used for things like:

  - Home page
  - Pricing page
  - Signup

👉 **Example:** `/auth/public`

---

### **3. What is a Private Route?**

- A route that ONLY authenticated users can access.
- Needs a **valid JWT token** in header:

  ```
  Authorization: Bearer <token>
  ```

👉 **Example:** `/auth/private`

---

### **4. Postman Testing**

- For public route: no token needed.
- For private route:

  - Go to **Headers**
  - Key: `Authorization`
  - Value: `Bearer <your-jwt-token>`

If token is missing or invalid → `401 Unauthorized`.

---

# ✅ **Code Snippets**

## **1. mustAuth Middleware**

```js
import jwt from "jsonwebtoken";

export const mustAuth = (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = header.split(" ")[1]; // Bearer token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded user to request

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
```

---

## **2. Public Route**

```js
router.get("/public", (req, res) => {
  res.json({ message: "You are in public route" });
});
```

---

## **3. Private Route**

```js
router.get("/private", mustAuth, (req, res) => {
  res.json({
    message: "You are in private route",
    user: req.user,
  });
});
```

---

## **4. Example Route File (authRoutes.js)**

```js
import express from "express";
import { mustAuth } from "../middlewares/mustAuth.js";

const router = express.Router();

// Public Route (no token)
router.get("/public", (req, res) => {
  res.json({ message: "You are in public route" });
});

// Private Route (requires token)
router.get("/private", mustAuth, (req, res) => {
  res.json({ message: "You are in private route" });
});

export default router;
```

---

## **5. Server Setup**

```js
import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(8989, () => {
  console.log("Server running on 8989");
});
```

---

# ✅ **How to Test in Postman**

### ✔ **Public Route**

```
GET http://localhost:8989/auth/public
```

Response:

```json
{ "message": "You are in public route" }
```

---

### ✔ **Private Route**

```
GET http://localhost:8989/auth/private
```

If no token →

```json
{ "error": "No token provided" }
```

If valid token (in Headers: Authorization → Bearer <token>):

```json
{
  "message": "You are in private route",
  "user": { "userId": "...", "iat": ..., "exp": ... }
}
```

---

# ✅ **NOTES: Handling File Uploads in Node.js Using Formidable**

### **1. What Formidable Does**

Formidable is a Node.js package used to parse incoming **multipart/form-data** requests—mainly used when uploading:

- Images
- PDFs
- Videos
- Any file type

It extracts:

- **fields** → normal text data
- **files** → uploaded files (with temp paths)

---

### **2. Why Not JSON?**

If you send raw JSON, `content-type` becomes:

```
application/json
```

Formidable **cannot parse JSON data for file uploads** → request will **hang/freezes**.

---

### **3. Required Content Type**

When uploading files, postman/browser sends:

```
multipart/form-data
```

So we must verify the request header.

---

### **4. Important Request Properties**

Formidable gives us:

```js
fields; // text fields
files; // uploaded file objects
```

Each file contains useful attributes like:

- `originalFilename`
- `filepath` (temporary location)
- `mimetype`
- `size`

---

### **5. Common Error Prevention**

If content-type is NOT multipart/form-data → respond with error:

```
Only accepts form-data
```

This prevents endpoint freezing.

---

# ✅ **CODE SNIPPETS**

---

# **1. Install Formidable**

```bash
npm install formidable
npm install --save-dev @types/formidable   # for TypeScript users
```

---

# **2. Import Formidable**

```js
import formidable from "formidable";
```

---

# **3. Create Upload Route (update-profile)**

```js
router.post("/update-profile", async (req, res) => {
  // 1. Validate content-type
  if (!req.headers["content-type"]?.startsWith("multipart/form-data")) {
    return res.status(422).json({ error: "Only accepts form-data" });
  }

  // 2. Create form instance
  const form = formidable({ multiples: false });

  // 3. Parse request
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "File parsing error" });
    }

    console.log(">>>>>Fields", {
      files: files.profile_name?.[0],
      fields: fields.name?.[0],
    });

    return res.json({ uploaded: true });
  });
});
```

---

# **4. Postman Setup for Testing**

### **Method:**

```
POST /auth/update-profile
```

### **Body → Form-Data**

| key           | type | value         |
| ------------- | ---- | ------------- |
| name          | text | Siddhant      |
| profile_image | file | (upload file) |

---

### **Headers (automatically set by Form-data)**

```
Content-Type: multipart/form-data
```

---

# **5. Expected Output Inside Terminal**

```
Fields: { name: 'Siddhant' }

Files: {
  profile_image: {
    originalFilename: 'logo.png',
    filepath: '/var/tmp/upload_blahblah',
    mimetype: 'image/png',
    size: 12345
  }
}
```

---

# **6. Explanation: Why Raw JSON Freezes?**

If you send JSON:

Headers become:

```
content-type: application/json
```

Formidable waits for file streams →
**no file arrives → request stuck forever**.

Hence the safety check:

```js
if (!req.headers["content-type"]?.startsWith("multipart/form-data")) {
  return res.status(422).json({ error: "Only accepts form-data" });
}
```

---

# **7. Saving File (Preview for next steps)**

You will later use:

```js
import fs from "fs";

fs.copyFile(files.profile_image.filepath, "public/uploads/xyz.png", () => {});
```

---

Here are **clean, simple notes + the exact code snippets** for the video you just watched — including how to read files, how to upload them to a folder, and what your output means.

---

# ✅ **NOTES — Handling File Upload in Node.js using Formidable**

### **1. Why Formidable?**

- Easy to use for file uploads (images, videos, documents).
- No need for complex configuration like Multer.
- Reads both:

  - **fields** → normal form data (e.g., name, age)
  - **files** → uploaded files (images, pdf, etc.)

---

# ❗ Important: Formidable Requires `multipart/form-data`

If you send **JSON body**, your API will freeze.

Correct:

```
Content-Type: multipart/form-data
```

This happens automatically when using **form-data** in Postman or frontend.

---

# ✅ **2. Basic File Parsing Example**

```ts
import formidable from "formidable";

router.post("/update-profile", (req, res) => {
  const form = formidable();

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: "File parse error" });

    console.log("FIELDS:", fields);
    console.log("FILES:", files);

    return res.json({ uploaded: true });
  });
});
```

---

# ❗ Your Output Explained

You got:

```
files: { profile_name: [ [PersistentFile] ] },
fields: { name: [ 'Siddhant' ] }
```

✔ This means:

- **"name"** field received correctly.
- **"profile_name"** file received correctly.

Formidable always wraps fields and files in an **array** because multiple values can come.

To access your uploaded file:

```js
const file = files.profile_name[0];
console.log(file.originalFilename);
console.log(file.filepath);
console.log(file.mimetype);
```

---

# ✅ **3. Prevent Freezing When Wrong Content Type**

Add this check:

```ts
if (!req.headers["content-type"]?.startsWith("multipart/form-data")) {
  return res.status(422).json({ error: "Only accepts form data" });
}
```

---

# ⚙ **4. Full Working Code — Upload File to Local Folder (`/public/profiles`)**

### **Imports**

```ts
import formidable from "formidable";
import fs from "fs";
import path from "path";
```

---

### **Step 1: Create `profiles` folder if not exists**

```ts
const dir = path.join(__dirname, "../public/profiles");

try {
  fs.readdirSync(dir);
} catch (err) {
  fs.mkdirSync(dir);
}
```

---

### **Step 2: Configure Formidable Upload Directory**

```ts
const form = formidable({
  uploadDir: dir,
  keepExtensions: true, // keeps .jpg / .png etc
  filename: (name, ext, part) => {
    const unique = Date.now();
    const original = part.originalFilename || "";
    return `${unique}-${original}`;
  },
});
```

---

### **Step 3: Parse File**

```ts
form.parse(req, (err, fields, files) => {
  if (err) return res.status(500).json({ error: "Upload failed" });

  const uploadedFile = files.profile_image?.[0];

  return res.json({
    uploaded: true,
    fileName: uploadedFile?.newFilename,
  });
});
```

---

# 📌 **FULL ROUTE (Copy-Paste Ready)**

```ts
router.post("/update-profile", async (req, res) => {
  if (!req.headers["content-type"]?.startsWith("multipart/form-data")) {
    return res.status(422).json({ error: "Only accepts form data" });
  }

  const dir = path.join(__dirname, "../public/profiles");

  try {
    fs.readdirSync(dir);
  } catch {
    fs.mkdirSync(dir);
  }

  // create form instance and configure formiddable upload directory
    let originalFilename = ''
    const form = formidable({
        uploadDir: dir,
        keepExtensions: true, // keeps .jpg .png etc
        filename : (name, ext, part) => {
            let unique = Date.now();
            let original = part.originalFilename || "";
            originalFilename = `${unique}-${original}`;
            return originalFilename
        }
    });

  // parse request
    form.parse(req, (err, fields, files) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                error: "File parsing error"
            })
        }

        const uploadedFile = files.profile_name?.[0]
        // console.log(">>>>>Fields", {files : files.profile_name?.[0], fields : fields.name?.[0]})

        return res.json({
            uploaded : true,
            fileName: uploadedFile?.newFilename,
            fileUrl: `${BASE_URL}/profiles/${originalFilename}`
        })

    });

```

---

# 📌 **How File Is Served**

If file saved as:

```
public/profiles/17123456789-image.png
```

Serve it directly:

```
BASE_URL/profiles/17123456789-image.png
```

(Ensure you have this in server)

```ts
app.use(express.static("public"));
```

---

### **1. Why we need a custom file-parser middleware**

- Formidable v3+ changed its parsing style.
- `form.parse()` **no longer uses a callback** → it **returns a Promise**.
- Both **fields** and **files** are returned as **arrays**.

  - Example:

    ```js
    fields = { name: ["Siddhant"] };
    files = { avatar: [PersistentFile] };
    ```

- Express `req.body` and `req.files` do **not exist automatically**, so we must populate them manually.

---

### **2. What the middleware should do**

✔ Validate `Content-Type: multipart/form-data`
✔ Use Formidable to parse fields + files
✔ Convert:

- `fields.key = ['value']` → `req.body.key = "value"`
- `files.key = [fileObj]` → `req.files.key = fileObj`
  ✔ Ensure `req.files` always exists
  ✔ Call `next()` so the controller can continue

---

### **3. Why we create `RequestWithFiles` interface**

Because Express Request does not contain `.files`, we extend it:

```ts
interface RequestWithFiles extends Request {
  files?: {
    [key: string]: File;
  };
}
```

---

# ✅ **FILE PARSER MIDDLEWARE (Production-ready)**

### **📄 fileParser.ts**

```ts
import { Request, Response, NextFunction } from "express";
import formidable, { File } from "formidable";

export interface RequestWithFiles extends Request {
  files?: {
    [key: string]: File;
  };
}

export const fileParser = async (
  req: RequestWithFiles,
  res: Response,
  next: NextFunction
) => {
  // 1. Check content-type
  if (!req.headers["content-type"]?.startsWith("multipart/form-data")) {
    return res.status(400).json({
      error: "Content-Type must be multipart/form-data",
    });
  }

  // 2. Create formidable instance
  const form = formidable({
    multiples: false, // not accepting multiple files
    keepExtensions: true,
  });

  try {
    // 3. Parse incoming form data (promise)
    const [fields, files] = await form.parse(req);
    // initialize req.body if empty
    if (!req.body) req.body = {};
    // 4. Convert fields → req.body
    for (let key in fields) {
      const valueArray = fields[key]; // always array
      if (valueArray && valueArray[0]) {
        req.body[key] = valueArray[0]; // take first value
      }
    }

    // 5. Convert files → req.files
    if (!req.files) req.files = {};

    for (let key in files) {
      const fileArray = files[key]; // always array
      if (fileArray && fileArray[0]) {
        req.files[key] = fileArray[0]; // take first file
      }
    }

    // 6. Continue to next middleware
    next();
  } catch (err) {
    console.error("Formidable error:", err);
    res.status(500).json({ error: "File upload failed" });
  }
};
```

---

# ✅ **USAGE IN ROUTE**

### **📄 routes.ts**

```ts
import { Router } from "express";
import { fileParser, RequestWithFiles } from "../middlewares/fileParser";

const router = Router();

router.post("/update-profile", fileParser, (req: RequestWithFiles, res) => {
  console.log("BODY:", req.body); // { name: "Siddhant" }
  console.log("FILES:", req.files); // { avatar: File }

  return res.json({ success: true });
});

export default router;
```

---

# ✅ **POSTMAN SETTINGS**

### Use:

```
POST /update-profile
Body → form-data
```

Add fields:

| KEY    | TYPE | VALUE       |
| ------ | ---- | ----------- |
| name   | text | Siddhant    |
| avatar | file | choose file |

---

# ✅ **TERMINAL OUTPUT (Formidable v3)**

You should get something like:

```
BODY: { name: 'Siddhant' }
FILES: { avatar: File { ... } }
```

---
---


### **1. Why Cloudinary?**

* Free tier with **no credit card required**.
* Very easy to integrate with Node.js.
* Auto-generates **HTTPS image URLs**.
* Stores & optimizes images in the cloud.
* Great for React Native apps where static server hosting is not ideal.

---

# ✅ **2. What values you need from Cloudinary dashboard**

After creating an account → Dashboard shows:

* **Cloud Name**
* **API Key**
* **API Secret**

These go inside your `.env` file.

---

# ✅ **3. Install Cloudinary**

```sh
npm install cloudinary
```

You’ll use the **v2** SDK.

---

# ✅ **4. Add ENV variables**

`.env`

```env
CLOUD_NAME=your_cloud_name
CLOUD_KEY=your_api_key
CLOUD_SECRET=your_api_secret
```

---

# ✅ **5. Add to utils/variables.ts**

Create file:

`src/utils/variables.ts`

```ts
import dotenv from "dotenv";
dotenv.config();

export const CLOUD_NAME = process.env.CLOUD_NAME as string;
export const CLOUD_KEY = process.env.CLOUD_KEY as string;
export const CLOUD_SECRET = process.env.CLOUD_SECRET as string;
```

---

# ✅ **6. Cloudinary Setup File**

Create folder:

```
src/cloud/index.ts
```

### **index.ts**

```ts
import { v2 as cloudinary } from "cloudinary";
import { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } from "../utils/variables";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
  secure: true, // ensures HTTPS URL
});

export default cloudinary;
```

✔ This registers Cloudinary globally.

---

# ✅ **7. Upload Function (you will need this in next lecture)**

This will upload profile images.

Create:

`src/cloud/upload.ts`

```ts
import cloudinary from "./index";
import { File } from "formidable";

export const uploadToCloud = async (file: File) => {
  return await cloudinary.uploader.upload(file.filepath, {
    folder: "profiles",
    resource_type: "image",
  });
};
```

**Response from Cloudinary** looks like:

```json
{
  "secure_url": "https://res.cloudinary.com/.../image/upload/...jpg",
  "public_id": "profiles/abcxyz",
  ...
}
```

You'll use `secure_url` in DB.

---

# ✅ **8. Using File Parser + Cloud Upload in Controller**

Example controller:

`src/controllers/profile.ts`

```ts
import { RequestWithFiles } from "../middleware/fileParser";
import { uploadToCloud } from "../cloud/upload";

export const updateProfile = async (req: RequestWithFiles, res) => {
  try {
    const { name } = req.body;
    const file = req.files?.avatar; // assuming key=avatar

    let uploadedFile = null;

    if (file) {
      uploadedFile = await uploadToCloud(file);
    }

    return res.json({
      success: true,
      name,
      avatar: uploadedFile?.secure_url || null,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Profile update failed" });
  }
};
```

---

# 🎯 **Final Folder Structure (for clarity)**

```
src/
 ├─ cloud/
 │   ├─ index.ts
 │   └─ upload.ts
 ├─ controllers/
 │   └─ profile.ts
 ├─ middleware/
 │   └─ fileParser.ts
 ├─ utils/
 │   └─ variables.ts
 └─ routes/
     └─ profileRoutes.ts
```

---


Upload to cloud 


---


### **1️⃣ Update Profile Route Setup**

* In router:

  * Add middlewares in order:

    1. `mustAuth` → ensures user is authenticated.
    2. `fileParser` → parse `multipart/form-data`, read fields + files.
    3. `updateProfile` controller → update name + profile image.

---

### **2️⃣ updateProfile Controller Steps**

#### **Step 1: Extract data**

```ts
const { name } = req.body;
const avatar = req.files?.avatar;
```

#### **Step 2: Get authenticated user**

```ts
const user = await User.findById(req.user.id);
if (!user) throw new Error("Something went wrong. User not found");
```

---

### **3️⃣ Validate Name**

* Must be a string
* Must be at least 3 characters

---

### **4️⃣ Handle Avatar Upload Using Cloudinary**

Flow:

1. If avatar file exists
2. Remove old avatar (if exists)
3. Upload new one
4. Save new URL + public_id into DB

---

### **5️⃣ Cloudinary Transformations Used**

* Resize to **300 × 300**
* Crop as thumbnail
* Focus on face using `gravity: "face"`

---

### **6️⃣ Save Updated User**

```ts
await user.save();
```

---

### **7️⃣ Response**

```ts
res.json(user.avatar);
```

---

---

## ✅ **updateProfile Controller (Final Version)**

```ts
import { RequestHandler } from "express";
import formidable from "formidable";
import cloudinary from "../cloud"; // your cloud/index.ts

export const updateProfile: RequestHandler = async (req: any, res) => {
  const { name } = req.body;
  const avatar = req.files?.avatar as formidable.File | undefined;

  // Find User
  const user = await User.findById(req.user.id);
  if (!user) throw new Error("Something went wrong. User not found");

  // Validate Name
  if (typeof name !== "string")
    return res.status(422).json({ error: "Invalid name" });

  if (name.trim().length < 3)
    return res.status(422).json({ error: "Invalid name" });

  user.name = name.trim();

  // Handle Avatar Upload
  if (avatar) {
    // 1. Remove old avatar
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // 2. Upload new avatar
    const result = await cloudinary.uploader.upload(avatar.filepath, {
      width: 300,
      height: 300,
      crop: "thumb",
      gravity: "face",
    });

    // 3. Save new data to DB
    user.avatar = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  // Save
  await user.save();

  res.json(user.avatar);
};
```

---

## ✅ **Router Setup**

```ts
import { Router } from "express";
import { mustAuth } from "../middlewares/mustAuth";
import { fileParser } from "../middlewares/fileParser";
import { updateProfile } from "../controllers/user";

const router = Router();

router.patch("/update-profile", mustAuth, fileParser, updateProfile);

export default router;
```

---

## ✅ **fileParser Middleware (Fixed + Image Validation)**

```ts
import formidable from "formidable";
import { RequestHandler } from "express";

export const fileParser: RequestHandler = async (req: any, res, next) => {
  if (!req.headers["content-type"]?.startsWith("multipart/form-data"))
    return res.status(422).json({ error: "Only form-data allowed" });

  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  try {
    const { fields, files } = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    req.body = {};
    req.files = {};

    // Assign fields
    for (const key in fields) {
      req.body[key] = Array.isArray(fields[key])
        ? fields[key][0]
        : fields[key];
    }

    // Allowed image types
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    // Assign files + validate
    for (const key in files) {
      const file = Array.isArray(files[key]) ? files[key][0] : files[key];
      if (!file) continue;

      if (!allowed.includes(file.mimetype || "")) {
        return res.status(422).json({
          error: `Invalid file type for ${key}. Only images allowed.`,
        });
      }

      req.files[key] = file;
    }

    next();
  } catch (err) {
    console.error("Formidable error:", err);
    res.status(500).json({ error: "File upload failed" });
  }
};
```

---

## ✅ **Cloudinary Setup (`cloud/index.ts`)**


```ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;
```

---

Logout structure


✔ Logout (single device)
✔ Logout from all devices
✔ Saving token on `req.token`
✔ Extending Request type
✔ Filtering tokens
✔ Final router setup
✔ Test examples

---

### **1. Why logout needs POST?**

* Convention: logout should be a POST request
* Even though no body is sent → POST is preferred over GET

---

### **2. Two types of logout**

1. **Logout (remove only current device token)**
2. **Logout from all (clear all tokens)**

User may be logged in on multiple devices.
We store **each login token** in `user.tokens[]`.

---

### **3. Why we store token in `req.token`?**

* We already extract token in `mustAuth` middleware
* Instead of re-parsing header again in logout, we simply store:
  `req.token = token`

---

### **4. Why extend Request to include token?**

Because TS doesn’t know you added `req.token`, so you must extend types.

---

### **5. How logout works**

* Extract `req.user` (from mustAuth)
* Extract `req.token`
* Check query `?fromAll=yes`
* If fromAll=yes → remove all `tokens[]`
* Else → remove only current token using `.filter()`
* Save user document

---

# 💻 **CODE SNIPPETS (Copy–Paste Ready)**

---

# 1️⃣ **Extend Request type to support `req.token`**

Create:
`src/types/express.d.ts`

```ts
import { UserDocument } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
      token?: string;
    }
  }
}
```

Update tsconfig:

```json
{
  "compilerOptions": {
    "typeRoots": ["./src/types", "./node_modules/@types"]
  }
}
```

---

# 2️⃣ **Modify mustAuth middleware to add `req.token`**

`middlewares/mustAuth.ts`

```ts
import User from "../models/user";
import jwt from "jsonwebtoken";

export const mustAuth: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.replace("Bearer ", "");
    req.token = token; // <---- IMPORTANT

    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await User.findById(id);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
```

---

# 3️⃣ **Logout Controller**

`controllers/auth.ts`

```ts
import { RequestHandler } from "express";
import User from "../models/user";

export const logout: RequestHandler = async (req, res) => {
  try {
    const fromAll = req.query.fromAll; // ?fromAll=yes
    const token = req.token;
    const user = await User.findById(req.user!._id);

    if (!user) return res.status(500).json({ error: "Something went wrong" });

    // LOGOUT FROM ALL DEVICES
    if (fromAll === "yes") {
      user.tokens = [];
    } 
    else {
      // LOGOUT ONLY CURRENT DEVICE
      user.tokens = user.tokens.filter((t) => t !== token);
    }

    await user.save();

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Logout failed" });
  }
};
```

---

# 4️⃣ **Route Setup**

`routes/auth.ts`

```ts
import { Router } from "express";
import { logout } from "../controllers/auth";
import { mustAuth } from "../middlewares/mustAuth";

const router = Router();

router.post("/logout", mustAuth, logout);

export default router;
```

---

# 🧪 **POSTMAN TESTING NOTES**

### **1️⃣ Logout Single Device**

* endpoint:
  `POST http://localhost:8000/auth/logout`

* headers:

```
Authorization: Bearer <token>
```

* Response:

```json
{
  "success": true
}
```

* Database: tokens[] should remove ONLY that token.

---

### **2️⃣ Logout from ALL Devices**

Use query params:

```
POST /auth/logout?fromAll=yes
```

Headers:

```
Authorization: Bearer <any valid token>
```

Response:

```json
{
  "success": true
}
```

Database: `tokens[]` becomes empty.

---

Update the middleware mustAuth to check the token from database

✅ FIX mustAuth MIDDLEWARE (CRITICAL)
❌ Current (buggy)
```
const user = await User.findById(payload.id);
```

✅ Correct (SECURE)

```

const user = await User.findOne({
  _id: payload.id,
  tokens: token,   // 🔥 THIS is the fix
});

```
