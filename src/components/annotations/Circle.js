import { useContext, useRef, useEffect } from 'react';
import { BarrierContext } from '../../context/BarrierContext';
import Moveable from 'react-moveable';
import {
  handleDragEnd,
  handleResizeEnd,
  handleRotateEnd,
  handleTransform,
} from './utils';

export default function Circle({ item }) {
  const { anno, setAnno } = useContext(BarrierContext);

  const targetRef = useRef(null);
  const moveableRef = useRef(null);

  if (targetRef.current) {
    // console.log('targetRef.current.style :', targetRef.current.style);
    if (targetRef.current.style) {
      targetRef.current.transform = handleTransform(item);
    }
  }

  return (
    <>
      {item.id === anno?.id ? (
        <>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: `${item?.size?.width}px`,
              height: `${item?.size?.height}px`,
              transform: handleTransform(anno),
              backgroundColor: `${item?.background?.color}`,
              borderWidth: `${item?.border?.width}px`,
              borderColor: `${item?.border?.color}`,
              borderRadius: `${item?.border?.radius}%`,
              overflow: 'hidden',
            }}
            ref={targetRef}
          ></div>
          <Moveable
            transform={handleTransform(anno)}
            ref={moveableRef}
            target={targetRef}
            draggable={true}
            throttleDrag={1}
            edgeDraggable={false}
            startDragRotate={0}
            throttleDragRotate={0}
            snappable={true}
            snapContainer={'.snapContainer'}
            snapDirections={{
              top: true,
              left: true,
              bottom: true,
              right: true,
              center: true,
              middle: true,
            }}
            elementSnapDirections={{
              top: true,
              left: true,
              bottom: true,
              right: true,
              center: true,
              middle: true,
            }}
            elementGuidelines={[
              {
                element: '.snapContainer',
                className: 'red',
              },
            ]}
            bounds={{ left: 0, top: 0, right: 0, bottom: 0, position: 'css' }}
            resizable={true}
            keepRatio={true}
            rotatable={true}
            throttleResize={1}
            renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
            throttleRotate={0}
            rotationPosition={'top'}
            snapRotationDegrees={[0, 45, 90, 135, 180, 225, 270, 315]}
            onRender={(e) => {
              e.target.style.cssText += e.cssText;
            }}
            onRoundEnd={(e) => {
              setAnno({
                ...anno,
                border: {
                  ...anno?.border,
                  radius: e.target.style.borderRadius,
                },
              });
            }}
            onDragEnd={(e) => {
              const position = handleDragEnd(e);
              // console.log('position :', position);
              position && setAnno({ ...anno, position });
            }}
            onResizeEnd={(e) => {
              const size = handleResizeEnd(e);
              console.log('size :', size);
              setAnno({ ...anno, size });
            }}
            onRotateEnd={(e) => {
              const rotation = handleRotateEnd(e);
              setAnno({ ...anno, rotation });
            }}
          />
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${item?.size?.width}px`,
            height: `${item?.size?.height}px`,
            transform: handleTransform(item),
            backgroundColor: item?.background?.color,
            borderWidth: `${item?.border?.width}px`,
            borderColor: `${item?.border?.color}`,
            borderRadius: `${item?.border?.radius}%`,
            overflow: 'hidden',
          }}
        ></div>
      )}
    </>
  );
}
