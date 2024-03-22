import {
  Flex,
  Image,
  Button,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';

import { CloseIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const navbarBg = useColorModeValue('white', 'gray.800');
  return (
    <Flex
      pos='absolute'
      h={12}
      top={0}
      left={0}
      w='full'
      borderBottomWidth='1px'
      align='center'
      justify='space-between'
      bg={navbarBg}
    >
      <Flex w='full' align='center'>
        <Image
          width='64px'
          height='28px'
          src='/aem-logo.png'
          mx={4}
          _hover={{ cursor: 'pointer' }}
        />
        <Button variant='unstyled'>Well Barrier</Button>
      </Flex>

      <IconButton
        variant='outline'
        aria-label='Close'
        icon={<CloseIcon />}
        colorScheme='blue'
        size='sm'
        mr={4}
      />
    </Flex>
  );
}
