import { ScrollView, View } from "react-native";
import Button from "./Button";
import React, { useEffect, useState } from "react";
interface PagerProps {
  data: { title: string; isActive: boolean; info?: any }[];
  allowMultiple?: boolean;
  scrollable?: boolean;
  activeColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "success"
    | "error"
    | "white";
  onSelect: (selectedItem: {
    title: string;
    isActive: boolean;
    info?: any;
  }) => void;
  onUpdate?: (
    updatedData: { title: string; isActive: boolean; info?: any }[]
  ) => void;
}

const Pager: React.FC<PagerProps> = ({
  data,
  allowMultiple = false,
  scrollable = true,
  activeColor = "primary",
  onSelect,
  onUpdate,
}) => {
  const [selectionState, setSelectionState] = useState(data);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      onSelect(selectionState[selectedIndex]);
    }
    onUpdate && onUpdate(selectionState);
  }, [selectedIndex, selectionState]);

  const handleSelected = (selectedIndex: number) => {
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

  const HorizontalSelectionView: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
        className="flex-none"
      >
        {children}
      </ScrollView>
    );
  };

  const WrappedSelectionView: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return <View className="flex-row flex-wrap gap-4">{children}</View>;
  };

  return scrollable ? (
    <HorizontalSelectionView>
      {selectionState.map(({ title, isActive }, index) => (
        <Button
          key={index}
          title={title}
          variant={isActive ? "primary" : "neutral"}
          onPress={() => {
            handleSelected(index);
          }}
        />
      ))}
    </HorizontalSelectionView>
  ) : (
    <WrappedSelectionView>
      {selectionState.map(({ title, isActive }, index) => (
        <Button
          key={index}
          title={title}
          variant={isActive ? activeColor : "neutral"}
          onPress={() => {
            handleSelected(index);
          }}
        />
      ))}
    </WrappedSelectionView>
  );
};

export default Pager;

export { Pager, PagerProps };
