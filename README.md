Part 7 | Fullstack course
===

### **The app is running at**: **https://part7-blog-frontend-reloaded.now.sh/**
- **Test user**: *rich*
- **Test pwd**: *rich*

### This is the same Blog App from [Part 5](https://github.com/marcorichetta/part5-blog-frontend) but reloaded with Redux, React-Router, Semantic UI, Webpack and Cypress

**The backend can be found at https://github.com/marcorichetta/part4-blog-backend** 

## Part 7
**Part of the exercises were to refactor the App state (previously managed with state hooks) with the Redux knowledge from [Part 6](https://fullstackopen.com/en/part6)**

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

### Part 7 D - E2E testing with Cypress
- Use of Cypress to test the functionality of the frontend/backend
- Use of API endpoint only for testing
  - `/api/testing` empties the DB
  - Tests can start from the same initial state