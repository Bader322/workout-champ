'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Radio } from '@material-tailwind/react';
import { selectTemplate } from '@/redux/slices/workout-template-choiceSlice';

const tableHeaders = ['Template Title'];

const Template: React.FC = () => {
  const dispatch = useAppDispatch();
  const templates = useAppSelector((state) => state.workoutTemplates);

  return (
    <div className='overflow-x-auto rounded-lg shadow-2xl'>
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
                    dispatch(selectTemplate({_id: target.value, disabledActionBtn: false}));
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
