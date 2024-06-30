import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { TextInput } from 'flowbite-react';
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch } from "react-redux";

function FilterInput({setCondition, getData, condition}) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");   //search bar text 

  const changeSearch = (e) => {
    setSearch(e.target.value);
    
    setCondition("filter", e.target.value);
    setCondition("currentPage", 0);
    getData();
  }

  return (
    <div>
        <TextInput
          id="searchProduct"
          type="search"
          sizing="md"
          placeholder={t("search_history")}
          required={true}
          icon={HiOutlineSearch}
          value={search}
          onChange={(e) => changeSearch(e)}
        />
    </div>
  );
}

export default FilterInput;