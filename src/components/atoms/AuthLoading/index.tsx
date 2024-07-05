import React from 'react';

const AuthLoading = (): JSX.Element => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="text-[2rem]">Please wait...</h1>
            <h2>while we are logging you in</h2>
        </div>
    )
}
export default AuthLoading;
