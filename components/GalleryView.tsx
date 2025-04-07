import { View, Image, ScrollView, Dimensions } from "react-native";
import { useRef, useState } from "react";
import Paginator from "./Paginator";

interface GalleryViewProps {
  images?: string[];
}

const GalleryView: React.FC<GalleryViewProps> = ({
  images = [
    "https://media.istockphoto.com/id/1396856251/photo/colonial-house.jpg?s=612x612&w=0&k=20&c=_tGiix_HTQkJj2piTsilMuVef9v2nUwEkSC9Alo89BM=",
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyaminmellish-106399.jpg&fm=jpg",
  ],
}) => {
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth - 16 * 2; // Subtract 16px padding on both sides
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (nextIndex: number) => {
    scrollViewRef.current?.scrollTo({
      x: nextIndex * screenWidth,
      animated: true,
    });
  };

  const handlePrev = (prevIndex: number) => {
    scrollViewRef.current?.scrollTo({
      x: prevIndex * screenWidth,
      animated: true,
    });
  };

  return (
    <View className="flex-col w-full gap-y-4">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / screenWidth
          );
          setCurrentIndex(newIndex);
        }}
        contentContainerStyle={{ gap: 16 }}
        className="flex-none w-full overflow-visible"
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            resizeMode="cover"
            className="rounded-xl"
            style={{
              width: imageWidth,
              height: imageWidth, // Maintain square aspect ratio
            }}
          />
        ))}
      </ScrollView>
      <View className="flex-row justify-center gap-x-12">
        <Paginator
          count={images.length}
          index={currentIndex}
          onPressPrev={handlePrev}
          onPressNext={handleNext}
        />
      </View>
    </View>
  );
};

export default GalleryView;
