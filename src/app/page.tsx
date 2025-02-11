"use client";

const Index = () => {

  return (
      <div
          className="flex h-screen bg-white bg-cover bg-center relative"
          style={{ backgroundImage: "url('/img/bg.png')" }}
      >
        <video
            src="/video/clients-bg.mp4"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
        />

        <div className="flex flex-col w-full justify-center items-center  h-full z-10">
          <img
              src="/img/logo.svg"
              alt="Logo Resolvi"
              className="w-48 h-auto py-4"
          />

            <div className="flex gap-4">
                <a href="./login"><button className="bg-black text-white px-[16px] py-[8px] rounded-[16px]">Sou cliente</button></a>
                <a href="./loginProfessional"><button className="bg-white text-black px-[16px] py-[8px] rounded-[16px]">Sou Profissional</button></a>
            </div>
        </div>
      </div>
  );
};

export default Index;
