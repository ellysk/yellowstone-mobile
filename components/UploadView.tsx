import { Pressable, Text, View } from "react-native";
import UploadFileIcon from "./svg/UploadFileIcon";
import { Colors } from "@/constants/Colors";
import FileIcon from "./svg/FileIcon";
import DismissIcon from "./svg/DismissIcon";

interface UploadViewProps {
  onUpload?: () => void;
  detail?: string;
}

const UploadView: React.FC<UploadViewProps> = ({ onUpload, detail }) => {
  return (
    <Pressable
      className="flex-col w-full aspect-[2/1] items-center justify-center gap-y-2  border border-dashed border-accent-500 rounded-lg"
      onPress={onUpload}
    >
      <UploadFileIcon color={Colors.accent} />
      <Text className="font-secondary font-bold text-center text-lg text-accent-500">
        Tap to Upload
        {detail && (
          <Text className="font-secondary text-center text-lg text-text-body">
            {" "}
            {detail}
          </Text>
        )}
      </Text>
    </Pressable>
  );
};

interface DocumentUploadItemProps {
  fileName: string;
  fileSize: string;
  uploadStatus: "Uploading" | "Completed" | "Failed";
  percentCompleted: number;
  onRemove: () => void;
}

const DocumentUploadItem: React.FC<DocumentUploadItemProps> = ({
  fileName,
  fileSize,
  uploadStatus = "Uploading",
  percentCompleted = 0,
  onRemove,
}) => {
  const getTextColor = () => {
    switch (uploadStatus) {
      case "Uploading":
        return "text-info-500";
      case "Completed":
        return "text-success-500";
      case "Failed":
        return "text-error-500";
      default:
        return "text-text-body";
    }
  };

  return (
    <View className="flex flex-row gap-x-4 p-4 border border-border-main rounded-lg">
      <FileIcon width={24} height={24} color={Colors.text.body} />
      <View className="flex-1 flex-col gap-y-2">
        <View className="flex flex-col gap-y-0">
          <Text className="font-secondary font-bold text-left text-lg line-clamp-1 text-text-main">
            {fileName}
          </Text>
          <Text className="font-secondary font-normal text-left text-lg text-text-body">
            {fileSize}
          </Text>
        </View>
        <Text
          className={`font-secondary font-semibold text-left text-sm ${getTextColor()}`}
        >
          {uploadStatus}
          {uploadStatus == "Uploading" ? "..." : ""}
        </Text>
      </View>
      <View className="flex-col items-end justify-between">
        <Pressable onPress={onRemove}>
          <DismissIcon width={20} height={20} color={Colors.error} />
        </Pressable>
        <Text className="font-secondary text-right text-lg text-text-body">
          {percentCompleted}%
        </Text>
      </View>
    </View>
  );
};

export default UploadView;

export { UploadView, DocumentUploadItem };
