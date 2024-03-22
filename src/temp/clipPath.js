// here are clip-path online generators
// check https://unused-css.com/tools/clip-path-generator
// https://bennettfeely.com/clippy/

const renderPolygon = (points) => {
  switch (points) {
    case 3:
      return 'triangle'; // clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      break;
    case 4:
      return 'rhombus'; // clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      break;
    case 5:
      return 'pentagon'; // clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
      break;
    case 6:
      return 'hexagon'; // clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      break;
    case 7:
      return 'heptagon'; // clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);
      break;
    case 8:
      return 'octagon'; // clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    default:
      return null;
  }
};
