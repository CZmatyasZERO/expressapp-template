# Express app template
- This is template for creating web application with API for client-side rendering.
- Can be used with react
- Api is accessed from routers in `router/` folder and in web is accessed by `/api/file-name/`
- In enviromental variables can be set `forceHttps` for forcing https
- In app is set several security headers
- `public/` folder is hosted on web in `/` with exception for `/api/`
- html files can be accessed by `/file.html` but also like `/file`
- in `public/` is special file `404.html` that is send when is requested file that is not found with `404` error code