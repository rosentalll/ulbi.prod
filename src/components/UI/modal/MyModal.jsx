import React from "react";
import cl from "./MyModal.module.css"

export default function MyModal({ children, modal, setModal }) {
   return (
    <div 
        className={
            modal ? 
            `${cl.myModal} ${cl.active}`
            :
            `${cl.myModal}`
        }
        onClick={() => setModal(false)}
    >
        <div 
            className={cl.myModalContent}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    </div>
   )
}