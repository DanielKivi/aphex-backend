# Syro

> 

## About

Backend for Syro Application

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

1. Install dependencies

    ```
    cd path/to/application; npm install
    ```

2. Create a .env file in the root directory (use .envexample) and configure the secret and any other settings necessary 
3. Start your app

    ```
    npm start
    ```
    
4. For development, use nodemon, you can start it with 

    ```
    npm run dev
    ```


## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```
