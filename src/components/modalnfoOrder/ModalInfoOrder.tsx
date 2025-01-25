const modalInfoOrder = () => {
    return (
        <div className="z-40 w-full h-screen absolute">
            {/* Camada de fundo com efeito overlay */}
            <div className="absolute inset-0 bg-black mix-blend-overlay z-30"></div>

            {/* Conteúdo do modal (não será afetado pelo mix-blend) */}
            <div className="relative z-50 flex flex-col items-center justify-center h-full">
                <h2 className="text-white text-[72px]">pegou</h2>
                <img
                    src="https://foxbombas.com.br/2020b/wp-content/uploads/2021/08/pexels-funny-foxy-pride-5872242-768x509.jpg"
                    alt=""
                    className="max-w-full max-h-full object-cover"
                />
            </div>
        </div>
    );
}

export default modalInfoOrder;
