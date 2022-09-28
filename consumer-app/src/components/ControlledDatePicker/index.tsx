import { Text, ViewStyle, Pressable, Platform } from "react-native";
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
  const [date, setDate] = useState<Date | null>(
    initialDate ? new Date(initialDate) : null
  );
  const [showCalender, setShowCalender] = useState(
    Platform.OS === "ios" ? true : false
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: hookFormOnChange } }) => {
        return (
          <Pressable
            className="flex-1 flex-row justify-start items-center"
            onPress={() => setShowCalender(true)}
          >
            <Text className={textStyle}>{placeholder}</Text>
            {Platform.OS === "android" && (
              <Text
                className={textStyle}
                style={{
                  marginLeft: 15,
                  color: "#212121"
                }}
              >
                {date && date.toLocaleDateString("en-MY")}
              </Text>
            )}
            {showCalender && (
              <DateTimePicker
                display="default"
                value={date || new Date()}
                onChange={(_, selectedDate) => {
                  setShowCalender(Platform.OS === "ios" ? true : false);
                  setDate(selectedDate || new Date());
                  hookFormOnChange(selectedDate);
                }}
                mode="date"
                style={{
                  flex: 1
                }}
              />
            )}
          </Pressable>
        );
      }}
    />
  );
};

export default ControlledDatePicker;
