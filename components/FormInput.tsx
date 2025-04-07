import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { IconProps } from "./svg/Logo";

interface FormInputProps {
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryLabelIcon?: React.FC<IconProps>;
  value?: string;
  onPressSecondaryLabel?: () => void;
  onTouchStart?: () => void;
  onFocus?: () => void;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  readOnly?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  primaryLabel,
  secondaryLabel,
  secondaryLabelIcon: SecondaryLabelIcon,
  value = "",
  onPressSecondaryLabel,
  onTouchStart,
  onFocus,
  onChangeText,
  placeholder = "Enter text here",
  keyboardType = "default",
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  readOnly = false,
}) => {
  const [currentText, setText] = useState(value);

  const handleTextChange = (text: string) => {
    setText(text);
    onChangeText && onChangeText(text);
  };

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <View className="flex-col items-start gap-y-0">
      {primaryLabel && (
        <Text className="font-secondary text-sm text-text-main">
          {primaryLabel}
        </Text>
      )}
      <View className="flex-row gap-x-0 border border-border-main rounded-lg overflow-hidden">
        {(secondaryLabel || SecondaryLabelIcon) && (
          <Pressable
            className="flex-shrink px-4 justify-center bg-border-main"
            onPress={onPressSecondaryLabel}
          >
            {secondaryLabel && (
              <Text className="font-secondary text-lg text-text-body">
                {secondaryLabel}
              </Text>
            )}
            {!secondaryLabel && SecondaryLabelIcon && (
              <SecondaryLabelIcon
                width={24}
                height={24}
                color={Colors.text.body}
              />
            )}
          </Pressable>
        )}
        <TextInput
          className={`flex-1 ${
            multiline ? "min-h-32" : "min-h-8"
          } max-h-32 font-secondary text-text-main px-2 rounded-lg`}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          readOnly={readOnly}
          placeholder={placeholder}
          placeholderTextColor={Colors.text.placeholder}
          value={currentText}
          onTouchStart={onTouchStart}
          onFocus={onFocus}
          onChangeText={handleTextChange}
        />
      </View>
    </View>
  );
};

export default FormInput;
