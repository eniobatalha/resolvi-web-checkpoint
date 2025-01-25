import {Button} from "@/components/ui/button";
import {FaHome} from "react-icons/fa";
import {BsChatLeftText} from "react-icons/bs";
import {MdMoreHoriz} from "react-icons/md";
import React from "react";

const Menu = () => {
    return (
        <aside
            className="w-16 h-fit bg-gray-900 text-white flex flex-col items-center py-4 space-y-4 fixed top-1/2 transform -translate-y-1/2 rounded-xl shadow-lg ml-4 z-50">
            <Button className="p-3 hover:bg-indigo-800">
                <FaHome size={20}/>
            </Button>
            <Button className="p-3 hover:bg-indigo-800">
                <BsChatLeftText size={20}/>
            </Button>
            <Button className="p-3 hover:bg-indigo-800">
                <MdMoreHoriz size={20}/>
            </Button>
        </aside>
    )
}

export default Menu;