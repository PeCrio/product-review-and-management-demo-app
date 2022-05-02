# Product Review and management demo app

## Introduction

> A customer feedback demo application for collecting reviews for a product after a successful purchase.

## Major Features

- View all comments/feedback/reviews from customers on a product.
- Customer can create feedback by entering their name, email, rating and comment
- Display product performance based on the reviews by showing a graphical preview in a chart format and the percentage of reviews above 2.

## Preview

This applicaiton is currently deployed on vercel, a demo preview can be seen on this [Preview Link](https://product-review-and-management-demo-app.vercel.app)
![App Preview](public/images/app-preview.png)

## Tools and technologies

Below are the main tools and technologies used in this project:

- [NextJS](https://nextjs.org)
- [ReactJS](https://reactjs.org)
- [Cypress](https://cypress.io)
- [ChakraUI](https://chakra-ui.com)
- [ESLint](https://eslint.org)
- [TypeScript](https://typescriptlang.org)
- [Formik](https://formik.org)
- [Axios](https://axios-http.org)
- [Chart.js](https://chartjs.org)
- [Mongoose](https://mongoosejs.com)

## Getting Started

1. ### Setup environment variables
   - Create a `.env` file in the root directory of the project
   - Copy the content of the `.env.example` file onto it
   - Update the values as required. e.g. `API_URL=https://localhost:3000/api`
2. ### Install packages and start server

   > Before proceeding to the next section, kindly ensure that your terminal window is on the right directory, you can use the below helper commands to check/confirm:

   - `cd` command to change directory e.g. `cd path/to/project`
   - `pwd` command to check your "print working directory"
   - `ls` command to show the content of your current directory

   > By default the `dev` script will run on port `3000`, if by chance you have another application making use of that port on your machine, you can either terminate that process/application or use the `--port` flag where necessary to change the running port, kindly remember to update any relative script found in the `package.json` file as well, e.g. the `develop` script.

   #### Development Commands

   ```bash
   # Step 1: Install dependencies
   npm install

   # Step 2: Test environment setup and cleanup for code coverage
   npm run predev:instrumented

   # Step 3: Run instrument test environment for code coverage
   npm run dev:instrumented

   # Step 4: Stop the server e.g. with `Ctrl + C`

   # Step 5:
   # Run Nextjs development server and cypress testing environment concurrently
   npm run develop

   # Viewing test coverage

   # Note: Please note that you need to have run the cypress test at least once before the report can be generated which is located here: coverage/lcov-report/index.html, alternatively, you can directly open it from your terminal with the below command:
   open coverage/lcov-report/index.html

   # Other commands can be found on the package.json file in the root directory of the project e.g. for running the NextJS development server only or the cypress test environment only

   ```

## Author

### Precious OSSAI

- [LinkedIn](https://www.linkedin.com/in/ossaiprecious)
- [Website](https://www.ossaiprecious.com)
- [GitHub](https://www.github.com/PeCrio)
- [Dribbble](https://www.dribbble.com/PeCrio)
- [Email](mailto:theossaiprecious@gmail.com)

### Inspiration

- [checkout.com](https://www.checkout.com)

## Disclaimer

This is a demo project for proof of concept only.
