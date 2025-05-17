import InfoView, { InfoList } from "@/components/InfoView";
import { ProfileView, ProfileViewProps } from "@/components/ProfileView";
import { View } from "react-native";

export default function OperatorScreen() {
  return (
    <View className="flex-1 flex-col gap-y-6 bg-background-main">
      <ProfileView {...profileData} />
      <View>
        <InfoList
          headerProps={{ header: "Allowed Tag Zones" }}
          data={allowedTagZones}
        />
      </View>
    </View>
  );
}

const profileData: ProfileViewProps = {
  name: "Kayce Dutton",
  company: "Yellowstone Ranch",
  details: "A ranch from the show Yellowstone, since 1886",
  profileImage:
    "https://www.paramountshop.co.uk/cdn/shop/files/yellowstone-logo-sticker-assorted-pack-of-3-423554_1500x.png?v=1718295715",
};

const allowedTagZones = [
  {
    title: "North, District 1",
  },
  {
    title: "East, District 2",
  },
  {
    title: "West, District 3",
  },
  {
    title: "South, District 4",
  },
];
