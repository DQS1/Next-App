import Image from 'next/image';
import { ModeToggle } from '~/components/mode-theme';

export default function Home() {
  return (
    <main>
      <div className=' h-[38px] w-[38px] overflow-hidden rounded-full  bg-pink-400  '>
        <Image
          src='/images/nature.jpg'
          width={300}
          height={300}
          alt='nature'
          className='h-[100%] w-[100%] object-cover'
        />
      </div>
      <ModeToggle />
    </main>
  );
}
