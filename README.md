##NestJS & Angular Gallery System

#Hello!

This is an example application how to use nodeJS while creating a very simple gallery system that includes a JWT authentication system.
Furthermore, NestJS will host Angular (production version) and contains logic to make changes to your gallery without making the use of a database system.
Shortly explained, the NodeJS backend will only make usage of the folders and files. You can also change the order of the images. This is based on namings (automatically appended) such as [0], [1], ...

#You are able to:

- Login with credentials
- Logout
- Create a new category
- Delete a category
- Add new images to categories
- Remove one or more images for a category
- Change the order of images for a category by drag'n drop (Angular material)
- View the categories & images
  - Visualize images by the selected tag
  - Visualize images by the selected category
- Have NestJS host the Angular framework as an entrance point

#What you will need to:

- Check the .env files and correct them for NodeJs
- Do the same for the environment files in Angular

#Running locally

NestJS:

- Navigate to the root folder and execute the following commands:
  - npm i
  - npm run start:dev

Angular:

- Navigate to the Gallery-Manager folder and run the following commands:
  - npm i
  - npm run dev

This will boot up both applications without the need of building them.

# Running in production

I highly recommend to check the full code and modify it to your needs before using it in production.
There might still be minor bugs, as the true intention for this is to be an example.
Please take note of the environment files for both Angular and NestJS, as they both need to point to the same folder and require correct configuration.

Angular:

- Navigate to the Gallery-Manager folder and run the following commands:
  - npm i
  - npm run build
    - This will output to the xx folder. Take note of this.

NestJS:

Check the app.controller.ts file. This one is responsible for redirecting you to the main page you want to have.

- Navigate to the root folder and execute the following commands:
  - npm i
  - npm run build
    - This will output to the xx folder. You'll need this.
    - Inside the xx folder, look for the "frontend" folder. If it doesn't exist, create one.
    - Copy the output from angular into the frontend folder.
- Yay! If everything is configured correctly, you may now run NestJS as a production version.
  - Please note that you can not simply copy this to a server. You will something to run it. I recommend looking into pm2.
