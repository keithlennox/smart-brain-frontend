/*
Keith's notes

- Created new react project.
- Removed everything from the default project we don't need.
- In App.js, I replaced the default functional component with a class component. React used to default to a class component, but no longer. Andrei uses class however.
- Installed npm module called tachyons. Used "npm install tachyons" syntax. This handles CSS styling. Added accompanying inline styles using class names (no style sheet required).
- Installed react-tilt. Used "npm install --save react-tilt" syntax. The package makes logos tilt when you roll over.
- Added 4 components to the parent App component. Each component gets its own folder in a parent folder called src/Components.
*/

import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        {/*<ImageLinkForm />
        <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
