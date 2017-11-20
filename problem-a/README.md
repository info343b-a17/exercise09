# Problem A

In this exercise you will practice implementing _client-side routing_ using Rect Router. Specifically, you will be turning a version of the previous "Pet Adoption" exercise into a single-page application.

## Running the Program
Because this app is created with React (and scaffolded through Create React App), you will need to install dependencies and run a developer web server in order to transpile and view the application. You can run this server by using the command:

```bash
# from inside the `problem-a/` folder
cd path/to/problem-b

# install dependencies
npm install  # only once per problem

# run the server
npm start
```

You can then view the rendered page _in a web browser_. Remember to check the Developer console for any errors!


## Exercise Instructions
To complete the exercise, edit the included **`src/App.js`** file and **`src/AdoptPet.js`** and add in the required code. Note that you should ___not___ need to edit any of the other provided files (including `index.js` or `index.html`).


1. In order to make your app perform client-side routing to **`src/App.js`**, you will need to `import` the `BrowserRouter` and `Route` components from `react-router-dom` (which has already been installed as a dependency).

    Modify the `App` component's `render()` function so that the entire content is contained within in a `<BrowserRouter>` element.

2. Then replace the rendered `<PetList>` element with the following routes:

    - The route `/` should render a `<PetList>` (note that it will not show any pets initially).
    - The route `/about` should render a `<AboutPage>`
    - The route `/resources` should render a `<ResourcesPage>`

    Place all of the routes inside a `<Switch>` element to make them mutually exclusive (so the `PetList` doesn't render with the other pages); you will also want to make the `/` route be an `exact` match.

    You can test your changes by directly visiting the routes (e.g., typing in `localhost:3000/about` in the browser's URL bar) and confirming that the correct content is being shown.

3. To begin adding navigation, modify the `<header>` in the `App` component so that the `<h1>` contains a `<Link>` to the `/` route. Remember to import `Link`!

    You can test that this works by directly visiting the `/about` page, and then clicking on the header link.

4. Add a `<Redirect>` element that will redirect the page to `/` if no other routes are rendered. _Hint_ place this inside of the `<Switch>` statement, which will cause it to be rendered as another "condition". This is a good way to handle typos in URLs.

    You can test this functionality by visiting a non-existent route (e.g., `/wrong`) and confirming that it takes you to the `/` route instead.

5. Modify the `AboutNav` component so that the links navigate to the correct routes (without reloading the page). Use `<NavLink>` elements, and specify that the the links should be give the `activeLink` class if the current route matches the link. Note that the `/` link should again be an `exact` match.

    You can test this functionality by clicking on each of the links. Note only should the page show the correct route, but the navigation link should be properly "highlighted"!

6. Now that most your navigation is in place, you should make it so that the different pets are shown in the `PetList`. To do this, modify the `/` route in the `App` component so that instead of specifying a `component` property, you specify a **`render`** property. This property be assigned a callback function that takes in a set of props, and returns a `<PetList>` element with those props _as well as_ the original **`pet`** prop.

    - Declaring this function as a local variable inside of `App#render()` can help with readability.

    Once this works, you should be able to see the list of pet cards when you visit the `/` route.

7. Next, add the ability to view details about each pet available for adoption. Add _another_ `<Route>` to the `App` component that is `/adopt/` followed by a **URL parameter** of the pet's name (e.g., `/adopt/Fido`). Note that you are only adding one route with a parameter!

    Then in the `src/AdoptPet.js` file, assign that route parameter value to the **`dogName`** variable.

    You should be able to test this by visiting routes such as `/adopt/Fido` and `/adopt/Spot` and seeing details for the appropriate pet.

    (The "adopt" button is disabled, since that functionality isn't implemented in this exercise).

8. Finally, add functionality so that whe you click on each `PetCard`, the page _redirects_ to the appropriate `/adopt` route.

    To do this, modify the `PetCard` class (in `src/App.js`) so that when you click on the card, you assign a value to that component's `state` indicating that you should redirect to the detail page for that pet's name.

    Then in that component's `render()` function, add a condition so that if the `state` value is defined, you instead `<Redirect>` to the the `/adopt` route for that pet. Note that you should also pass the `push` prop to this `<Redirect>` to allow the back button to function as expected (you're going to a new page, not just changing the current one).

    You can test this functionality by clicking on each `PetCard` and checking out the details for each pet!

## Testing
Coming soon...