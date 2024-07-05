"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import Sdk from "casdoor-js-sdk";
import sdkConfig from "@/configs/casdoor";
import AuthLoading from "@/components/atoms/AuthLoading";
import logError from "@/utils/logError";
import AuthApi from "@/services/api/users/auth";


/**
 * Casdoor authentication callback page
 * @uses - casdoor
 * @constructor
 */
const Auth = () => {
    const router = useRouter();
    useEffect(() => {
        auth();
    }, []);

    /**
     * Authentication handler
     */
    const auth = async () => {
        try {
            const CasdoorSDK = new Sdk(sdkConfig);
            const authResponse = await CasdoorSDK.exchangeForAccessToken();
            if (authResponse && authResponse.access_token) {
                const userInfo: any = await CasdoorSDK.getUserInfo(authResponse.access_token);
                Cookies.set("casdoorUser", JSON.stringify(userInfo));
                await AuthApi({
                    id: userInfo.sub,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatar: userInfo.picture
                });
                router.push("/");
            } else {
                router.push("/login");
            }
        } catch (err) {
            logError(err);
            router.push("/login");
        }
    }
    return <AuthLoading />
};
export default Auth;
