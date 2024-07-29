import React from "react";
import cl from "./MyModal.module.css"

export default function MyModal({ children, visible, setVisible }) {
    return (
        <div 
            className={
                visible ?
                `${cl.myModal} ${cl.active}` 
                    : 
                `${cl.myModal}`
            }
            onClick={
                () => setVisible(false)
            }
        >
            <div 
                className={cl.myModalContent} 
                onClick={
                    e => e.stopPropagation()
                }
            >
                {children}
            </div>
        </div>
    )
}