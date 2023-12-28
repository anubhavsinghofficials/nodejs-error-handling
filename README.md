## Introduction to Errors



### Sharp code vs spaghetti code

- Before jumping on to the errors, we must keep in mind to write code in a way that removes the risks of any error. Spaghetti code often introducess unnecessary errors because there are no clear way of writing the code thereby causing some hidden errors that will only be seen when you run the code
- So make your code as sharp/specific as possible for example: separate the business logic from the controllers
- Think of it this way.. "This is a function.. hmm.. what's the 'very' purpose of this function?, that "very purpose" should be here and all the other functionalities necessary to perform during the "very purpose", goes to the utilities/services". In other words, view the every function as a broker/middleman
- [What is a Spaghetti code?](https://www.google.com/search?q=spaghetti+code&client=firefox-b-d&sca_esv=584304970&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjrp7L5tdWCAxVxUGwGHb9TD88Q_AUoAXoECAMQAw&biw=1536&bih=750&dpr=1.25)

### Error Throwing

- Errors can be of many types like:

  - Promise rejection

    ```js
    await new Promise((resolve, reject) => {
      let success = true;
      if (success) resolve('Success');
      else reject('Failure');
    });
    ```

  - Throw error litrally

    ```js
        threw new Error('An error occured')
        throw 'An error occured'
        throw {message : 'An error occured'}

        // express
        next(arg)
    ```

  - Express Errors
    - In express middlewares, when you call `next()`, it propagates to the next middleware in the chain but if you pass an argument to this next (any argument, preferably an actual error or even `next(new Error("message)))`, It would be considered as an exception/error and directly goes to the default/global error handler (if created, otherwise it would be unhandled)

  - Other application specific errors, eg: MongoDB errors (see get-error-details function in the code)

- These are just few examples of errors, there can be many!!, Hence, a proper error handling mechanisms are necessary to gracefully handle these erreors. So how do we do that?

### Error Catching & Handling

- Since Error propagation up in stack, Error Catching refers to Identifying and handling of those errots. Some examples of handling mechanisms are:
  - Try catch wrapper
  - global error handler middleware (express only)
  - Unchaught Exceptions
  - Uncaught Promise Rejections

- See the codebase to see how these are implemented
