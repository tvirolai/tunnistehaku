"use strict";

import React from "react";
import ReactDOM from "react-dom";
import TextField from "./components/TextField";
import SelectButton from "./components/SelectButton";
import DbSelect from "./components/DbSelect";
import processInput from "./processInput";

const databases = ["Melinda",
                   "Aalto-yliopisto",
                   "Arcada",
                   "Centria",
                   "DIAK",
                   "Fennica",
                   "Haaga-Helia",
                   "HAMK",
                   "Hanken",
                   "Helka",
                   "Humak",
                   "Itä-Suomen yliopisto",
                   "Jyväskylän ammattikorkeakoulu",
                   "Jyväskylän yliopisto",
                   "Kaakkois-Suomen amk",
                   "Kajaanin ammattikorkeakoulu",
                   "Karelia-ammattikorkeakoulu",
                   "Lapin korkeakoulukirjasto",
                   "Lappeenrannan tiedekirjasto",
                   "LAMK",
                   "Laurea-ammattikorkeakoulu",
                   "Metropolia",
                   "OAMK",
                   "Oulun yliopisto",
                   "SAMK",
                   "Savonia",
                   "SeAMK",
                   "Taideyliopisto",
                   "TAMK",
                   "Tampereen yliopisto",
                   "Tritonia",
                   "Turku AMK",
                   "Turun kaupunginkirjasto",
                   "Turun yliopisto", 
                   "Åbo Akademi"];

const instructions = ["MARC 21",
                      "MARC 21 Full (LOC)",
                      "MARC 21 sovellusohje (RDA)",
                      "MARC 21 sovellusohje (ISBD)"];

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ohjeet: true, value: "", selection: "MARC 21"};
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
  }

  handleClick(event) {
    const defaultSelection = this.state.ohjeet ? "Melinda" : "MARC 21";
    this.setState({ohjeet: !this.state.ohjeet, selection: defaultSelection});
  }

  handleChange(event) {
    this.setState({ohjeet: this.state.ohjeet, value: event.target.value});
  }

  sendForm(event) {
    processInput(this.state);
  }

  changeSelection(event) {
    this.setState({selection: event.target.value});
  }

  render() {
    const selection = (this.state.ohjeet) ? <DbSelect title="Haku ohjeista" content={instructions} changeFunction={this.changeSelection} /> : <DbSelect title="Haku tietokannasta" content={databases} changeFunction={this.changeSelection} />;
    const textPlaceHolder = (this.state.ohjeet) ? "Syötä MARC 21 kenttäkoodi" : "Syötä tietuenumero(t)";
    const textFormatting = (this.state.ohjeet) ? "glyphicon glyphicon-console form-control-feedback" : "glyphicon glyphicon-book form-control-feedback";
    return (
      <div className="container">
        <form className="form-horizontal">
          <div className="form-group has-feedback">
            <br />
            <div className="col-sm-10">
              <TextField name={textPlaceHolder} id="querystring" arvo={this.state.value} changeFunction={this.handleChange} />
              <span className={textFormatting} aria-hidden="true"></span>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-10">
              <div class="btn-group-vertical" role="group" aria-label="YO!">
                <SelectButton name="Haku ohjeista" active={this.state.ohjeet} clickFunction={this.handleClick} elementId="ohjeet" />
                <SelectButton name="Haku tietokannoista" active={!this.state.ohjeet} clickFunction={this.handleClick} elementId="tietokannat"/>
              </div>
            </div>
          </div>
          {selection}
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-default" id="NAPPI" onClick={this.sendForm}>Haku</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById("app")
);

