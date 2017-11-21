import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MemoryRouter } from 'react-router';

//solution classes
import App from  '../problem-a/src/App';

//problem config
const JS_FILE_PATH_ROOT = 'problem-a/src/';

//my custom matchers
const styleMatchers = require('../lib/style-matchers.js');
expect.extend(styleMatchers);

//Enzyme config
Enzyme.configure({ adapter: new Adapter() });

/* Begin the tests */

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    const sources = ['index.js','App.js', 'AdoptPet.js'].map((src) => JS_FILE_PATH_ROOT+src);
    const linterOptions = {}; //this should be sufficient with other fields
    sources.forEach((source) => {
      expect([source]).toHaveNoEsLintErrors(linterOptions); //test each
    })
  })
});

describe('The single-page pet adoption app', () => { 
  let wrapper;

  it('renders without crashing', () => {
    //make sure it can be rendered within a router
    wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App/>
      </MemoryRouter>
    );
  });

  it('shows the Pet List at the correct route', () => {
    //currently at `/`

    let h2 = wrapper.find('.col-9 h2')
    expect(h2.length).toBe(1);
    expect(h2.text()).toEqual('Dogs for Adoption')
  })
  
  it('shows the About Page at the correct route', () => {
    wrapper = mount(<MemoryRouter initialEntries={['/about']}><App/></MemoryRouter>);

    let h2 = wrapper.find('.col-9 h2')
    expect(h2.length).toBe(1);
    expect(h2.text()).toEqual('About Us')
  })

  it('shows the Resources Page at the correct route', () => {
    wrapper = mount(<MemoryRouter initialEntries={['/resources']}><App/></MemoryRouter>);
    
    let h2 = wrapper.find('.col-9 h2')
    expect(h2.length).toBe(1);
    expect(h2.text()).toEqual('Resources')
  })

  it('redirects to the root on an invalid route', () => {
    wrapper = mount(<MemoryRouter initialEntries={['/error']}><App/></MemoryRouter>);
    
    let h2 = wrapper.find('.col-9 h2')
    expect(h2.length).toBe(1);
    expect(h2.text()).toEqual('Dogs for Adoption')
  })

  it('includes a Link in the header', () => {
    //currently at `/`

    let link = wrapper.find('header').find('Link');
    expect(link.length).toBe(1);
    expect(link.props().to).toEqual('/'); //link to correct route
  })

  it('contains highlighting navigation links', () => {
    wrapper = mount(<MemoryRouter initialEntries={['/about']}><App/></MemoryRouter>);
    
    let navLinks = wrapper.find('nav').find('NavLink');
    expect(navLinks.length).toBe(3); //has 3 links

    expect(navLinks.at(0).props().to).toEqual('/'); //link to correct route
    expect(navLinks.at(1).props().to).toEqual('/about');
    expect(navLinks.at(2).props().to).toEqual('/resources');
    
    //active styling is correct
    expect(navLinks.at(1).find('a').hasClass('activeLink')).toBe(true); //about is lit
    expect(navLinks.at(0).find('a').hasClass('activeLink')).toBe(false); //others are not
    expect(navLinks.at(2).find('a').hasClass('activeLink')).toBe(false);
  })

  it('shows pet cards for each pet in the list', () => {
    wrapper = mount(<MemoryRouter initialEntries={['/']}><App/></MemoryRouter>);

    let cards = wrapper.find('PetCard');
    expect(cards.length).toBe(5); //show all dogs
    expect(cards.at(1).find('.card-title').text()).toMatch('Spot'); //spot check name
  })

  it('shows Pet detail pages at the correct route', () => {
    wrapper = mount(<MemoryRouter initialEntries={['/adopt/Spot']}><App/></MemoryRouter>);
    
    let h2 = wrapper.find('.col-9 h2');
    expect(h2.length).toBe(1);
    expect(h2.text()).toEqual('Adopt Spot')
    let lead = wrapper.find('.col-9 .lead');
    expect(lead.text()).toEqual('Female Terrier'); //double-check object values
  })

  it('shows detail pages for Pets on card click', () => {
    wrapper = mount(<MemoryRouter initialEntries={['/']}><App/></MemoryRouter>);
    
    let spotCard = wrapper.find('PetCard').at(1);
    spotCard.simulate('click'); //click the card

    let h2 = wrapper.find('.col-9 h2');
    expect(h2.length).toBe(1);
    expect(h2.text()).toEqual('Adopt Spot') //check header
  })
})
