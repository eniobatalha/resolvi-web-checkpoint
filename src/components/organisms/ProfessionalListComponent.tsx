import { Button } from "@/components/ui/button";

interface Professional {
    imageSrc: string;
    name: string;
    description: string;
}

const ProfessionalListComponent = ({ professional }: { professional: Professional }) => {
    return (
        <div>
            <div className="flex flex-col justify-between w-[368px] h-[400px] items-center py-4 border-[1px] border-[#16161d] rounded-[16px] shadow-sm">
                <div className="w-full h-full flex flex-col items-center px-10">
                    <img
                        className="rounded-full w-[120px] h-[120px] object-cover"
                        src={professional.imageSrc}
                        alt={professional.name}
                    />
                    <h3 className="text-indigo-900 text-[24px] font-bold pt-[16px]">{professional.name}</h3>
                    <p className="text-center">{professional.description}</p>
                </div>

                <div>
                    <Button>Ver perfil</Button>
                </div>
            </div>
        </div>
    );
}

export default ProfessionalListComponent;
