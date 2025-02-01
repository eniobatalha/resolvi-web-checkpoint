import { Button } from "@/components/ui/button";
import React from "react";

interface Professional {
    imageSrc: string;
    name: string;
    description: string;
}

const ProfessionalListComponent = ({ professional }: { professional: Professional }) => {
    return (
        <div>
            <div className="flex flex-col justify-between w-[368px] h-[450px] items-center border-[1px] border-[#16161d] rounded-[16px] shadow-sm">
                <img
                    className=" w-full h-[200px] object-cover rounded-t-[16px]"
                    src={professional.imageSrc}
                    alt={professional.name}
                />
                <div className="w-full h-full flex flex-col items-center px-10">
                    <h3 className="text-indigo-900 text-[24px] font-bold pt-[16px]">{professional.name}</h3>
                    <p className="text-center">{professional.description}</p>
                </div>

                <div className="pb-4">
                    <Button type="submit" variant="indigo" className="w-full">
                        Ver perfil
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProfessionalListComponent;
