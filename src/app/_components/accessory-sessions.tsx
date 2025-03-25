'use client';
import { RootState } from '@/app/_types/types';
import React from 'react';
import { X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSession } from '@/redux/slices/accessorySessionSlices';
import { session } from '../_types/types';
const tableHeaders = ['Exercise', 'Weight', 'Reps', 'Sets', 'Actions'];

const AccessorySessions: React.FC = () => {
  const sessions = useSelector((state: RootState) => state.sessions);
  const dispatch = useDispatch();

  const handleDelete = (_id: string) => {
    dispatch(deleteSession(_id));
  };

  return (
    <div className='overflow-x-auto'>
      <table className='w-full min-w-full table-auto'>
        <thead>
          <tr className='bg-indigo-300/100'>
            {tableHeaders.map((header, index) => (
              <th key={index} className='px-6 py-4 first:pl-8 last:pr-8'>
                <div className='flex items-center gap-2 text-sm font-semibold text-gray-900'>
                  {header}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sessions.map((session: session, i: number) => (
            <tr
              key={i}
              className='group hover:bg-gray-50/50 transition-colors duration-200'
            >
              <td className='px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200'>
                <p className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                  {session.exercise}
                </p>
              </td>
              <td className='px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200'>
                <p className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                  {session.weight}
                </p>
              </td>
              <td className='px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200'>
                <p className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                  {session.reps}
                </p>
              </td>
              <td className='px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200'>
                <p className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                  {session.sets}
                </p>
              </td>
              <td colSpan={2} className='rounded-lg p-2.5'>
                <X
                  onClick={() => handleDelete(session._id)}
                  className='cursor-pointer text-red-600'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccessorySessions;
