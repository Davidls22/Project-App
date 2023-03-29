Readme file for Web Project API

This API provides endpoints for creating, reading, updating and deleting web project objects.

GET /API
This endpoint returns a list of all web project objects.

To use this endpoint, open Postman and send a GET request to the following URL:
http://localhost:8080/API

POST /API
This endpoint allows you to add a new web project object.

To use this endpoint, open Postman and send a POST request to the following URL:
http://localhost:8080/API
In the body of the request, provide the following information as query parameters:
id=<id>&title=<title>&description=<description>&URL=<URL>
Replace <id>, <title>, <description> and <URL> with the appropriate values for your web project.

PUT /API
This endpoint allows you to update an existing web project object.

To use this endpoint, open Postman and send a PUT request to the following URL:
http://localhost:8080/API
In the body of the request, provide the following information as query parameters:
id=<id>&newId=<newId>&title=<title>&description=<description>&URL=<URL>
Replace <id>, <newId>, <title>, <description> and <URL> with the appropriate values for your web project.

DELETE /API
This endpoint allows you to delete an existing web project object.
To use this endpoint, open Postman and send a DELETE request to the following URL:
http://localhost:8080/API?id=<id>
Replace <id> with the ID of the web project object that you want to delete.

