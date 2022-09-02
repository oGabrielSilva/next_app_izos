import type { NextApiRequest, NextApiResponse } from 'next';
import Firebase from '../../../firebase/Firebase';
import User from '../../../Model/User';

type ProfileUploadResponse = {
  error: boolean;
  user: User | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileUploadResponse>
) {
  if (req.method === 'POST') {
    const { user } = JSON.parse(req.body);
    const userModel = new User(
      user.uid,
      null,
      user.gender,
      user.username,
      null,
      user.lastname,
      null,
      user.birthday
    );
    if (!userModel.validation(true)) {
      res.status(200).json({ error: true, user: null });
      return;
    }
    await Firebase.updateProfile(userModel);
    res.status(200).json({ error: false, user: userModel });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
};
