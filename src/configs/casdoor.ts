const sdkConfig = {
    serverUrl: process.env.NEXT_PUBLIC_CASDOOR_SERVER_URL as string,
    clientId: process.env.NEXT_PUBLIC_CASDOOR_CLIENT_ID as string,
    organizationName: process.env.NEXT_PUBLIC_CASDOOR_ORG_NAME as string,
    appName: process.env.NEXT_PUBLIC_CASDOOR_APP_NAME as string,
    redirectPath: process.env.NEXT_PUBLIC_CASDOOR_REDIRECT_PATH as string,
};

export default sdkConfig;
