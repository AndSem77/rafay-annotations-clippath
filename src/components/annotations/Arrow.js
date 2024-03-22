import * as React from 'react';
import Moveable from 'react-moveable';

import { useContext, useRef, useEffect } from 'react';
import { BarrierContext } from '../../context/BarrierContext';
import {
  handleDragEnd,
  handleResizeEnd,
  handleRotateEnd,
  handleRoundEnd,
  handleTransform,
} from './utils';

export default function Arrow({ item }) {
  console.log('item :', item);
  const { anno, setAnno } = useContext(BarrierContext);
  const targetRef = useRef(null);
  const moveableRef = useRef(null);

  return (
    <>
      {item.id === anno?.id ? (
        <>
          {/* <svg
            viewBox={`0 0 ${item.size.width} ${item.size.height}`}
            style={{
              width: item.size.width,
              height: item.size.height,
            }}
            ref={targetRef}
          >
            <line
              x1='0'
              y1={5 + item.size.height / 2}
              x2={0 + item.size.width}
              y2={5 + item.size.height / 2}
              strokeWidth={item.lineWidth}
              stroke={item.background.color}
              ref={targetRef}
              strokeDasharray={item.lineStyle === 'dashed' ? '5,3' : 'none'}
            />
          </svg> */}
          <svg
            viewBox={`0 0 ${item.size.width} ${item.size.height}`}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: item.size.width,
              height: item.size.height,
              transform: handleTransform(item),
            }}
            ref={targetRef}
          >
            {/* Line */}
            <line
              x1='0'
              y1={item.size.height / 2}
              x2={item.size.width}
              y2={item.size.height / 2}
              strokeWidth={item?.lineWidth}
              stroke={item.background.color}
              strokeDasharray={item?.lineStyle === 'dashed' ? '5,3' : 'none'}
            />

            {/* Right Arrow Head filled */}
            {item.rightArrowStyle === 'rightArrowFilled' ? (
              <path
                d={`M${item.size.width - 10},${item.size.height / 2 - 5} L${
                  item.size.width
                },${item.size.height / 2} L${item.size.width - 10},${
                  item.size.height / 2 + 5
                }`}
                fill={item.background.color}
              />
            ) : item.rightArrowStyle === 'rightArrowCircle' ? (
              <circle
                cx={item.size.width - 4}
                cy={item.size.height / 2}
                r={4}
                stroke={item.background.color}
                strokeWidth='1'
                fill={item.background.color}
              />
            ) : item.rightArrowStyle === 'rightArrowLine' ? (
              <>
                <line
                  x1={item.size.width - 10}
                  y1={item.size.height / 2 - 6}
                  x2={item.size.width}
                  y2={item.size.height / 2}
                  strokeWidth={item.lineWidth}
                  stroke={item.background.color}
                />
                <line
                  x1={item.size.width - 10}
                  y1={item.size.height / 2 + 6}
                  x2={item.size.width}
                  y2={item.size.height / 2}
                  strokeWidth={item.lineWidth}
                  stroke={item.background.color}
                />
              </>
            ) : (
              <></>
            )}

            {item.leftArrowStyle === 'leftArrowFilled' ? (
              <path
                d={`M10,${item.size.height / 2 - 5} L0,${
                  item.size.height / 2
                } L10,${item.size.height / 2 + 5}`}
                fill={item.background.color}
              />
            ) : item.leftArrowStyle === 'leftArrowLine' ? (
              <>
                <line
                  x1='10'
                  y1={item.size.height / 2 - 6}
                  x2='0'
                  y2={item.size.height / 2}
                  strokeWidth={item.lineWidth}
                  stroke={item.background.color}
                />
                <line
                  x1='10'
                  y1={item.size.height / 2 + 6}
                  x2='0'
                  y2={item.size.height / 2}
                  strokeWidth={item.lineWidth}
                  stroke={item.background.color}
                />
              </>
            ) : item.leftArrowStyle === 'leftArrowCircle' ? (
              <circle
                cx={4.5}
                cy={item.size.height / 2}
                r={4}
                stroke={item.background.color}
                strokeWidth='1'
                fill={item.background.color}
              />
            ) : (
              <></>
            )}
          </svg>

          <Moveable
            transformOrigin={handleTransform(item)}
            transform={handleTransform(item)}
            ref={moveableRef}
            target={targetRef}
            draggable={true}
            rotatable={true}
            scalable={true}
            resizable={true}
            onRender={(e) => {
              console.log('e.cssText :', e.cssText);
              e.target.style.cssText += e.cssText;
            }}
            onDragEnd={(e) => {
              const position = handleDragEnd(e);
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
        <>
          {/* <svg
            viewBox={`0 0 ${item.size.width} ${item.size.height}`}
            style={{
              width: item.size.width,
              height: item.size.height,
            }}
            ref={targetRef}
          >
            <line
              x1='0'
              y1={5 + item.size.height / 2}
              x2={0 + item.size.width}
              y2={5 + item.size.height / 2}
              strokeWidth={item.lineWidth}
              stroke={item.background.color}
              ref={targetRef}
              strokeDasharray={item.lineStyle === 'dashed' ? '5,3' : 'none'}
            />
          </svg> */}
          <svg
            viewBox={`0 0 ${item.size.width} ${item.size.height}`}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: item.size.width,
              height: item.size.height,
              transform: handleTransform(item),
            }}
            ref={targetRef}
          >
            {/* Line */}
            <line
              x1='0'
              y1={item.size.height / 2}
              x2={item.size.width}
              y2={item.size.height / 2}
              strokeWidth={item?.lineWidth}
              stroke={item.background.color}
              strokeDasharray={item?.lineStyle === 'dashed' ? '5,3' : 'none'}
            />

            {/* Right Arrow Head filled */}
            {item.rightArrowStyle === 'rightArrowFilled' ? (
              <path
                d={`M${item.size.width - 10},${item.size.height / 2 - 5} L${
                  item.size.width
                },${item.size.height / 2} L${item.size.width - 10},${
                  item.size.height / 2 + 5
                }`}
                fill={item.background.color}
              />
            ) : item.rightArrowStyle === 'rightArrowCircle' ? (
              <circle
                cx={item.size.width - 4}
                cy={item.size.height / 2}
                r={4}
                stroke={item.background.color}
                strokeWidth='1'
                fill={item.background.color}
              />
            ) : item.rightArrowStyle === 'rightArrowLine' ? (
              <>
                <line
                  x1={item.size.width - 10}
                  y1={item.size.height / 2 - 6}
                  x2={item.size.width}
                  y2={item.size.height / 2}
                  strokeWidth={item.lineWidth}
                  stroke={item.background.color}
                />
                <line
                  x1={item.size.width - 10}
                  y1={item.size.height / 2 + 6}
                  x2={item.size.width}
                  y2={item.size.height / 2}
                  strokeWidth={item.lineWidth}
                  stroke={item.background.color}
                />
              </>
            ) : (
              <></>
            )}

            {item.leftArrowStyle === 'leftArrowFilled' ? (
              <path
                d={`M10,${item.size.height / 2 - 5} L0,${
                  item.size.height / 2
                } L10,${item.size.height / 2 + 5}`}
                fill={item.background.color}
              />
            ) : item.leftArrowStyle === 'leftArrowLine' ? (
              <>
                <line
                  x1='10'
                  y1={item.size.height / 2 - 6}
                  x2='0'
                  y2={item.size.height / 2}
                  strokeWidth={item.lineWidth}
                  stroke={item.background.color}
                />
                <line
                  x1='10'
                  y1={item.size.height / 2 + 6}
                  x2='0'
                  y2={item.size.height / 2}
                  strokeWidth={item.lineWidth}
                  stroke={item.background.color}
                />
              </>
            ) : item.leftArrowStyle === 'leftArrowCircle' ? (
              <circle
                cx={4.5}
                cy={item.size.height / 2}
                r={4}
                stroke={item.background.color}
                strokeWidth='1'
                fill={item.background.color}
              />
            ) : (
              <></>
            )}
          </svg>
        </>
      )}
    </>
  );
}
