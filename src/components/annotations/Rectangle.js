import { useContext, useRef, useEffect } from 'react';
import { BarrierContext } from '../../context/BarrierContext';
import Moveable from 'react-moveable';
import { useClickAway } from '@uidotdev/usehooks';
import {
  handleDragEnd,
  handleResizeEnd,
  handleRotateEnd,
  handleRoundEnd,
  handleTransform,
} from './utils';

export default function Rectangle({ item }) {
  const { anno, setAnno } = useContext(BarrierContext);
  const targetRef = useRef(null);
  const moveableRef = useRef(null);

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
              transform: handleTransform(item),
              backgroundColor: item?.background?.color,
              borderWidth: `${item?.border?.width}px`,
              borderColor: `${item?.border?.color}`,
              borderRadius: `${item?.border?.radius}px`,
              overflow: 'hidden',
            }}
            ref={targetRef}
          >
            {anno?.pattern === 'crossedLines' && (
              <svg
                width={item.size.width}
                height={item.size.height}
                xmlns='http://www.w3.org/2000/svg'
              >
                <defs>
                  <pattern
                    id={`${item.id}-diagonalHatch`}
                    width={item.patternSpacing}
                    height={item.patternSpacing}
                    patternTransform={`rotate(${item?.patternAngle || 0} 0 0)`}
                    patternUnits='userSpaceOnUse'
                  >
                    <line
                      x1='0'
                      y1='0'
                      x2='0'
                      y2={item.patternSpacing}
                      stroke={item?.patternColor || 'black'}
                      strokeWidth='1'
                    />
                  </pattern>
                </defs>
                <rect
                  width={item.size.width}
                  height={item.size.height}
                  fill={`url(#${`${item.id}-diagonalHatch`})`}
                />
              </svg>
            )}
          </div>
          <Moveable
            transform={handleTransform(item)}
            ref={moveableRef}
            target={targetRef}
            draggable={true}
            resizable={true}
            rotatable={true}
            onRender={(e) => {
              e.target.style.cssText += e.cssText;
            }}
            onRoundEnd={(e) => {
              const borderRadius = handleRoundEnd(e);
              borderRadius &&
                setAnno({
                  ...anno,
                  border: {
                    ...anno?.border,
                    radius: borderRadius,
                  },
                });
            }}
            onDragEnd={(e) => {
              const position = handleDragEnd(e);
              position && setAnno({ ...anno, position });
            }}
            onResizeEnd={(e) => {
              const size = handleResizeEnd(e);
              setAnno({ ...anno, size });
            }}
            onRotateEnd={(e) => {
              const rotation = handleRotateEnd(e);
              setAnno({ ...anno, rotation });
            }}
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
            throttleResize={1}
            renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
            throttleRotate={0}
            rotationPosition={'top'}
            snapRotationDegrees={[0, 45, 90, 135, 180, 225, 270, 315]}
          />
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: handleTransform(item),
            width: `${item?.size?.width}px`,
            height: `${item?.size?.height}px`,
            backgroundColor: item?.background?.color,
            borderWidth: `${item?.border?.width}px`,
            borderColor: `${item?.border?.color}`,
            borderRadius: `${item?.border?.radius}px`,
            overflow: 'hidden',
          }}
        >
          {item?.pattern === 'crossedLines' && (
            <svg
              width={item.size.width}
              height={item.size.height}
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs>
                <pattern
                  id={`${item.id}-diagonalHatch`}
                  width={item.patternSpacing}
                  height={item.patternSpacing}
                  patternTransform={`rotate(${item?.patternAngle || 0} 0 0)`}
                  patternUnits='userSpaceOnUse'
                >
                  <line
                    x1='0'
                    y1='0'
                    x2='0'
                    y2={item.patternSpacing}
                    stroke={item?.patternColor || 'black'}
                    strokeWidth='1'
                  />
                </pattern>
              </defs>
              <rect
                width={item.size.width}
                height={item.size.height}
                fill={`url(#${`${item.id}-diagonalHatch`})`}
              />
            </svg>
          )}
        </div>
      )}
    </>
  );
}
