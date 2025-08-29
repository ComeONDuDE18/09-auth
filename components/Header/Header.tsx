import React from 'react';
import css from './Header.module.css';
import Link from 'next/link';
import TagsMenu from '@/components/TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';


const Header = () => {


      return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <TagsMenu />
          <AuthNavigation/>
        </ul>
      </nav>
    </header>
  );
}
    export default Header;