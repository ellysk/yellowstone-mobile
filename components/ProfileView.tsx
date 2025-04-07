import { Image, Text, View } from "react-native";

interface ProfileViewProps {
  profileImage?: string;
  name: string;
  company: string;
  numOfTenantsManaged: number;
  yearStarted: number;
}

const ProfileView: React.FC<ProfileViewProps> = ({
  profileImage = "https://gva.co.tz/storage/logo/gva-logo-17-copy.webp",
  name,
  company,
  numOfTenantsManaged,
  yearStarted,
}) => {
  return (
    <View className="flex flex-row gap-x-4 items-start">
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
          {numOfTenantsManaged} Tenants managed since {yearStarted}
        </Text>
      </View>
    </View>
  );
};

export default ProfileView;
