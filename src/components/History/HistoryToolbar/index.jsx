import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

import PerPageCountSelect from "./PerPageCountSelect";
import SortbySelect from "./SortbySelect";
import FilterInput from "./FilterInput";

function HistoryToolbar(props) {
    const { t } = useTranslation();
    const { authState, globalState } = useSelector((state) => state);
    const { userInfo } = authState;

    useEffect(() => {

    })

    return (
        <div className="flex gap-8 justify-end py-4">
            <FilterInput />
            <PerPageCountSelect />
            <SortbySelect />
        </div>
    );
}

export default HistoryToolbar;
