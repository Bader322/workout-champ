import { session } from '@/app/_types/types';
import { ObjectId } from 'bson';

export const createMissingObjIds = (data: session[]) => {
  data.forEach((datum) => {
    if (!datum._id) {
      datum._id = new ObjectId().toString();
    }
  });
};

export const prepareTemplate = (
  _id: string,
  title: string,
  description: string,
  sessions: session[]
) => {
  return {
    _id,
    title,
    description,
    sessions: sessions.map((session) => session._id),
  };
};
