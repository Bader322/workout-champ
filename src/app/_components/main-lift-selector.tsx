"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { useSelector, useDispatch } from "react-redux";
import { updateSelection } from "@/redux/slices/skillLiftSelectionSlice";


export default function MainLiftSelector() {
  const selection = useSelector((state: any) => state.skillLiftSelection);
  const dispatch = useDispatch();
  const handleChange = (e) => dispatch(updateSelection(e));
  const skillOptions = [
    {
      id: 0,
      name: "Strength Lift (BB)",
    },
    {
      id: 1,
      name: "Bench Press",
    },
    {
      id: 2,
      name: "Deadlift",
    },
    {
      id: 3,
      name: "Military Press",
    },
    {
      id: 4,
      name: "Squat",
    },
  ];


  return (
    <Listbox
      value={selection}
      onChange={(e) => dispatch(handleChange(e))}
    >
      <div className="relative mt-2 min-w-[200px]">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">
              {selection.name}
            </span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {skillOptions.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {option.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white"></span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
