import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import "./PaletteList.css";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { palettes } = this.props;
    return (
      <div className="PaletteList">
        <MiniPalette />
        <h1>React Palette List</h1>
        {palettes.map(p => (
          <p>
            <Link to={`/palette/${p.id}`}>{p.paletteName}</Link>
          </p>
        ))}
      </div>
    );
  }
}

export default PaletteList;
