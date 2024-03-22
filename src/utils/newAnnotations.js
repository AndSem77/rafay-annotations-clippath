import { nanoid } from 'nanoid';

export const getText = (x = 0, y = 0) => {
  return {
    id: nanoid(),
    type: 'text',
    position: {
      x,
      y,
    },
    rotation: 0,
    background: {
      color: 'transparent',
    },
    border: {
      color: 'black',
    },
    fontSize: 14,
    fontFamily: 'arial',
    fontWeight: 'normal',
    content: '',
  };
};

export const getLine = (x = 0, y = 80) => {
  return {
    id: nanoid(),
    type: 'line',
    position: {
      x,
      y,
    },
    rotation: 0,
    size: {
      width: 60,
      height: 10,
    },
    background: {
      color: 'black',
    },
    border: {
      color: 'black',
      width: 1,
      // radius: '10% 30% 50% 70%',
    },
    pattern: 'solid',
    isLocked: true,
    constrainProportions: true,
    lineWidth: 1,
  };
};

export const getArrow = (x = 0, y = 80) => {
  return {
    id: nanoid(),
    type: 'arrow',
    position: {
      x,
      y,
    },
    rotation: 0,
    size: {
      width: 60,
      height: 10,
    },
    background: {
      color: 'black',
    },
    border: {
      color: 'black',
      width: 1,
      // radius: '10% 30% 50% 70%',
    },
    pattern: 'solid',
    isLocked: true,
    constrainProportions: true,
    lineWidth: 1,
    leftArrowStyle: 'line',
    rightArrowStyle: 'rightArrowFilled',
  };
};

export const getRectangle = (x = 0, y = 0) => {
  return {
    id: nanoid(),
    type: 'rectangle',
    position: {
      x,
      y,
    },
    rotation: 0,
    size: {
      width: 60,
      height: 60,
    },
    background: {
      color: 'none',
    },
    border: {
      color: 'black',
      width: 1,
      radius: 0,
    },
    isLocked: true,
    constrainProportions: true,
  };
};

export const getCircle = (x = 0, y = 0) => {
  return {
    id: nanoid(),
    type: 'circle',
    position: {
      x,
      y,
    },
    rotation: 0,
    size: {
      width: 60,
      height: 60,
    },
    background: {
      color: 'none',
    },
    border: {
      color: 'black',
      width: 1,
      radius: 50,
    },
    isLocked: true,
    constrainProportions: true,
  };
};

export const getEllipse = (x = 0, y = 0) => {
  return {
    id: nanoid(),
    type: 'ellipse',
    position: {
      x,
      y,
    },
    rotation: 0,
    size: {
      width: 25,
      height: 60,
    },
    background: {
      color: 'none',
    },
    border: {
      color: 'black',
      width: 1,
      radius: 0,
    },
    isLocked: true,
    constrainProportions: true,
  };
};

export const getPolygon = (x = 0, y = 0) => {
  return {
    id: nanoid(),
    type: 'polygon',
    points: 8,
    position: {
      x,
      y,
    },
    rotation: 0,
    size: {
      width: 60,
      height: 60,
    },
    background: {
      color: 'none',
    },
    border: {
      color: 'black',
      width: 1,
      radius: 0,
    },
    isLocked: true,
    constrainProportions: true,
  };
};

export const getStar = (x = 0, y = 0) => {
  return {
    id: nanoid(),
    type: 'star',
    position: {
      x,
      y,
    },
    rotation: 0,
    size: {
      width: 60,
      height: 60,
    },
    background: {
      color: 'none',
    },
    border: {
      color: 'black',
      width: 1,
      radius: 0,
    },
    isLocked: true,
    constrainProportions: true,
  };
};

const getters = {
  text: getText,
  line: getLine,
  arrow: getArrow,
  rectangle: getRectangle,
  circle: getCircle,
  ellipse: getEllipse,
  polygon: getPolygon,
  star: getStar,
};

export const getRelevantAnnotation = (type, x, y) => {
  // console.log('type :', type);
  // console.log('getters :', getters);
  // console.log(' getters[type] :', getters[type]);
  return getters[type](x, y);
};
