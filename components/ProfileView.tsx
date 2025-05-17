import { Image, Text, View } from "react-native";

interface ProfileViewProps {
  profileImage?: string;
  name: string;
  company: string;
  details: string;
}

const ProfileView: React.FC<ProfileViewProps> = ({
  profileImage,
  name,
  company,
  details,
}) => {
  return (
    <View className="flex flex-row px-4 gap-x-4 items-start">
      <Image
        className="w-24 h-24 rounded-full"
        source={{
          uri: profileImage,
        }}
        resizeMode="cover"
      />
      <View className="flex flex-col items-start gap-y-2">
        <View className="flex-col gap-y-0">
          <Text className="font-accent font-bold text-left text-lg text-text-main">
            {name}
          </Text>
          <Text className="font-accent text-left text-lg text-text-main">
            {company}
          </Text>
        </View>
        <Text className="font-secondary text-left text-sm text-text-body">
          {details}
        </Text>
      </View>
    </View>
  );
};

export default ProfileView;

export { ProfileView, ProfileViewProps };
