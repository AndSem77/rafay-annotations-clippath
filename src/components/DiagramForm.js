import React, {
  useContext,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from 'react';
import Popup from 'reactjs-popup';
import { useKeyPress } from 'ahooks';

import {
  Flex,
  IconButton,
  Input,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { BarrierContext } from '../context/BarrierContext';
import { initialConfigData } from '../data/initialConfigData';
import AnnotationList from './AnnotationList';
import { useForm, useFieldArray } from 'react-hook-form';
import _ from 'lodash';
// import DiagramSVG from './schematic/DiagramSVG';

import { getRelevantAnnotation } from '../utils/newAnnotations';

const DiagramForm = forwardRef((props, printRef) => {
  const {
    configData,
    setConfigData,
    handleSave,
    setComponent,
    setMultipleElements,
    update,
    setUpdate,
    setColor,
    setCurrentConfig,
    selectedOption,
    setSelectedOption,
    anno,
    setAnno,
    annotations,
    setAnnotations,
  } = useContext(BarrierContext);

  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      configName: configData?.configName,
      barrierElements: configData?.barrierElements,
    },
  });

  const popupRef = useRef();
  const closePopup = () => popupRef.current.close();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'barrierElements',
  });

  const capitalizeFirst = (str) => {
    const words = str.split(' ');

    const capWords = words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(' ');

    return capWords;
  };

  const barrierElements = watch('barrierElements');

  useEffect(() => {
    setConfigData((prev) => ({ ...prev, barrierElements }));
  }, [barrierElements]);

  useEffect(() => {
    setValue('barrierElements', configData?.barrierElements);
    setUpdate(false);
  }, [update]);

  useEffect(() => {
    const subscription = watch(({ barrierElements }) => {
      const packer = barrierElements.find(
        (item) => item.name === 'production packer'
      );
      const glm = barrierElements.find(
        (item) => item.name === 'gas lift mandrel'
      );
      const ssd = barrierElements.find(
        (item) => item.name === 'sliding side door'
      );

      setMultipleElements((prev) => ({
        ...prev,
        packerQty: packer?.quantity,
        glmQty: glm?.quantity,
        ssdQty: ssd?.quantity,
      }));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!selectedOption) {
      setAnno(null);
      return;
    }

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (selectedOption) {
      const newAnnotation = getRelevantAnnotation(selectedOption, x, y);
      setAnnotations((prev) => [...prev, newAnnotation]);
      setSelectedOption(null);
    }
  };

  // console.log('all annos', annotations);

  return (
    <form
      id='diagramForm'
      onSubmit={handleSubmit(handleSave)}
      autoComplete='off'
    >
      <Flex w='640px' flexDir='column'>
        <Flex w='640px' justify='space-between' overflowY zIndex={40} mb={3}>
          <Button
            variant='solid'
            colorScheme='blue'
            size='sm'
            type='submit'
            form='diagramForm'
          >
            Save Diagram
          </Button>
          <IconButton
            variant='outline'
            size='xs'
            aria-label='Close diagram'
            icon={<SmallCloseIcon />}
            onClick={() => {
              setConfigData(initialConfigData);
              setComponent(null);
              setCurrentConfig(null);
              setAnnotations([]);
            }}
          />
        </Flex>
      </Flex>
      <div ref={printRef} id='diagram' onClick={handleClick}>
        <div
          // ref={drop}
          className='flex flex-col w-full h-[1040px] border overflow-y-auto scrollbar-hide'
        >
          <div className='p-2 border-b'>
            <Input
              placeholder='Diagram Name'
              variant='unstyled'
              textAlign='center'
              className='font-bold'
              {...register('configName', {
                required: true,
              })}
            />
          </div>
          <div
            className='grid grid-cols-12 w-full h-full'
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            {/* diagram container */}
            <div className='relative col-span-6 m-4 flex justify-center snapContainer border'>
              <AnnotationList />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
});

export default DiagramForm;
