export default {
  up() {},
  down(size) {
    // For website built for desktops first
    const sizes = {
      xs: "576px", // Extra Small devices (576px and down)
      sm: "768px", // Small devices (768px and down)
      md: "992px", // Medium devices (992px and down)
      lg: "1200px" // Large devices (1200px and down)
    };
    return `@media (max-width: ${sizes[size]})`;
  }
};
