JWT authentication and authorization using express, typescript, typeORM and postgreSQL

### Installation
```bash
yarn install
```

### Start postgreSQL server
```bash
docker-compose up
``` 

### Run project
```bash
yarn dev
```

JWT key generation:
console.log(require('crypto').randomBytes(256).toString('base64'));
