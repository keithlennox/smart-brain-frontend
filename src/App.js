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
- Added code to handle the form input field and Detect button. As part of this, we have to use the Clarifai API (face recognition).
  To make this work, I created an account at https://portal.clarifai.com/apps (user=klennox1@gmail.com + pw=unsecure);
  added a couple of code snippets from the Carifai web site to App.js; in the terminal typed "npm install clarifai";
  and added an import for Carifai to the top of App.js.

QUESTIONS:
- Not sure why Andaei likes to put JSX text nodes in curly braces. It still works without.
- Why does Andaei sometimes use separate css style sheet and sometimes use tachyons?
- My input field is much wider than Andrei's. No idea why.
- Inide the class component, I don't understand the use of constructor() and super().
  }
*/

import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({ //Start of code snippet#1 from Clarifai
  apiKey: '52215e2d0e7d4c5fb5e0cb1486a66add'
 }); //End of code snippet#1 from Clarifai

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
  constructor() { //I don't know what this is.
    super(); //I don't know what this is.
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }
  
  onButtonSubmit = () => {
    console.log('click');
    app.models.predict( //Start of code snippet#1 from Clarifai
      "a403429f2ddf4b49b307e318f00e528b", 
      "https://samples.clarifai.com/face-det.jpg")
      .then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );//End of code snippet#1 from my Clarifai
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        /> {/* If we don't use () after onInputChange, the function is passed as a prop, but is not called. */}
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
