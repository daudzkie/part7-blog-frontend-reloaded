Part 7 | Fullstack course
===
Part 5 can be seen from this commit

## Blog App Frontend (with Redux)

**This is the frontend part of the blog app**

## Part 5
- React Hooks (State, Effect)
- Conditional Rendering
- Token based authentication with [JSON Web Token](https://jwt.io/)
  - Local Storage to save the state between sessions
- Unit and integration test
  - Mock data with jest testing library
  - [Mock functionality like localStorage or entire modules of our application](https://fullstackopen.com/en/part5/testing_react_apps#frontend-integration-tests)
  - Test coverage

## Part 7
**Part of the exercises were to apply the Redux knowledge from [Part 6](https://fullstackopen.com/en/part6) to this app previously managed with state hooks**

- State management with Redux
  - Global Store
  - Action Creators
  - Reducers
  - Combined Reducers
- Use of React-Redux to connect many reducers
- Use of Redux-Thunk to make async action creators
  - First make some operation (Request the backend)
  - After its completion dispatch some action to the reducer
---
### Part 7 A - React-router
- Use of Router, Routes, Links
 - Routes with parameters `<Route exact path="/notes/:id" />`
 - withRouter and HTML history API

---
### Part 7 B - Styles
- Applied [Semantic UI](https://react.semantic-ui.com/) to the project

<img 
src="https://i.imgur.com/kIg2zwx.png"
alt="Users page"
height="440"
width="640" >

---
### Part 7 C - Webpack
- Install and config of webpack and dependencies
- Use of **Loaders** to deal with css, images and fonts
- Use of **Transpilers** to deal with React(.jsx)
- **Source maps** to better debugging on the browser
- **Minification** (Dev and Prod mode)
