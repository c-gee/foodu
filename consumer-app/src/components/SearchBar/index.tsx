import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { useEffect } from "react";

export type Props = {
  searched?: string;
  onSubmitEditing: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
};

const SearchBar = ({ searched, onSubmitEditing }: Props) => {
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (!searched) return;

    setSearch(searched);
  }, [searched]);

  return (
    <View className="w-auto flex-1 flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl px-5">
      <Feather
        name="search"
        size={20}
        color="#BDBDBD"
        style={{ paddingHorizontal: 16, marginLeft: -12 }}
      />
      <TextInput
        value={search}
        placeholder="What are you craving?"
        className="text-sm leading-4"
        textAlignVertical="center"
        onChangeText={setSearch}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default SearchBar;
