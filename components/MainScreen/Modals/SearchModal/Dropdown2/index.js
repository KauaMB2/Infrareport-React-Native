import {
  NativeBaseProvider,
  Center,
  Box,
  Select,
  extendTheme,
} from 'native-base';

const theme = extendTheme({
  // Define your custom theme here
});

const Dropdown = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <CustomSelect />
    </NativeBaseProvider>
  );
};

const CustomSelect = () => {
  const [selectedService, setSelectedService] = useState('');

  return (
    <Center style={{backgroundColor: "red", width:"100%", height:"100%"}}>
      <Box maxW="700">
        <Select
          selectedValue={selectedService}
          minWidth="600"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          onValueChange={(itemValue) => setSelectedService(itemValue)}
        >
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />

        </Select>
      </Box>
    </Center>
  );
};

export default Dropdown;
