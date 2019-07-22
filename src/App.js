import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import { generatePalette } from "./colorHelpers";
import seedColors from "./seedColors";

class App extends Component {
  // Returns the specific palette to render based on the ID from the URL
  findPalette(id) {
    return seedColors.find(function(palette) {
      return palette.id === id;
    });
  }
  render() {
    return (
      <div className="App">
        <Switch>
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
              <PaletteList {...routeProps} palettes={seedColors} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
