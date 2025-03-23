"use client";
import { updateSelection } from "@/redux/slices/skillLiftSelectionSlice";
import OptionSelector from "./option-selector";
import { exercises } from "../_labels/exercises";


export default function AccessoryLiftSelector() {
  const options = exercises;

  return (
    <OptionSelector options={options} handler={updateSelection}/>
  );
}
