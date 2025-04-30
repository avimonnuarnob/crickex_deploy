import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FaChevronDown, FaCheck, FaCaretDown } from "react-icons/fa";
import { useController, type UseControllerProps } from "react-hook-form";

type Props = {
  options: { id: number; name: string; value?: string; avatar: string }[];
  label: string;
};

export default function FormSelect({
  name,
  control,
  options,
}: Props & UseControllerProps) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <Listbox value={value} onChange={onChange}>
      <Label className="block text-sm/6 text-[#474747]">Choose currency</Label>
      <div className="relative mt-2.5">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-sm bg-[#eeeeee] py-3 pr-2 pl-2 text-left font-light text-gray-900 focus:outline-none focus:border-none sm:text-sm/6 border-1 border-[#e7e7e7]">
          <span className="col-start-1 row-start-1 flex items-center gap-2 pr-6">
            <img
              alt=""
              src={value.avatar}
              className="w-5 h-5 shrink-0 rounded-full"
            />
            <span className="block truncate">
              {value ? value.name : "Select Currency"}
            </span>
          </span>
          <FaCaretDown
            aria-hidden="true"
            className="col-start-1 row-start-1 size-3 self-center justify-self-end text-gray-500"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-[#eeeeee] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none"
            >
              <div className="flex items-center">
                <img
                  alt=""
                  src={option.avatar}
                  className="w-5 h-5 shrink-0 rounded-full"
                />
                <span className="ml-2 block truncate font-normal">
                  {option.name}
                </span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
