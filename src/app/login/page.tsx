"use client";
import { useEffect } from "react";
import Sdk from "casdoor-js-sdk";
import sdkConfig from "@/configs/casdoor";
import AuthLoading from "@/components/atoms/AuthLoading";
import logError from "@/utils/logError";
import Image from "next/image";

/**
 * Login page
 * @uses - casdoor
 * @constructor
 */
const Login = () => {
    const auth = () => {
        try {
            const casdoorSDK = new Sdk(sdkConfig);
            casdoorSDK.signin_redirect();
        } catch (err) {
            logError(err);
        }
    }

    return (
        <main className="flex flex-col h-full w-full justify-center items-center">
            <div className="flex flex-col">
                <div className="flex items-center mb-5 pb-4 border-b-[1px] border-b-white">
                    <h1 className="font-bold text-[1.5rem]">[ud]</h1>
                    <h1 className="ml-2 font-light">UNDETECTABLE AI</h1>
                </div>
                <button className="mb-5 p-3 rounded-lg outline-0 bg-gray-300 dark:bg-gray-950 text-sm" onClick={auth}>
                    Login to continue
                </button>
            </div>
        </main>
    )
};
export default Login;
