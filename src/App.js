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
- Inside the class component, I don't understand the use of constructor() and super().
- Why do we have to use "this"?

https://static.euronews.com/articles/stories/04/22/47/40/945x531_cmsv2_b5eeef82-3b6a-5879-b47f-8699155ff7a9-4224740.jpg

*/

import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {

    console.log(data);////////////////////////////////////////
    console.log(data.id);////////////////////////////////////////
    console.log(data.name);////////////////////////////////////////
    console.log(data.password);////////////////////////////////////////
    console.log(data.email);////////////////////////////////////////
    console.log(data.entries);////////////////////////////////////////
    console.log(data.joined);////////////////////////////////////////

    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}); //We pull the URL to the photo from our input field.
  }
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}); //Andrei says it's best to grab the final result of the input field and put that in a var, rather than use the input var, which is updated with each keystroke.
    app.models //Start of code snippet#1 from Clarifai
      .predict( //.predict() returns a promise.
        Clarifai.FACE_DETECT_MODEL,
        this.state.input) // The input var contains the URL to our photo. Why don't we use imageUrl? See commments at bottom of page...
      .then(response => {
        if(response) {
          fetch('http://localhost:3001/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }//End of code snippet#1 from my Clarifai

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    }else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              /> {/* If we don't use () after onInputChange, the function is passed as a prop, but is not called. */}
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
              route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }

      </div>
    );

  }
}

export default App;

/*
Explanation of why we don't pass the imageUrl var to the Clarifai API call.
Calling setState() in React is asynchronous, for various reasons (mainly performance).
Under the covers React will batch multiple calls to setState() into a single call, 
and then re-render the component a single time, rather than re-rendering for every state change.
Therefore the imageUrl parameter would have never worked in our example, 
because when we called Clarifai with our the predict function, React wasn't finished updating the state. 
One way to go around this issue is to use a callback function: setState(updater, callback).
Read about it more here: https://reactjs.org/docs/react-component.html#setstate
*/