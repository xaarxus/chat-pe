import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react';

const ToggleColorModeBtn = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={() => toggleColorMode()}
      pos='absolute'
      top='0'
      right='0'
      m='1rem'
    >
      {colorMode === 'dark'
        ? <SunIcon color='yellow.200' />
        : <MoonIcon color='blue.600'  />
      }
    </Button>
  );
}

export default ToggleColorModeBtn;
