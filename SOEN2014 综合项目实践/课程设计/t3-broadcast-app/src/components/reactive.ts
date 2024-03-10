import {
  Checkbox,
  Input,
  RadioGroup,
  Switch,
  Tabs,
  Textarea,
} from '@chakra-ui/react';
import { reactive } from 'react-reactive-hooks';

import SearchInput from './SearchInput';

const Reactive = {
  Checkbox: reactive(Checkbox, ['isChecked'], (model) => ({
    onChange: (e) => {
      model.value = e.target.checked;
    },
  })),

  Input: reactive(Input, ['value'], (model) => ({
    onChange: (e) => {
      model.value = e.target.value;
    },
  })),

  RadioGroup: reactive(RadioGroup, ['value'], (model) => ({
    onChange: (value) => {
      model.value = value;
    },
  })),

  SearchInput: reactive(SearchInput, ['value'], (model) => ({
    onChange: (e) => {
      model.value = e.target.value;
    },
  })),

  Switch: reactive(Switch, ['isChecked'], (model) => ({
    onChange: (e) => {
      model.value = e.target.checked;
    },
  })),

  Tabs: reactive(Tabs, ['index'], (model) => ({
    onChange: (index) => {
      model.value = index;
    },
  })),

  Textarea: reactive(Textarea, ['value'], (model) => ({
    onChange: (e) => {
      model.value = e.target.value;
    },
  })),
};

export default Reactive;
