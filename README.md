# NOTE
Backend is developed upon https://github.com/graphcool/graphql-server-example

Frontend is developed upon https://github.com/howtographql/react-apollo/

### Run Backend Server

```sh
cd backend
yarn install
cd prisma
docker-compose up -d
cd ..
yarn prisma deploy
yarn dev
```

### Frontend (Run the app)

```sh
cd frontend
yarn install
yarn start
```


You can now open your browser and use the app on 

Admin: `http://localhost:3000/admin/cities`

User: `http://localhost:3001/cities`