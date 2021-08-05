# Middleware

Intro to building middleware for ExpressJS. 

`app.use` will run for every single `req` (wether it's a `GET`, `POST` , etc). If it `returns`, nothing will run after it, so it's important that if we want our program to keep running, to put a `next()` at the end so it know to move on to the next middleware.

This can be useful, for example, when you want to use middleware for a group of internal routes or authenticated routes. 
It's also useful to create `404` pages.

## Using middleware to protect routes

Because middleware executes for every single `req`, we can use it to protect routes. Basically creating functions that check for certain parameters in order to grant access to that route (by allowing the `next()` command to run if checks pass).

IMPORTANT - This is NOT how you do proper authentication, this is just an example of using middleware to protect routes. In other words, NEVER send a password as a query string. 

Example - This protects **every single route**
```Javascript
app.use((req, res, next) => {
    const { password } = req.query;
    if(password === 'chickennugget'){
        next();
    }
    res.send('Sorry, you need a password')
})
```

## Protecting specific routes

Instead of passing the authentication middleware through `app.use` as in the previous example, we can actually pass it to the `req`. 
When we define a path, i.e. [`app.get`](https://expressjs.com/en/5x/api.html#ap) , we pass in a `path` **and** we can *optionally* pass **multiple** callback functions. 
These callback functions will behave just like middleware.

