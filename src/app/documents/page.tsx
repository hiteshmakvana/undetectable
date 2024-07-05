"use client"
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import logError from "@/utils/logError";
import GetQueries from "@/services/api/documents/getDocuments";
import Header from "@/components/atoms/Header";
import Document from "@/types/document";

const Documents = () => {
    const user: any = Cookies.get("casdoorUser") ? JSON.parse(Cookies.get("casdoorUser") as string) : {};
    const [error, setError] = useState<string | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [activeDocument, setActiveDocument] = useState<Document | null>(null);
    const [isApiLoading, setIsApiLoading] = useState(true);

    useEffect(() => {
        getDocuments();
    }, []);


    const getDocuments = async () => {
        try {
            setIsApiLoading(true);
            const docs = await GetQueries(user.sub);
            console.log(docs)
            if (docs) {
                setDocuments(docs);
            }
        } catch (err: any) {
            setError(err?.message || "Something went wrong");
        } finally {
            setIsApiLoading(false)
        }
    }
    const getScoreClass = (score: Number) => {
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

    const truncateText = (content: string, maxLength = 100) => {
        const text = content;
        if (text.length <= maxLength) return content;
        return text.substring(0, maxLength - 3) + "...";
    }

    return (
        <main className="flex flex-col h-full w-full">
            <Header />
            <div className="flex flex-col w-full h-full p-7">
                <div className="mb-5 flex justify-between items-center">
                    <div>
                        <h2>Documents</h2>
                        <p className="text-gray-400 p-0">View previously checked documents</p>
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col w-full h-full">
                    {isApiLoading ?
                        <div className="flex w-full h-full justify-center items-center">
                            <div role="status">
                                <svg aria-hidden="true"
                                     className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> :
                        <>
                            <div className="w-full h-[30rem] overflow-hidden">
                                <ul className="py-2 max-w-[30rem] h-full overflow-auto rounded-lg dark:bg-gray-800 bg-gray-300 text-sm text-gray-200">
                                    {documents.length > 0 ?
                                        documents.map((d, index) =>
                                            <li key={index}>
                                                <a
                                                    href="#"
                                                    onClick={() => setActiveDocument(state => state?.id === d.id ? null : d)}
                                                    className="block px-4 py-2 text-black dark:text-white dark:hover:bg-gray-600 hover:bg-gray-400 overflow-ellipsis">
                                                    {truncateText(d.content)}
                                                </a>
                                            </li>
                                        ) :
                                        <li>
                                            <p className="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                                                No documents found
                                            </p>
                                        </li>
                                    }
                                </ul>
                            </div>
                            <div className="w-full h-full mt-4 sm:m-0">
                                {activeDocument ?
                                    <div className="flex flex-col rounded-lg overflow-hidden dark:bg-gray-900 bg-gray-200 h-full shadow">
                                        <div className="p-4 w-full h-full border-b-[1px] dark:border-black border-white">
                                            <span className={getScoreClass(activeDocument?.score)}>
                                                    {activeDocument?.content}
                                                </span>
                                        </div>
                                        <div className="flex px-7 py-4 text-gray-300 justify-between items-center">
                                            <div>
                                                <h1 className="dark:text-white text-black">Score: <span className={getScoreClass(activeDocument?.score)}>{activeDocument?.score?.toString()}</span></h1>
                                            </div>
                                            <div className="hidden sm:flex flex-row">
                                                <div className="flex flex-row items-center mr-2">
                                                    <span className="block rounded-full h-[1rem] w-[1rem] bg-green-600 mr-2"></span>
                                                    <p className="text-sm text-black dark:text-white">100% Human</p>
                                                </div>
                                                <div className="flex flex-row items-center mr-2">
                                                <span
                                                    className="block rounded-full h-[1rem] w-[1rem] bg-yellow-600 mr-2"></span>
                                                    <p className="text-sm text-black dark:text-white">50% Human</p>
                                                </div>
                                                <div className="flex flex-row items-center">
                                                    <span className="block rounded-full h-[1rem] w-[1rem] bg-red-600 mr-2"></span>
                                                    <p className="text-sm text-black dark:text-white">0% Human</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> :
                                    <div className="flex flex-col rounded-lg overflow-hidden h-full">
                                        <p className="h-full w-full flex justify-center text-gray-400 p-5 text-center">
                                            Open a document from sidebar to view in details
                                        </p>
                                    </div>
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </main>
    );
}
export default Documents;
