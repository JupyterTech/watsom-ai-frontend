import React from 'react';

import Language from '../theme/DropdownLanguage';
import UserMenu from '../theme/DropdownProfile';
import Subscription from './Subscription';
import { useTranslation } from "react-i18next";
import { Link, useLocation } from 'react-router-dom';
import LogoText from '../../images/logo-text.png';

function Header({
  sidebarOpen,
  setSidebarOpen,
  isLogo
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const { pathname } = location;

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}

            {
              pathname.includes('template') &&
              <button
                className="text-slate-500 hover:text-slate-600 lg:hidden"
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
              >
                <span className="sr-only">{t("open_sidebar")}</span>
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="5" width="16" height="2" />
                  <rect x="4" y="11" width="16" height="2" />
                  <rect x="4" y="17" width="16" height="2" />
                </svg>
              </button>
            }

            {
              isLogo == true &&
              <Link to="/">          
                <img className="object-cover object-center h-10 w-40" src={LogoText} alt="Authentication" />
              </Link>
            }
          </div>

          {/* Header: Right side */}
          <div className="flex justify-between items-center w-full">
            {
              isLogo == false ?
              <Subscription /> : <div></div>
            }
            <div className='flex'>
            <Language align="right" />
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <UserMenu align="right" />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;