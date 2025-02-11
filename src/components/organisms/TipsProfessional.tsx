import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type TipsProfessionalProps = {
    selector: boolean;
    img: string;
    title: string;
    description: string;
};

const TipsProfessional = ({ selector, img, title, description }: TipsProfessionalProps) => {
    return (
        <Card className="flex w-[700px] max-h-[150px] aspect-square overflow-hidden">
            {selector ? (
                <>
                    <img
                        className="w-2/4 object-cover rounded-tl-2xl rounded-bl-2xl"
                        src={img}
                        alt="blank"
                    />
                    <div className="w-2/4 flex flex-col justify-center">
                        <h2 className="p-2 text-indigo-900 font-bold text-2xl">{title}</h2>
                        <h3 className="px-2 text-black">{description}</h3>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-2/4 flex flex-col justify-center text-right">
                        <h2 className="p-2 text-indigo-900 font-bold text-2xl">{title}</h2>
                        <h3 className="px-2 text-black pr-2">{description}</h3>
                    </div>
                    <img
                        className="w-2/4 object-cover rounded-tr-2xl rounded-br-2xl"
                        src={img}
                        alt="blank"
                    />
                </>
            )}
        </Card>
    )
}

export default TipsProfessional;