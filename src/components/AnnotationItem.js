import { useContext, useState } from 'react';
import { BarrierContext } from '../context/BarrierContext';
import Rectangle from './annotations/Rectangle';
import Text from './annotations/Text';
import Line from './annotations/Line';
import Arrow from './annotations/Arrow';
import Circle from './annotations/Circle';
import Ellipse from './annotations/Ellipse';
import Polygon from './annotations/Polygon';
import Star from './annotations/Star';
import { useKeyPress } from 'ahooks';

export default function AnnotationItem({ item }) {
  const { anno, setAnno } = useContext(BarrierContext);

  const renderAnno = (type) => {
    switch (type) {
      case 'text':
        return <Text item={item} />;
        break;
      case 'line':
        return <Line item={item} />;
        break;
      case 'arrow':
        return <Arrow item={item} />;
        break;
      case 'rectangle':
        return <Rectangle item={item} />;
        break;
      case 'circle':
        return <Circle item={item} />;
        break;
      case 'ellipse':
        return <Ellipse item={item} />;
        break;
      case 'polygon':
        return <Polygon item={item} />;
        break;
      case 'star':
        return <Star item={item} />;
        break;
      default:
        return null;
    }
  };

  return (
    <div
      // ref={targetRef}
      onClick={(e) => {
        e.stopPropagation();
        if (anno?.id === item.id) {
          return;
        }
        setAnno(item);
      }}
    >
      {renderAnno(item.type)}
    </div>
  );
}
