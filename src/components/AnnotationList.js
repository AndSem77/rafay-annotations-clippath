import { useContext, useState } from 'react';
import { BarrierContext } from '../context/BarrierContext';
import AnnotationItem from './AnnotationItem';
import { useKeyPress } from 'ahooks';
import { nanoid } from 'nanoid';

export default function AnnotationList() {
  const { annotations, setAnnotations, anno, setAnno } =
    useContext(BarrierContext);

  const [annoCopy, setAnnoCopy] = useState(null);

  useKeyPress(['meta.c'], () => {
    if (anno) {
      setAnnoCopy((prev) => ({ ...prev, ...anno }));
    }
  });

  useKeyPress(['meta.v'], () => {
    if (annoCopy) {
      const annoCopyWithNewId = {
        ...annoCopy,
        id: nanoid(),
        position: {
          x: annoCopy?.position?.x + 25,
          y: annoCopy?.position?.y + 25,
        },
      };
      setAnnotations((prev) => [...prev, annoCopyWithNewId]);
    }
  });

  useKeyPress(['ctrl.c'], () => {
    if (anno) {
      setAnnoCopy((prev) => ({ ...prev, ...anno }));
    }
  });

  useKeyPress(['ctrl.v'], () => {
    if (annoCopy) {
      const annoCopyWithNewId = {
        ...annoCopy,
        id: nanoid(),
        position: {
          x: annoCopy?.position?.x + 25,
          y: annoCopy?.position?.y + 25,
        },
      };
      setAnnotations((prev) => [...prev, annoCopyWithNewId]);
    }
  });

  useKeyPress([37], () => {
    setAnno((prev) => ({
      ...prev,
      ...anno,
      position: {
        x: anno?.position?.x - 5,
        y: anno?.position?.y,
      },
    }));
  });
  useKeyPress([38], () => {
    setAnno((prev) => ({
      ...prev,
      ...anno,
      position: {
        x: anno?.position?.x,
        y: anno?.position?.y - 5,
      },
    }));
  });
  useKeyPress([39], () => {
    setAnno((prev) => ({
      ...prev,
      ...anno,
      position: {
        x: anno?.position?.x + 5,
        y: anno?.position?.y,
      },
    }));
  });
  useKeyPress([40], () => {
    setAnno((prev) => ({
      ...prev,
      ...anno,
      position: {
        x: anno?.position?.x,
        y: anno?.position?.y + 5,
      },
    }));
  });

  return (
    <>
      {annotations?.map((item) => {
        return (
          <AnnotationItem
            item={item}
            key={item?.id}
            onClick={(prev) => setAnno({ ...prev, ...item })}
          />
        );
      })}
    </>
  );
}
