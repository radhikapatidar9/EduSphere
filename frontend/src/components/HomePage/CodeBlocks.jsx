import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import {TypeAnimation} from 'react-type-animation'
function CodeBlocks({position, heading, subheading, ctabtn1, ctabtn2, codeblock, codecolor}) {
    return (
        <div className={`flex ${position} my-15 justify-between gap-6 w-[80%] items-center`}>

            {/* Section 1 */}
            <div className="w-[60%] flex flex-col gap-8">
                {heading}
                <div className="text-[#b5b3b3]">{subheading}</div>

                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/* section 2 */}
            <div className="flex w-[40%] bg-gray-700/10 rounded-md p-4">
                {/* BG gradient */}
                <div className="text-center flex flex-col w-[10%] text-[#b5b3b3]">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 ${codecolor} whitespace-pre-line `}>
                    <TypeAnimation
                    sequence={[codeblock, 2000, ""]}
                    repeat={Infinity}
                    omitDeletionAnimation={true}/>
                </div>
            </div>
        </div>
    )
}
export default CodeBlocks;