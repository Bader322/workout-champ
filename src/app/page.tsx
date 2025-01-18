"use client";

import React, { useState } from "react";
import { Plus, X, Check } from "lucide-react";

type TableRow = [
  {
    id: string;
    exercise: string;
    weight: string;
    reps: number;
    sets: number;
  }
];

interface DataTableProps {
  initialRows?: TableRow[];
}

const DataTable: React.FC<DataTableProps> = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [sessions, setSessions] = useState([{
    exercise: exercise,
    weight: weight,
    reps: reps,
    sets: sets,
  }]);

  const addSession = (e): void => {
    console.log("e.target.value");
    console.log(e.target.value);
    const id = Math.floor(Math.random() * 1000) + 1;
    const newSession = { id, ...e };
    setSessions([...sessions, newSession]);
  };



  const saveSession = (session) => {
    session.preventDefault();
    const id = Math.floor(Math.random() * 1000) + 1;
    const newSession = { id, ...session }; 
    setSessions([...sessions, newSession]);
    setExercise("");
    setWeight("");
    setReps("");
    setSets("");


  };

  const deleteSession = (id) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-8 bg-gray-50 rounded-xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
        <span className="text-gray-600">{formattedDate}</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Data Table</h2>
          <p className="mt-2 text-sm text-gray-500">
            Manage and view your data entries
          </p>
        </div>
        <button
          onClick={addSession}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg 
                     hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-200 
                     shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          type="button"
        >
          <Plus size={18} className="stroke-2" />
          <span className="font-semibold">Add New Row</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <form className="w-full" onSubmit={saveSession}>
            <table className="w-full min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50/50">
                  {["Exercise", "Weight", "Reps", "Sets", "Actions"].map(
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
              <tbody className="divide-y divide-gray-100">
                {sessions.map((session, index) => (
                  <tr
                    key={index}
                    className="group hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <td
                      key={1}
                      className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
                    >
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // required
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)}
                      />
                    </td>
                    <td
                      key={2}
                      className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
                    >
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // required
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </td>
                    <td
                      key={3}
                      className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
                    >
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // required
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                      />
                    </td>
                    <td
                      key={4}
                      className="px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
                    >
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // required
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                      />
                    </td>
                    <td colSpan={2} className="flex">
                      <X
                        onClick={() => deleteSession(session.id)}
                        className="cursor-pointer"
                      />
                      <button type="submit">
                        <Check className="cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
          
          
        </div>
        {sessions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <p className="text-gray-500 text-lg font-medium">
              No data available
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Click "Add New Row" to get started
            </p>
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

export default DataTable;
