"use client";

import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from '@/hooks/useGetCalls';
import { useEffect, useState } from 'react';

const Home = () => {
  const [time, setTime] = useState(new Date());
  const { upcomingCalls } = useGetCalls();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(time);

  // Tìm cuộc gọi gần nhất trong upcomingCalls
  const nearestUpcomingCall = upcomingCalls?.sort((a, b) => 
    new Date(a.state.startsAt!).getTime() - new Date(b.state.startsAt!).getTime()
  )[0];

  // Format thời gian của cuộc gọi gần nhất (nếu có)
  const upcomingMeetingTime = nearestUpcomingCall 
    ? new Date(nearestUpcomingCall.state.startsAt!).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : "No Upcoming Meeting";

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
            {upcomingMeetingTime !== "No Upcoming Meeting"
              ? `Upcoming Meeting at ${upcomingMeetingTime}`
              : "No Upcoming Meeting"}
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {formattedTime}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {formattedDate}
            </p>
          </div>
        </div>
      </div>
      
      <MeetingTypeList />
    </section>
  );
};

export default Home;
