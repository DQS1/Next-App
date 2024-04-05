import Link from 'next/link';
import React from 'react';
import ButtonLogout from '~/components/button-logout';
import { ModeToggle } from '~/components/mode-theme';

function Header() {
  return (
    <div className='flex gap-2'>
      <ul className='flex gap-2'>
        <li>
          <Link href='/login'>Login</Link>
        </li>
        <li>
          <Link href='/register'>Register</Link>
        </li>
        <li>
          <ButtonLogout />
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
}

export default Header;
