import './App.css';
import React, { Component } from 'react';

class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      navbar_txt: "INFORMED",
      input: "",
      keyword: "...",
      start_date: new Date().toLocaleDateString('sv'),
      sourceNYT: "The New York Times",
      sourceTG: "The Guardian",
      articles_NYT: [],
      article_count_NYT: 0,
      articles_NYT_dicts: [],
      articles_TG: [],
      article_count_TG: 0,
      articles_TG_dicts: [],
    };
  }

  render() {
    const thenewyorktimesArticles = [];
    const theguardianArticles = [];
    const NYTall = [];
    const TGall = [];

    // Builds The New York Times articles list
    for (let index = 0; index < this.state.article_count_NYT; index++) {
      const logNYTarticle = {};

      this.state.articles_NYT.forEach((article, i) => {

        thenewyorktimesArticles.push(
          <li key={i} >

            <div key={i} class={"NYTheadline-" + index} >
              <b>{article[index]["headline"]["main"]}</b>
            </div>
            <div key={i} class={"NYTbyline-" + index} >
              {article[index]["byline"]["original"]}
            </div>
            <div key={i} class={"NYTsource-" + index} >
              {this.state.sourceNYT}
            </div>
            <div key={i} class={"NYTpub_date-" + index} >
              {article[index]["pub_date"]}
            </div>
            <div key={i} class={"NYTweb_url-" + index} >
              <a href={article[index]["web_url"]} target="_blank">{article[index]["web_url"]}</a>
            </div>
            <hr />
          </li>
        )

        logNYTarticle["id"] = index;
        logNYTarticle["headline"] = article[index]["headline"]["main"];
        logNYTarticle["byline"] = article[index]["byline"]["original"];
        logNYTarticle["source"] = this.state.sourceNYT;
        logNYTarticle["pub_date"] = article[index]["pub_date"];
        logNYTarticle["web_url"] = article[index]["web_url"];

        NYTall.push(logNYTarticle);
      })

      this.state.articles_NYT_dicts = NYTall;

    }



    // Builds The Guardian articles list
    for (let index = 0; index < this.state.article_count_TG; index++) {

      const logTGarticle = {};

      this.state.articles_TG.forEach((article, i) => {
        theguardianArticles.push(
          <li key={i} >
            <div key={i} class={"TGheadline-" + index} ref={"TGheadline-" + index + "-ref"}>
              <b>{article[index]["fields"]["headline"]}</b>
            </div>
            <div key={i} class={"TGbyline-" + index} ref={"TGbyline-" + index + "-ref"}>
              {article[index]["fields"]["byline"]}
            </div>
            <div key={i} class={"TGsource-" + index} ref={"TGsource-" + index + "-ref"}>
              {this.state.sourceTG}
            </div>
            <div key={i} class={"TGpub_date-" + index} ref={"TGpub_date-" + index + "-ref"}>
              {article[index]["webPublicationDate"]}
            </div>
            <div key={i} class={"TGweb_url-" + index} ref={"TGweb_url-" + index + "-ref"}>
              <a href={article[index]["webUrl"]} target="_blank">{article[index]["webUrl"]}</a>
            </div>
            <hr />
          </li>
        )

        logTGarticle["id"] = index;
        logTGarticle["headline"] = article[index]["fields"]["headline"];
        logTGarticle["byline"] = article[index]["fields"]["byline"];
        logTGarticle["source"] = this.state.sourceTG;
        logTGarticle["pub_date"] = article[index]["webPublicationDate"];
        logTGarticle["web_url"] = article[index]["webUrl"];

        TGall.push(logTGarticle);
      })

      this.state.articles_TG_dicts = TGall;

    }

    // Returns the User Interface
    return (
      <div class="col-lg-8 mx-auto p-3 py-md-5">
        <main>
          <nav class="navbar navbar-expand-md fixed-top shadow-sm bg-white">
            <div class="container-fluid">
              <h5>{this.state.navbar_txt}</h5>
            </div>
          </nav>
          <br></br>
          <br></br>
          <br></br>
          <h1>INFORMED</h1>
          <br></br>
          <label for="start">Start date: </label>
          <input onSelect={this.onSelect} type="date" id="start" name="date-start" />
          <input onChange={this.handleChange} value={this.state.input} />
          <button id="b1" class="btn btn-primary px-4 btn-sm" disabled={!this.state.input} onClick={this.searchArticles}>Search</button>
          <br></br>
          <br></br>
          <p class="fs-5 col-md-8">Articles containing: "{this.state.input}{this.state.keyword}"</p>
          <div class="mb-5">
            <button id="b2" class="btn btn-outline-secondary px-4 btn-sm" disabled="true">{this.state.article_count_NYT + this.state.article_count_TG}</button>
          </div>
          <hr class="col-3 col-md-2 mb-5"></hr>
          <div class="row g-5">
            <div class="col-md-6">
              <h2>{this.state.sourceNYT}</h2>
              <p>{this.state.article_count_NYT} article(s)</p>
              <ul class="icon-list ps-0">
                {thenewyorktimesArticles}
              </ul>
              <br></br>
              <br></br>
              <h2>{this.state.sourceTG}</h2>
              <p>{this.state.article_count_TG} article(s)</p>
              <ul class="icon-list ps-0">
                {theguardianArticles}
              </ul>
            </div>
          </div>
        </main>
        <footer class="pt-5 my-5 text-muted border-top">
          © Copyright Zoé Schreiber, 2022.
            </footer>
      </div>
    );
  }

  // Handles user input
  handleChange = (event) => {
    this.setState({
      input: event.target.value,
      keyword: "",
      articles_NYT: [],
      article_count_NYT: 0,
      articles_TG: [],
      article_count_TG: 0,
    });
  }
  
  // Handles article search
  searchArticles = () => {
    const query = this.state.input

    // Handles calling The New York Times API 
    const NYTimesAPIKey = global.config.NYTimesAPIKey
    const begin_date_nytimes = this.state.start_date.replaceAll('-', '');  //"20220624" //new Date().toLocaleDateString('sv').replaceAll('-', ''); //YYYYMMDD

    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${NYTimesAPIKey}&begin_date=${begin_date_nytimes}`)
      .then(response => response.json())
      .then(data => {

        const results_NYT = data.response.docs
        const article_count_NYT = results_NYT.length

        this.setState(state => ({
          articles_NYT: [...[], results_NYT],
          input: "",
          keyword: query,
          article_count_NYT: article_count_NYT,
        }));
      }).catch(function () {
        alert("Please input your The New York Times API key in src/config.js to start using the app.");
      });

    // Handles calling The Guardian API
    const TGAPIKey = global.config.TGAPIKey
    const begin_date_tg = this.state.start_date //"2022-06-24" //new Date().toLocaleDateString('sv') //YYYY-MM-DD
    const order_by = "newest"

    fetch(`https://content.guardianapis.com/search?api-key=${TGAPIKey}&q=${query}&from-date=${begin_date_tg}&order-by=${order_by}&show-fields=headline,byline,starRating,shortUrl`)
      .then(response => response.json())
      .then(data => {

        const results_TG = data.response.results
        const article_count_TG = results_TG.length

        this.setState(state => ({
          articles_TG: [...[], results_TG],
          input: "",
          keyword: query,
          article_count_TG: article_count_TG,
        }));

      }).catch(function () {
        alert("Please input your The Guardian API key in src/config.js to start using the app.");
      });


  }

}

export default App;
