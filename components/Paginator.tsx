import { Pressable, View } from "react-native";
import ChevronLeftIcon from "./svg/ChevronLeftIcon";
import ChevronRightIcon from "./svg/ChevronRightIcon";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";

interface PaginatorProps {
  count?: number;
  index?: number;
  onPressNext?: (nextIndex: number) => void;
  onPressPrev?: (prevIndex: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  count = 0,
  index = 0,
  onPressPrev,
  onPressNext,
}) => {
  const [currentIndex, setCurrentIndex] = useState(index);
  const [prevEnabled, setPrevEnabled] = useState(index > count);
  const [nextEnabled, setNextEnabled] = useState(index < count - 1);

  useEffect(() => {
    setCurrentIndex(index);
    handleNavState(index);
  }, [index]);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    handleNavState(nextIndex);
    onPressNext && onPressNext(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    handleNavState(prevIndex);
    onPressPrev && onPressPrev(prevIndex);
  };

  const handleNavState = (index: number) => {
    setPrevEnabled(index > 0);
    setNextEnabled(index < count - 1);
  };

  return (
    <View className="flex-row justify-center gap-x-12">
      <Pressable
        className={`p-2 ${
          prevEnabled ? "bg-black" : "bg-border-main"
        } rounded-lg`}
        onPress={handlePrev}
        disabled={!prevEnabled}
      >
        <ChevronLeftIcon
          color={prevEnabled ? Colors.background.main : Colors.text.placeholder}
        />
      </Pressable>
      <Pressable
        className={`p-2 ${
          nextEnabled ? "bg-black" : "bg-border-main"
        } rounded-lg`}
        onPress={handleNext}
        disabled={!nextEnabled}
      >
        <ChevronRightIcon
          color={nextEnabled ? Colors.background.main : Colors.text.placeholder}
        />
      </Pressable>
    </View>
  );
};

export default Paginator;
