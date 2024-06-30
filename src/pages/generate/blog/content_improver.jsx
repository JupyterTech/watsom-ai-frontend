import React, {useState} from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor/updated'
import Footer from '../../../components/Generate/Footer';

import { contentImprover } from '../../../redux/template/blog';

import ContentImprover from '../../../components/Generate/Blog/ContentImprover';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from '../../../redux/globalReducer';
import { updateToken } from '../../../redux/authReducer';
import { getWordsCount } from '../../../utils';
import { saveContentHistory } from '../../../redux/contentHistoryReducer';

export default function ContentImproverPage() {
  const { blogState, globalState, authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { contentImproverState } = blogState;
  const { loading } = globalState;
  const { userToken, userInfo } = authState;

  const [contents, setContents] = useState("")
  const [tone, setTone] = useState(0);
  const [result, setResult] = useState([]);

  const validate = (data) => {
    const {contents} = data

    if(!contents){
      dispatch(openSnackBar({ message: t("msg_please_input_contents"), status: 'error' }));
      return false;
    }
    return true;
  }

  const generate = async (data, count, type, lang) => {
    if(!loading){
      let is_valid = validate(data);

      if(is_valid){
        dispatch(setLoading(true));

        const { contents, tone } = data;
        // console.log("contents", contents)
        // console.log("tone", tone)

        const sendData = {
          output:count,
          lang:lang,
          type:type,
          content:contents,
          tone:tone,
          token: userToken,
        }

        let res = await dispatch(contentImprover(sendData));
        if(res != false){
          dispatch(setLoading(false));
          // console.log("res", res);
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
              first_field: contents,
              second_field: "",
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
          dispatch(openSnackBar({ message: t("server_connection_error") , status: 'error' }));
        }
      }
    }
  }

  return (
    <>
      <div>
        <div className='flex h-full bg-gray-100'>
          <div className="generate_sidebar">
            <Sidebar/>
          </div>
          <div className="generate_body">
            <div className='generate_body_main'>
              <div className='generate_input border-gray-300 my-4 ml-8 bg-white' style={{borderWidth: "1px", borderRadius: '25px'}}>
                <Header 
                  title={t("content_improver")}
                  content={t("content_improver_content")}
                />
                <ContentImprover 
                  func_SetContents={setContents}
                  func_SetTone = {setTone}
                  result = {result}
                />
                <Footer 
                  type = "content_improver"
                  data = {{contents: contents, tone: tone}}
                  generate = {generate}
                  count_disable = {false}
                />
              </div>
              <div className='generate_editor'>
                <DocEditor />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
