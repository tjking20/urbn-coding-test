import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import IngredientForm from './components/IngredientForm';
import RecipesContainer from './components/RecipesContainer';
import Navbar from './components/Navbar'
import axios from 'axios'


class App extends Component {

  constructor() {
    super();

    this.state = {

      ingredients : "",
      recipes : []

    }

  }

  componentDidMount() {
    const self= this;

    axios.get("https://api.edamam.com/search?q=summer,food&&app_id=8544bb7c&app_key=6a0f70f6ef250d50b41ebec6a0a31f15")
      .then(function (response) {
        //creates new array of recipes from the response
        let responseData = response.data.hits;
        let recipes = [...responseData]; 

        //setting state to the array of recipes returned in response
        self.setState({
          recipes
        })

      })
      .catch(function(error){
        console.log(error);
        // return (
        //   <div>
        //     <h4>Service Temporarily Unavailable...</h4>
        //   </div>
        // );
      });
  }

  //setting the ingredient(s) to the value of the text in the input
  handleInputChange = (evt) => {
    this.setState({
      ingredients : evt.target.value
    });
  }


  handleSubmit = (evt) => {
    
    evt.preventDefault();
    const self = this

    //axios call sends an xmlHttpRequest to the api, and encodes it in JSON
    axios.get(`https://api.edamam.com/search?q=${this.state.ingredients}&app_id=8544bb7c&app_key=6a0f70f6ef250d50b41ebec6a0a31f15`)
      .then(function (response) {

        //creates new array of recipes from the response
        let responseData = response.data.hits;
        let recipes = [...responseData]; 

        //setting state to the array of recipes returned in response
        self.setState({
          recipes
        })

      })//.catch will send request errors and will display a message to the user
      .catch(function (error) {
        console.log(error);
        return (<div>"Sorry... No recipe for you!"</div>)
      });

    this.setState({
      ingredients : ""
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <IngredientForm 
          handleSubmit={this.handleSubmit}
          onInputChange={this.handleInputChange} />

        <RecipesContainer
          recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
