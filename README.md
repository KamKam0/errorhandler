# ErrorHandler
ErrorHandler is simple to use module that allows you to handle several errors to prevent your program from crashing

## Installation
```js
npm install @kamkam1_0/errorhandler
```

## Functionalities
Here are the error types supported by ErrorHandler
```
rejectionHandled
uncaughtException
uncaughtExceptionMonitor
unhandledRejection
```
- ErrorHandler stops the process when 5 errors happen in less than 5 seconds
- ErrorHandler stops the process when the number of stored errors is egual to 100
- ErrorHandler create a file for each error (with the error in it) and store it in the directory of the process

## How to use

### General Use
```js
const ErrorHandler = require("@kamkam1_0/errorhandler")
ErrorHandler.deploy()
```

### Specific use
You can also select one or more specific error types to deploy them
```js
const ErrorHandler = require("@kamkam1_0/errorhandler")
process.on("rejectionHandled", err => ErrorHandler.rejectionHandled(err))
```

### Sending the error
One of the feature is also the capacity to send the error.
You can do that by creating a function to do that.
```js
let sendingFunction = function(err){
    //Your code to send
    //For Example with discord: 
    bot.users.get("YOUR ID").send(`An error happened: \`\`\`${err}\`\`\``)
}
const ErrorHandler = require("@kamkam1_0/errorhandler")
process.on("rejectionHandled", err => ErrorHandler.rejectionHandled(sendingFunction, err))
//OR
ErrorHandler.deploy(sendingFunction)
```