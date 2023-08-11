import React from "react";
import s from './Paginaton.module.css'


type Pagination = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
}

export const Pagination = (props: Pagination) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= 30; i++) {
        pages.push(i)
    }

    return <div className={s.pages}>
            {pages.map((p, index) => {
                return <span key={index} className={props.currentPage === p ? s.selectedPage : ""}
                             onClick={(e) => props.onPageChanged(p)}>{p}</span>
            })}

        </div>
}

