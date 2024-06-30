import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";

function PerPageCountSelect({
  selectPerPageCount
}) {
  const { t } = useTranslation();

  const [showPerPageCount, setShowPerPageCount] = useState(0);
  const perpage_count = ["10", "20", "50", "100"]
  
  const changeSelect = (index) => {
    setShowPerPageCount(index);
    selectPerPageCount(index);
  }

  return (
    <div>
      <select className='rounded-lg w-full' onChange={(e)=>changeSelect(e.target.value)} defaultValue={showPerPageCount}>
        {
          perpage_count.map((data,index)=>
            <option value={index} key={index} >{data}</option>
          )
        }
      </select>
    </div>
  );
}

export default PerPageCountSelect;