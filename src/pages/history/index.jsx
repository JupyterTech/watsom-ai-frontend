import { Button, TextInput } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../components/Template/Header';
import { useNavigate } from 'react-router-dom'
import dateFormat from "dateformat";

import { setLoading } from '../../redux/globalReducer';
import { openSnackBar } from '../../redux/snackBarReducer';

import HistoryToolbar from '../../components/History/HistoryToolbar';
import HistoryTable from '../../components/History/HistoryTable';

function History() {

  const { authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const { userToken, userInfo, loggedIn } = authState;
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    if(loggedIn != true){
      navigate("/")
    }
  }, [loggedIn]);

  return (
    <div>
        <Header isLogo={true}/>

        <div className='h-6 bg-site_light-100 text-white text-center text-sm font-bold w-full'>
            {t("future")} of WatSom 🎉
        </div>

        <div className='flex justify-center min-h-screen pt-[30px] px-[40px] '>
            <div className="w-2/3 min-w-3/5">
                <div className="w-full">
                    <HistoryTable />
                </div>
            </div>
        </div>
    </div>
  );
}

export default History;