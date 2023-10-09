# NestJS & Angular Gallery System

## Hello!

This is an example application how to use nodeJS while creating a very simple gallery system that includes a JWT authentication system.
Furthermore, NestJS will host Angular (production version) and contains logic to make changes to your gallery without making the use of a database system.
Shortly explained, the NodeJS backend will only make usage of the folders and files. You can also change the order of the images. This is based on namings (automatically appended) such as [0], [1], ...

## You are able to:

- Login with credentials
- Logout
- Create a new category
- Delete a category
- Add new images to categories
  - Making usage of the image-uploading form
    - Drag one or more images into the file select
    - Browse and select one or more images to upload
    - Preview images before uploading
    - Clear existing images
- Remove one or more images for a category
- Change the order of images for a category by drag'n drop (Angular material)
- View the categories & images
  - Visualize images by the selected tag (one page)
  - Visualize images by the selected category (path based)
- Have NestJS host the Angular framework as an entrance point

## What you will need to:

- Check the .env files and correct them for NodeJs
- Do the same for the environment files in Angular

## Running locally

NestJS:

- Navigate to the root folder and execute the following commands:
  - npm i
  - npm run start:dev

Angular:

- Navigate to the Gallery-Manager folder and run the following commands:
  - npm i
  - npm run dev

This will boot up both applications without the need of building them.

## Running as production version

I highly recommend to check the full code and modify it if you would really intended to use this in production.
There might still be minor bugs, as the true intention for this is to be an example.
Please take note of the environment files for both Angular and NestJS, as they both need to point to the same folder and require correct configuration.

**Angular:**

- Navigate to the Gallery-Manager folder and run the following commands:
  - npm i
  - ng build
    - This will output to the dist folder. Take note of this.

**NestJS:**

Check the app.controller.ts file. This one is responsible for redirecting you to the main page you want to have.

- Navigate to the root folder and execute the following commands:
  - npm i
  - npm run build:prod
    - This will output to the dist folder.
    - Inside the Gallery-Admin, look for the dist folder and move all files over to the "frontend" folder. If it doesn't exist, create one.
    - Copy the output from angular into the frontend folder.
      - Note: you can change the output directory straight into the frontend folder if you desire. You can make these adjustments in the angular.json file.
    - Install pm2 (recommended): npm install pm2 -g or yarn global add pm2.
    - Run with pm2: pm2 start dist/main.js --name gallery
    - You should be able to find your full application running at http://localhost:3000/ (unless you made changes to this)
      - Note: a copy of production.env is made into .env and is being used. For a currently unknown reason, it fails to take the production.env file while doing a production build.
    - Check your running process with pm2 list
- Yay! If everything is configured correctly, you are now running NestJS as a production version while serving Angular through it!
