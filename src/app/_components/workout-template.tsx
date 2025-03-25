'use client';
import React from 'react';
import { useAppDispatch } from '@/redux/store';
import { Radio } from '@material-tailwind/react';
import { update } from '@/redux/slices/workout-template-choiceSlice';

const tableHeaders = ['Template Title'];

const Template: React.FC = () => {
  const dispatch = useAppDispatch();

  const templates = [
    {
      _id: 'ObjectId1',
      title: 'Temp Name1',
      description: 'string',
      exercises: [
        {
          _id: 'ObjectId',
          name: 'string;',
          description: 'string;',
          sets: [
            {
              _id: 'ObjectId',
              reps: 'reps',
              weight: 'weight',
              time: 'time',
              distance: 'distance',
              rest: 'rest',
            },
          ],
        },
      ],
    },
    {
      _id: 'ObjectId2',
      title: 'Temp Name2',
      description: 'string',
      exercises: [
        {
          _id: 'ObjectId',
          name: 'string;',
          description: 'string;',
          sets: [
            {
              _id: 'ObjectId',
              reps: 'ObjectId',
              weight: 'ObjectId',
              time: 'ObjectId',
              distance: 'ObjectId',
              rest: 'ObjectId',
            },
          ],
        },
      ],
    },
  ];

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
          {templates.map((t, i) => (
            <tr
              key={i}
              className='group hover:bg-gray-50/50 transition-colors duration-200'
            >
              <td className='px-6 py-4 first:pl-8 last:pr-8 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200'>
                <Radio
                  name='type'
                  label={t.title}
                  value={t._id}
                  onClick={(event) => {
                    const target = event.target as HTMLInputElement;
                    dispatch(update(target.value));
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Template;
