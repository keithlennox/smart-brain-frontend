/*
Keith's notes

WHAT I DID:
- Created new react project.
- Removed everything from the default project we don't need.
- In App.js, I replaced the default functional component with a class component. React used to default to a class component, but no longer. Andrei uses class however.
- Installed npm package called tachyons. Used "npm install tachyons" syntax.
  This handles CSS styling.
  To use this package, you just add inline styles using css class names (no style sheet required).
- Installed npm package called react-tilt. Used "npm install --save react-tilt" syntax.
  The package makes logos tilt when you roll over.
  To use this package, you add <Tilt options={}/> to your JSX. Population of the options attrribute allows you to customize behaviour.
- Installed npm package called react particles. Used "npm install react-particles-js" syntax.
  This package adds fancy moving graphics to your page background.
  To use this package, you add <Particles params={} /> to your JSX. Population of the options attrribute allows you to customize behaviour.
- Added 5 new functional components to the parent App component.
  Gave each functional component its own folder and js file.
  Gave each functional component only basic presentational config. No real functionality.

QUESTIONS:
- Not sure why Andaei likes to put JSX text nodes in curly braces. It still works without.
- Why does Andaei sometimes use separate css style sheet and sometimes use tachyons?
- My input field is much wider than Andrei's. No idea why.
*/

import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200 //Andei used 800, but I needed 200 to look like his, no idea why.
      }
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
