import { useContext, useRef, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { EditIcon, DeleteIcon, CopyIcon } from '@chakra-ui/icons';
import { nanoid } from 'nanoid';
import { IoMdCheckmark } from 'react-icons/io';
import { BarrierContext } from '../context/BarrierContext';
// import DiagramSVGSmall from './schematic/DiagramSVGSmall';

export default function ConfigItem({ item }) {
  const {
    configData,
    setConfigData,
    handleDelete,
    handleDuplicate,
    setComponent,
  } = useContext(BarrierContext);

  const [multipleElements, setMultipleElements] = useState({
    packerQty: 1,
    glmQty: 0,
    ssdQty: 0,
  });

  const updateMultipleElements = () => {
    const packer = item?.barrierElements.find(
      (item) => item.name === 'production packer'
    );
    const glm = item?.barrierElements.find(
      (item) => item.name === 'gas lift mandrel'
    );
    const ssd = item?.barrierElements.find(
      (item) => item.name === 'sliding side door'
    );

    setMultipleElements((prev) => ({
      ...prev,
      packerQty: packer?.quantity,
      glmQty: glm?.quantity,
      ssdQty: ssd?.quantity,
    }));
  };

  const setColor = (name) => {
    if (item) {
      let el = item?.barrierElements?.find((item) => item?.name === name);

      if (el) {
        if (el.quantity === 0) {
          return 'none';
        } else if (el.barrier === 'primary') {
          return 'blue';
        } else if (el.barrier === 'secondary') {
          return 'red';
        } else if (el.barrier === 'none') {
          return 'black';
        } else {
          return 'none';
        }
      }
    }
  };

  useEffect(() => {
    updateMultipleElements();
  }, [item]);

  return (
    <div
      className='relative w-full h-24 border rounded flex justify-between p-1 space-x-1 my-1 hover:border-sky-600'
      onDoubleClick={() => {
        setComponent(null);
        setConfigData(null);
        setConfigData((prev) => ({ ...prev, ...item }));
        setTimeout(() => setComponent('diagram'), 200);
      }}
    >
      <div className='w-full h-full text-xs'>{item.configName}</div>
      <div className='w-full h-full  flex justify-center'>
        {/* <DiagramSVGSmall
          setColor={setColor}
          multipleElements={multipleElements}
        /> */}
      </div>

      {item?.id === configData?.id ? (
        <div className='absolute bottom-1 right-2'>
          <IoMdCheckmark />
        </div>
      ) : null}

      <div className='h-full justify-start'>
        <Popup
          // ref={popupRef}
          position='bottom center'
          trigger={
            <div className='p-1 cursor-pointer'>
              <BsThreeDotsVertical />
            </div>
          }
        >
          <div className=' bg-white border rounded-md cursor-pointer'>
            <div
              className='flex w-full items-center hover:bg-[#EDF2F7] px-3 py-1'
              onClick={() => {
                setComponent(null);
                setConfigData(null);
                setConfigData((prev) => ({ ...prev, ...item }));
                setTimeout(() => setComponent('diagram'), 200);
              }}
            >
              <EditIcon />
              <div className='ml-2 text-xs'>View & Edit</div>
            </div>
            <div
              className='flex w-full items-center hover:bg-[#EDF2F7] px-3 py-1'
              onClick={() => {
                handleDuplicate(item);
              }}
            >
              <CopyIcon />
              <div className='ml-2 text-xs'>Duplicate</div>
            </div>
            <div
              className='flex w-full items-center hover:bg-[#EDF2F7] px-3 py-1'
              onClick={() => {
                handleDelete(item?.id);
              }}
            >
              <DeleteIcon />
              <div className='ml-2 text-xs'>Delete</div>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}
