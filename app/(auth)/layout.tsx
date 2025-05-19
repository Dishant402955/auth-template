import React from "react";
import "@/app/globals.css";
import type {Metadata} from "next";

export const metadata :Metadata = {
    title : "Authentication Pages",
    description : "This are the authentication pages which includes login, register, ..."
}

const AuthLayout = ({children} : {children : React.ReactNode}) => {
    return (
            <div className={"flex h-full bg-radial from-emerald-100 to-emerald-800 justify-center items-center"}>
                {children}
            </div>
    );
}

export default  AuthLayout;