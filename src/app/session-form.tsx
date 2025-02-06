"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";
import MainLiftSelector, { selection } from "./main-lift-selector";


const tableHeaders = ["Exercise", "Weight", "Reps", "Sets", "Actions"];
const SessionForm: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [sets, setSets] = useState<number>(0);
  const [sessions, setSessions] = useState<any[]>([])
  const [volume, setVolume]= useState<number>(0);
  const [showRows , setShowRows] = useState(true);
  const skillOptions = [
    {
      id: 0,
      name: 'Strength Lift (BB)',
    },
    {
      id: 1,
      name: 'Bench Press',
    },
    {
      id: 2,
      name: 'Deadlift',
    },
    {
      id: 3,
      name: 'Military Press',
    },
    {
      id: 4,
      name: 'Squat',
    },
  ];

  const [selectedSkillOption, setSelectedSkillOption] = useState (skillOptions[0])
  const outputSessions = () => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-full table-auto">
        <thead>
                <tr className="bg-indigo-300/100">
                  {tableHeaders.map(
                    (header, index) => (
                      <th
                        key={index}
                        className="px-6 py-4 first:pl-8 last:pr-8"
                      >
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          {header}
                        </div>
                      </th>
                    )
                  )}
                </tr>
              </thead>
          <tbody>
        {sessions.map((session,i) => 
        <tr
          key={i}
          className="group hover:bg-gray-50/50 transition-colors duration-200"
        >
          <td
            className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
          >
            <p
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >{session.exercise}</p>
          </td>
          <td
            className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
          >
            <p
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >{session.weight}</p>
          </td>
          <td
            className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
          >
            <p
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >{session.reps}</p>
          </td>
          <td
            className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
          >
            <p
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
            {session.sets}
            </p>
          </td>
          <td colSpan={2} className="rounded-lg p-2.5">
            <X
              onClick={() => deleteSession(session.id)}
              className="cursor-pointer text-red-600"
            />
          </td>
        </tr>
        
  )}
  </tbody>
  </table>
      </div>
    );
  };

  const onChangeSkillLift  = (e : selection) => {
    setSelectedSkillOption(e);
  }

  const saveSession = (e: any) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000) + 1;
    const newSession = { 
      id: id, 
      exercise: exercise,
      weight: weight,
      reps: reps,
      sets: sets,
     };
    setVolume(volume + (weight*reps*sets))
    setSessions([...sessions, newSession ]);
    setExercise("");
    setWeight(0);
    setReps(0);
    setSets(0);
  };

  const deleteSession = (_id: string) => {
    const remainingSessions = sessions.filter((session) => session.id !== _id);
    const calcVolume = remainingSessions.map((s) => s.weight*s.reps*s.sets).reduce((acc, session) => acc+= session, 0);
    setVolume(calcVolume);
    setSessions([...remainingSessions]);
  }

  const clearEntries = () => {
    setSessions([...sessions]);
    setExercise("");
    setWeight(0);
    setReps(0);
    setSets(0);
  }


  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const outputRows = () => {
    for (let i = 0; i < tableHeaders.length; i++) {
      return (
        <>
          <td
            className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
          >
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // required
              placeholder="Exercise"
              value={exercise}
              onChange={(e) => e.target.value ? setExercise(e.target.value) : e.target.value = '0'}
            />
          </td>
          <td
            className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
          >
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // required
              placeholder="Weight"
              value={weight}
              onChange={(e) => e.target.value ? setWeight(parseInt(e.target.value)) : e.target.value = '0'}
            />
          </td>
          <td
            className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
          >
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // required
              placeholder="Reps"
              value={reps}
              onChange={(e) => e.target.value ? setReps(parseInt(e.target.value)) : e.target.value = '0'}
            />
          </td>
          <td
            className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
          >
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // required
              placeholder="Sets"
              value={sets}
              onChange={(e) => e.target.value ? setSets(parseInt(e.target.value)) : e.target.value = '0'}
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
              <Check className="cursor-pointer text-green-600"/>
            </button>
          </td>
          </>
        )
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-8 bg-gray-50 rounded-xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
        <span className="text-gray-600">{formattedDate}</span>
      </div>
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
        <table className="w-full min-w-full table-auto">
              <thead>
                <tr className="bg-indigo-100">
                      <th
                        className="px-6 py-4 first:pl-8 last:pr-8"
                        colSpan={6}
                      >
                        <div className="flex items-baseline gap-2 text-sm font-semibold text-gray-900">
                          <>Skill Lift: <MainLiftSelector onChangeSkillLift={onChangeSkillLift} selectedSkillOption={selectedSkillOption} skillOptions={skillOptions}/></>
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
          <form className="w-full" onSubmit={saveSession}>
            <table className="w-full min-w-full table-auto">
              <thead>
                <tr className="bg-indigo-100">
                      <th
                        className="px-6 py-4 first:pl-8 last:pr-8"
                        colSpan={6}
                      >
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
          <>{sessions.length > 0 ? outputSessions() : <></>}</>
        </div>
        {sessions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <p className="text-gray-500 text-lg font-medium">
            Accessory Session(s) saved so far
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Add a accessory session above to get started
            </p>
            <p className="p-2.5 px-8 py-4 text-sm text-gray-600 self-start">Training Volume: {volume}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center px-2 text-sm text-gray-500">
        <p>Showing {sessions.length} rows</p>
        <p>Updated just now</p>
      </div>
    </div>
  );
};

export default SessionForm;
