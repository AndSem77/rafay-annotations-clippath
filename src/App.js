import { useContext, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import {
  Flex,
  IconButton,
  HStack,
  Button,
  useColorModeValue,
  Stack,
  Image,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';
import { BsPrinterFill } from 'react-icons/bs';
import ReactToPrint from 'react-to-print';
import { BarrierContext } from './context/BarrierContext';
import DiagramList from './components/ConfigList';
import { nanoid } from 'nanoid';
import _ from 'lodash';
import { PiFilePngFill } from 'react-icons/pi';
import { PiTextTFill } from 'react-icons/pi';
import { MdEdit } from 'react-icons/md';
import DesignPanel from './components/DesignPanel';
import Popup from 'reactjs-popup';
import SelectWellDropdown from './components/SelectWellDropdown';
import ConfigHistory from './components/ConfigHistory';
import DiagramForm from './components/DiagramForm';
import { annotationMenu } from './data/annotationMenu';
import { IoMdCheckmark } from 'react-icons/io';

function App() {
  const {
    configData,
    setConfigData,
    resetBarriers,
    component,
    setComponent,
    getConfigHistory,
    previewCdft,
    setCdft,
    selectedOption,
    setSelectedOption,
  } = useContext(BarrierContext);

  const componentRef = useRef();
  const buttonsBg = useColorModeValue('white', 'gray.800');

  const renderComponent = (component) => {
    switch (component) {
      case 'diagram':
        return <DiagramForm ref={componentRef} />;
        break;
      case 'config history':
        return <ConfigHistory ref={componentRef} />;
        break;
      default:
        return null;
    }
  };

  return (
    <Flex w='100vw' h='100vh'>
      <Navbar />
      {/* buttons start */}
      <Flex
        pos='absolute'
        top={12}
        left='0'
        w='full'
        borderBottomWidth='1px'
        h={12}
        align='center'
        zIndex={998}
        bg={buttonsBg}
        justify='space-between'
      >
        <Flex justify='space-between' align='center'>
          <Flex w='360px'>
            <Flex w='full' align='center' justify='space-between'>
              <HStack spacing='16px' ml={2}>
                <IconButton
                  mr={6}
                  variant='outline'
                  colorScheme='blue'
                  size='sm'
                  icon={<AddIcon />}
                  onClick={() => {
                    setConfigData({ id: nanoid(), ...configData });
                    setComponent('diagram');
                  }}
                />

                <IconButton
                  variant='outline'
                  colorScheme='blue'
                  size='sm'
                  icon={<PiTextTFill />}
                  onClick={() => {
                    setSelectedOption('Text');
                  }}
                />

                <Popup
                  trigger={
                    <IconButton
                      variant='outline'
                      colorScheme='blue'
                      size='sm'
                      icon={<MdEdit />}
                    />
                  }
                >
                  <div className='w-36 border-r bg-white border rounded-md'>
                    {annotationMenu?.map((item) => (
                      <div
                        className='flex justify-between items-center hover:bg-[#EDF2F7]'
                        key={item.type}
                        onClick={() => setSelectedOption(item.type)}
                      >
                        <div className='w-full flex items-center justify-start text-xs px-3 py-1 cursor-pointer '>
                          <div>
                            <Image src={item.imageURL} boxSize={4} mr={3} />
                          </div>
                          <div>
                            <p>{_.upperFirst(item.type)}</p>
                          </div>
                        </div>
                        {item.type === selectedOption ? (
                          <IoMdCheckmark className='mr-2' />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </Popup>

                <IconButton
                  variant='outline'
                  colorScheme='blue'
                  size='sm'
                  icon={<PiFilePngFill />}
                />

                <ReactToPrint
                  trigger={() => (
                    <IconButton
                      variant='outline'
                      colorScheme='blue'
                      size='sm'
                      icon={<BsPrinterFill />}
                    />
                  )}
                  content={() => componentRef.current}
                />
              </HStack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* buttons end */}

      {/* main start */}
      <Flex w='full' justify='space-between'>
        {/* left sidebar start */}
        <Flex
          minW='220px'
          h='100vh'
          borderRightWidth='1px'
          overflowY
          p={2}
          flexDir='column'
        >
          <div className='mt-[100px]'>
            <SelectWellDropdown />
          </div>

          <div className='overflow-y-auto w-full scrollbar-hide mt-3 mb-3'>
            <DiagramList />
            {/* <Stack mt={6}>
              <Button size='sm' onClick={getConfigHistory}>
                Configuration history
              </Button>
              <Button size='sm' onClick={resetBarriers}>
                Reset barriers
              </Button>
              <Button
                size='sm'
                onClick={() => {
                  previewCdft();
                  setCdft(true);
                }}
              >
                Preview CDFT
              </Button>
              <Button size='sm' onClick={() => setCdft(false)}>
                Reset CDFT
              </Button>
            </Stack> */}
          </div>
        </Flex>
        {/* left sidebar end */}

        <Flex w='640px' h='100vh' overflowY>
          <div className='overflow-y-auto w-full scrollbar-hide mt-[108px] mb-3'>
            {renderComponent(component)}
          </div>
        </Flex>

        {/* right sidebar start */}
        <Flex
          minW='220px'
          h='100vh'
          borderLeftWidth='1px'
          overflowY
          p={2}
          flexDir='column'
        >
          <DesignPanel />
        </Flex>
        {/* right sidebar end */}
      </Flex>

      {/* main end */}
    </Flex>
  );
}

export default App;
