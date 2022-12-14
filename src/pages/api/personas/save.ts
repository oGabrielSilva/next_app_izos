import type { NextApiRequest, NextApiResponse } from 'next';
import Firebase from '../../../firebase/Firebase';
import Persona from '../../../Model/Persona';

type Data = {
  error: boolean;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const json = JSON.parse(req.body);
    console.log(json);
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
    if (!persona.isValid()) {
      res.status(400).json({ error: true, message: 'Persona validation failed' });
      return;
    }
    await Firebase.savePersona(persona);
    Firebase.uploadImage(persona.getProfile()!, 'personas', persona.getUserUid()!, persona.getId());
    res.status(200).json({ error: false, message: 'Persona saves successfully' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
};
