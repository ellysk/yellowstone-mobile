import React from "react";
import { Pressable, Text, PressableProps } from "react-native";
import { IconProps } from "./svg/Logo";
import { Colors } from "@/constants/Colors";

interface ButtonProps extends PressableProps {
  title?: string;
  textClassName?: string;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "success"
    | "error"
    | "white";
  border?: boolean;
  iconComponent?: React.FC<IconProps>;
  iconColor?: string;
  size?: {
    width: string;
    height: string;
  };
  shadow?: boolean;
}

const buttonVariants = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  accent: "bg-accent-500",
  neutral: "bg-border-main",
  success: "bg-success-500",
  error: "bg-error-500",
  white: "bg-background-card",
};

const buttonWithBorderVariants = {
  primary: "bg-transparent border border-primary-500",
  secondary: "bg-transparent border border-secondary-500",
  accent: "bg-transparent border border-accent-500",
  neutral: "bg-transparent border border-border-main",
  success: "bg-transparent border border-success-500",
  error: "bg-transparent border border-error-500",
  white: "bg-transparent border border-background-card",
};

const buttonTextVariants = {
  primary: "text-background-card",
  secondary: "text-background-card",
  accent: "text-background-card",
  neutral: "text-text-body",
  success: "text-background-card",
  error: "text-background-card",
  white: "text-text-main",
};

const buttonWithBorderTextVariants = {
  primary: "text-primary-500",
  secondary: "text-secondary-500",
  accent: "text-accent-500",
  neutral: "text-border-main",
  success: "text-success-500",
  error: "text-error-500",
  white: "text-background-card",
};

const Button: React.FC<ButtonProps> = ({
  title,
  textClassName,
  variant = "primary",
  border = false,
  iconComponent: IconComponent,
  iconColor = Colors.background.card,
  size,
  shadow = false,
  onPress,
}) => {
  return (
    <Pressable
      className={`items-center justify-center flex-row gap-x-2 rounded-full ${
        border ? buttonWithBorderVariants[variant] : buttonVariants[variant]
      } ${size ? size.width + " " + size.height : "px-4 py-2"} ${
        shadow ? "shadow-md" : ""
      }
      `}
      onPress={onPress}
    >
      {IconComponent && (
        <IconComponent width={16} height={16} color={iconColor} />
      )}
      {title && (
        <Text
          className={`font-primary text-lg ${
            border
              ? buttonWithBorderTextVariants[variant]
              : buttonTextVariants[variant]
          } ${textClassName || ""}`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;

export { Button, ButtonProps };
