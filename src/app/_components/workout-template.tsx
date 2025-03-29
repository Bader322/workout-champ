'use client';
import React from 'react';
import { useAppDispatch } from '@/redux/store';
import { Radio } from '@material-tailwind/react';
import { selectTemplate } from '@/redux/slices/workout-template-choiceSlice';

const tableHeaders = ['Template Title'];

const Template: React.FC = () => {
  const dispatch = useAppDispatch();

  const templates = [
    {
      _id: {
        $oid: '67e70f9af009e2425bc3ea13',
      },
      title: 'Untitled Template1',
      description: 'No description provided 1',
      sessions: [
        {
          $oid: 'sessions11',
        },
        {
          $oid: 'sessions12',
        },
      ],
      created_at: {
        $date: '2025-03-28T21:07:55.478Z',
      },
      updated_at: {
        $date: '2025-03-28T21:08:37.774Z',
      },
      __v: 0,
    },
    {
      _id: {
        $oid: '1234',
      },
      title: 'Untitled Template 2',
      description: 'No description provided 2',
      sessions: [
        {
          $oid: 'sessions21',
        },
        {
          $oid: 'sessions22',
        },
      ],
      created_at: {
        $date: '2025-03-28T21:07:55.478Z',
      },
      updated_at: {
        $date: '2025-03-28T21:08:37.774Z',
      },
      __v: 0,
    },
  ];

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
                  value={t._id.$oid}
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
