import React from "react";

export default function MySelect(
    { 
        options, 
        defaultValue = "Сортировка", 
        value, 
        handleChange 
}) {
    return (
        <select 
            value={value} 
            onChange={
                e => handleChange(e.target.value)
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
                        {o.name}
                    </option>
                )
            }
        </select>
    )
}