import type { NextApiRequest, NextApiResponse } from 'next';
import Firebase from '../../../firebase/Firebase';

export type ProfileResponseData = {
  error: boolean;
  url: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileResponseData>
) {
  if (req.method === 'POST') {
    const { profile, uid } = JSON.parse(req.body);
    if (profile && uid) {
      const response = await Firebase.uploadProfile(profile, 'uploads/images/profile', uid);
      if (response.error.code === '400') {
        res.status(200).json({ error: true, url: '' });
        return;
      }
      res.status(200).json({ error: false, url: response.url });
    }
    res.status(200).json({ error: true, url: '' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
};
