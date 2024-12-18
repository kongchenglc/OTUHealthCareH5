'use client';
/*eslint-disable*/

// import Link from '@/components/link/Link';
import MessageBoxChat from '@/components/MessageBox';
import {
  Button,
  Flex,
  Icon,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdAutoAwesome, MdPerson } from 'react-icons/md';
// import Bg from '../public/img/chat/bg-image.png';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Chat() {
  // Input States
  const [inputOnSubmit, setInputOnSubmit] = useState<string>('');
  const [inputCode, setInputCode] = useState<string>('');
  // Response message
  const [outputCode, setOutputCode] = useState<string>('');
  // ChatGPT model
  // const [model, setModel] = useState<OpenAIModel>('gpt-4o');
  // Loading state
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = new URLSearchParams(window.location.search);

  // API Key
  // const [apiKey, setApiKey] = useState<string>(apiKeyApp);
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const inputColor = useColorModeValue('navy.700', 'white');
  // const iconColor = useColorModeValue('brand.500', 'white');
  // const bgIcon = useColorModeValue(
  //   'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)',
  //   'whiteAlpha.200',
  // );
  const brandColor = useColorModeValue('brand.500', 'white');
  // const buttonBg = useColorModeValue('white', 'whiteAlpha.100');
  // const gray = useColorModeValue('gray.500', 'white');
  // const buttonShadow = useColorModeValue(
  //   '14px 27px 45px rgba(112, 144, 176, 0.2)',
  //   'none',
  // );
  const textColor = useColorModeValue('navy.700', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' },
  );
  const handleTranslate = async () => {
    // let apiKey = localStorage.getItem('apiKey');
    setInputOnSubmit(inputCode);

    // Chat post conditions(maximum number of characters, valid message etc.)
    const maxCodeLength = 700;
    // const maxCodeLength = model === 'gpt-4o' ? 700 : 700;

    // if (!apiKey?.includes('sk-')) {
    //   alert('Please enter an API key.');
    //   return;
    // }

    if (!inputCode) {
      alert('Please enter your message.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
      );
      return;
    }
    setOutputCode('');
    setLoading(true);
    // const controller = new AbortController();
    // const body: ChatBody = {
    //   inputCode,
    //   model,
    //   apiKey,
    // };

    // -------------- Fetch --------------
    const response = await fetch(`${apiBaseUrl}/chat?message=${encodeURI(inputCode)}&email=${searchParams?.get('email') ?? ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((e) => {
      setLoading(false);
      console.error(e)
      return;
    });

    const data = response?.body;

    setLoading(false);
    if (!data) {
      alert(
        'Something went wrong went fetching from the API. Make sure to use a valid API key.',
      );
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setInputCode('');
  };
  // -------------- Copy Response --------------
  // const copyToClipboard = (text: string) => {
  //   const el = document.createElement('textarea');
  //   el.value = text;
  //   document.body.appendChild(el);
  //   el.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(el);
  // };

  // *** Initializing apiKey with .env.local value
  // useEffect(() => {
  // ENV file verison
  // const apiKeyENV = process.env.NEXT_PUBLIC_OPENAI_API_KEY
  // if (apiKey === undefined || null) {
  //   setApiKey(apiKeyENV)
  // }
  // }, [])

  const handleChange = (Event: any) => {
    setInputCode(Event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTranslate();
    }
  };

  return (
    <Flex
      w="100%"
      pt={{ base: '70px', md: '0px' }}
      direction="column"
      position="relative"
    >
      <Flex
        direction="column"
        mx="auto"
        w={{ base: '100%', md: '100%', xl: '100%' }}
        minH={{ base: '75vh', '2xl': '85vh' }}
        maxW="1000px"
      >
        <Flex
          direction="column"
          w="100%"
          mx="auto"
          minH="75vh"
          display={!!outputCode ? 'flex' : 'none'}
          mb={'auto'}
        >
          <Flex w="100%" align="flex-start" mb="10px">
            <Flex
              borderRadius="full"
              justify="center"
              align="center"
              bg={'transparent'}
              border="1px solid"
              borderColor={borderColor}
              me="20px"
              h="40px"
              // minH="40px"
              minW="40px"
              mt="22px"
            >
              <Icon
                as={MdPerson}
                width="20px"
                height="20px"
                color={brandColor}
              />
            </Flex>
            <Flex
              p="22px"
              // border="1px solid"
              // borderColor={borderColor}
              // borderRadius="14px"
              w="100%"
              zIndex={'2'}
            >
              <Text
                color={textColor}
                fontWeight="600"
                fontSize={{ base: 'sm', md: 'md' }}
                minH={24}
                lineHeight={{ base: '24px', md: '26px' }}
                margin={0}
                wordBreak="break-all"
                textAlign="left"
              >
                {inputOnSubmit}
              </Text>
              {/* <Icon
                cursor="pointer"
                as={MdEdit}
                ms="auto"
                width="20px"
                // height="20px"
                color={gray}
              /> */}
            </Flex>
          </Flex>
          <Flex w="100%">
            <Flex
              borderRadius="full"
              justify="center"
              align="center"
              bg={'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'}
              me="20px"
              h="40px"
              minH="40px"
              minW="40px"
            >
              <Icon
                as={MdAutoAwesome}
                width="20px"
                height="20px"
                color="white"
              />
            </Flex>
            <MessageBoxChat output={outputCode} />
          </Flex>
        </Flex>
        {/* Chat Input */}
        <Flex
          ms={{ base: '0px', xl: '60px' }}
          mt="20px"
          justifySelf={'flex-end'}
        >
          <Input
            value={inputCode}
            flex={1}
            // minH="54px"
            // h="100%"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="45px"
            p="15px 20px"
            me="10px"
            fontSize="sm"
            fontWeight="500"
            _focus={{ borderColor: 'none' }}
            color={inputColor}
            _placeholder={placeholderColor}
            placeholder="Type your message here..."
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="primary"
            py="20px"
            px="16px"
            fontSize="sm"
            borderRadius="45px"
            ms="auto"
            w={{ base: '160px', md: '210px' }}
            h="54px"
            _hover={{
              boxShadow:
                '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
              bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
              _disabled: {
                bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              },
            }}
            onClick={handleTranslate}
            isLoading={loading ? true : false}
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
