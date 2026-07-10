import { Link } from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";
import { AiFillBulb } from "react-icons/ai";
import { GiGraduateCap } from "react-icons/gi";
import { IoDiamondSharp } from "react-icons/io5";
import { AiFillCode } from "react-icons/ai";
import HighLightText from "../components/HomePage/HighLightText";
import CTAButton from "../components/HomePage/CTAButton";
import  Banner from '../assets/home_page_vid.mp4'
import Setion2Img from '../assets/Section-2.jpg'
import Img1 from '../assets/section1-firstImg.png'
import Img2 from '../assets/section1-middleImg.png'
import Img3 from '../assets/section1-calender.png'
import instructorImg from '../assets/instructor.jpg';
import CodeBlocks from "../components/HomePage/CodeBlocks";
import ExploreMore from "../components/HomePage/ExploreMore";
function Home() {
    return (
        <div>

            {/* Section 1 */}
            <div className=" relative mx-auto flex flex-col w-11/12 max-w-max items-center justify-between text-white mb-30">

                <Link to={'/signup'}>
                    <div className="group mt-10 p-1 mx-auto rounded-full bg-[#161D29] text-[#b5b3b3] transition-all duration-200 hover:scale-95">
                        <div className="flex items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-[#0c1118]">
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>

                <div className="text-4xl text-center font-semibold mt-6">
                    Empower you future with 
                    <HighLightText text={'Coding Skills'}/>
                </div>

                <div className="w-[62%] text-center text-sm mt-4 text-[#b5b3b3]">
                    Our online coding courses are designed to fit your schedule, allowing you to learn from anywhere at your own pace while exploring hands-on projects, assessments, and personalized feedback from experienced mentors.
                </div>

                <div className="flex flex-row gap-7 mt-8">
                    <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
                    <CTAButton active={false} linkto={'login'}>Book a demo</CTAButton>
                </div>

                <div className="shadow-blue-200 mx-3 my-7 w-[60%]
                 shadow-[8px_10px_1px_rgba(255,_255,_255,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
                    <video muted autoPlay loop>
                        <source src={Banner}/>
                    </video>
                </div>

                {/* code section1  */}
                <CodeBlocks position={"lg:flex-row"}
                heading={
                    <div className="text-4xl font-semibold">Unlock your 
                        <HighLightText text={"coding potential "}/>
                        with our online courses
                    </div>
                }
                subheading={
                    "Start your coding journey today and gain hands-on experience through interactive courses that prepare you for real industry challenges."
                }
                ctabtn1={
                    {btnText:"Try it yourself",
                     linkto: "/signup",
                     active: true
                    }
                }
                ctabtn2={
                    {btnText:"learn more",
                     linkto: "/login",
                     active: false
                    }
                }
                codeblock={
                   `<!DOCTYPE html>\n <html>\n<head>\n <link rel="stylesheet" href="styles.css">\n</head>\n\n<body>\n <h1> <a href="/">Header</a> </h1>\n <nav> <a href="one">One</a></nav>\n</body>\n</html>`
                }
                codecolor={"text-yellow-300"}
                />

                {/* code section 2 */}
                <CodeBlocks position={"lg:flex-row-reverse"}
                heading={
                    <div className="text-4xl font-semibold">Start 
                        <HighLightText text={"coding in seconds  "}/>
                    </div>
                }
                subheading={
                    "Start your coding journey today and gain hands-on experience through interactive courses that prepare you for real industry challenges."
                }
                ctabtn1={
                    {btnText:"Continue Lesson",
                     linkto: "/signup",
                     active: true
                    }
                }
                ctabtn2={
                    {btnText:"learn more",
                     linkto: "/login",
                     active: false
                    }
                }
                codeblock={
                   `<!DOCTYPE html>\n <html>\n<head>\n <link rel="stylesheet" href="styles.css">\n</head>\n\n<body>\n <h1> <a href="/">Header</a> </h1>\n <nav> <a href="one">One</a></nav>\n</body>\n</html>`
                }
                />

                <ExploreMore/>
            </div>

            {/* Section 2 */}
            <div className=" bg-white flex flex-col items-center justify-center mx-auto pb-15">

                <div className="flex gap-7 items-center justify-center lg:pt-40 lg:pb-25">
                    <CTAButton linkto={'/signup'} active={true}>
                        <div className="flex items-center gap-2">
                            {"Explore Full Catalog"}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>

                    <CTAButton linkto={'/login'} active={false}>Learn More</CTAButton>
                </div>

                <div className="w-[70%] flex justify-between  gap-18">
                    {/* leftpart */}
                    <div className="text-3xl font-bold">Get the skills you need for a 
                        <HighLightText text={"job that is in demand"}/>
                    </div>

                    {/* rightpart */}
                    <div className="flex flex-col gap-6 items-start">
                        <p className="text-sm font-semibold">The future belongs to those who go beyond basic skills. In a competitive world, innovation and learning make the difference.</p>
                        <CTAButton linkto={'/signup'} active={true}>Learn More</CTAButton>
                    </div>
                </div>

                <div className="w-[70%] flex flex-between items-center my-15">
                    {/* leftpart */}
                    <div className="m-10">
                        <div className="flex items-center gap-5 bg-gray-50 rounded-md p-3 m-2">
                            <div className="bg-white rounded-full p-3">
                                <AiFillBulb size={30} color="skyblue"/>
                            </div>
                            <div>
                                <p className="text-md font-bold">Leadership</p>
                                <p className="text-sm">Fully commited to the success company</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 bg-gray-50 rounded-md p-3 m-2">
                            <div className="bg-white rounded-full p-3">
                                <GiGraduateCap size={30} color="pink"/>
                            </div>
                            <div>
                                <p className="text-md font-bold">Responsibility</p>
                                <p className="text-sm">Students will always be our top priority</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 bg-gray-50 rounded-md p-3 m-2">
                            <div className="bg-white rounded-full p-3">
                                <IoDiamondSharp size={30} color="green"/>
                            </div>
                            <div>
                                <p className="text-md font-bold">Flexibility</p>
                                <p className="text-sm">The ability to switch is an important skills</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 bg-gray-50 rounded-md p-3 m-2">
                            <div className="bg-white rounded-full p-3">
                                <AiFillCode size={30} color="orange"/>
                            </div>
                            <div>
                                <p className="text-md font-bold">Solve the problem</p>
                                <p className="text-sm">Code your way to a solution</p>
                            </div>
                        </div>
                    </div>

                    {/* rightpart */}
                    <div className="flex flex-col items-center relative shadow-[26px_9px_95px_8px_rgba(59,_130,_246,_0.5)]">
                        <img src={Setion2Img} />
                        <div className="absolute -bottom-7 p-3 flex justify-between items-center w-[65%] bg-green-950 text-white">
                            <div className="flex gap-3">
                                <p className="text-xl font-bold">10</p>
                                <p className="text-[0.7rem] font-semibold text-white/30">YEARS EXPERIENCE</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-xl font-bold">250</p>
                                <p className="text-[0.7rem] font-semibold text-white/30">TYPES OF COURSES</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 items-center w-[50%] my-10">
                    <p className="text-3xl font-bold">Your swiss knife for
                        <HighLightText text={"learning any language"}/>
                    </p>
                    <p className="text-sm text-center">Using spin making learning multiple languages easy, with 20+ languages reliastic 
                        voice-over, progress tracking, custom schedule and more.</p>
                </div>

                <div className="flex w-[60%] my-15 items-center justify-center">
                    <img src={Img1} className="w-[230px] h-[240px] shadow-[8px_0px_4px_2px_rgba(0,_0,_0,_0.25)] rotate-12"/>
                    <img src={Img2} className="w-[230px] h-[280px] shadow-[8px_0px_4px_2px_rgba(0,_0,_0,_0.25)] -rotate-10"/>
                    <img src={Img3} className="w-[230px] h-[250px] shadow-[8px_0px_4px_2px_rgba(0,_0,_0,_0.25)] rotate-8"/>
                </div>
                <CTAButton linkto={'/login'} active={true}>Learn More</CTAButton>

            </div>

            {/* Section 3 */}
            <div className="text-white flex flex-col items-center my-15">
                <div className="w-[70%] flex gap-15">
                    {/* leftpart */}
                    <div>
                        <img src={instructorImg} className="w-[800px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]"/>
                    </div>

                    {/* right part */}
                    <div className="flex flex-col gap-6 items-start justify-center">
                        <p className="text-3xl font-bold">Become an 
                            <HighLightText text={"instructor"}/>
                        </p>
                        <p className="text-white/70 text-sm">Share your knowledge with learners around the world and make a real impact. Create engaging courses, inspire students, and grow your personal brand as an instructor.</p>
                        <CTAButton linkto={'/signup'} active={true}>
                            <div className="flex gap-2 items-center">
                                {"Start Teaching Today"}
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                    </div>
                </div>

                <h2>Review from other learners</h2>
            </div>

            {/* Footer */}
        </div>
    )
}
export default Home;
