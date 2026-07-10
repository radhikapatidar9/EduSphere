import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import {useSelector} from 'react-redux';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import ProfileDropDown from "../auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { FaAngleDown } from "react-icons/fa";

const subLinks = [
    {
        title: "Python",
        link: "/catalog/python"
    },
    {
        title: "Web Development",
        link: "/catalog/web"
    }
]

function Navbar() {

    const location = useLocation();
    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);

    const [SsubLinks, SsetSubLinks] = useState([]);

    const fetchSublinks = async() => {
            try {
                const result = await apiConnector("GET", categories.CATEGORIES_API);
                console.log("printing sublink results :", result);
                SsetSubLinks(result.data.allTags);
                console.log(SsubLinks);
            } catch(err) {
                console.log("Could not fetch the category list", err);
            }
        }

    useEffect( () => {
         fetchSublinks();
    }, []);

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }
    return (
        <div className="flex h-12 items-center justify-center border-b-[1px] border-b-white/10">
            <div className="w-11/12 flex flex-row justify-between itmes-center">

                <Link to={'/'} className="text-white font-bold text-md">
                    StudyNotion
                </Link>

                {/* nav links */}
                <nav>
                    <ul className="flex gap-4">
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? 
                                        (<div className="relative flex flex-row text-white items-center justify-center gap-1 group">
                                            <p>{link.title}</p>
                                            <FaAngleDown color="white" />

                                            <div className="invisible absolute left-[50%] top-[50%] flex flex-col rounded-md
                                                bg-white p-4 text-black opacity-0 transition-all duration-200
                                                translate-x-[-50%] translate-y-[40%] z-50
                                                group-hover:visible group-hover:opacity-100 lg:w-[250px]">

                                                <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-white
                                                    translate-y-[-40%] translate-x-[80%] ">
                                                </div>

                                                {
                                                    subLinks.length ? (
                                                        subLinks.map( (sublink, index) => (
                                                            <Link to={`${sublink.link}`} key={index}>
                                                                <p>{sublink.title}</p>
                                                            </Link>
                                                        ))
                                                    ) : (<div></div>)
                                                }

                                            </div>
                                        </div>) : (
                                            <Link to={link?.path} >
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-300" : "text-white"}`} >
                                                {link.title}</p>
                                                
                                            </Link>
                                        )
                                    }
                                </li>
                            ) )
                        }
                    </ul>
                </nav>

                {/* login/signup/dashboard */}
                <div className="flex gap-x-4 items-center">
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to='/dashboard/cart' className="relative">
                                <AiOutlineShoppingCart/>
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }

                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to='/login'>
                                <button className="text-white/80 font-bold hover:text-yellow-300 text-sm
                                border border-gray-700 px-2 py-1 rounded text-center hover:cursor-pointer
                                bg-[#161D29]">Login</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to='/signup'>
                                <button className="text-white/80 font-bold hover:text-yellow-300 text-sm
                                border border-gray-700 px-2 py-1 rounded text-center hover:cursor-pointer
                                bg-[#161D29]">Signup</button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <ProfileDropDown/>
                        )
                    }
                </div>

            </div>
        </div>
    )
}
export default Navbar;