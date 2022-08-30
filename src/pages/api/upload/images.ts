import { uuidv4 } from '@firebase/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import Firebase from '../../../firebase/Firebase';
import Persona from '../../../Model/Persona';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const json = JSON.parse(req.body);
    const persona = new Persona(
      json.profile,
      json.name,
      json.title,
      json.gender,
      json.presentation,
      json.origin,
      json.details,
      json.history,
      json.id,
      json.userUid
    );
    res.status(200).json({ name: 'John Doe' });
    Firebase.uploadImage(json.profile, 'test', uuidv4());
    return;
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
};
