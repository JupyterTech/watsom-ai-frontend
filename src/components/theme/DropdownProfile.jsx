import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../utils/Transition';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authReducer';
import { openSnackBar } from '../../redux/snackBarReducer';
import { useNavigate } from 'react-router-dom'

import UserAvatar from '../../images/user-avatar-32.png';

import { useTranslation } from "react-i18next";

function DropdownProfile({
  align,
  removeText
}) {
  const { authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedIn, userInfo } = authState

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const signout = () => {
    dispatch(logout())
    dispatch(openSnackBar({ status: "success", message: t("msg_success_logout") }))

    navigate("/template")

    setDropdownOpen(!dropdownOpen)
  }

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img className={`${!removeText ? "w-8" : "w-10"} h-auto rounded-full`} src={UserAvatar} width="32" height="32" alt="User" />
        {
          !removeText && 
          <div className="flex items-center truncate">
            <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800">WatSom AI</span>
            <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div>
        }
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0 w-max' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          {
            loggedIn && 
            <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
              <div className="font-medium text-slate-800">{userInfo?.name}</div>
              <div className="text-xs text-slate-500 italic">{userInfo?.email}</div>
            </div>
          }
          <ul>
            {
              loggedIn && 
              <>
                <li>
                  <Link
                    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                    to="/subscription"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {t("subscription")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                    to="/setting"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {t("setting")}
                  </Link>
                </li>
              </>
            }
            <li>
              {
                loggedIn == false ? 
                  <Link
                    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                    to="/signin"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {t("sign_in")}
                  </Link>
                : <Link
                    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                    onClick={() => signout()}
                  >
                    {t("sign_out")}
                  </Link>
              }
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default DropdownProfile;