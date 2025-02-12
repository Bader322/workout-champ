"use client";
import { RootState, session } from "@/app/_types/types";
import React, { useEffect, useRef, useState } from "react";
import { X, Check, Save } from "lucide-react";
import MainLiftSelector from "./_components/main-lift-selector";
import { useSelector, useDispatch } from "react-redux";
import { addSession } from "@/redux/slices/accessorySessionSlices";
import AccessorySessions from "./_components/accessory-sessions";
import { Datepicker } from "flowbite-react";
import { ObjectId } from 'bson';

const tableHeaders = ["Exercise", "Weight", "Reps", "Sets", "Actions"];
const SessionForm: React.FC = () => {
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [sets, setSets] = useState<number>(0);
  const [sessionVolume, setSessionVolume] = useState<number>(0);
  const [dayVolume, setDayVolume] = useState<number>(0);
  const [showRows, setShowRows] = useState(true);

  const sessions = useSelector((state: RootState) => state.sessions);
  const dispatch = useDispatch();

  const getTodaysVolume = () => sessions.map((s) => s.weight * s.reps * s.sets)
  .reduce((acc, item) => acc += item , 0)

  useEffect(() => {
    setSessionVolume(weight * reps * sets);
  }, [weight, reps, sets]);

  useEffect(() => {
    setDayVolume(getTodaysVolume())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions]);

  

  const handleSubmitSession = (e) => {
    e.preventDefault();
    const newSession: session = {
      _id: new ObjectId().toString(),
      exercise: exercise,
      weight: weight,
      reps: reps,
      sets: sets,
      volume: sessionVolume,
    };
    dispatch(addSession(newSession));
    clearEntries();
  };

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

  const clearEntries = () => {
    setExercise("");
    setWeight(0);
    setReps(0);
    setSets(0);
  };

  const saveAllSessions = async () => {
    const url = "http://localhost:3000/api/products";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(sessions),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  const outputRows = () => {
    for (let i = 0; i < tableHeaders.length; i++) {
      return (
        <>
          <td className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // required
              placeholder="Exercise"
              value={exercise}
              onChange={(e) =>
                e.target.value
                  ? setExercise(e.target.value)
                  : (e.target.value = "0")
              }
            />
          </td>
          <td className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // required
              placeholder="Weight"
              value={weight}
              onChange={(e) => {
                setWeight(parseInt(e.target.value));
              }}
            />
          </td>
          <td className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // required
              placeholder="Reps"
              value={reps}
              onChange={(e) => {
                setReps(parseInt(e.target.value));
              }}
            />
          </td>
          <td className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // required
              placeholder="Sets"
              value={sets}
              onChange={(e) => {
                setSets(parseInt(e.target.value));
              }}
            />
          </td>
          <td className="rounded-lg p-2.5">
            <X
              onClick={() => clearEntries()}
              className="cursor-pointer text-red-600"
            />
          </td>
          <td className="rounded-lg p-2.5">
            <button type="submit" className="block">
              <Check className="cursor-pointer text-green-600" />
            </button>
          </td>
        </>
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-8 bg-gray-50 rounded-xl">
      <div
        className="inline-flex bg-white rounded-lg shadow-md border"
        id="datePicker"
      >
        <Datepicker />
      </div>
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        <div>
          <table className="w-full min-w-full table-auto">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-6 py-4 first:pl-8 last:pr-8" colSpan={6}>
                  <div className="flex items-baseline gap-2 text-sm font-semibold text-gray-900">
                    <>
                      Skill Lift:
                      <MainLiftSelector />
                    </>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
          <form className="w-full" onSubmit={handleSubmitSession}>
            <table className="w-full min-w-full table-auto">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="px-6 py-4 first:pl-8 last:pr-8" colSpan={6}>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      Accessory Session(s)
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="group hover:bg-gray-50/50 transition-colors duration-200">
                  {showRows && outputRows()}
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        {sessions.length > 0 ? (
          <AccessorySessions />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <p className="text-gray-500 text-lg font-medium">
              Add an accessory session above to get started
            </p>
          </div>
        )}
        <div className="flex flex-col gap-4 items-center justify-center py-6 px-4 text-center">
          <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            Training Volume: {dayVolume}
          </p>
          <button onClick={saveAllSessions} className="block">
            <Save className="cursor-pointer text-green-600" />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center px-2 text-sm text-gray-500">
        <p>Showing {sessions.length} rows</p>
        <p>Updated just now</p>
      </div>
    </div>
  );
};

export default SessionForm;
