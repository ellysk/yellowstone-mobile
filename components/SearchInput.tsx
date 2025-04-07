import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import Button from "./Button";
import FilterIcon from "./svg/FilterIcon";
import SortIcon from "./svg/SortIcon";
import SearchIcon from "./svg/SearchIcon";
import DismissIcon from "./svg/DismissIcon";

interface SearchInputProps {
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  onClear?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onChangeText,
  value = "",
  placeholder = "Search",
  placeholderTextColor = Colors.text.placeholder,
  onClear,
}) => {
  const [text, setText] = useState(value);

  const handleTextChange = (text: string) => {
    setText(text);
    onChangeText && onChangeText(text);
  };

  const handleClear = () => {
    setText("");
    onClear && onClear();
  };

  return (
    <View className="flex-row gap-x-2 items-center bg-gray-300 rounded-full px-2 h-12">
      <SearchIcon />
      <TextInput
        className="flex-1 h-full font-secondary text-text-main"
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={text}
        onChangeText={handleTextChange}
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <DismissIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

interface SearchSortFilterProps extends SearchInputProps {
  onFilterPress?: () => void;
  onSortPress?: () => void;
}

const SearchSortFilter: React.FC<SearchSortFilterProps> = ({
  onFilterPress,
  onSortPress,
  ...searchInputProps
}) => {
  return (
    <View className="flex-col gap-y-4 items-end">
      <SearchInput {...searchInputProps} />
      <View className="flex-row gap-x-4">
        <Button
          title="Filter"
          variant="secondary"
          iconComponent={FilterIcon}
          onPress={onFilterPress}
        />
        <Button
          title="Sort"
          variant="secondary"
          iconComponent={SortIcon}
          onPress={onSortPress}
        />
      </View>
    </View>
  );
};

export default SearchInput;

export { SearchInput, SearchSortFilter };
