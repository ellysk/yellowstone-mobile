import { Text, View } from "react-native";
import { Pager, PagerProps } from "./Pager";
import FormInput from "./FormInput";
import { useState } from "react";

interface FilterItemProps extends PagerProps {
  title: string;
  activeFilter?: any;
}

const PagerFilterItem: React.FC<FilterItemProps> = ({
  title,
  data,
  onSelect,
}) => {
  return (
    <View className="flex-col gap-y-2 w-full">
      <Text className="font-primary text-left text-lg text-text-main">
        {title}
      </Text>
      <Pager data={data} scrollable={false} onSelect={onSelect} />
    </View>
  );
};

interface PriceFilterItemProps extends FilterItemProps {
  currency?: string;
  onChangeFromPrice?: (price: string) => void;
  onChangeToPrice?: (price: string) => void;
}

const PriceFilterItem: React.FC<PriceFilterItemProps> = ({
  title,
  currency = "TZS",
  onChangeFromPrice,
  onChangeToPrice,
}) => {
  return (
    <View className="flex-col gap-y-2">
      <Text className="font-primary text-left text-lg text-text-main">
        {title}
      </Text>
      <View className="flex-row flex-wrap justify-stretch gap-2">
        <View className="flex-1 min-w-44">
          <FormInput
            primaryLabel="From"
            secondaryLabel={currency}
            placeholder="0"
            keyboardType="numeric"
            onChangeText={onChangeFromPrice}
          />
        </View>
        <View className="flex-1 min-w-44">
          <FormInput
            primaryLabel="To"
            secondaryLabel={currency}
            placeholder="0"
            keyboardType="numeric"
            onChangeText={onChangeToPrice}
          />
        </View>
      </View>
    </View>
  );
};

interface NumericFilterItemProps extends FilterItemProps {
  onChangeText?: (text: string) => void;
}

const NumericFilterItem: React.FC<NumericFilterItemProps> = ({
  title,
  activeFilter,
  data,
  onSelect,
  onChangeText,
}) => {
  const [selected, setSelected] = useState(
    activeFilter as { title: string; isActive: boolean; info: string } | null
  );

  const handleSelected = (selectedFilter: {
    title: string;
    isActive: boolean;
    info?: any;
  }) => {
    setSelected(
      selectedFilter as { title: string; isActive: boolean; info: string }
    );
    onSelect && onSelect(selectedFilter);
  };

  return (
    <View className="flex-col gap-y-2 w-full">
      <Text className="font-primary text-left text-lg text-text-main">
        {title}
      </Text>
      <View className="flex-row flex-wrap justify-stretch gap-2">
        <View className="flex-1 min-w-44">
          <FormInput
            secondaryLabel={
              selected?.info == "between" ? ">=" : selected?.info || ">"
            }
            placeholder="0"
            keyboardType="numeric"
            onChangeText={onChangeText}
          />
        </View>
        {selected?.info == "between" && (
          <View className="flex-1 min-w-44">
            <FormInput
              secondaryLabel="<="
              placeholder="0"
              keyboardType="numeric"
              onChangeText={onChangeText}
            />
          </View>
        )}
      </View>
      <Pager
        data={data}
        scrollable={false}
        onSelect={handleSelected}
        allowMultiple={false}
      />
    </View>
  );
};

export { PagerFilterItem, PriceFilterItem, NumericFilterItem };
