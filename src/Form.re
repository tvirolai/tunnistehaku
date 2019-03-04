/* The form that makes the UI lives here. */
type action =
  | Instructions
  | Query;

type state = {
  input: string,
  mode: bool,
};

let databases = ["Melinda", "Aalto-yliopisto", "Arcada", "Centria", "DIAK", "Fennica",
    "Haaga-Helia", "HAMK", "Hanken", "Helka", "Humak", "Itä-Suomen yliopisto",
    "Jyväskylän ammattikorkeakoulu", "Jyväskylän yliopisto", "Kaakkois-Suomen amk",
    "Kajaanin ammattikorkeakoulu", "Karelia-ammattikorkeakoulu", "Lapin korkeakoulukirjasto",
    "Lappeenrannan tiedekirjasto", "LAMK", "Laurea-ammattikorkeakoulu",
    "Metropolia", "OAMK", "Oulun yliopisto", "SAMK", "Savonia", "SeAMK", "Taideyliopisto",
    "TAMK", "Tampereen yliopisto", "Tritonia", "Turku AMK", "Turun kaupunginkirjasto",
    "Turun yliopisto", "Varastokirjasto", "Åbo Akademi"];

let instructions = ["MARC 21", "MARC 21 Full (LOC)", "MARC 21 sovellusohje (RDA)"];

let component = ReasonReact.statelessComponent("Form");

let make = (_children) => {
  ...component,
  /* initialState: () => {input: "moi", mode: true}, */
  render: _self =>
    <div className="container">
      <form className="form-horizontal">
      <div className="form-group has-feedback">
        <br />
          <div className="col-sm-10">
            <div>{ReasonReact.string("moi")}</div>
              /* <TextField name={textPlaceHolder} id="querystring" arvo={this.state.value} changeFunction={this.handleChange} /> */
              /* <span className={textFormatting} aria-hidden="true"></span> */
            </div>
          </div>
      </form>
    </div>
};
