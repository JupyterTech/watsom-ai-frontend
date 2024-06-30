import React, { useState } from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor/updated'
import Footer from '../../../components/Generate/Footer';

import GoogleBusinessPost from '../../../components/Generate/SocialMedia/GoogleBusinessPost';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import { generateGoogleBusinessPost } from '../../../redux/template/social_media';
import { setLoading, setCurrentDocument } from '../../../redux/globalReducer';
import { saveContentHistory } from '../../../redux/contentHistoryReducer';

import { updateToken } from '../../../redux/authReducer';
import { getWordsCount } from '../../../utils';

export default function GoogleBusinessPostPage() {
  const { globalState, authState } = useSelector((state) => state);
  const { loading } = globalState;
  const { userToken, userInfo } = authState;
  const { t } = useTranslation();

  const output_post_type = [t("post_event"), t("post_offer"),t("post_update")];

  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState(0);
  const [post_type, setPostType] = useState(0);
  const [result, setResult] = useState([]);

  const dispatch = useDispatch();

  const validate = (data) => {
    const {keywords} = data
    
    if(!keywords){
      dispatch(openSnackBar({ message: t("msg_please_input_short_description"), status: 'error' }));
      return false;
    }
    return true;
  }

  const generate = async (data, count, type, lang) => {
    if(!loading){
      let is_valid = validate(data);
  
      if(is_valid){
        dispatch(setLoading(true));
        const { keywords, tone, post_type } = data;
        
        const sendData = {
          keywords:keywords,
          tone:tone,
          token: userToken,
          post_type:post_type,
          output:count,
          lang:lang,
        }
  
        let res = await dispatch(generateGoogleBusinessPost(sendData));
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
            res.result.map(content => {
              customized_result.push({content, word_usage: getWordsCount(content)})
              total_word_usage += getWordsCount(content)
            })

            const saveContentData = {
              created_by: userInfo?.id,
              service_type: type,
              first_field: output_post_type[post_type],
              second_field: keywords,
              third_field: "",
              tone: tone,
              language: lang,
              output_count: count,
              contents: customized_result,
              total_word_usage
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
                title={t("google_business_post")}
                content={t("google_business_post_content")}
              />
              <GoogleBusinessPost 
                func_SetKeywords = {setKeywords}
                func_SetTone = {setTone}
                func_SetPostType = {setPostType}
                result = {result}
              />
              <Footer 
                type = "google_business_post"
                data = {{keywords: keywords, tone: tone, post_type: post_type}}
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
