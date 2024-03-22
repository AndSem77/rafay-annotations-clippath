import Heptagon from './polygons/Heptagon';
import Hexagon from './polygons/Hexagon';
import Octagon from './polygons/Octagon';
import Pentagon from './polygons/Pentagon';
import Rhombus from './polygons/Rhombus';
import Triangle from './polygons/Triangle';

export default function Polygon({ item }) {
  const renderPolygon = (points) => {
    switch (points) {
      case 3:
        return <Triangle item={item} />;
        break;
      case 4:
        return <Rhombus item={item} />;
        break;
      case 5:
        return <Pentagon item={item} />;
        break;
      case 6:
        return <Hexagon item={item} />;
        break;
      case 7:
        return <Heptagon item={item} />;
        break;
      case 8:
        return <Octagon item={item} />;
        break;
      default:
        return null;
    }
  };
  return <div>{renderPolygon(item?.points)}</div>;
}
