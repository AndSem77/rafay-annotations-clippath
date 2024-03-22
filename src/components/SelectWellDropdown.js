import { useContext, useRef, useState, useEffect } from 'react';
import {
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { BarrierContext } from '../context/BarrierContext';

export default function SelectWellDropdown() {
  const {
    handleUpdate,
    searchWell,
    setSearchWell,
    filteredWells,
    selectedWell,
    setSelectedWell,
  } = useContext(BarrierContext);
  const [showDropdown, setShowDropdown] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue('searchWell', selectedWell);
  }, [selectedWell]);

  return (
    <form>
      <Popup
        trigger={
          <Flex w='full'>
            <InputGroup
              size='sm'
              borderRadius='5px'
              onClick={() => setShowDropdown(true)}
            >
              <Input
                placeholder='Select well'
                borderRadius='5px'
                {...register('searchWell', {
                  onChange: (e) => setSearchWell(e.target.value),
                })}
              />
              <InputRightElement w='3rem'>
                <SmallCloseIcon
                  onClick={() => {
                    setSearchWell('');
                    setSelectedWell('');
                  }}
                />
                <ChevronDownIcon ml={2} />
              </InputRightElement>
            </InputGroup>
          </Flex>
        }
      >
        {showDropdown ? (
          <div className='flex flex-col bg-white border w-[203px] h-[160px] overflow-y-auto scrollbar-hide rounded-md '>
            {filteredWells?.map((item) => (
              <div
                key={item.id}
                className='hover:bg-[#EDF2F7] px-3 py-1 cursor-pointer'
                onClick={() => {
                  setSelectedWell(item?.name);
                  setShowDropdown(false);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        ) : null}
      </Popup>
      <Flex w='full' justify='end' mt={3}>
        <Button
          variant='solid'
          colorScheme='blue'
          size='sm'
          w='70px'
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Flex>
    </form>
  );
}
