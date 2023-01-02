# Informed-sample

This is a pared-down version of *INFORMED*, a ##news aggregator web app## that I built using ##React.js##, ##JavaScript##, ##HTML##, ##CSS##. The ##web app## queries the ##NYTimes API## and ##The Guardian API## and curates news articles according to the user's interests.

**FUNCTIONALITIES & PAGE INTERACTIVITY**

## These coding segments implement:
- Querying The New York Times API and The Guardian API. The user can input a date and a search string.
- Fetching relevant articles from the API's, and 
- Outputting a list of articles that match the user's search.

## Available Scripts

In the project directory, you can run:

### `npm start`

To run the applictation in the development mode, use the *npm start* command.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

In order for the web app to work, you must register for an account on The New York Times Dev Portal (https://developer.nytimes.com/get-started) and on The Guardian Open Platform (https://open-platform.theguardian.com/access/). Once you have registered and have your personal API key, copy paste your keys in the src/config.js file.

The page will reload when you make changes.\
You may also see any lint errors in the console.
