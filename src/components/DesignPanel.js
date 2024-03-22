import { useEffect, useContext, useState, useRef } from 'react';
import {
  InputGroup,
  Input,
  InputLeftAddon,
  InputRightAddon,
  Flex,
  Text,
  Divider,
  Select,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { RxAngle } from 'react-icons/rx';
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import { BarrierContext } from '../context/BarrierContext';
import { TbBorderCorners } from 'react-icons/tb';
import { HexColorPicker } from 'react-colorful';
import { IoChevronDownSharp } from 'react-icons/io5';

const leftArrows = [
  {
    id: 1,
    name: 'line',
    svg: (
      <svg
        width='56'
        height='1'
        viewBox='0 0 56 1'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <line y1='0.5' x2='56' y2='0.5' stroke='black' />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'arrow-left-triangle',
    svg: (
      <svg
        width='56'
        height='6'
        viewBox='0 0 56 6'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 3L5 0.113249V5.88675L0 3ZM56 3.5H4.5V2.5H56V3.5Z'
          fill='black'
        />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'arrow-left-line',
    svg: (
      <svg
        width='56'
        height='8'
        viewBox='0 0 56 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0.646446 4.35355C0.451184 4.15829 0.451184 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM56 4.5H1V3.5H56V4.5Z'
          fill='black'
        />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'arrow-left-line',
    svg: (
      <svg
        width='56'
        height='6'
        viewBox='0 0 56 6'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5.66667 3C5.66667 4.47276 4.47276 5.66667 3 5.66667C1.52724 5.66667 0.333332 4.47276 0.333332 3C0.333332 1.52724 1.52724 0.333333 3 0.333333C4.47276 0.333333 5.66667 1.52724 5.66667 3ZM56 3.5H3V2.5H56V3.5Z'
          fill='black'
        />
      </svg>
    ),
  },
];
const rightArrows = [
  {
    id: 1,
    name: 'line',
    svg: (
      <svg
        width='56'
        height='1'
        viewBox='0 0 56 1'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <line y1='0.5' x2='56' y2='0.5' stroke='black' />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'arrow-right-triangle',
    svg: (
      <svg
        width='56'
        height='6'
        viewBox='0 0 56 6'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M56 3L51 0.113249V5.88675L56 3ZM0 3.5H51.5V2.5H0V3.5Z'
          fill='black'
        />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'arrow-right-line',
    svg: (
      <svg
        width='56'
        height='9'
        viewBox='0 0 56 9'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M55.3536 4.85355C55.5488 4.65829 55.5488 4.34171 55.3536 4.14645L52.1716 0.964466C51.9763 0.769204 51.6597 0.769204 51.4645 0.964466C51.2692 1.15973 51.2692 1.47631 51.4645 1.67157L54.2929 4.5L51.4645 7.32843C51.2692 7.52369 51.2692 7.84027 51.4645 8.03553C51.6597 8.2308 51.9763 8.2308 52.1716 8.03553L55.3536 4.85355ZM0 5H55V4H0V5Z'
          fill='black'
        />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'arrow-right-circle',
    svg: (
      <svg
        width='56'
        height='6'
        viewBox='0 0 56 6'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M50.3333 3C50.3333 4.47276 51.5272 5.66667 53 5.66667C54.4728 5.66667 55.6667 4.47276 55.6667 3C55.6667 1.52724 54.4728 0.333333 53 0.333333C51.5272 0.333333 50.3333 1.52724 50.3333 3ZM0 3.5H53V2.5H0V3.5Z'
          fill='black'
        />
      </svg>
    ),
  },
];

export default function DesignPanel() {
  const { anno, setAnno } = useContext(BarrierContext);

  const designPanelRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fontFamily: 'arial',
      fontSize: 14,
      fontWeight: 'normal',
    },
  });

  useEffect(() => {
    setValue('position.x', anno ? anno?.position?.x : 0);
    setValue('position.y', anno ? anno?.position?.y : 0);
    setValue('size.width', anno ? anno?.size?.width : 0);
    setValue('size.height', anno ? anno?.size?.height : 0);
    setValue('rotation', anno ? anno?.rotation : 0);
    setValue('border.radius', anno ? anno?.border?.radius : 0);
    setValue('border.topLeftRadius', anno ? anno?.border?.topLeftRadius : 0);
    setValue('border.topRightRadius', anno ? anno?.border?.topRightRadius : 0);
    setValue(
      'border.bottomRightRadius',
      anno ? anno?.border?.bottomRightRadius : 0
    );
    setValue(
      'border.bottomLeftRadius',
      anno ? anno?.border?.bottomLeftRadius : 0
    );
    setValue('background.color', anno ? anno?.background?.color : '#000000');
    setValue('border.color', anno ? anno?.border?.color : '#000000');
    setValue('border.width', anno ? anno?.border?.width : 1);
    setValue(
      'fontFamily',
      anno && anno.type === 'text' ? anno?.fontFamily : 'arial'
    );
    setValue('fontSize', anno && anno.type === 'text' ? anno?.fontSize : 14);
    setValue(
      'fontWeight',
      anno && anno.type === 'text' ? anno?.fontWeight : 'normal'
    );
  }, [anno]);

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        flexDir='column'
        marginTop={90}
        maxWidth='220px'
        ref={designPanelRef}
      >
        <Grid
          templateColumns='repeat(2, 1fr)'
          templateRows='repeat(4, 1fr)'
          gap={0}
          alignItems='center'
        >
          <GridItem w='100%' colSpan={2}>
            <Text fontSize='12px' px={2} fontWeight='semibold'>
              Position
            </Text>
          </GridItem>

          <GridItem w='100%'>
            <InputGroup size='xs' w='100px' variant='ghost'>
              <InputLeftAddon bgColor={'transparent'} w='28px'>
                X
              </InputLeftAddon>
              <Input
                {...register('position.x', {
                  onChange: (e) => {
                    if (anno) {
                      setAnno({
                        ...anno,
                        position: {
                          ...anno.position,
                          x: +e.target.value,
                        },
                      });
                    }
                  },
                })}
              />
            </InputGroup>
          </GridItem>
          <GridItem w='100%'>
            <InputGroup size='xs' w='100px' variant='ghost'>
              <InputLeftAddon bgColor={'transparent'} w='28px'>
                Y
              </InputLeftAddon>
              <Input
                {...register('position.y', {
                  onChange: (e) => {
                    if (anno) {
                      setAnno({
                        ...anno,
                        position: {
                          ...anno.position,
                          y: +e.target.value,
                        },
                      });
                    }
                  },
                })}
              />
            </InputGroup>
          </GridItem>
          <GridItem w='100%'>
            <InputGroup size='xs' w='100px' variant='ghost'>
              <InputLeftAddon bgColor={'transparent'} w='28px'>
                W
              </InputLeftAddon>
              <Input
                {...register('size.width', {
                  onChange: (e) => {
                    if (anno) {
                      setAnno({
                        ...anno,
                        size: {
                          ...anno.size,
                          width: +e.target.value,
                        },
                      });
                    }
                  },
                })}
              />
            </InputGroup>
          </GridItem>
          <GridItem w='100%'>
            <InputGroup size='xs' w='100px' variant='ghost'>
              <InputLeftAddon bgColor={'transparent'} w='28px'>
                H
              </InputLeftAddon>
              <Input
                {...register('size.height', {
                  onChange: (e) => {
                    if (anno) {
                      setAnno({
                        ...anno,
                        size: {
                          ...anno.size,
                          height: +e.target.value,
                        },
                      });
                    }
                  },
                })}
              />
            </InputGroup>
          </GridItem>
          <GridItem w='100%'>
            <InputGroup size='xs' w='100px' variant='ghost'>
              <InputLeftAddon bgColor={'transparent'} w='28px'>
                <RxAngle className='w-[12px]' />
              </InputLeftAddon>
              <Input
                {...register('rotation', {
                  onChange: (e) => {
                    if (anno) {
                      setAnno({
                        ...anno,
                        rotation: +e.target.value,
                      });
                    }
                  },
                })}
              />
            </InputGroup>
          </GridItem>
          <GridItem w='100%'>
            <Flex align='center'>
              <Popup
                position='bottom center'
                trigger={
                  <div className='mx-[6px]'>
                    <TbBorderCorners className='w-[12px]' />
                  </div>
                }
              >
                <div className='w-[120px] border bg-white rounded'>
                  <Flex w='full'>
                    <InputGroup size='xs' w='100px' variant='ghost'>
                      <InputLeftAddon bgColor={'transparent'} w='24px'>
                        <svg
                          width='17'
                          height='17'
                          viewBox='0 0 17 17'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M1 16.5V10.5C1 4.97715 5.47715 0.5 11 0.5H17'
                            stroke='black'
                          />
                        </svg>
                      </InputLeftAddon>
                      <Input
                        textAlign='center'
                        {...register('border.radius', {
                          onChange: (e) => {
                            if (anno) {
                              setAnno({
                                ...anno,
                                border: {
                                  ...anno.border,
                                  radius: +e.target.value,
                                },
                              });
                            }
                          },
                        })}
                        ml={1}
                      />
                    </InputGroup>
                    <InputGroup size='xs' w='100px' variant='ghost'>
                      <Input
                        textAlign='center'
                        {...register('border.topRightRadius', {
                          onChange: (e) => {
                            if (anno) {
                              setAnno({
                                ...anno,
                                border: {
                                  ...anno.border,
                                  topRightRadius: +e.target.value,
                                },
                              });
                            }
                          },
                        })}
                      />
                      <InputRightAddon bgColor={'transparent'} w='24px'>
                        <svg
                          width='17'
                          height='17'
                          viewBox='0 0 17 17'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M5.96046e-08 0.999999L6 1C11.5228 1 16 5.47715 16 11L16 17'
                            stroke='black'
                          />
                        </svg>
                      </InputRightAddon>
                    </InputGroup>
                  </Flex>
                  <Flex w='full'>
                    <InputGroup size='xs' w='100px' variant='ghost'>
                      <InputLeftAddon bgColor={'transparent'} w='24px'>
                        <svg
                          width='17'
                          height='17'
                          viewBox='0 0 17 17'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M17 16L11 16C5.47715 16 1 11.5228 1 6L0.999999 -9.23872e-07'
                            stroke='black'
                          />
                        </svg>
                      </InputLeftAddon>
                      <Input
                        textAlign='center'
                        {...register('border.bottomLeftRadius', {
                          onChange: (e) => {
                            if (anno) {
                              setAnno({
                                ...anno,
                                border: {
                                  ...anno.border,
                                  bottomLeftRadius: +e.target.value,
                                },
                              });
                            }
                          },
                        })}
                        ml={1}
                      />
                    </InputGroup>
                    <InputGroup size='xs' w='100px' variant='ghost'>
                      <Input
                        textAlign='center'
                        {...register('border.bottomRightRadius', {
                          onChange: (e) => {
                            if (anno) {
                              setAnno({
                                ...anno,
                                border: {
                                  ...anno.border,
                                  bottomRadius: +e.target.value,
                                },
                              });
                            }
                          },
                        })}
                      />
                      <InputRightAddon bgColor={'transparent'} w='24px'>
                        <svg
                          width='17'
                          height='17'
                          viewBox='0 0 17 17'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M16 5.96046e-08L16 6C16 11.5228 11.5228 16 6 16L-9.23872e-07 16'
                            stroke='black'
                          />
                        </svg>
                      </InputRightAddon>
                    </InputGroup>
                  </Flex>
                </div>
              </Popup>
              <Input
                className='ml-[3px]'
                size='xs'
                variant='ghost'
                {...register('border.radius', {
                  onChange: (e) => {
                    if (anno) {
                      setAnno({
                        ...anno,
                        border: {
                          ...anno.border,
                          radius: +e.target.value,
                        },
                      });
                    }
                  },
                })}
              />
            </Flex>
          </GridItem>
        </Grid>

        <Divider my={1} />

        <Grid
          templateColumns='repeat(2, 1fr)'
          templateRows='repeat(3, 1fr)'
          gap={0}
          alignItems='center'
        >
          <GridItem>
            <Text fontSize='12px' px={2} fontWeight='semibold'>
              Text
            </Text>
          </GridItem>
          <GridItem w='100%' colSpan={2}>
            <Select
              size='xs'
              variant='ghost'
              defaultValue='arial'
              {...register('fontFamily', {
                onChange: (e) =>
                  setAnno((prev) => ({
                    ...prev,
                    fontFamily: e.target.value,
                  })),
              })}
            >
              <option value='arial'>Arial</option>
              <option value='times new roman'>Times New Roman</option>
            </Select>
          </GridItem>
          <GridItem w='100%'>
            <Select
              size='xs'
              variant='ghost'
              defaultValue='normal'
              {...register('fontWeight', {
                onChange: (e) =>
                  setAnno((prev) => ({
                    ...prev,
                    fontWeight: e.target.value,
                  })),
              })}
            >
              <option value='normal'>Normal</option>
              <option value='bold'>Bold</option>
            </Select>
          </GridItem>
          <GridItem w='100%'>
            <Select
              size='xs'
              variant='ghost'
              defaultValue='12'
              {...register('fontSize', {
                onChange: (e) =>
                  setAnno((prev) => ({
                    ...prev,
                    fontSize: +e.target.value,
                  })),
              })}
            >
              <option value='8'>8</option>
              <option value='10'>10</option>
              <option value='12'>12</option>
              <option value='14'>14</option>
              <option value='16'>16</option>
              <option value='18'>18</option>
              <option value='20'>20</option>
              <option value='24'>24</option>
              <option value='36'>36</option>
            </Select>
          </GridItem>
        </Grid>

        <Divider my={1} />

        <Grid
          templateColumns='repeat(2, 1fr)'
          templateRows='repeat(6, 1fr)'
          gap={0}
          alignItems='center'
        >
          <GridItem colSpan={2}>
            <Text fontSize='12px' px={2} fontWeight='semibold'>
              Fill
            </Text>
          </GridItem>

          <GridItem>
            <InputGroup size='xs' w='full' variant='ghost'>
              <InputLeftAddon bg='gray.100'>
                <Popup
                  trigger={
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: anno
                          ? anno?.background?.color
                          : '#000000',
                      }}
                    />
                  }
                  position='bottom center'
                >
                  <HexColorPicker
                    color={anno ? anno?.background?.color : '#000000'}
                    onChange={(e) => {
                      if (anno) {
                        setAnno({
                          ...anno,
                          background: {
                            ...anno.background,
                            color: e,
                          },
                        });
                      }
                    }}
                  />
                </Popup>
              </InputLeftAddon>
              <Input
                {...register('background.color', {
                  onChange: (e) => {
                    if (anno) {
                      setAnno({
                        ...anno,
                        background: {
                          ...anno.background,
                          color: e.target.value,
                        },
                      });
                    }
                  },
                })}
              />
            </InputGroup>
          </GridItem>
          <GridItem marginRight={1}>
            <div className='w-full flex justify-end '>
              <span
                className='bg-slate-100 w-6 h-6 flex justify-center items-center'
                onClick={() => {
                  if (anno) {
                    setAnno({
                      ...anno,
                      background: {
                        ...anno.background,
                        color: 'none',
                      },
                    });
                  }
                }}
              >
                <MinusIcon fontSize='xs' />
              </span>
            </div>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize='12px' px={2} fontWeight='semibold'>
              Stroke
            </Text>
          </GridItem>
          <GridItem>
            <InputGroup size='xs' variant='ghost'>
              <InputLeftAddon bg='gray.100'>
                <Popup
                  trigger={
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderColor: anno ? anno?.border?.color : '#000000',
                        borderWidth: '2px',
                      }}
                    />
                  }
                  position='bottom center'
                >
                  <HexColorPicker
                    color={anno ? anno?.border?.color : '#000000'}
                    onChange={(e) => {
                      if (anno) {
                        setAnno({
                          ...anno,
                          border: {
                            ...anno.border,
                            color: e,
                          },
                        });
                      }
                    }}
                  />
                </Popup>
              </InputLeftAddon>
              <Input
                {...register('border.color', {
                  onChange: (e) => {
                    if (anno) {
                      setAnno({
                        ...anno,
                        border: {
                          ...anno.border,
                          color: e.target.value,
                        },
                      });
                    }
                  },
                })}
              />
            </InputGroup>
          </GridItem>
          <GridItem>
            <Select
              size='xs'
              variant='ghost'
              defaultValue='1'
              {...register('border.width', {
                onChange: (e) => {
                  if (anno) {
                    setAnno({
                      ...anno,
                      border: {
                        ...anno.border,
                        width: +e.target.value,
                      },
                    });
                  }
                },
              })}
            >
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </Select>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize='12px' px={2} fontWeight='semibold'>
              Pattern
            </Text>
          </GridItem>

          <GridItem>
            <InputGroup size='xs' w='full' variant='ghost'>
              <InputLeftAddon bg='gray.100'>
                <Popup
                  trigger={
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect width='16' height='16' fill='white' />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M0 6.29289L6.29289 0H7.5C7.5 0.127961 7.45118 0.255922 7.35355 0.353553L0.353553 7.35355C0.255922 7.45118 0.127961 7.5 0 7.5V6.29289ZM0.707107 16H0V15.2929L15.2929 0H16V0.707107L0.707107 16ZM10.2071 16H9C9 15.872 9.04881 15.7441 9.14645 15.6464L15.6464 9.14645C15.7441 9.04881 15.872 9 16 9V10.2071L10.2071 16Z'
                        fill='black'
                      />
                    </svg>
                  }
                  position='bottom center'
                >
                  <div className='w-[100px] bg-slate-50 flex-col'>
                    <div className='p-1 flex justify-center'>
                      <svg
                        width='80'
                        height='16'
                        viewBox='0 0 80 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect width='80' height='16' fill='white' />
                        <path
                          d='M7.5 1L1 7.5'
                          stroke='black'
                          strokeLinecap='round'
                        />
                        <path
                          d='M16.5 1L2.5 15'
                          stroke='black'
                          strokeLinecap='round'
                        />
                        <path
                          d='M25.5 1L11.5 15'
                          stroke='black'
                          strokeLinecap='round'
                        />
                        <path
                          d='M34.5 1L20.5 15'
                          stroke='black'
                          strokeLinecap='round'
                        />
                        <path
                          d='M43.5 1L29.5 15'
                          stroke='black'
                          strokeLinecap='round'
                        />
                        <path
                          d='M52.5 1L38.5 15'
                          stroke='black'
                          strokeLinecap='round'
                        />
                        <path
                          d='M61.5 1L47.5 15'
                          stroke='black'
                          strokeLinecap='round'
                        />
                        <path
                          d='M70.5 1L56.5 15'
                          stroke='black'
                          strokeLinecap='round'
                        />
                        <path
                          d='M79.5 1L65 15.5'
                          stroke='black'
                          strokeLinecap='round'
                        />
                        <path
                          d='M79.5 10L74 15.5'
                          stroke='black'
                          strokeLinecap='round'
                        />
                      </svg>
                    </div>
                    <div className='p-1 flex justify-center'>
                      <svg
                        width='80'
                        height='16'
                        viewBox='0 0 80 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect width='80' height='16' fill='white' />
                        <line
                          x1='5.5769'
                          y1='2'
                          x2='5.5769'
                          y2='7'
                          stroke='black'
                        />
                        <line x1='3' y1='4.5' x2='8' y2='4.5' stroke='black' />
                        <line
                          x1='16.5769'
                          y1='2'
                          x2='16.5769'
                          y2='7'
                          stroke='black'
                        />
                        <line
                          x1='14'
                          y1='4.5'
                          x2='19'
                          y2='4.5'
                          stroke='black'
                        />
                        <line
                          x1='10.5769'
                          y1='9'
                          x2='10.5769'
                          y2='14'
                          stroke='black'
                        />
                        <line
                          x1='8'
                          y1='11.5'
                          x2='13'
                          y2='11.5'
                          stroke='black'
                        />
                        <line
                          x1='22.5769'
                          y1='9'
                          x2='22.5769'
                          y2='14'
                          stroke='black'
                        />
                        <line
                          x1='20'
                          y1='11.5'
                          x2='25'
                          y2='11.5'
                          stroke='black'
                        />
                        <line
                          x1='32.5769'
                          y1='9'
                          x2='32.5769'
                          y2='14'
                          stroke='black'
                        />
                        <line
                          x1='30'
                          y1='11.5'
                          x2='35'
                          y2='11.5'
                          stroke='black'
                        />
                        <line
                          x1='42.5769'
                          y1='9'
                          x2='42.5769'
                          y2='14'
                          stroke='black'
                        />
                        <line
                          x1='40'
                          y1='11.5'
                          x2='45'
                          y2='11.5'
                          stroke='black'
                        />
                        <line
                          x1='53.5769'
                          y1='9'
                          x2='53.5769'
                          y2='14'
                          stroke='black'
                        />
                        <line
                          x1='51'
                          y1='11.5'
                          x2='56'
                          y2='11.5'
                          stroke='black'
                        />
                        <line
                          x1='62.5769'
                          y1='9'
                          x2='62.5769'
                          y2='14'
                          stroke='black'
                        />
                        <line
                          x1='60'
                          y1='11.5'
                          x2='65'
                          y2='11.5'
                          stroke='black'
                        />
                        <line
                          x1='72.5769'
                          y1='9'
                          x2='72.5769'
                          y2='14'
                          stroke='black'
                        />
                        <line
                          x1='70'
                          y1='11.5'
                          x2='75'
                          y2='11.5'
                          stroke='black'
                        />
                        <line
                          x1='27.5769'
                          y1='2'
                          x2='27.5769'
                          y2='7'
                          stroke='black'
                        />
                        <line
                          x1='25'
                          y1='4.5'
                          x2='30'
                          y2='4.5'
                          stroke='black'
                        />
                        <line
                          x1='37.5769'
                          y1='2'
                          x2='37.5769'
                          y2='7'
                          stroke='black'
                        />
                        <line
                          x1='35'
                          y1='4.5'
                          x2='40'
                          y2='4.5'
                          stroke='black'
                        />
                        <line
                          x1='47.5769'
                          y1='2'
                          x2='47.5769'
                          y2='7'
                          stroke='black'
                        />
                        <line
                          x1='45'
                          y1='4.5'
                          x2='50'
                          y2='4.5'
                          stroke='black'
                        />
                        <line
                          x1='57.5769'
                          y1='2'
                          x2='57.5769'
                          y2='7'
                          stroke='black'
                        />
                        <line
                          x1='55'
                          y1='4.5'
                          x2='60'
                          y2='4.5'
                          stroke='black'
                        />
                        <line
                          x1='67.5769'
                          y1='2'
                          x2='67.5769'
                          y2='7'
                          stroke='black'
                        />
                        <line
                          x1='65'
                          y1='4.5'
                          x2='70'
                          y2='4.5'
                          stroke='black'
                        />
                        <line
                          x1='77.5769'
                          y1='2'
                          x2='77.5769'
                          y2='7'
                          stroke='black'
                        />
                        <line
                          x1='75'
                          y1='4.5'
                          x2='80'
                          y2='4.5'
                          stroke='black'
                        />
                      </svg>
                    </div>
                    <div className='p-1 flex justify-center'>
                      <svg
                        width='80'
                        height='16'
                        viewBox='0 0 80 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect width='80' height='16' fill='white' />
                        <circle cx='4' cy='4' r='2' fill='black' />
                        <circle cx='8' cy='12' r='2' fill='black' />
                        <circle cx='76' cy='4' r='2' fill='black' />
                        <circle cx='40' cy='4' r='2' fill='black' />
                        <circle cx='44' cy='12' r='2' fill='black' />
                        <circle cx='13' cy='4' r='2' fill='black' />
                        <circle cx='17' cy='12' r='2' fill='black' />
                        <circle cx='22' cy='4' r='2' fill='black' />
                        <circle cx='26' cy='12' r='2' fill='black' />
                        <circle cx='31' cy='4' r='2' fill='black' />
                        <circle cx='35' cy='12' r='2' fill='black' />
                        <circle cx='67' cy='4' r='2' fill='black' />
                        <circle cx='71' cy='12' r='2' fill='black' />
                        <circle cx='49' cy='4' r='2' fill='black' />
                        <circle cx='53' cy='12' r='2' fill='black' />
                        <circle cx='58' cy='4' r='2' fill='black' />
                        <circle cx='62' cy='12' r='2' fill='black' />
                      </svg>
                    </div>
                  </div>
                </Popup>
              </InputLeftAddon>
            </InputGroup>
          </GridItem>
          <GridItem marginRight={1}>
            <div className='w-full flex justify-end '>
              <span
                className='bg-slate-100 w-6 h-6 flex justify-center items-center'
                onClick={() => alert('remove pattern')}
              >
                <MinusIcon fontSize='xs' />
              </span>
            </div>
          </GridItem>
        </Grid>

        <Divider my={1} />
        <Grid
          templateColumns='repeat(2, 1fr)'
          templateRows='repeat(4, 1fr)'
          gap={0}
          alignItems='center'
        >
          <GridItem colSpan={2}>
            <Text fontSize='12px' px={2} fontWeight='semibold'>
              Line
            </Text>
          </GridItem>
          <GridItem>
            <Select
              size='xs'
              variant='ghost'
              defaultValue='solid'
              {...register('lineStyle')}
            >
              <option value='solid'>Solid</option>
              <option value='dashed'>Dashed</option>
            </Select>
          </GridItem>
          <GridItem>
            <Select
              size='xs'
              variant='ghost'
              defaultValue='12'
              {...register('lineWidth')}
            >
              <option value='8'>1</option>
              <option value='10'>2</option>
              <option value='12'>3</option>
              <option value='14'>4</option>
            </Select>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize='12px' px={2} fontWeight='semibold'>
              Arrow
            </Text>
          </GridItem>
          <GridItem mx={2}>
            <Popup
              trigger={
                <div className='flex w-full items-center justify-between'>
                  <svg
                    width='56'
                    height='6'
                    viewBox='0 0 56 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M0 3L5 0.113249V5.88675L0 3ZM56 3.5H4.5V2.5H56V3.5Z'
                      fill='black'
                    />
                  </svg>
                  <IoChevronDownSharp className='w-[14px]' />
                </div>
              }
            >
              <div className='bg-white border rounded-md space-y-1 w-[80px]'>
                {leftArrows.map((item) => (
                  <div
                    key={item.id}
                    className='h-4 hover:bg-[#EDF2F7] flex items-center justify-center px-3 py-1'
                  >
                    {item.svg}
                  </div>
                ))}
              </div>
            </Popup>
          </GridItem>
          <GridItem mx={2}>
            <Popup
              trigger={
                <div className='flex w-full items-center justify-between'>
                  <svg
                    width='56'
                    height='6'
                    viewBox='0 0 56 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M56 3L51 0.113249V5.88675L56 3ZM0 3.5H51.5V2.5H0V3.5Z'
                      fill='black'
                    />
                  </svg>
                  <IoChevronDownSharp className='w-[14px]' />
                </div>
              }
            >
              <div className='bg-white border rounded-md  space-y-1 w-[80px]'>
                {rightArrows.map((item) => (
                  <div
                    key={item.id}
                    className=' h-4 hover:bg-[#EDF2F7] flex items-center justify-center'
                  >
                    {item.svg}
                  </div>
                ))}
              </div>
            </Popup>
          </GridItem>
        </Grid>
        <Divider my={1} />
        <Grid
          templateColumns='repeat(2, 1fr)'
          templateRows='repeat(4, 1fr)'
          gap={0}
          alignItems='center'
        >
          <GridItem colSpan={2}>
            <Text fontSize='12px' px={2} fontWeight='semibold'>
              Polygon
            </Text>
          </GridItem>
          <GridItem>
            <Text fontSize='12px' px={2}>
              Points
            </Text>
          </GridItem>
          <GridItem>
            <Select
              size='xs'
              variant='ghost'
              defaultValue='3'
              {...register('polygonPoints')}
            >
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
            </Select>
          </GridItem>
        </Grid>
      </Flex>
      {/* <Button type='submit'>Save</Button> */}
    </form>
  );
}
