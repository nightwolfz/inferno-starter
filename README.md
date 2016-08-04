# Inferno + Mobx Starter project

<p>&nbsp;</p>
<p align="center"><img src="http://infernojs.org/img/inferno.png" width="150px"></p>
<p>&nbsp;</p>

The goal of this project is to provide a starting base for an mobx inferno project with isomorphism.

Features:
+ `async/await` support
+ Isomorphic
+ CSS and SCSS compilation
+ MongoDB user auth / sessions
+ Decorators for accessing actions and state


![Preview](https://raw.githubusercontent.com/nightwolfz/mobx-starter/master/preview.png)


## How to run

For development:

    npm run dev

For production:

    npm run prod

## Requirements

    Node 6 or Node 4 with additional babel plugins

## Goals

We have one state object. That object can be accessed by any Inferno component decorated with `@connect`.

If we want to update the state, we execute `actions` which are just namespaced functions _(namespace = action filename)_ that affect the state.

All the rendering is efficiently taken care by [MobX](https://github.com/mobxjs/mobx) so you can focus on two things:

`What to name your action?` and `what should it do?`



# F.A.Q.

##### How to add mongoose models ?
---
1. Goto `src/server/models`
2. Add `[Name].js`
3. Goto `src/helpers/database`
4. Add a new key to the `export default` and require your model there.



##### How to add a new action
---
Goto `src/client/actions`.

If you want to add a new action to an
existing file, just add a new method to one of the classes
ex: add `clearAll()` method to `todos.js`

If you want to add a new set of actions, create a new file
ex: `settings.js` and add a reference to that file to `const actions` in `index.js`



##### My components are not updating!
---
Make sure you added the `@connect` decorator to your component.



##### My stateless component doesn't have access to this.context !
---
You cannot use decorators on stateless components.
You should instead wrap your component like this:

```js
const MyStatelessComponent = connect(function(props, context) {
  return <p>{context.state.something} !</p>
})
````



##### Should I use @observer on all components ?
---
`@connect` only enhances the component you are decorating, not the components used inside it.
So usually all your components should be decorated.
Don't worry, this is not inefficient, in contrast, more observer components make rendering more efficient.



##### How do I execute async actions on the server instead of client ?
---
Checkout `src/client/components/Home.js`.
The `fetchData` method there only runs on the server.



##### Usefull links
---
[Inferno](https://github.com/trueadm/inferno)

[MobX](https://mobxjs.github.io/mobx/)

[mobx-connect](https://github.com/nightwolfz/mobx-connect)



## Author

Ryan Megidov

https://github.com/nightwolfz/inferno-starter
