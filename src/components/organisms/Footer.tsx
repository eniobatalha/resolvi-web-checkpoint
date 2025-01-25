import { Button } from "@/components/ui/button";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="text-white bg-[#16161b] h-[550px] pt-[32px] flex flex-col mt-auto">
            <div className="flex justify-between items-center w-full px-[168px] h-20 border-b-[1px]">
                <div>
                    <h2 className="font-bold text-4xl">
                        Consiga aquele freela com{" "}
                        <span className="text-indigo-500">Resolvi Profissional</span>
                    </h2>
                    <p>Monte agora mesmo seu portifólo.</p>
                </div>

                <Button variant="outline" className="text-indigo-900">
                    Quero ser profissional
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full px-[168px] mt-[32px]">
                <div>
                    <h4 className="text-[32px] font-bold">Sobre</h4>
                    <ul>
                        <li><a href="#"><span>Quem somos</span></a></li>
                        <li><a href="#"><span>Carreiras</span></a></li>
                        <li><a href="#"><span>Fale conosco</span></a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[32px] font-bold">Desenvolvimento Web</h4>
                    <ul>
                        <li><a href="#"><span>Desenvolvimento Web</span></a></li>
                        <li><a href="#"><span>React JS</span></a></li>
                        <li><a href="#"><span>Angular JS</span></a></li>
                        <li><a href="#"><span>Java</span></a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[32px] font-bold">Conheça a Resolvi</h4>
                    <ul>
                        <li><a href="#"><span>Obtenha o aplicativo</span></a></li>
                        <li><a href="#"><span>Planos e preços</span></a></li>
                        <li><a href="#"><span>Ajuda e suporte</span></a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[32px] font-bold">Profissionais</h4>
                    <ul>
                        <li><a href="#"><span>Monetização</span></a></li>
                        <li><a href="#"><span>Preços</span></a></li>
                        <li><a href="#"><span>Curriculo</span></a></li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full px-[168px] mt-[32px]">
                <div>
                    <h4 className="text-[32px] font-bold">Principais Serviços</h4>
                    <ul>
                        <li><a href="#"><span>Encanador</span></a></li>
                        <li><a href="#"><span>Detetive particular</span></a></li>
                        <li><a href="#"><span>Jardinagem</span></a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[32px] font-bold">Lecione</h4>
                    <ul>
                        <li><a href="#"><span>Música</span></a></li>
                        <li><a href="#"><span>Espanhol</span></a></li>
                        <li><a href="#"><span>Inglês</span></a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[32px] font-bold">Principais cidades</h4>
                    <ul>
                        <li><a href="#"><span>Motorista em Jaboatão Guararapes</span></a></li>
                        <li><a href="#"><span>Professor de inglês em Jaboatão dos Guararapes</span></a></li>
                        <li><a href="#"><span>Eletricista em Recife</span></a></li>
                        <li><a href="#"><span>Entregador em Moreno</span></a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[32px] font-bold">Segurança</h4>
                    <ul>
                        <li><a href="#"><span>Podemos informar onde você mora?</span></a></li>
                        <li><a href="#"><span>Meus dados</span></a></li>
                        <li><a href="#"><span>Login - recuperar senha</span></a></li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-between items-center w-full px-[168px] py-[16px] mt-auto border-t-[1px]">
                <div className="flex items-center gap-[16px]">
                    <img src="/img/logo.svg" className="w-[150px]" alt="Logo Resolvi" />
                    <p>© 2025 Resolvi, Inc.</p>
                </div>

                <a href="https://www.instagram.com/appresolvi/profilecard/?igsh=NjdxY2UydHd5d2Nx" target="_blank"><FaInstagram /></a>

                <p>🗺 Brasil, PE</p>
            </div>
        </footer>
    );
};

export default Footer;
