# Node Web Scaffolding

Template to start new web application built on top of a REST API. This scaffolding creates a web server + REST API entry point with a sample application. Please change all or parts of this to fit your needs since that's the goal of this little project :)

## Dependencies

NodeJS 6.10+ (https://nodejs.org/)

## Installation

install via npm:

**npm install node-web-scaffolding**

**Note**: if install is on windows, make sure you remove the empty node_modules/node-web-scaffolding folder in the root of your installation folder

or clone via git:

**git clone https://github.com/boggan/node-web-scaffolding.git**

### Server

Go to the server folder and run the following commands:

install dependencies via: **npm install**

afterwards, you might want to edit the file **config.js** to configure the port on which you want the server to listen to (default is 8080).

start the server via: **node main.js**

### Client

The Client folder is where the web server will feed any of the local files you want served. So this is where the UI for your web application will reside. Bundled with this is a pure html + vanillaJS example of UI, but I strongly suggest you use an existing framework (Angular, React, Backbone, etc...) with some libraries.

Once the server is running and you have some files in the client folder visit http://localhost:8080 to access you web application.

the API is accessible via http://localhost:8080/api/

## Post Installation Notes

## Enjoy! :)
