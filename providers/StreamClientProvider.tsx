'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';

import Loader from '@/components/Loader';
import { useAuthContext } from '@/context/AuthContext';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const {user, accessToken} = useAuthContext();

  useEffect(() => {
    if (!user || !accessToken) return;
    if (!API_KEY) throw new Error('Stream API key is missing');

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id.toString(),
        name: user?.name || user?.id.toString(),
      },
      token: accessToken
    });
    console.log('User:', user);
    console.log('Access Token:', accessToken);
    setVideoClient(client);
  }, [user]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;