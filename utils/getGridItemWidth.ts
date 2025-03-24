const getGridItemWidth = (
  screenWidth: number,
  gap: number = 16,
  columns: number = 2,
  horizontalPadding: number = 16
) => {
  const totalSpacing: number = gap * (columns - 1) + horizontalPadding * 2;
  return (screenWidth - totalSpacing) / columns;
};

export default getGridItemWidth;
