import { useContext, useEffect, useRef } from 'react';
import { BarrierContext } from '../../context/BarrierContext';
import TextareaAutosize from 'react-textarea-autosize';
import Moveable from 'react-moveable';
import {
  handleDragEnd,
  handleResizeEnd,
  handleRotateEnd,
  handleTransform,
} from './utils';

export default function Text({ item }) {
  const { anno, setAnno } = useContext(BarrierContext);
  console.log('anno :', anno);

  const targetRef = useRef(null);
  const moveableRef = useRef(null);
  console.log('item :', item);

  const textareaRef = useRef(null); // Create a ref for the textarea

  useEffect(() => {
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []); // Run this effect only once, when the component mounts

  return (
    <>
      {item.id === anno?.id ? (
        <>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: item?.size?.width,
              height: item?.size?.height,
              transform: handleTransform(item),
              fontSize: item?.fontSize,
              fontWeight: item?.fontWeight,
              fontFamily: item?.fontFamily,
            }}
            ref={targetRef}
          >
            {/* <textarea
              className="h-full w-full"
              onClick={(e) => {
                e.stopPropagation();
              }}
            /> */}
            <TextareaAutosize
              ref={textareaRef} // Assign the ref to the textarea
              placeholder='Text'
              autoFocus={true}
              onDoubleClick={() => {
                textareaRef.current.focus();
              }}
              value={anno.content}
              // autoFocus={true}
              className='resize-none overflow-y-auto scrollbar-hide min-h-[100%] w-[100%] max-h-[100%]'
              onChange={(e) => {
                setAnno({ ...anno, content: e.target.value });
              }}
              style={{
                background: item.background.color || 'transparent',
                color: item.border.color || 'black',
              }}
            />
          </div>
          <Moveable
            transformOrigin={handleTransform(item)}
            transform={handleTransform(item)}
            className='bg-[#ddd]'
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
            throttleResize={1}
            renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
            rotatable={true}
            throttleRotate={0}
            rotationPosition={'top'}
            snapRotationDegrees={[0, 45, 90, 135, 180, 225, 270, 315]}
            onRender={(e) => {
              console.log('e.cssText :', e.cssText);
              e.target.style.cssText += e.cssText;
            }}
            onDragEnd={(e) => {
              const data = handleDragEnd(e);
              console.log('data :', data);
              data && setAnno({ ...anno, position: data });
            }}
            onResizeEnd={(e) => {
              const size = handleResizeEnd(e);
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
            left: 0,
            top: 0,
            width: item?.size?.width,
            height: item?.size?.height,
            transform: handleTransform(item),
            fontSize: item?.fontSize,
            fontWeight: item?.fontWeight,
            fontFamily: item?.fontFamily,
            overflow: 'hidden',
          }}
        >
          <TextareaAutosize
            className='resize-none overflow-y-auto scrollbar-hide text-wrap'
            placeholder='Text'
            value={item?.content}
            style={{
              background: item.background?.color || 'transparent',
              color: item.border?.color || 'black',
            }}
          />
        </div>
      )}
    </>
  );
}
