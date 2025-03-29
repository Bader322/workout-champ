'use client';
import { session } from '@/app/_types/types';
import { X, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { addSession } from '@/redux/slices/accessorySessionSlices';
import { ObjectId } from 'bson';
import AccessoryLiftSelector from './accessory-lifts-selector';

const RecordSession: React.FC = () => {
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [sets, setSets] = useState<number>(0);
  const [sessionVolume, setSessionVolume] = useState<number>(0);
  const sessionDate = useAppSelector((state) => state.sessionDate);
  const exercise = useAppSelector((state) => state.skillLiftSelection.name);
  const templateId = useAppSelector((state) => state.sessions.find((session) => session.templateId)?.templateId) || new ObjectId().toString();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSessionVolume(weight * reps * sets);
  }, [weight, reps, sets]);

  const clearEntries = () => {
    setWeight(0);
    setReps(0);
    setSets(0);
  };

  const handleSubmitSession = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: session = {
      _id: new ObjectId().toString(),
      exercise: exercise,
      weight: weight,
      reps: reps,
      sets: sets,
      volume: sessionVolume,
      date: sessionDate,
      templateId: templateId,
      markForRemoval: false,
    };
    dispatch(addSession(newSession));
    clearEntries();
  };

  return (
    <>
      <form className='w-full' onSubmit={handleSubmitSession}>
        <table className='w-full min-w-full table-auto'>
          <thead>
            <tr className='bg-indigo-100'>
              <th className='px-6 py-4 first:pl-8 last:pr-8' colSpan={6}>
                <div className='flex items-center gap-2 text-sm font-semibold text-gray-900'>
                  Add Accessory Session
                </div>
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            <tr className='group hover:bg-gray-50/50 transition-colors duration-200'>
              <td className='px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200'>
                <AccessoryLiftSelector />
              </td>
              <td className='px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200'>
                <input
                  type='number'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  // required
                  placeholder='Weight'
                  // min={1}
                  value={weight}
                  onChange={(e) => {
                    setWeight(parseInt(e.target.value));
                  }}
                />
              </td>
              <td className='px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200'>
                <input
                  type='text'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  // required
                  min={1}
                  placeholder='Reps'
                  value={reps}
                  onChange={(e) => {
                    setReps(parseInt(e.target.value));
                  }}
                />
              </td>
              <td className='px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200'>
                <input
                  type='text'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  // required
                  min={1}
                  placeholder='Sets'
                  value={sets}
                  onChange={(e) => {
                    setSets(parseInt(e.target.value));
                  }}
                />
              </td>
              <td className='rounded-lg p-2.5'>
                <X
                  onClick={() => clearEntries()}
                  className='cursor-pointer text-red-600'
                />
              </td>
              <td className='rounded-lg p-2.5'>
                <button type='submit' className='block'>
                  <Check className='cursor-pointer text-green-600' />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default RecordSession;
