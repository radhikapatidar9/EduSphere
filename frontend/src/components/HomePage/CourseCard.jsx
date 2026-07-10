

function CourseCard({cardData, currentCard, setCurrentCard}) {
    return (
        <div className={`bg-[#161D29] flex flex-col gap-4 p-4
        ${cardData.heading === currentCard ? "bg-white text-black shadow-[8px_10px_1px_rgba(230,_204,_0,_1),_0_10px_20px_rgba(204,_204,_204,_1)]" 
        : "bg-[#161D29] shadow-[8px_0px_4px_2px_rgba(0,_0,_0,_0.25)]"}`}
        onClick={() => setCurrentCard(cardData.heading)}>
            <div className="font-bold">{cardData.heading}</div>
            <div className={`text-[12px] 
                ${cardData.heading === currentCard ? "text-black/70" : "text-white/70"}`}>{cardData.description}</div>
            <div className="flex flex-row justify-between text-sm">
                <p className={` font-bold 
                ${cardData.heading === currentCard ? "text-black" : "text-yellow-300"}`}>{cardData.level}</p>
                <p className={` font-bold 
                ${cardData.heading === currentCard ? "text-black" : "text-yellow-300"}`}>{cardData.lessonNumber}
                    {" Lessons"}
                </p>
            </div>
        </div>
    )
}
export default CourseCard;