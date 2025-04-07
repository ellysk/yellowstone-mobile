import { Pressable, ScrollView, Text, View } from "react-native";
import RadioButtonIcon from "./svg/RadioButtonIcon";
import { useEffect, useState } from "react";
import { PagerProps } from "./Pager";

interface SelectorViewProps {
  title: string;
  isActive?: boolean;
  onPress: () => void;
}

const SelectorView: React.FC<SelectorViewProps> = ({
  title,
  isActive = false,
  onPress,
}) => {
  const [isSelected, setIsSelected] = useState(isActive);

  const handlePress = () => {
    setIsSelected(!isSelected);
    onPress();
  };

  useEffect(() => {
    setIsSelected(isActive);
  }, [isActive]);

  return (
    <Pressable className="flex flex-row gap-x-4" onPress={handlePress}>
      <Text className="flex-1 font-secondary text-lg text-text-main text-left">
        {title}
      </Text>
      <RadioButtonIcon isActive={isSelected} />
    </Pressable>
  );
};

const SelectorList: React.FC<PagerProps> = ({
  data,
  allowMultiple = false,
  onSelect,
}) => {
  const [selectionState, setSelectionState] = useState(data);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      onSelect(selectionState[selectedIndex]);
    }
  }, [selectedIndex]);

  const handlePress = (selectedIndex: number) => {
    if (allowMultiple) {
      const updatedSelectionState = selectionState.map((item, index) => {
        if (index === selectedIndex) {
          return { ...item, isActive: !item.isActive };
        }
        return item;
      });
      setSelectionState(updatedSelectionState);
    } else {
      const updatedSelectionState = selectionState.map((item, index) => ({
        ...item,
        isActive: index === selectedIndex,
      }));
      setSelectionState(updatedSelectionState);
    }
    setSelectedIndex(selectedIndex);
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 16 }}>
      {selectionState.map((item, index) => (
        <SelectorView
          key={index}
          title={item.title}
          isActive={item.isActive}
          onPress={() => handlePress(index)}
        />
      ))}
    </ScrollView>
  );
};

export default SelectorList;

export { SelectorView, SelectorList };
