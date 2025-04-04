'use client';
import { RootState } from '@/app/_types/types';
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { Save } from 'lucide-react';
import {
  saveSessions,
  deleteSessions,
  saveSessionsAsTemplate,
} from '@/redux/slices/accessorySessionSlices';
import { Checkbox } from '@material-tailwind/react';

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector((state: RootState) => state.sessions) || [];
  const sessionDate = useAppSelector((state) => state.sessionDate);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const sessionsToSave = useAppSelector((state: RootState) => state.sessions)
    ?.filter((session) => !session.markForRemoval)
    .map((s) => {
      return {
        ...s,
        date: sessionDate,
      };
    });
  const dayVolume = useAppSelector((state: RootState) =>
    state.sessions?.map((s) => s.volume).reduce((acc, item) => (acc += item), 0)
  );
  const ObjIdsToDelete = sessions
    ?.map((session) => (session.markForRemoval === true ? session._id : ''))
    .filter((id) => !!id);

  const handleSave = async () => {
    if (sessionsToSave.length === 0 && ObjIdsToDelete.length > 0) {
      await dispatch(deleteSessions(ObjIdsToDelete)).unwrap();
    } else if (ObjIdsToDelete.length === 0 && sessionsToSave.length > 0) {
      if (saveAsTemplate) {
        await dispatch(saveSessionsAsTemplate(sessionsToSave)).unwrap();
      }
      else {
        await dispatch(saveSessions(sessionsToSave)).unwrap();
      }
    } else if (ObjIdsToDelete.length > 0 && sessionsToSave.length > 0) {
      if (saveAsTemplate) {
        await dispatch(saveSessionsAsTemplate(sessionsToSave)).unwrap();
        await dispatch(deleteSessions(ObjIdsToDelete)).unwrap();
      }
      else {
        await dispatch(saveSessions(sessionsToSave)).unwrap();
        await dispatch(deleteSessions(ObjIdsToDelete)).unwrap();
      }
    }
  };
  

  return (
    <>
      {sessions.length > 0 && (
        <>
          <div className='flex gap-4 items-center justify-between py-6 px-6 text-center'>
            <p className='w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              Training Volume: {dayVolume}
            </p>
          <div className='flex items-center flex-col items-center'>
          <Checkbox onChange={(e) => setSaveAsTemplate(e.target.checked)}  label='Save as template' checked={saveAsTemplate} />
          
            <button onClick={handleSave} className='flex items-center gap-2'>
              <Save className='cursor-pointer text-green-600' />
              <span className='text-green-600'>Save Changes</span>
            </button>
            </div>

            {/* <button onClick={handleSave} className='flex items-center gap-2'>
            <Save className='cursor-pointer text-green-600' />
            <span className='text-green-600'>Save Changes - As a new template</span>
          </button> */}
          </div>
          <div>
          </div>
        </>
      )}
    </>
  );
};

export default Footer;
