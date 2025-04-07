import { View, Text, Pressable, ScrollView } from "react-native";
import Button, { ButtonProps } from "./Button";
import React from "react";

interface InfoViewProps {
  label: string;
  value: string;
  actionableInfo?: string;
  isActionable?: boolean;
  buttonProps?: ButtonProps;
  showButton?: boolean;
  onPressActionableInfo?: () => void;
  backgroundColor?: string;
  labelTextColor?: string;
  valueTextColor?: string;
  actionableInfoTextColor?: string;
  actionableInfoDecoratorTextColor?: string;
}

const InfoView: React.FC<InfoViewProps> = ({
  label,
  value,
  actionableInfo,
  isActionable,
  showButton = false,
  buttonProps = { title: "Action", variant: "secondary", border: true },
  onPressActionableInfo,
  backgroundColor = "bg-background-card",
  labelTextColor = "text-text-main",
  valueTextColor = "text-text-body",
  actionableInfoTextColor = "text-text-main",
  actionableInfoDecoratorTextColor = "text-text-main",
}) => {
  return (
    <View className={`flex flex-col gap-y-2 w-full ${backgroundColor} p-4`}>
      <View className="flex flex-row justify-between gap-x-4">
        <View className="flex-col gap-y-0 flex-shrink">
          <Text className={`text-left font-primary text-lg ${labelTextColor}`}>
            {label}
          </Text>
          <Text className={`text-left font-primary text-sm ${valueTextColor}`}>
            {value}
          </Text>
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
      {showButton && buttonProps && <Button {...buttonProps} />}
    </View>
  );
};

interface InfoHeaderViewProps {
  header: string;
  description?: string;
  backgroundColor?: string;
  headerTextColor?: string;
  descriptionTextColor?: string;
}

const InfoHeaderView: React.FC<InfoHeaderViewProps> = ({
  header,
  description,
  backgroundColor = "bg-border-main",
  headerTextColor = "text-text-main",
  descriptionTextColor = "text-text-body",
}) => {
  return (
    <View className={`flex gap-y-2 w-full ${backgroundColor}  p-4`}>
      <View className="flex-col gap-y-0 flex-shrink">
        <Text className={`text-left font-primary text-2xl ${headerTextColor}`}>
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
    </View>
  );
};

interface InfoListProps {
  showHeader?: boolean;
  header: string;
  description?: string;
  data: InfoViewProps[];
}

const InfoList: React.FC<InfoListProps> = ({
  showHeader = false,
  header,
  description,
  data = [],
}) => {
  return (
    <ScrollView>
      {showHeader && (
        <InfoHeaderView header={header} description={description} />
      )}
      {data.map((item, index) => (
        <View
          key={index}
          style={{ marginBottom: index === data.length - 1 ? 0 : 4 }}
        >
          <InfoView
            label={item.label}
            value={item.value}
            actionableInfo={item.actionableInfo}
            isActionable={item.isActionable}
            showButton={!!item.buttonProps}
            buttonProps={item.buttonProps}
            onPressActionableInfo={item.onPressActionableInfo}
            backgroundColor={item.backgroundColor}
            labelTextColor={item.labelTextColor}
            valueTextColor={item.valueTextColor}
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
