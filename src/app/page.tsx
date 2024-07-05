"use client"
import Cookies from "js-cookie";
import {useState} from "react";
import {useRouter} from "next/navigation";
import logError from "@/utils/logError";
import PostDocument from "@/services/api/documents/postDocument";
import Header from "@/components/atoms/Header";

const Page = () => {
    const router = useRouter()
    const user: any = Cookies.get("casdoorUser") ? JSON.parse(Cookies.get("casdoorUser") as string) : {};

    const [userText, setUserText] = useState<string>();
    const [error, setError] = useState<string | null>(null);
    const [score, setScore] = useState();
    const [isApiLoading, setIsApiLoading] = useState(false);

    const checkContent = async () => {
        try {
            setIsApiLoading(true);
            setError(null);
            if (userText) {
                const response = await PostDocument(userText, user.sub);
                setScore(response.score);
            } else {
                setError("Content is required");
            }
        } catch (err: any) {
            setError(err?.message || "Something went wrong");
            logError(err);
        } finally {
            setIsApiLoading(false);
        }
    }
    const resetScore = () => {
        setScore(undefined)
    }
    const getScoreClass = () => {
        let scoreClass = '';
        if (score === 0) {
            scoreClass = 'text-red-500';
        } else if (score === 100) {
            scoreClass = 'text-green-500';
        } else {
            scoreClass = 'text-yellow-500';
        }
        return scoreClass;
    }

    return (
        <main className="flex flex-col h-full w-full">
            <Header />
            <div className="flex w-full h-full justify-center items-center p-2">
                <div className="flex flex-col">
                    <div className="mb-5 flex justify-between items-center">
                        <div>
                            <h2>UNDETECTABLE.AI</h2>
                            <p className="text-gray-400 p-0">A Simple ai generated content detector</p>
                        </div>
                        <button className="bg-gray-300 dark:bg-gray-950 py-3 px-6 text-sm rounded-lg" onClick={() => router.push('/documents')}>
                            Documents
                        </button>
                    </div>
                    <div className="rounded-lg overflow-hidden dark:bg-gray-900 bg-gray-200">
                        {!score ?
                            <textarea
                                value={userText}
                                onChange={({target}) => setUserText(target.value)}
                                cols={30} rows={10}

                                className="sm:w-[40rem] h-[20rem] color-dark outline-0 text-black p-4 resize-none"
                            /> :
                            <div className={`sm:w-[40rem] h-[20rem] overflow-auto p-4 border-b-[1px] dark:border-black border-white cursor-pointer ${getScoreClass()}`} onClick={resetScore}>
                                {userText}
                            </div>
                        }
                        <div className="flex p-4 sm:px-7 sm:py-4 text-gray-300 justify-between items-center">
                            <div>{score && <h1 className="dark:text-white text-black">Score: <span className={getScoreClass()}>{score}</span></h1>}</div>
                            <button
                                onClick={score ? resetScore : checkContent}
                                disabled={isApiLoading || !userText || userText?.length === 0}
                                className="dark:bg-black bg-gray-400 rounded-lg p-3 dark:disabled:text-gray-800 disabled:text-gray-500 dark:text-white text-black transition-all"
                            >
                                {isApiLoading ? 'Please wait...' : score ? 'Edit Content' : 'Check Content'}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row mt-4 justify-between">
                        <div>
                            {error && <p className="text-sm font-light text-red-600">Error: {error}</p>}
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-row items-center mr-2">
                                <span className="block rounded-full h-[1rem] w-[1rem] bg-green-600 mr-2"></span>
                                <p className="text-sm">100% Human</p>
                            </div>
                            <div className="flex flex-row items-center mr-2">
                                <span className="block rounded-full h-[1rem] w-[1rem] bg-yellow-600 mr-2"></span>
                                <p className="text-sm">50% Human</p>
                            </div>
                            <div className="flex flex-row items-center">
                                <span className="block rounded-full h-[1rem] w-[1rem] bg-red-600 mr-2"></span>
                                <p className="text-sm">0% Human</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default Page;
