"use client";

import useGetEvents from "@/hooks/api/admin/useGetEvents";
import { appConfig } from "@/utils/config";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import { EVENT_CATEGORIES } from "../../constant";
import { StylesConfig } from "react-select";

interface EventOption {
  value: string;
  label: string;
}

const AutoComplete = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const loadOptions = (
    inputValue: string,
    callback: (options: EventOption[]) => void,
  ) => {
    try {
      const filteredCategories = EVENT_CATEGORIES.filter((category) =>
        category.title.toLowerCase().includes(inputValue.toLowerCase()),
      );

      const options = filteredCategories.map((category) => ({
        label: category.title,
        value: category.title,
      }));

      callback(options);
      setSearch(inputValue);
    } catch (error) {
      callback([]);
    }
  };

  const debouncedLoadOptions = debounce(loadOptions, 750);

  const selectStyle: Partial<StylesConfig<EventOption, false>> = {
    control: (provided: any) => ({
      ...provided,
      height: "50px" 
    })
  };

  return (
    <AsyncSelect
      placeholder="Search category"
      className="md:w-[450px] w-[300px]"
      loadOptions={debouncedLoadOptions}
      onChange={(selectedOption: EventOption | null) => {
        if (selectedOption) {
          router.push(
            appConfig.baseUrlNext + `/categories/${selectedOption.label}`,
          );
        }
      }}
      styles={selectStyle}
    />
  );
};

export default AutoComplete;
