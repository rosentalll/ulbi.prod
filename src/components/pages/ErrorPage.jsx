import React from "react";
import cl from "./ErrorPage.module.css"

export default function Error() {
    return (
        <div className={cl.error}> 
            <h1 className={cl.error__title}>Произошла серьёзная ошибка...</h1>
        </div>
    )
}