## Getting Started
First, Configure env variables
1. create a .env file under project directory's root
2. configure following keys/variables with appropriate values
   1. DATABASE_URL
   2. NEXT_PUBLIC_CASDOOR_SERVER_URL
   3. NEXT_PUBLIC_CASDOOR_CLIENT_ID
   4. NEXT_PUBLIC_CASDOOR_ORG_NAME
   5. NEXT_PUBLIC_CASDOOR_APP_NAME
   6. NEXT_PUBLIC_CASDOOR_REDIRECT_PATH
   7. UD_API_KEY

Second, run the development server:
```bash
yarn
```

```bash
npx prisma generate
```

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
