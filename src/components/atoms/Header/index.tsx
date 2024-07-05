import Image from "next/image";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import User from "@/types/user";
/**
 * Common header component
 * @constructor
 */
const Header = () => {
    const router = useRouter()
    const [user, setUser]: any = useState<User | null>(null);

    useEffect(() => {
        if (Cookies.get("casdoorUser"))  {
            setUser(JSON.parse(Cookies.get("casdoorUser") as string))
        }
    }, []);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const logout = () => {
        Cookies.remove("casdoorUser");
        router.push('/login');
    }

    return (
        <header className="flex flex-row w-full justify-between items-center p-2 sm:p-6">
            <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
                <h1 className="font-bold text-[1.5rem]">[ud]</h1>
                <h1 className="ml-2 font-light hidden sm:block">UNDETECTABLE AI</h1>
            </div>
            <div className="relative">
                <div className="flex flex-row items-center cursor-pointer" onClick={() => setIsDropdownOpen(d => !d)}>
                    {user &&
                        <>
                            <h3 className="mr-3 hidden sm:block">{user?.name}</h3>
                            <Image
                                src={user?.picture}
                                alt="avatar"
                                width={40}
                                height={40}
                                className="rounded"
                            />
                        </>
                    }
                </div>
                {isDropdownOpen &&
                    <div className="absolute right-0 top-[100%] mt-5 z-10 rounded-lg shadow w-44 bg-gray-700">
                        <ul className="py-2 text-sm text-gray-200">
                            <li>
                            <a
                                    href="#"
                                    onClick={() => router.push('/documents')}
                                    className="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                                    Documents
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={() => logout()}
                                    className="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                                Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </header>
    )
}
export default Header
