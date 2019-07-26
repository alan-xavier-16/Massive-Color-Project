import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from "./colorHelpers";
import seedColors from "./seedColors";

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  // Returns the specific palette to render based on the ID from the URL
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  // Save a New Palette object from the NewPalette Form
  savePalette(newPalette) {
    this.setState(
      st => ({
        palettes: [...st.palettes, newPalette]
      }),
      this.syncLocalStorage
    );
  }
  // Saves Palette to localStorage
  syncLocalStorage() {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }
  // Deletes a Palette based off of ID
  deletePalette(id) {
    this.setState(
      st => ({
        palettes: st.palettes.filter(palette => palette.id !== id)
      }),
      this.syncLocalStorage
    );
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/palette/new"
            render={routeProps => (
              <NewPaletteForm
                {...routeProps}
                palettes={this.state.palettes}
                savePalette={this.savePalette}
              />
            )}
          />
          <Route
            exact
            path="/palette/:paletteId/:colorId"
            render={routeProps => (
              <SingleColorPalette
                id={routeProps.match.params.colorId}
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.paletteId)
                )}
              />
            )}
          />
          <Route
            exact
            path="/palette/:id"
            render={routeProps => (
              <Palette
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.id)
                )}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={routeProps => (
              <PaletteList
                {...routeProps}
                palettes={this.state.palettes}
                deletePalette={this.deletePalette}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
