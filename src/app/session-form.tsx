'use client';
import { RootState } from '@/app/_types/types';
import React from 'react';
import RecordSession from './_components/record-session';
import { useAppSelector } from '@/redux/store';
import AccessorySessions from './_components/accessory-sessions';
import { Spinner } from 'flowbite-react';

const SessionForm: React.FC = () => {
  const sessions = useAppSelector((state: RootState) => state.sessions) || [];
  return (
    <>
        <div>
          <RecordSession />
        </div>
        {sessions.length > 0 ? (
          <>
            <AccessorySessions />
          </>
        ) : (
          <div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
            <p className='text-gray-500 text-lg font-medium'>
              Use the form above to add a new session Or.. <br />
              Select date above to view previous sessions
            </p>
            <Spinner id='loadingSpinner' size={'lg'} color='warning' />
          </div>
        )}
    </>
  );
};

export default SessionForm;
