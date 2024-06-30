import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";

function SortbySelect({
  selectSortby
}) {
  const { t } = useTranslation();

  const [showSortby, setShowSortby] = useState(0);
  const sortby = [t("date_created"), t("content_type"), t("language")]
  
  const changeSelect = (index) => {
    setShowSortby(index);
    selectSortby(index);
  }

  return (
    <div>
      <select className='rounded-lg w-full' onChange={(e)=>changeSelect(e.target.value)} defaultValue={showSortby}>
        {
          sortby.map((data,index)=>
            <option value={index} key={index} >{data}</option>
          )
        }
      </select>
    </div>
  );
}

export default SortbySelect;