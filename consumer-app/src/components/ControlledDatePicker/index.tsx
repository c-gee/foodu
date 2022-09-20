import { Text, ViewStyle, Pressable } from "react-native";
import { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: any;
  initialDate?: Date | null;
  placeholder: string;
  textStyle?: string;
  style?: ViewStyle;
};

const ControlledDatePicker = <T extends FieldValues>({
  control,
  name,
  initialDate,
  placeholder,
  textStyle
}: Props<T>) => {
  const [date, setDate] = useState<Date>(
    initialDate ? new Date(initialDate) : new Date()
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <Pressable className="flex-1 flex-row justify-start items-center">
            <Text className={textStyle}>{placeholder}</Text>
            <DateTimePicker
              display="default"
              value={date}
              onChange={(event, selectedDate) => {
                setDate(selectedDate || new Date());
                onChange(selectedDate);
              }}
              mode="date"
              style={{
                flex: 1
              }}
            />
          </Pressable>
        );
      }}
    />
  );
};

export default ControlledDatePicker;
