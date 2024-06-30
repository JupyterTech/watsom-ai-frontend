import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";

function SortbySelect({setCondition, getData, condition}) {
  const { t } = useTranslation();

  const [showSortby, setShowSortby] = useState(0);
  const sortby = [t("date_created"), t("content_type"), t("language")]
  
  const default_sort = ["Date Created", "Content Type", "Language"]

  const changeSelect = (index) => {
    setShowSortby(index);

    setCondition("sortby", default_sort[index]);
    setCondition("currentPage", 0);
    getData();
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