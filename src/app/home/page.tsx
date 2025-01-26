"use client";
import React from "react";
import Footer from "@/components/organisms/Footer";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import MenuCategoria from "@/components/organisms/MenuCategoria";
import HomeUserNormal from "@/components/organisms/HomeUserNormal";

const HomePage = () => {
    // Mova o useState para dentro do componente
    const [user, setUser] = React.useState(false);

    return (
        <div className={`flex flex-col bg-red-900 ${!user ? "h-lvh" : "h-full"}`}>
            <div>
                <MenuCompleto />
                <MenuCategoria />
                {user ? <HomeUserNormal /> : <p>aaaa</p>}
            </div>

            <Footer />
        </div>
    );
};

export default HomePage;