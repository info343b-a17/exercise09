import React, { Component } from 'react'; //import React Component
import {AboutPage, ResourcesPage} from './About';
import AdoptPage from './AdoptPet';
import './App.css'; //import css file!
import SAMPLE_DOGS from './dogs.json'; //a sample list of dogs (model)


class App extends Component {
  constructor(props){
    super(props);
    this.state = {pets: []}; //initialize as empty
  }

  componentDidMount() {
    //pretend we loaded external data
    this.setState({pets: SAMPLE_DOGS});
  }

  render() {
    return (
      <div>
        <header className="jumbotron jumbotron-fluid py-4">
          <div className="container">
            <h1>Adopt a Pet</h1>
          </div>
        </header>
      
        <main className="container">
          <div className="row">
            <div className="col-3">
              <AboutNav />
            </div>
            <div className="col-9">
              <PetList pets={this.state.pets} />
            </div>
          </div>
        </main>

        <footer className="container">
          <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
        </footer>
      </div>
    );
  }
}

class AboutNav extends Component {
  render() {
    return (
      <nav id="aboutLinks">
        <h2>About</h2>
        <ul className="list-unstyled">
          <li><a href="">Adopt a Pet</a></li>
          <li><a href="">About Us</a></li>
          <li><a href="">Resources</a></li>
        </ul>
      </nav>
    );
  }  
}

class PetList extends Component {
  render() {
    let pets = this.props.pets || []; //handle if we aren't given a prop
    let petCards = pets.map((pet) => {
      return <PetCard pet={pet} key={pet.name} />;
    })

    return (
      <div>
        <h2>Dogs for Adoption</h2>
        <div className="card-deck">
          {petCards}
        </div>
      </div>
    );
  }
}

class PetCard extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  handleClick(){
    console.log("You clicked on", this.props.pet.name);
  }

  render() {
    let mutt = this.props.pet; //shortcut
    return (
      <div className="card" onClick={() => this.handleClick()}>
        <img className="card-img-top" src={mutt.images[0]} alt={mutt.name} />
        <div className="card-body">
          <h3 className="card-title">{mutt.name} {mutt.adopted ? '(Adopted)' : ''}</h3>
          <p className="card-text">{mutt.sex}/{mutt.breed}</p>
        </div>
      </div>
    );
  }
}

export default App;
