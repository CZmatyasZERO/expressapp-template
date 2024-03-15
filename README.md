## Express app template

*   This is template for creating web application with API.
*   Can be used with react
*   Api is accessed from routers in `router/` folder and in web is accessed by `/api/file-name/`
*   In app is set several security headers
*   `public/` folder is hosted on web in `/` with exception for `/api/`
*   in `public/` is special file `404.html` that is send when is requested file that is not found with `404` error code

### Run application

#### local

```bash
npm install
npm start
```

#### in docker

```bash
docker build . -t express-app
docker run -p 80:80 -e PORT=80 express-app
```

### Variables

*   Variables can be set in `.env` file or in docker container settings

| Name       | Definition                                                       |
|------------|------------------------------------------------------------------|
| PORT       | Defines port where app will listen. (default: 80)                |
| ForceHTTPS | If is set to 1, app will redirect unsecure connections to secure |