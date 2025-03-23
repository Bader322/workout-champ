"use client";
import { updateSelection } from "@/redux/slices/skillLiftSelectionSlice";
import OptionSelector from "./option-selector";


export default function MainLiftSelector() {
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
    <OptionSelector options={skillOptions} handler={updateSelection} />
  );
}
