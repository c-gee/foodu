import { Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Control, Controller, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: any;
  placeholder?: string;
  items: { label: string; value: string }[];
};

const ControlledDropdownPicker = <T extends FieldValues>({
  control,
  name,
  placeholder,
  items
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <Pressable style={{ flex: 1 }}>
            <Picker
              // ref={pickerRef}
              onValueChange={onChange}
              selectedValue={value}
              placeholder={placeholder}
              mode="dialog"
            >
              {items.map((item) => (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </Pressable>
        );
      }}
    />
  );
};

export default ControlledDropdownPicker;
