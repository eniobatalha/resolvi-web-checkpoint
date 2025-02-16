import {Button} from "@/components/ui/button";
import {FaHome} from "react-icons/fa";
import {BsChatLeftText} from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { CiStickyNote } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import React from "react";
import { useRouter } from "next/navigation";

const Menu = () => {
    const router = useRouter();

    return (
        <aside
            className="w-16 h-fit bg-gray-900 text-white flex flex-col items-center py-4 space-y-4 fixed top-1/2 transform -translate-y-1/2 rounded-xl shadow-lg ml-4 z-50">
            <Button onClick={ () => router.push("/homeClient") } className="p-3 hover:bg-indigo-800">
                <FaHome size={20}/>
                
            </Button>
            <Button onClick={ () => router.push("/chat") } className="p-3 hover:bg-indigo-800">
                <BsChatLeftText size={20}/>
            </Button>
            <Button onClick={ () => router.push("/newOrder") } className="p-[16px] hover:bg-indigo-800">
                <FaPlus size={20} />
            </Button>
            <Button onClick={ () => router.push("/orderManegerClient") } className="p-[16px] hover:bg-indigo-800">
                <CiStickyNote size={20} />
            </Button>
            <Button onClick={ () => router.push("/profile") } className="p-[16px] hover:bg-indigo-800">
                <ImProfile size={20} />
            </Button>
        </aside>
    )
}

export default Menu;