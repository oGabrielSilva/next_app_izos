import { NextApiRequest, NextApiResponse } from 'next';
import { TGender } from '../../../../context/addCharacter';
import Firebase from '../../../../firebase/Firebase';

export type TDataResponseUserDB = {
  gender: TGender;
  uid: string;
  birthday: string;
  lastname: string;
  username: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.query;

  if (req.method === 'GET') {
    const data = await Firebase.getProfileData(uid as string);
    res.status(200).json({ error: !data, data });
    return;
  }
  res.status(400);
}
