import { View, Text, Pressable, ScrollView } from "react-native";
import Button, { ButtonProps } from "./Button";
import React from "react";

interface InfoViewProps {
  title?: string;
  subTitle?: string;
  actionableInfo?: string;
  isActionable?: boolean;
  buttonProps?: ButtonProps;
  onPressActionableInfo?: () => void;
  backgroundColor?: string;
  titleTextColor?: string;
  subTitleTextColor?: string;
  actionableInfoTextColor?: string;
  actionableInfoDecoratorTextColor?: string;
  onPress?: () => void;
}

const InfoView: React.FC<InfoViewProps> = ({
  title,
  subTitle,
  actionableInfo,
  isActionable,
  buttonProps,
  onPressActionableInfo,
  backgroundColor = "bg-background-card",
  titleTextColor = "text-text-main",
  subTitleTextColor = "text-text-body",
  actionableInfoTextColor = "text-text-main",
  actionableInfoDecoratorTextColor = "decoration-text-main",
  onPress = () => {},
}) => {
  return (
    <Pressable
      className={`flex flex-col gap-y-2 w-full ${backgroundColor} p-4`}
      onPress={onPress}
    >
      <View className="flex flex-row justify-between gap-x-4">
        <View className="flex-col gap-y-0 flex-shrink">
          {title && (
            <Text
              className={`text-left font-primary text-lg ${titleTextColor}`}
            >
              {title}
            </Text>
          )}
          {subTitle && (
            <Text
              className={`text-left font-primary text-sm ${subTitleTextColor}`}
            >
              {subTitle}
            </Text>
          )}
        </View>
        {actionableInfo &&
          (isActionable ? (
            <Pressable onPress={onPressActionableInfo}>
              <Text
                className={`text-right font-secondary text-sm underline ${actionableInfoTextColor} ${actionableInfoDecoratorTextColor}`}
              >
                {actionableInfo}
              </Text>
            </Pressable>
          ) : (
            <Text
              className={`text-right font-secondary text-sm ${actionableInfoTextColor}`}
            >
              {actionableInfo}
            </Text>
          ))}
      </View>
      {buttonProps && (
        <View className="self-start">
          <Button {...buttonProps} />
        </View>
      )}
    </Pressable>
  );
};

interface InfoHeaderViewProps {
  header: string;
  description?: string;
  backgroundColor?: string;
  headerTextColor?: string;
  descriptionTextColor?: string;
  buttonProps?: ButtonProps;
}

const InfoHeaderView: React.FC<InfoHeaderViewProps> = ({
  header,
  description,
  backgroundColor = "bg-border-main",
  headerTextColor = "text-text-main",
  descriptionTextColor = "text-text-body",
  buttonProps,
}) => {
  return (
    <View
      className={`flex flex-row justify-between items-center gap-x-4 ${backgroundColor} p-4`}
    >
      <View className="flex-col gap-y-0 flex-shrink">
        <Text
          className={`text-left font-primary font-bold text-2xl ${headerTextColor}`}
        >
          {header}
        </Text>
        {description && (
          <Text
            className={`text-left font-primary text-sm ${descriptionTextColor}`}
          >
            {description}
          </Text>
        )}
      </View>
      {buttonProps && <Button {...buttonProps} />}
    </View>
  );
};

interface InfoListProps {
  headerProps?: InfoHeaderViewProps;
  data: InfoViewProps[];
  scrollEnabled?: boolean;
}

const InfoList: React.FC<InfoListProps> = ({
  headerProps,
  data = [],
  scrollEnabled = true,
}) => {
  return (
    <ScrollView scrollEnabled={scrollEnabled}>
      {headerProps && <InfoHeaderView {...headerProps} />}
      {data.map((item, index) => (
        <View
          key={index}
          style={{ marginBottom: index === data.length - 1 ? 0 : 4 }}
        >
          <InfoView
            title={item.title}
            subTitle={item.subTitle}
            actionableInfo={item.actionableInfo}
            isActionable={item.isActionable}
            buttonProps={item.buttonProps}
            onPressActionableInfo={item.onPressActionableInfo}
            backgroundColor={item.backgroundColor}
            titleTextColor={item.titleTextColor}
            subTitleTextColor={item.subTitleTextColor}
            actionableInfoTextColor={item.actionableInfoTextColor}
            actionableInfoDecoratorTextColor={item.actionableInfoTextColor}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default InfoView;

export {
  InfoView,
  InfoViewProps,
  InfoHeaderView,
  InfoHeaderViewProps,
  InfoListProps,
  InfoList,
};
