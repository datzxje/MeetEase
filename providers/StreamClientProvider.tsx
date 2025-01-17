'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';

import Loader from '@/components/Loader';
import { useAuthContext } from '@/context/AuthContext';
import { tokenProvider } from '@/actions/stream.actions';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const initializeClient = async () => {
      if (!user) return;
      if (!API_KEY) {
        console.error('Stream API key is missing');
        return;
      }

      try {
        const client = new StreamVideoClient({
          apiKey: API_KEY,
          user: {
            id: user.id.toString(),
            name: user.name,
          },
          tokenProvider: () => tokenProvider(user.id.toString()),
        });

        setVideoClient(client);
      } catch (error) {
        console.error('Error initializing StreamVideoClient:', error);
      }
    };

    initializeClient();
  }, [user]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;