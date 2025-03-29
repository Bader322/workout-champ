'use client';
import { Datepicker } from 'flowbite-react';
import { useAppDispatch } from '@/redux/store';
import {
  getSessionList,
  clearAllSessions,
} from '@/redux/slices/accessorySessionSlices';
import Modal from './_components/modal';
import { update } from '@/redux/slices/sessionsDateSlice';
import { useEffect } from 'react';
import Template from './_components/workout-template';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const getTodaysSessions = (date: string) => {
    dispatch(update(date));
    dispatch(clearAllSessions());
    dispatch(getSessionList(date));
  };

  useEffect(
    () => {
      getTodaysSessions(new Date().toLocaleDateString('en-CA'));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div
      id='header'
      className='relative z-10 flex justify-between items-center p-4 text-white'
    >
      <div id='datePicker' className='relative z-20'>
        <Datepicker
          onChange={(date: Date | null) => {
            if (!date) {
              date = new Date();
            }
            const formattedDate = date.toLocaleDateString('en-CA');
            getTodaysSessions(formattedDate);
          }}
        />
      </div>
      <div className='relative z-30'>
        <Modal showModalBtnText={'Show Templates'} Template={Template}  />
      </div>
    </div>
  );
};

export default Header;
