import React, { Component } from 'react'; //import React Component
import _ from 'lodash';
import { UncontrolledCarousel, Button } from 'reactstrap';
import SAMPLE_DOGS from './dogs.json'; //a sample list of dogs (model)

class AdoptPage extends Component {
  render() {
    let dogName = ''; //replace this with correct value!

    let dogObj =  _.find(SAMPLE_DOGS, {name: dogName}); //find dog in data (hack for simplicity)

    if(!dogObj) return <h2>No pet specified</h2> //if unspecified

    //make a bootstrap carousel (cause fun)
    let carouselItems = dogObj.images.map(function(img){
      let obj = { src: '../'+img, altText: dogObj.name, caption: '' };
      return obj;
    })

    return (
      <div>
        <h2>Adopt {dogObj.name}</h2>
        <p className="lead">{dogObj.sex} {dogObj.breed}</p>
        <UncontrolledCarousel
          items={carouselItems} 
          indicators={false}
          controls={true}
          />
        <Button disabled size="large" color="primary">Adopt me now!</Button>
      </div>
    );
  }
}

export default AdoptPage;