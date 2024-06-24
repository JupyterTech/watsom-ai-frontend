import { Button } from 'flowbite-react';
import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { FiCopy } from "react-icons/fi"
import { AiOutlineFileAdd, AiOutlineCloseCircle } from 'react-icons/ai';
import copy from 'copy-to-clipboard';
import { openSnackBar } from '../../redux/snackBarReducer';
import { setCurrentDocument } from '../../redux/globalReducer';
import { useDispatch, useSelector } from "react-redux";
import wordsCounter from 'word-counting'

function EditButtonGroup({
  content, index, removeContent, type //type is for customize the markdown content
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const copyContent = () => {
    copy(content);

    dispatch(openSnackBar({ message: "Success Copied", status: 'success' }));
  }

  const addDocument = () => {
    let tmp_content = content

    if(type == "blog_idea_outline"){
      tmp_content = tmp_content.replace("Title:\n", "**Title:**\n## ")
      tmp_content = tmp_content.replace("Outline:", "**Outline:**")
      tmp_content = tmp_content.replace(/keywords: /g, "*keywords:* ")
      tmp_content = tmp_content.replace("1. ", "### 1. ")
      tmp_content = tmp_content.replace("2. ", "### 2. ")
      tmp_content = tmp_content.replace("3. ", "### 3. ")
      tmp_content = tmp_content.replace("4. ", "### 4. ")
      tmp_content = tmp_content.replace("5. ", "### 5. ")
    }

    dispatch(setCurrentDocument(tmp_content))
  }

  const remove = () => {
    removeContent(index)
  }

  return (
    <div className='flex gap-4'>
      <Button onClick={()=>copyContent()} size="xs" color="white" className='border-2 border-gray-200'>
        <FiCopy className='mr-2' />
        Copy  
      </Button>
      <Button onClick={()=>addDocument()} size="xs" color="white" className='border-2 border-gray-200'>
        <AiOutlineFileAdd className='mr-2' />
        Add to Document
      </Button>
      <Button onClick={()=>remove()} size="xs" color="white" className='border-2 border-gray-200'>
        <AiOutlineCloseCircle className='mr-2' />
        Remove
      </Button>
      <div className='text-xs text-gray-300 self-center'>
        {wordsCounter(content).wordsCount} {t("words")} • {content.length} {t("characters")}
      </div>
    </div>
  );
}

export default EditButtonGroup;