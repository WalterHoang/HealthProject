This is the README for the final project.

## Before running the project
A fresh clone or download from the repo will give a folder containing both a backEnd folder and a frontEnd folder. This project also assumes you are using vsCode and Intelij for your IDEs.


## Back end setup
This repository comes with a RESTFUL API for this full stack project that currently supports CRUD functionality and validation.

This program comes with a dataloader that currently loads a single patient and 3 encounters for testing purposes.

This program uses the frontEnd that comes with this repo.

### Getting Started

These instructions will get you a copy of the project up and running on your local
machine for development and testing purposes.

1. Create a Postgresql database with the same name in the application.yml file
2. Import the project in IntelliJ.
3. Run the application.
4. Use the application.yml file to configure the initial actions once the program is running for future runs. 
5. Set ddl-auto from create-drop to none and remove the dataloader  package from the file path if you do not want to run the
   dataloader on subsequent runs.
6. Use the SecurityConfig file to configure the security settings for the program.
7. Use the SwaggerConfig file to allow future features to be documented using swagger.

### Swagger

To use the Swagger UI, navigate to [http://localhost:8080/swagger-ui.html#/](http://localhost:8080/swagger-ui.html#/)


### Running the Unit Tests
1. Make sure the java folder under test is marked as the Test Sources Root.
2. Right click on the java folder under test and click Run 'All Tests' or Run 'All Tests' with Coverage.

### Postman Collection
1. Open Postman.
2. On the top left-hand corner, click Import.
3. Import the following Postman collection link to test api endpoints: https://www.getpostman.com/collections/0d05e52c559461503f99

## Front end setup
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

1. Open the frontEnd folder in Vscode.
2. Type the following commands in a Vscode terminal.
3. `npm install` to get all of the needed dependancies.
4. `npm run build` to create an optimized project.
5. `npm install -g serve` to make sure you have the needed dependancy to deploy the project.
6. `serve -s build` to deploy the project.

## Available Scripts

In the frontEnd project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run coverage`

Runs all of the tests and provides a coverage report on the tested files.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
