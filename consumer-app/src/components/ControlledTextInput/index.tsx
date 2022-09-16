import { TextStyle, TextInput } from "react-native";
import { Control, Controller, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: any;
  placeholder?: string;
  className?: string;
  style?: TextStyle;
};

const ControlledTextInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  className,
  style
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextInput
          className={className}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          style={style}
        />
      )}
    />
  );
};

export default ControlledTextInput;
