"use client"
import { Button } from "@/components/ui/button";
import { FaInstagram } from "react-icons/fa";

const Footer = ({ profissional }) => {  // Recebe a prop diretamente
    return (
        <footer
            className={`text-white bg-[#16161b] ${
                profissional ? "min-h-[400px] pt-8 md:pt-12" : "min-h-[500px] pt-2"
            } md:min-h-[600px] lg:min-h-[500px] flex flex-col mt-auto`}
        >

            {profissional && (
                <div className="flex flex-col lg:flex-row justify-between items-center w-full px-4 md:px-8 lg:px-16 xl:px-32 gap-4 pb-8 border-b border-gray-700">
                    <div className="text-center lg:text-left max-w-2xl">
                        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-2">
                            Consiga aquele freela com{" "}
                            <br/>
                            <span className="text-indigo-500">Resolvi Profissional</span>
                        </h2>
                    </div>
                    <Button variant="outline" className="text-indigo-900 w-full lg:w-auto">
                        Quero ser profissional
                    </Button>
                </div>
            )}

            {!profissional && (
                <h1 className="font-bold text-5xl text-white px-32 pt-4">
                    Resolva <span className="text-indigo-900">mais problemas</span>:
                </h1>
            )}

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-4 md:px-8 lg:px-16 xl:px-32 mt-8">
                <div className="space-y-4">
                    <h4 className="text-xl md:text-2xl font-bold">Sobre</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Quem somos</a></li>
                        <li><a href="#" className="hover:text-white transition">Carreiras</a></li>
                        <li><a href="#" className="hover:text-white transition">Fale conosco</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xl md:text-2xl font-bold">Desenvolvimento Web</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Desenvolvimento Web</a></li>
                        <li><a href="#" className="hover:text-white transition">React JS</a></li>
                        <li><a href="#" className="hover:text-white transition">Angular JS</a></li>
                        <li><a href="#" className="hover:text-white transition">Java</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xl md:text-2xl font-bold">Conheça a Resolvi</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Obtenha o aplicativo</a></li>
                        <li><a href="#" className="hover:text-white transition">Planos e preços</a></li>
                        <li><a href="#" className="hover:text-white transition">Ajuda e suporte</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xl md:text-2xl font-bold">Profissionais</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Monetização</a></li>
                        <li><a href="#" className="hover:text-white transition">Preços</a></li>
                        <li><a href="#" className="hover:text-white transition">Currículo</a></li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8 lg:px-16 xl:px-32 py-8 mt-8 border-t border-gray-700 gap-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <img
                        src="/img/logo.svg"
                        className="w-32 md:w-40"
                        alt="Logo Resolvi"
                    />
                    <p className="text-gray-400 text-sm">© 2025 Resolvi, Inc.</p>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://www.instagram.com/appresolvi/profilecard/?igsh=NjdxY2UydHd5d2Nx"
                        target="_blank"
                        className="text-2xl hover:text-indigo-500 transition"
                    >
                        <FaInstagram />
                    </a>
                    <p className="text-gray-400 text-sm">🗺 Brasil, PE</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;