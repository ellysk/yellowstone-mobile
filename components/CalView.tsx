import { useState } from "react";
import { View } from "react-native";
import DateTimePicker, {
  DateType,
  useDefaultClassNames,
  CalendarComponents,
} from "react-native-ui-datepicker";
import Button from "./Button";
import { getFormattedDate } from "@/utils/getFormattedDate";
import ChevronLeftIcon from "./svg/ChevronLeftIcon";
import { Colors } from "@/constants/Colors";
import ChevronRightIcon from "./svg/ChevronRightIcon";

interface CalViewProps {
  date?: DateType;
  onSelectedDate?: (date: DateType) => void;
  onCancel?: () => void;
}

const CalView: React.FC<CalViewProps> = ({
  date = new Date() as DateType,
  onSelectedDate,
  onCancel,
}) => {
  const defaultClassNames = useDefaultClassNames();
  const [selected, setSelected] = useState(date as DateType);

  const handleDateChange = (date: DateType) => {
    setSelected(date);
    onSelectedDate && onSelectedDate(date);
  };

  return (
    <View className="flex-col w-full gap-y-0 pb-4 bg-primary-50 shadow-md rounded-lg">
      <DateTimePicker
        components={customCalendarComponents}
        className="bg-transparent"
        classNames={{
          ...defaultClassNames,
          header: "px-4 border-b border-primary-100",
          month_selector_label:
            "font-secondary text-lg font-bold text-primary-500",
          year_selector_label:
            "font-secondary text-lg font-bold text-primary-500",
          weekday_label: "font-secondary text-sm text-text-main",
          day_cell: "items-center justify-center",
          day: "m-2 aspect-square rounded-full",
          day_label: "font-secondary text-sm text-text-body",
          today: "border border-primary-500",
          today_label: "text-primary-500 font-bold",
          selected: "bg-primary-500",
          selected_label: "text-background-main font-bold",
          outside: "border-none bg-none",
          outside_label: "text-text-placeholder",
          month_label: "font-secondary text-lg text-text-body",
          selected_month_label:
            "font-secondary text-lg text-primary-500 font-bold",
          year_label: "font-secondary text-lg text-text-body",
          selected_year_label:
            "font-secondary text-lg text-primary-500 font-bold",
        }}
        mode="single"
        date={selected}
        monthsFormat="short"
        navigationPosition="around"
        showOutsideDays
        onChange={({ date }) => setSelected(date)}
      />
      <View className="flex-col w-full gap-y-2 px-4">
        <Button
          title={getFormattedDate(selected as Date)}
          variant="primary"
          onPress={() => handleDateChange(selected)}
        />
        <Button title="Cancel" variant="primary" border onPress={onCancel} />
      </View>
    </View>
  );
};

const customCalendarComponents: CalendarComponents = {
  IconPrev: <ChevronLeftIcon width={24} height={24} color={Colors.primary} />,
  IconNext: <ChevronRightIcon width={24} height={24} color={Colors.primary} />,
};

export default CalView;
