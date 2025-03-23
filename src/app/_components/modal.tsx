"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Template from "./workout-template";

type ModalProps = {
  showModalBtnText: string;
};

const Modal: React.FC<ModalProps> = ({ showModalBtnText }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Button onClick={handleOpen} className="bg-indigo-100 text-black font-semibold">
        {showModalBtnText}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
      <Template />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Modal;
