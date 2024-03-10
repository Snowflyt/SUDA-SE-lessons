import { SearchIcon } from '@chakra-ui/icons';
import {
  InputGroup,
  InputLeftElement,
  Input,
  type InputProps,
} from '@chakra-ui/react';

const SearchInput: React.FC<InputProps> = (props) => {
  return (
    <InputGroup>
      <InputLeftElement className="mt-[-0.15rem]" pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input pl="9" rounded="base" size="sm" {...props} />
    </InputGroup>
  );
};

export default SearchInput;
