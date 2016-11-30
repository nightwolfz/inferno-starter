# Inferno + Mobx Starter project

<p>&nbsp;</p>
<p align="center"><img src="http://infernojs.org/img/inferno.png" width="150px"></p>
<p>&nbsp;</p>

The goal of this project is to provide a starting base for an mobx inferno project with isomorphism.

Features:
+ `async/await` support
+ Isomorphic for SEO goodness
+ CSS and SCSS compilation
+ MongoDB user register/login/logout
+ Token based authentication
+ Decorators for accessing actions and state
+ Hot reload
+ Bundle size as small as possible


![Preview](https://raw.githubusercontent.com/nightwolfz/inferno-starter/master/preview.png)

## How to run

For development:

    npm run dev

For production:

    npm run prod

## Requirements

    Node 6+ (or Node 4 with additional babel plugins)
    MongoDB server

## Goals

- Optimized for minimal bundle size.
- Optimized for server-side speed. (See the benchmark, it's fast !)
- Using Inferno, the fastest React-like framework out there. 
- Using MobX, the easiest and insanely fast state manager.
- Simple and minimal with routing, authentication, database and server-side rendering.
- Good developer experience with hot-reloading and source-maps.

# Benchmarks

```sh
gb -G=4 -k=true -c 200 -n 10000 http://localhost:2000/about

Document Path:          /about
Document Length:        1436 bytes

Concurrency Level:      200
Time taken for tests:   3.06 seconds
Complete requests:      10000
Failed requests:        0
HTML transferred:       14360000 bytes
Requests per second:    3262.76 [#/sec] (mean)
Time per request:       61.298 [ms] (mean)
Time per request:       0.306 [ms] (mean, across all concurrent requests)
HTML Transfer rate:     4575.37 [Kbytes/sec] received

Connection Times (ms)
              min       mean[+/-sd]     median  max
Total:        1         0   12.07       59      246
```
Tested on i7-6700K @ 4.00GHz 16GB RAM. **Single** node.js instance.

# F.A.Q.

## What are `stores` ?

Stores will contain the state of your application and the methods that mutate that state.
Basically most of your client side logic is inside stores.


## What is `connect` ?

The `@connect` decorator injects stores into your components.
Additionally, it keeps your components up to date with any changes in your stores.

_Example: If you display a `messageCount` from a `Messages` store and it gets updated, 
then all the visible components that display that `messageCount` will update themselves._


## Does connecting many components make my app slower?

**No**, it actually allows the rendering to be done more efficiently. So connect as many as you want !


## Adding mongoose models

1. Goto `src/server/models`
2. Add `[Name].js` with your model in it

## Adding stores

1. Goto `src/client/stores`
2. Add `[name].js` (based on another store like `account.js`)
3. Update `src/client/stores.js`

## Enabling server-side rendering

1. Goto `src/server/config`
2. Set `server.SSR` variable to `true` or `false`

## My components are not updating!

Make sure you added the `@connect` decorator to your component.

## My stateless component doesn't have access to the stores !

You cannot use decorators on stateless components.
You should instead wrap your component like this:

```js
const MyComponent = connect((props, context) => {
  return <p>{context.state.something} !</p>
})
````

## How do I execute async actions on the server and/or client ?

Add a static `onEnter` method to your component like this:

```js
class MyComponent extends Component {
    static onEnter({ myStore, params }) {
        // Make sure to ALWAYS returns something (preferably a promise), even if its nothing!
        // Otherwise we won't know when the method finished it's work
        return myStore.browse()
    }
    // ...
}
```

The `onEnter` method is smart, it will be executed either on the server or on the browser depending on how you access the website.

It also passes all your stores and url params as arguments as a convenience.


## Useful links

[Inferno](https://github.com/trueadm/inferno)

[MobX](https://mobxjs.github.io/mobx/)


## Author

Ryan Megidov

https://github.com/nightwolfz/inferno-starter
