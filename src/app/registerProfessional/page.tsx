import React from "react";
import FormRegisterProfessional from "@/components/organisms/FormRegisterProfessional";

const RegisterProfessional = () => {
    return (
        <section
            className="relative flex h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/img/worker.jpg')" }}
        >

            <video
                src="/video/workers-bg.mp4"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                autoPlay
                loop
                muted
            />


            <div className="relative flex flex-col items-center justify-center w-1/2 h-full  bg-opacity-50 z-10">
                <img
                    src="/img/logo.svg"
                    alt="Logo Resolvi"
                    className="w-48 h-auto"
                />
            </div>


            <div className="relative flex items-center justify-center w-1/2 h-full  bg-opacity-50 z-10">
                <FormRegisterProfessional />
            </div>
        </section>
    );
};

export default RegisterProfessional;
