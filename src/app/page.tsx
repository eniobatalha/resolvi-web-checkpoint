"use client";

const Index = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-indigo-950 to-indigo-900">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay */}
                <video
                    src="/video/clients-bg.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>

            <div className="relative z-20 flex min-h-screen items-center justify-center px-4">
                <div className="max-w-lg w-full">
                    <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20">
                        <div className="flex justify-center mb-8">
                            <img
                                src="/img/logo.svg"
                                alt="Logo Resolvi"
                                className="w-56 h-auto"
                            />
                        </div>

                        <h1 className="text-white text-center text-2xl font-light mb-8">
                            Bem-vindo à plataforma
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="./login"
                                className="w-full sm:w-auto"
                            >
                                <button
                                    className="w-full px-8 py-3 bg-white text-indigo-900 hover:bg-indigo-50 transition-colors rounded-xl font-medium shadow-lg hover:shadow-xl active:shadow-md"
                                >
                                    Sou Cliente
                                </button>
                            </a>
                            <a
                                href="./loginProfessional"
                                className="w-full sm:w-auto"
                            >
                                <button
                                    className="w-full px-8 py-3 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors rounded-xl font-medium shadow-lg hover:shadow-xl active:shadow-md"
                                >
                                    Sou Profissional
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;