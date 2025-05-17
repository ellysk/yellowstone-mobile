import { Dimensions } from "react-native";

/**
 * Calculates the width of a grid item based on the number of columns and gap
 * @param numColumns Number of columns in the grid
 * @param gap Gap between items in pixels
 * @returns Width of each grid item
 */
export default function getGridItemWidth(numColumns: number, gap: number) {
  const screenWidth = Dimensions.get("window").width;
  const padding = 32; // Total horizontal padding (16px on each side)
  const totalGapWidth = (numColumns - 1) * gap;
  const availableWidth = screenWidth - padding - totalGapWidth;
  return availableWidth / numColumns;
}
