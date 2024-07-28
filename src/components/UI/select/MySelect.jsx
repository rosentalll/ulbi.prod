import React from "react";

export default function MySelect(
    { 
        options, 
        defaultValue = "Сортировка", 
        value, 
        sortPosts 
}) {
    return (
        <select 
            value={value} 
            onChange={
                e => sortPosts(e.target.value)
            }
        >
            <option value="" disabled>
                {defaultValue}
            </option>
            {
                options.map(o => 
                    <option 
                        value={o.value} 
                        key={o.value}
                    >
                        {o.label}
                    </option>
                )
            }
        </select>
    )
}