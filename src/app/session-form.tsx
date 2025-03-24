"use client";
import { RootState } from "@/app/_types/types";
import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import RecordSession from "./_components/record-session";
import { useAppSelector } from "@/redux/store";
import AccessorySessions from "./_components/accessory-sessions";
import { Spinner } from "flowbite-react";
import Header from "./header";

const SessionForm: React.FC = () => {
  const [dayVolume, setDayVolume] = useState<number>(0);
  const sessions = useAppSelector((state: RootState) => state.sessions) || [];

  const getTodaysVolume = () =>
    sessions
      .map((s) => s.weight * s.reps * s.sets)
      .reduce((acc, item) => (acc += item), 0);

  useEffect(() => {
    setDayVolume(getTodaysVolume());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions]);

  const saveAllSessions = async () => {
    const url = "http://localhost:3000/api/sessions";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(sessions),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        <div>
          <RecordSession />
        </div>
        {sessions.length > 0 ? (
          <>
            <AccessorySessions />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <p className="text-gray-500 text-lg font-medium">
              Use the form above to add a new session Or.. <br />
              Select date above to view previous sessions
            </p>
            <Spinner id="loadingSpinner" size={"lg"} color="warning" />
          </div>
        )}
        <div className="flex gap-4 items-center justify-center py-6 px-4 text-center">
          <p className="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            Training Volume: {dayVolume}
          </p>
          <button onClick={saveAllSessions} className="flex items-center gap-2">
            <Save className="cursor-pointer text-green-600" />
            <span className="text-green-600">Save As a one time template</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SessionForm;
