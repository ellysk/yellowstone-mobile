import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  View,
  Animated,
} from "react-native";
import DismissIcon from "./svg/DismissIcon";
import Button, { ButtonProps } from "./Button";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SelectorList from "./SelectorView";
import CalView from "./CalView";
import { DateType } from "react-native-ui-datepicker";
import { PagerProps } from "./Pager";

interface ModalViewProps {
  visible?: boolean;
  onModalVisible: (visible: boolean) => void;
  animationType?: "fade" | "slide" | "none";
  layoutPlacement?: "bottom" | "center";
  opacity?: number;
  children?: React.ReactNode;
}

interface DismissButtonProps {
  onPress: () => void;
}

const DismissButton: React.FC<DismissButtonProps> = ({ onPress }) => {
  return (
    <Pressable className="absolute right-1 top-1" onPress={onPress}>
      <DismissIcon width={24} height={24} />
    </Pressable>
  );
};

const ModalView: React.FC<ModalViewProps> = ({
  visible = false,
  onModalVisible,
  animationType = "fade",
  layoutPlacement = "center",
  opacity = 0.6,
  children,
}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const slideAnim = useState(new Animated.Value(300))[0]; // Initial position off-screen

  const handleModalVisibility = (visible: boolean) => {
    setModalVisible(visible);
    onModalVisible(visible);
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Slide to the visible position
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300, // Slide back off-screen
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    handleModalVisibility(visible);
  }, [visible]);

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType={animationType}
      onRequestClose={() => handleModalVisibility(false)}
    >
      <Pressable
        className="absolute inset-0 bg-black"
        style={{ opacity }}
        onPress={() => handleModalVisibility(false)}
      />
      {layoutPlacement == "center" ? (
        <View className="absolute inset-0 justify-center items-center">
          {children}
        </View>
      ) : (
        <Animated.View
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            transform: [{ translateY: slideAnim }],
          }}
        >
          {children}
        </Animated.View>
      )}
    </Modal>
  );
};

interface SimpleModalViewProps extends ModalViewProps {
  title: string;
  actions: ButtonProps[];
}

const SimpleModalView: React.FC<SimpleModalViewProps> = ({
  title,
  actions,
  visible = false,
  onModalVisible,
}) => {
  const { width } = Dimensions.get("window");

  return (
    <ModalView visible={visible} onModalVisible={onModalVisible}>
      <View className="absolute inset-0 justify-center items-center">
        <View
          className="flex-col gap-y-8 pt-12 pb-8 px-8 bg-background-card rounded-lg"
          style={{ width: 0.6 * width }}
        >
          <DismissButton onPress={() => onModalVisible(false)} />
          <Text className="font-accent text-lg text-center text-text-main">
            {title}
          </Text>
          <View className="flex-col gap-y-4">
            {actions.map((action, index) => (
              <Button key={index} {...action} />
            ))}
          </View>
        </View>
      </View>
    </ModalView>
  );
};

interface SelectorModalViewProps extends ModalViewProps {
  title: string;
  pagerProps: PagerProps;
  primaryAction: { title: string; onPress: () => void };
  secondaryAction?: { title: string; onPress: () => void };
}

const SelectorModalView: React.FC<SelectorModalViewProps> = ({
  title,
  pagerProps,
  primaryAction,
  secondaryAction,
  visible,
  onModalVisible,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ModalView
      visible={visible}
      onModalVisible={onModalVisible}
      layoutPlacement="bottom"
    >
      <View
        className="flex-1 flex-col gap-y-8 pt-12 px-8 bg-background-card rounded-lg"
        style={{ paddingBottom: insets.bottom }}
      >
        <DismissButton onPress={() => onModalVisible(false)} />
        <Text className="font-primary font-semibold text-2xl text-text-main text-center">
          {title}
        </Text>
        <View className="flex-1 flex-col gap-y-4 justify-between">
          <SelectorList {...pagerProps} />
          <View className="flex-col w-full gap-y-2">
            {secondaryAction && (
              <Button
                title={secondaryAction?.title}
                variant="secondary"
                border
                onPress={secondaryAction?.onPress}
              />
            )}
            <Button
              title={primaryAction.title}
              variant="secondary"
              onPress={primaryAction.onPress}
            />
          </View>
        </View>
      </View>
    </ModalView>
  );
};

interface CalendarModalViewProps extends ModalViewProps {
  date?: DateType;
  onSelectedDate: (date: DateType) => void;
  onCancel: () => void;
}

const CalendarModalView: React.FC<CalendarModalViewProps> = ({
  visible = false,
  onModalVisible,
  date = new Date() as DateType,
  onSelectedDate,
  onCancel,
}) => {
  return (
    <ModalView opacity={0.2} visible={visible} onModalVisible={onModalVisible}>
      <View className="absolute inset-0 justify-center items-center">
        <View className="flex w-full px-4 bg-transparent">
          <CalView
            date={date}
            onSelectedDate={onSelectedDate}
            onCancel={onCancel}
          />
        </View>
      </View>
    </ModalView>
  );
};

export { SimpleModalView, SelectorModalView, CalendarModalView };
