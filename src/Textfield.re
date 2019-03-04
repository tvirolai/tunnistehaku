let component = ReasonReact.statelessComponent("Textfield");

let make = (~name, ~arvo, ~changeFunction, _children) => {
  ...component,
  render: _self => <input type_="text"
                    className="form-control"
                    placeholder=name
                    value=arvo
                    onChange=changeFunction />
};
