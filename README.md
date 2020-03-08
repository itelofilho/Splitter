This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Keyboard Resize Shortcut

* **decrease**
* c+j: -1u
* c+j+shift: -10u
* c+h: -5u
* c+h+shift: -50u
* **increase**
* c+k: +1u
* c+k+shift: +10u
* c+l: +5u
* c+l+shift: +50u

*u is the unit, in that case is px*

## Follow-up questions

Once you are done with the above task, we would like to hear your thoughts on how you would implement the following (API and overall technical choices, no implementation):

1. If you didn't have time to complete all the above task's items, how would you have approached them?
I believe I did everything requested to me, but I assumed somethings that I believe should be changed in a real-world component. I attached the events of the keyboard to the window instead of the component, for this demo, this solution is good enough to show the result of the resize. I did the same to the event of mouseUp.

2. If you had more time to research the component, which source would you have used and for which aspect of the design of the component?
I did some research but I didn't find any article saying how to do it right, but I found [split](https://split.js.org/) and use they as param for performance and the solution of using the `style` to change the component width. One thing I want to test latter is to pass the width as a prop and let the styled-component update the value of the width. I want to do this and see the impact of doing this approach on the bundle size and performance.

3. How could we implement touch screens support? Any specific aspect to pay attention to?
First, we need to attach the Touch events to the dom, in my solution I just use Mouse events. After that we need to validate the size of the gap between the panes, the size of the gap needs to bigger enough to anyone drag without any problems. 

4. How could we make the component style engine independent (so Developers can choose between SCSS, styled-components and else)?
I never found a perfect solution for this, but maybe a good solution should be put most of the logic inside custom hooks, so when we ship any component we will have the solution with our style and and "pure" solution to anyone use I they desire, something like this is already happening inside Autocomplete Component.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
