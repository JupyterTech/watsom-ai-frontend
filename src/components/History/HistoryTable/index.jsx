import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';

import HistoryToolbar from "../HistoryToolbar";
import HistoryTablePagination from "../HistoryTablePagination";

function HistoryTable() {
    const { t } = useTranslation();
    const { authState, globalState } = useSelector((state) => state);
    const { userInfo } = authState;

    const dispatch = useDispatch();

    const [condition, setCondition] = useState({
        filter: "",
        showCount: 10,
        sortby: "Date Created",
        currentPage: 0,
        user_id: userInfo?.id
    });

    useEffect(() => {
        
    }, [])

    return (
        <div className="history-layout">
            <div className="table-scroll-container">
                <div className="table-container">
                    
                    <HistoryToolbar />

                    <div className="history-table">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-100 h-14" >
                                <tr>
                                    <td className="">
                                        <div className="pl-10">
                                            <div className="font-medium text-gray-500">{t("content_type")}</div>
                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="pl-10">
                                            <div className="font-medium text-gray-500">{t("tone")}</div>
                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="pl-10">
                                            <div className="font-medium text-gray-500">{t("output_count")}</div>
                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="pl-10">
                                            <div className="font-medium text-gray-500">{t("word_usage")}</div>
                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="pl-10">
                                            <div className="font-medium text-gray-500">{t("language")}</div>
                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="pl-10">
                                            <div className="font-medium text-gray-500">{t("created_at")}</div>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {
                                    usersByFilter && usersByFilter.length > 0 ? usersByFilter.map((data, index) =>
                                        <HistoryTableItem key={data._id} data={data} condition={condition} pos={index} last={usersByFilter.length === index + 1} />
                                    ) : <></>
                                } */}
                            </tbody>
                        </table>
                        {/* {
                            usersByFilter && usersByFilter.length > 0 ?<></>:<div className="text-gray-500 pb-5" style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', marginTop:'30px', fontFamily:'Inter', fontWeight:'500', fontSize:'20px'}}> 
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100" style={{height:'10rem'}} className=" mr-1">

                                <path className="st0" d="M8.3,51.9c0,22.1,17.9,40,40,40c22.1,0,40-17.9,40-40c0,0,0,0,0,0c0-22.1-17.9-40-40-40S8.3,29.8,8.3,51.9
                                    C8.3,51.9,8.3,51.9,8.3,51.9z"/>
                                <path className="st1" d="M22.2,68.4c0,2.4,9,4.4,20,4.4c11.1,0,20-2,20-4.4c0,0,0,0,0,0c0-2.4-9-4.4-20-4.4S22.2,65.9,22.2,68.4
                                    C22.2,68.4,22.2,68.4,22.2,68.4z"/>
                                <path className="st1" d="M64.9,25.2H21.7c-1,0-1.9,0.8-1.9,1.9l0,0v26.4h46.9V27.1C66.8,26,65.9,25.2,64.9,25.2z"/>
                                <path className="st2" d="M64.9,25.2H21.7c-1,0-1.9,0.8-1.9,1.9l0,0v26.4h46.9V27.1C66.8,26,65.9,25.2,64.9,25.2z"/>
                                <path className="st3" d="M71.7,41.7c0.3-1.3-0.6-2.6-1.9-2.9c-0.2,0-0.3,0-0.5,0h-32c-1.2,0-2.2-0.8-2.4-2l-0.7-3.4
                                    c-0.2-1.1-1.2-2-2.4-2H16.2c-1.3,0-2.4,1.1-2.4,2.4c0,0.2,0,0.3,0,0.5L20.1,66c0.2,1.1,1.2,2,2.4,2h42c1.2,0,2.2-0.8,2.4-2
                                    C67.9,61,70.6,47.6,71.7,41.7z"/>
                                <path className="st2" d="M71.7,41.7c0.3-1.3-0.6-2.6-1.9-2.9c-0.2,0-0.3,0-0.5,0h-32c-1.2,0-2.2-0.8-2.4-2l-0.7-3.4
                                    c-0.2-1.1-1.2-2-2.4-2H16.2c-1.3,0-2.4,1.1-2.4,2.4c0,0.2,0,0.3,0,0.5L20.1,66c0.2,1.1,1.2,2,2.4,2h42c1.2,0,2.2-0.8,2.4-2
                                    C67.9,61,70.6,47.6,71.7,41.7z"/>
                                <path className="st4" d="M77.1,29.5c-0.5-0.1-0.7-0.6-0.6-1c0.1-0.3,0.3-0.6,0.6-0.6l8.1-2c0.5-0.1,0.9,0.2,1,0.6c0,0.1,0,0.1,0,0.2
                                    l0,3.9c0,0.5-0.4,0.9-0.9,0.9c-0.1,0-0.1,0-0.2,0L77.1,29.5z"/>
                                <path className="st4" d="M70.5,22.6c-0.4,0.2-0.9,0.1-1.2-0.3c-0.2-0.3-0.2-0.6,0-0.9l6.1-10c0.2-0.4,0.8-0.5,1.2-0.3
                                    c0.1,0,0.1,0.1,0.2,0.1l3.9,3.9c0.3,0.3,0.3,0.9,0,1.2c0,0-0.1,0.1-0.2,0.1L70.5,22.6z"/>
                                <path className="st4" d="M55.7,13.1c-0.1,0.5-0.6,0.7-1,0.6c-0.3-0.1-0.6-0.3-0.6-0.6l-2-8.1c-0.1-0.5,0.2-0.9,0.6-1c0.1,0,0.1,0,0.2,0
                                    l3.9,0c0.5,0,0.9,0.4,0.9,0.9c0,0.1,0,0.1,0,0.2L55.7,13.1z"/>
                                <path className="st4" d="M48.8,19.7c0.2,0.4,0.1,0.9-0.3,1.2c-0.3,0.2-0.6,0.2-0.9,0l-10-6.1c-0.4-0.2-0.5-0.8-0.3-1.2
                                    c0-0.1,0.1-0.1,0.1-0.2l3.9-3.9c0.3-0.3,0.9-0.3,1.2,0c0,0,0.1,0.1,0.1,0.2L48.8,19.7z"/>
                                <path className="st4" d="M68.3,76.3l3.6-3.6l6.4,6.4l-3.6,3.6L68.3,76.3z"/>
                                <path className="st1" d="M90.6,94.9L90.5,95c-1.5,1.4-3.8,1.4-5.3,0L73.7,83.6c-0.5-0.5-0.5-1.3,0-1.8l3.7-3.7c0.5-0.5,1.3-0.5,1.8,0
                                    l11.5,11.5C92.1,91,92.1,93.4,90.6,94.9C90.6,94.8,90.6,94.8,90.6,94.9z"/>
                                <path className="st2" d="M90.6,94.9L90.5,95c-1.5,1.4-3.8,1.4-5.3,0L73.7,83.6c-0.5-0.5-0.5-1.3,0-1.8l3.7-3.7c0.5-0.5,1.3-0.5,1.8,0
                                    l11.5,11.5C92.1,91,92.1,93.4,90.6,94.9C90.6,94.8,90.6,94.8,90.6,94.9z"/>
                                <path className="st5" d="M41,72.8c5.5,9.1,17.4,11.9,26.5,6.4s11.9-17.4,6.4-26.5s-17.4-11.9-26.5-6.4S35.5,63.7,41,72.8z"/>
                                <path className="st3" d="M68.3,51.8c6,6,6,15.8,0,21.8s-15.8,6-21.8,0s-6-15.8,0-21.8c0,0,0,0,0,0C52.6,45.8,62.3,45.8,68.3,51.8z"/>
                                <path className="st2" d="M68.3,51.8c6,6,6,15.8,0,21.8s-15.8,6-21.8,0s-6-15.8,0-21.8c0,0,0,0,0,0C52.6,45.8,62.3,45.8,68.3,51.8z"/>
                                <path className="st2" d="M50,68.4c2.6-4.4,8.2-5.9,12.6-3.4c1.5,0.8,2.7,2.1,3.5,3.5"/>
                                <path className="st2" d="M51.9,55.8l3.6,3.6"/>
                                <path className="st2" d="M51.9,59.4l3.6-3.6"/>
                                <path className="st2" d="M59.9,55.8l3.6,3.6"/>
                                <path className="st2" d="M59.9,59.4l3.6-3.6"/>
                            </svg>
                            <div className="text-indigo-500">
                                {t("nodata")}
                            </div>
                        </div>
                        } */}
                    </div>
                </div>
            </div>
            <HistoryTablePagination />
        </div>
    );
}

export default HistoryTable;