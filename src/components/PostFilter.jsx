import React from "react";
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/MyInput";

export default function PostFilter({ filter, setFilter }) {
    return (
        <div>
            <MyInput 
                placeholder="Поиск..." 
                value={filter.query}
                onChange={
                    e => setFilter(
                        {...filter, query: e.target.value}
                    )
                }
            />
            <MySelect 
                value={filter.sort}
                sortPosts={
                    value => setFilter(
                        {...filter, sort: value}
                    )
                }
                defaultValue="Сортировка"
                options={[
                    {value: "title", label: "По заголовку"},
                    {value: "content", label: "По содержанию"}
                ]}
            />
      </div>
    )
}