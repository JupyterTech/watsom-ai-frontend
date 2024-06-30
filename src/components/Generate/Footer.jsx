import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { setOutputCurrentLanguage } from '../../redux/globalReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { openSnackBar } from '../../redux/snackBarReducer';
import { useNavigate } from 'react-router-dom'
import { getAvailable } from '../../redux/authReducer';
import { setLoading } from '../../redux/globalReducer';
import { Button } from 'flowbite-react';

function Footer({
  type,
  data,
  generate,
  count_disable
}) {
  const { authState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userInfo, loggedIn } = authState;

  const [showCount, setShowCount] = useState(3);
  const [showLanguage, setShowLanguage] = useState("French");
  const output_count = [1,2,3,4,5];
  const output_language = ["French", "English", "Spanish"]
  
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function is_valid_date(){
    let now_date = Date.now();
    let plan_start = new Date(userInfo?.plan_start_date).getTime();
    let plan_finish = new Date(userInfo?.plan_finish_date).getTime();
  
    if(now_date <= plan_start){
      dispatch(openSnackBar({ status: "warning", message: t("please_set_exact_time") }))
      return false;
    } else if(now_date >= plan_finish){
      dispatch(openSnackBar({ status: "warning", message: t("finished_subscription_period") }))
      return false
    } else{
      return true
    }
  }

  async function is_available(){
    if(loggedIn == true && userInfo){   //login status
      if(userInfo?.is_verified){      //confirm mail
        if(!userInfo?.is_block){       //check blocked acc
          if(is_valid_date()){      //check in available period
            if(userInfo?.available_words_count <= 10){    //check usage words count
              dispatch(openSnackBar({ status: "warning", message: t("limit_usage_word") }))
              return false;
            } else if(userInfo?.available_words_count > 10){
              dispatch(setLoading(true))
              let res = await dispatch(getAvailable(userInfo))
              if(res.status == true){
                dispatch(setLoading(false))
                return true;
              }else{
                dispatch(setLoading(false))
                dispatch(openSnackBar({ status: "warning", message: t(res.result) }))
                return false;
              }
            } 
          }
        } else{
          dispatch(openSnackBar({ status: "warning", message: t("your_acc_was_blocked") }))
          return false;
        }
      } else{
        dispatch(openSnackBar({ status: "warning", message: t("please_confirm_mail") }))
        return false;
      }
    }else{
      dispatch(openSnackBar({ status: "warning", message: t("please_sign_in") }))
      navigate("/signin")
      return false;
    }
  }

  const clickGenerate = async () => {
    let available = await is_available()
    if(available == true){
      generate(data, showCount, type, showLanguage)
    }
  }

  const selectOutputLanguage = (lang) => {
    setShowLanguage(lang)
    dispatch(setOutputCurrentLanguage(lang))
  }

  // console.log(dimensions.width, dimensions.height)

  return (
    <div className="footer_style pt-4 border-gray-300">
      <div className='footer_main mx-4'>
        <div className='footer_attr'>
          <div className= {`flex gap-2 ${dimensions.width <= 1366 && "pb-2"}`}>
            <div className="footer_attr_label text-xl py-2 font-bold tracking-tight text-gray-900">
              N = 
            </div>

            <select className={`rounded-lg ${dimensions.width <= 1366 ? "w-32" : "w-20"} disabled:cursor-not-allowed`} onChange={(e)=>setShowCount(e.target.value)} defaultValue={count_disable ? 1 : showCount} disabled = {count_disable} >
              {
                output_count.map((data,index)=>
                  <option value={data} key={index}>{data}</option>
                )
              }
            </select>
          </div>

          <div className="flex gap-2">
            <div className="footer_attr_label text-xl py-2 font-bold tracking-tight text-gray-900">
              lang = 
            </div>

            <select className='rounded-lg w-32 disabled:cursor-not-allowed' onChange={(e)=>selectOutputLanguage(e.target.value)} defaultValue={showLanguage}>
              {
                output_language.map((data,index)=>
                  <option value={data} key={index}>{data}</option>
                )
              }
            </select>
          </div>
        </div>

        <div className="self-center">
          <Button onClick={() => clickGenerate()}>
            <div className=" px-4">{t("generate")}</div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Footer;