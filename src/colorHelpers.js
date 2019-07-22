import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// Returns a new Palette Object based on 'Darkness' level
function generatePalette(starterPalette) {
  //Generate a NEW palette object
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {}
  };
  // Creates an OBJECT in 'colors' object that is an empty array, eg. 50: [], 100: [], etc.
  for (let level of levels) {
    newPalette.colors[level] = [];
  }
  // Generates a scale for EACH color in the 'colors' object and assigns the lightest to darkest from 50 to 900
  for (let color of starterPalette.colors) {
    let scale = getScale(color.color, levels.length).reverse();
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)")
      });
    }
  }
  return newPalette;
}

// Generates and array with 3 hex colors from Darkest to white
function getRange(hexColor) {
  const end = "#fff";
  return [
    chroma(hexColor)
      .darken(1.4)
      .hex(),
    hexColor,
    end
  ];
}

// Maps the input colors (.scale) to a range of colors (.colors)
function getScale(hexColor, numberOfColors) {
  return chroma
    .scale(getRange(hexColor))
    .mode("lab")
    .colors(numberOfColors);
}

export { generatePalette };
