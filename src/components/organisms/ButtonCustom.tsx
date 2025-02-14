const ButtonCustom = ({ title = "ButtonTitle" }: { title?: string }) => {
    return (
        <div>
            <button className="py-4 px-8 bg-white rounded-[24px] font-bold
                         hover:bg-black hover:text-white
                         transition-colors duration-300">
                {title}
            </button>
        </div>
    )
}

export default ButtonCustom;