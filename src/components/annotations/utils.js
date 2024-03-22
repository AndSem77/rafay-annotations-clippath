export const transformArrToVals = (translateArr, rotation) => {
  const [x, y, scale] = translateArr;

  return {
    position: {
      x,
      y,
    },
    rotation,
    scale,
  };
};

export const handleTransform = ({ position, rotation }) => {
  return `translate(${position.x}px, ${position.y}px) rotate(${
    rotation || 0
  }deg)`;
};

export const handleDragEnd = (e) => {
  try {
    const {
      lastEvent: { translate },
    } = e;
    const [x, y] = translate;

    return { x, y };
  } catch (err) {
    return false;
  }
};

export const handleResizeEnd = (e) => {
  const { width, height } = e.moveable.state;
  return { width, height };
};

export const handleRotateEnd = (e) => {
  return parseInt(e.lastEvent.rotation);
};

export const handleRoundEnd = (e) => {
  console.log(e.lastEvent);
  return e.lastEvent.borderRadius;
};
