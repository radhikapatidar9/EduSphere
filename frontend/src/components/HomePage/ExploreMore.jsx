import { useState } from "react";
import {HomePageExplore} from '../../data/homepage-explore.js';
import HighLightText from "./HighLightText";
import CourseCard from "./CourseCard.jsx";

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths"
];
function ExploreMore() {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
    return (
        <div className="flex flex-col items-center gap-2 relative w-[70%]">
            <div className="text-3xl font-bold text-center">
                Unlock the 
                <HighLightText text={"Power of Code"}/>
            </div>
            <p className="text-sm text-white/70 text-center mt-3">Learn to build anything you can imagine</p>

            <div className="flex flex-row items-center gap-2 rounded-full bg-[#161D29] p-1 my-10">
                {
                    tabsName.map( (element, index) => {
                        return(
                            <div className={`text-[13px] flex flex-row items-center gap-2 py-2 px-4 rounded-full 
                                hover:cursor-pointer hover:text-white
                            ${currentTab === element ? "bg-black" : "text-white/70"}`} key={index} 
                            onClick={() => setMyCards(element)}>
                                {element}
                            </div>
                        )
                    })
                }
            </div>

            <div className=" flex items-center  gap-6 absolute -bottom-45  ">

                {
                    courses.map((element, index) => {
                        return (
                            <CourseCard key={index} cardData={element} currentCard={currentCard} 
                            setCurrentCard={setCurrentCard}/>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default ExploreMore;