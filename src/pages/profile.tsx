import { getAuth, User } from 'firebase/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Container from '../components/Container';
import LoadingPage from '../components/LoadingPage';
import UpdateProfile from '../components/UpdateProfile';
import Firebase from '../firebase/Firebase';

const Profile: NextPage = () => {
  Firebase.app;
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
          setUser(user);
          setLoading(false);
        } else {
          router.push('/');
        }
      });
    }
  }, [loading, router]);

  return (
    <div>
      <Container>
        <main>{!loading ? <UpdateProfile user={user!} /> : <LoadingPage />}</main>
      </Container>
    </div>
  );
};

export default Profile;
