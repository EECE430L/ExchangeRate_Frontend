# InflateRates ReactJS Website
The React app is hosted on Cloudflare and can be viewed on [this link](https://inflate-rates.pages.dev/).

## Setting Up and Running the React App

1) Clone the repository
2) Open the repository in your preferred IDE or code editor
3) Open the terminal in the directory of the project
4) Run the command `npm install` to install all dependencies referenced in `package.json`
5) Run the command `npm start` to run the app locally in development mode
6) Open http://localhost:3000 to view it in your browser

## Project Structure
The `src` parent folder contains the primary source code of the React app. Within it are the following folders with their corresponding purpose outlined below:

| Folder    | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `components`| Contains all generic and reusable UI components used. The components are isolated from the Fetch API—they solely take, manipulate and display data. |
| `config`    | Contains configuration files, namely for the API endpoints. Currently, it only contains one file that defines the base URL to be used for all Fetch calls in the React app. |
| `context`   | Contains the created React contexts to be provided and consumed.   |
| `css`       | Contains CSS files used to style the pages and components in the React app.              |
| `enums`     | Contains enumerations used in the React app, such as one defining the *TransactionType*.|
| `media`     | Contains media files used in the React app, such as images of the country flags and the **InflateRates** logo. |
| `pages`     | Contains the parent pages that house the components and handle the Fetch API calls. |
| `utility`   | Contains utility functions, such as local storage manipulation. |

The `src` folder also contains the `App.js` file, which acts as the context provider, houses the global navigation bar and relates `Routes` to a specific page in `pages`.

## Acknowledgements
Code segments used from or inspired by outside sources are referenced with specific in comments in the source code directly. The primary sources can be seen below:
* [Stack Overflow](https://stackoverflow.com/)
* [DEV Community](https://dev.to/)
* [GeeksforGeeks](https://www.geeksforgeeks.org/)
* [MUI](https://mui.com/)
* [npm](https://www.npmjs.com/)
