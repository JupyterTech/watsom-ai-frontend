import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip, Modal, } from "flowbite-react"
import { HiDotsHorizontal, HiOutlineOfficeBuilding, HiOutlineMail, HiOutlinePhone, HiOutlineTrash } from "react-icons/hi";
import { MdOutlineLocationOn } from "react-icons/md";
import { removeUser, getUsersByFilter, getUserTotalCount } from '../../redux/userReducer';
import { openSnackBar } from '../../redux/snackBarReducer';
import swal from 'sweetalert2';
import date from 'date-and-time';
import { S3_BUCKET, S3_BUCKET_RESIZE } from '../../config/constants';
import EditUser from './EditUser';
import { useTranslation } from "react-i18next";

function HistoryTableItem(props) {
    const { t } = useTranslation();
    const { authState } = useSelector((state) => state);
    const { userInfo } = authState;

    const dispatch = useDispatch();

    const [modalShow, setModalShow] = useState(false);    //modal modalShow hide

    useEffect(() => {
        
    }, [])

    const clickDelete = () => {

    }

    const {  } = props.data;

    return (
        <>
            <tr className={props.last ? "bg-white" : "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"}>
                <th onClick={() => setModalShow(true)} scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="pl-3">
                        <div className="font-normal text-gray-500">{firstname + " " + lastname}</div>
                        <div className="text-base font-semibold">{email ? email : "N/A"}</div>
                    </div>
                </th>
                <td onClick={() => setModalShow(true)} className="py-4 px-2">
                    <div className="pl-3">
                        <div className="font-normal text-gray-500">{company.name}</div>
                        <div className="text-base font-semibold">{roleString[role]}</div>
                    </div>
                </td>
                <td onClick={() => setModalShow(true)} className="py-4 px-2">
                    <div className="pl-3">
                        <div className="font-normal text-gray-500">{t("created")}</div>
                        <div className="text-base font-semibold">{created_at ? date.format(new Date(created_at), 'YYYY/MM/DD HH:mm:ss') : "N/A"}</div>
                    </div>
                </td>
                
                <td className="py-4 px-2">
                    <Tooltip
                        style="light"
                        content={
                            <div >
                                <EditUser user={props.data} condition={props.condition} />
                                {/* 
                                <div onClick={() => gotoUserEditPage()} className="flex text-gray-600 p-1 cursor-pointer hover:bg-gray-100">
                                    <FaRegEdit className="h-5 w-5 ml-1 mr-2 text-gray-600" />
                                    Edit
                                </div> */}
                                {
                                    userInfo.role === 0 &&
                                    <div onClick={() => clickDelete(_id)} className="flex text-red-500 p-1 cursor-pointer hover:bg-gray-100">
                                        <HiOutlineTrash className="h-6 w-6 mr-2 text-red-500" />
                                        {t("delete")}
                                    </div>
                                }
                            </div>
                        }
                        placement="left"
                        arrow={false}
                        trigger="hover"
                    >
                        <HiDotsHorizontal className="w-6 h-6" />
                    </Tooltip>
                </td>
            </tr>
            <Modal
                show={modalShow}
                size="3xl"
                popup={true}
                onClose={() => setModalShow(false)}
            >
                <Modal.Header className="px-5 py-4">
                    {t("user_info")}
                </Modal.Header>
                <hr />
                <Modal.Body>
                    <div className="py-6 text-sitetx-200">
                        <div className="grid grid-cols-5 gap-4">
                            <div className="col-span-1 m-auto">
                                {
                                    avatar.changed_name ? 
                                        avatar.changed_name.indexOf(".svg") != -1 ? 
                                            <img className="w-auto h-auto rounded-full" src={`${S3_BUCKET}${avatar.changed_name ? avatar.changed_name : "user-empty.png"}`} alt="empty" />
                                        :   <img className="w-auto h-auto rounded-full" src={`${S3_BUCKET_RESIZE}${avatar.changed_name ? avatar.changed_name : "user-empty.png"}`} alt="empty" />
                                    :   <img className="w-auto h-auto rounded-full" src={`${S3_BUCKET_RESIZE}${avatar.changed_name ? avatar.changed_name : "user-empty.png"}`} alt="empty" />
                                }
                                {/* <img className="w-auto h-auto rounded-full" src={`${S3_BUCKET}${avatar.changed_name ? avatar.changed_name : "user-empty.png"}`} alt="empty" /> */}
                            </div>
                            <div className="col-span-4">
                                <div className="text-base font-semibold">{address?.postalcode + " " + address?.city}</div>
                                <div className="text-3xl font-bold">{firstname + " " + lastname}</div>

                                <div className="text-2xl font-bold pt-8 pb-2 flex"><HiOutlineOfficeBuilding className="w-6 h-6 my-auto" /> {t("company")}</div>
                                <div className="text-base">{company.name + ">" + roleString[role]}</div>

                                <div className="text-2xl font-bold pt-8 pb-2 flex"><MdOutlineLocationOn className="w-6 h-6 my-auto" /> {t("location")}</div>
                                <div className="text-base">{address.country.name[`${globalState.language}`] + ">" + address.city + ">" + address.street}</div>

                                <div className="col-span-1 flex py-2">
                                    <HiOutlineMail className="w-6 h-6" />
                                    {email ? email : "N/A"}
                                </div>
                                <div className="col-span-1 flex py-2">
                                    <HiOutlinePhone className="w-6 h-6" />
                                    {phone ? phone : "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <hr />
                <Modal.Footer>
                    <div className="flex items-center justify-end" style={{width:'100%'}}>
                        <div className="col-span-5 flex pl-12 gap-8">
                            {
                                userInfo.role === 0 &&
                                <div onClick={() => clickDelete(_id)} className="flex text-red-500 p-1 cursor-pointer hover:bg-gray-100">
                                <svg className="h-5 w-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5">
                                        <path stroke="red" stroke-linecap="round" stroke-linejoin="round" d="M18.0576 22.3846H5.94219C5.48317 22.3846 5.04294 22.2023 4.71836 21.8777C4.39377 21.5531 4.21143 21.1129 4.21143 20.6538V5.07692H19.7883V20.6538C19.7883 21.1129 19.606 21.5531 19.2814 21.8777C18.9568 22.2023 18.5166 22.3846 18.0576 22.3846Z"/>
                                        <path stroke="red" stroke-linecap="round" stroke-linejoin="round" d="M9.40381 17.1923V10.2692"/>
                                        <path stroke="red" stroke-linecap="round" stroke-linejoin="round" d="M14.5962 17.1923V10.2692"/>
                                        <path stroke="red" stroke-linecap="round" stroke-linejoin="round" d="M0.75 5.07692H23.25"/>
                                        <path stroke="red" stroke-linecap="round" stroke-linejoin="round" d="M14.5962 1.61539H9.40386C8.94484 1.61539 8.50461 1.79774 8.18003 2.12232C7.85544 2.4469 7.6731 2.88713 7.6731 3.34616V5.07693H16.3269V3.34616C16.3269 2.88713 16.1446 2.4469 15.82 2.12232C15.4954 1.79774 15.0552 1.61539 14.5962 1.61539Z"/></svg>
                                    {t("delete")}
                                </div>
                            }
                            <EditUser user={props.data} condition={props.condition} />
                        </div>

                        {/* </div><div className="col-span-3 flex gap-8 justify-end">
                        <label onClick={() => getPrevUser()} className="flex flex-col justify-center items-center float-right w-16 h-16 bg-white rounded-lg border-2 border-sitetx-100 cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-sitebg-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                <SlArrowLeft className="text-black h-6 w-6" />
                            </div>
                        </label>
                        <label onClick={() => getNextUser()} className="flex flex-col justify-center items-center float-right w-16 h-16 bg-white rounded-lg border-2 border-sitetx-100 cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-sitebg-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                <SlArrowRight className="text-black h-6 w-6" />
                            </div>
                        </label> */}
                    </div>
                </Modal.Footer>
            </Modal>
        </ >

    );
}

export default HistoryTableItem;