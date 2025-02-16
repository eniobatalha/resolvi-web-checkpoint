"use client";
import React from "react";
import Footer from "@/components/organisms/Footer";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import MenuCategoria from "@/components/organisms/MenuCategoria";
import HomeUserNormal from "@/components/organisms/HomeUserNormal";
import ProtectedRoutes from "../ProtectedRoutes";
import ChatApp from "@/components/organisms/ChatApp";

const HomePage = () => {
    // Mova o useState para dentro do componente
    const [user, setUser] = React.useState(true);
    

    return (
        <ProtectedRoutes>
            <div className={`flex flex-col bg-red-900 ${!user ? "h-lvh" : "h-full"}`}>
                <div>
                    <MenuCompleto />
                    <ChatApp/>
                </div>

                <Footer profissional={false} />
            </div>
        </ProtectedRoutes>
    );
};

export default HomePage;