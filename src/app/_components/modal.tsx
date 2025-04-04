'use client';
import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectTemplate } from '@/redux/slices/workout-template-choiceSlice';
import { getTemplates } from '@/redux/slices/workout-templateSlice';
import { clearTemplates } from '@/redux/slices/workout-templateSlice';
import {
  clearAllSessions,
  getSessionsByTemplateId,
} from '@/redux/slices/accessorySessionSlices';

type ModalProps = {
  showModalBtnText: string;
  Template: React.FC;
};

const Modal: React.FC<ModalProps> = ({ showModalBtnText, Template }) => {
  const dispatch = useAppDispatch();
  const dateSelected = useAppSelector((state) => state.sessionDate);
  const selectedTemplateId = useAppSelector((state) => state.tempChoice._id);
  const disabledBtn = useAppSelector(
    (state) => state.tempChoice.disabledActionBtn
  );
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if (!open) {
      dispatch(selectTemplate({ _id: '', disabledActionBtn: true }));
      setTimeout(() => dispatch(clearTemplates()), 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          dispatch(getTemplates());
        }}
        className='bg-indigo-100 text-black font-semibold'
      >
        {showModalBtnText}
      </Button>
      <Dialog open={open} handler={handleOpen} className='rounded-xl'>
        <DialogBody>
          <Template/>
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={handleOpen}
            className='mr-1'
          >
            <span>Go Back</span>
          </Button>
          <Button
            variant='gradient'
            color='green'
            onClick={() => {
              handleOpen();
              dispatch(clearAllSessions());
              dispatch(getSessionsByTemplateId(selectedTemplateId));
            }}
            disabled={disabledBtn}
          >
            <span>Apply to {dateSelected}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Modal;
