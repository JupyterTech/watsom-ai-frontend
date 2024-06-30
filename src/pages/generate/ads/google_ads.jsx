import React, { useState } from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor/updated'
import Footer from '../../../components/Generate/Footer';

import GoogleAds from '../../../components/Generate/Ads/GoogleAds';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import { generateGoogleAds } from '../../../redux/template/ads';
import { setLoading, setCurrentDocument } from '../../../redux/globalReducer';
import { saveContentHistory } from '../../../redux/contentHistoryReducer';

import { updateToken } from '../../../redux/authReducer';
import { getWordsCount } from '../../../utils';

export default function GoogleAdsPage() {
  const { globalState, authState } = useSelector((state) => state);
  const { loading } = globalState;
  const { userToken, userInfo } = authState;
  const { t } = useTranslation();


  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState(0);
  const [result, setResult] = useState([]);

  const dispatch = useDispatch();

  const validate = (data) => {
    const {title, keywords} = data

    if(!title){
      dispatch(openSnackBar({ message: t("msg_please_input_short_description"), status: 'error' }));
      return false;
    }else if(!keywords){
      dispatch(openSnackBar({ message: t("msg_please_input_keywords"), status: 'error' }));
      return false;
    }
    return true;
  }

  const generate = async (data, count, type, lang) => {
    if(!loading){
      let is_valid = validate(data);
  
      if(is_valid){
        dispatch(setLoading(true));
        const { title, keywords, tone } = data;
        
        const sendData = {
          title:title,
          keywords:keywords,
          tone:tone,
          token: userToken,
          output:count,
          lang:lang,
        }
  
        let res = await dispatch(generateGoogleAds(sendData));
        if(res != false){
          dispatch(setLoading(false));
          if(res.result == false){
            dispatch(openSnackBar({ message: t(res.message) , status: 'error' }));  
          }else{
            setResult(res.result)
            dispatch(updateToken(res.token))
            // console.log(res.token)

            let customized_result = []
            let total_word_usage = 0
            let search_field = ""
            res.result.map(content => {
              customized_result.push({content, word_usage: getWordsCount(content)})
              total_word_usage += getWordsCount(content)
              search_field += content + " "
            })

            const saveContentData = {
              created_by: userInfo?.id,
              service_type: type,
              first_field: title,
              second_field: keywords,
              third_field: "",
              tone: tone,
              language: lang,
              output_count: count,
              contents: customized_result,
              total_word_usage,
              search_field
            }

            dispatch(saveContentHistory(saveContentData))
          }
        }else{
          dispatch(setLoading(false));
          dispatch(openSnackBar({ message: t("server_connection_error"), status: 'error' }));
        }
      }
    }
  }

  return (
    <div>
      <div className='flex h-full bg-gray-100'>
        <div className="generate_sidebar" >
          <Sidebar/>
        </div>
        <div className="generate_body" >
          <div className='generate_body_main'>
            <div className='generate_input border-gray-300 my-4 ml-8 bg-white' style={{borderWidth: "1px", borderRadius: '25px'}}>
              <Header 
                title={t("google_ads")}
                content={t("google_ads_content")}
              />
              <GoogleAds 
                func_SetTitle = {setTitle}
                func_SetKeywords = {setKeywords}
                func_SetTone = {setTone}
                result = {result}
              />
              <Footer 
                type = "google_ads"
                data = {{title: title, keywords: keywords, tone: tone}}
                generate = {generate}
              />
            </div>
            <div className='generate_editor'>
              <DocEditor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
