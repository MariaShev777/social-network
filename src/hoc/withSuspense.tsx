import React, {ComponentType} from "react";
import {Preloader} from "components/Common/preloader/Preloader";


export function withSuspense<T>(Component: ComponentType<T>) {

    return ({...restProps}) => {
        return <React.Suspense fallback={<Preloader/>}>
            <Component {...restProps as T}/>
        </React.Suspense>;
    };

}