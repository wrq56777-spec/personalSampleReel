import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [{
        title: "治沙奇迹",
        path: "/"
    }, {
        title: "账本赤字",
        path: "/page2"
    }, {
        title: "账本投入",
        path: "/page3"
    }, {
        title: "账本盈余",
        path: "/page4"
    }, {
        title: "账本永续",
        path: "/page5"
    }];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}
            style={{
                backgroundColor: "transparent"
            }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {}
                    <Link
                        to="/"
                        className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? "text-green-800" : "text-white"}`}>黄河"蓄水池"的重生账本
                                  </Link>
                    {}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link, index) => <Link
                            key={index}
                            to={link.path}
                            className={`font-medium text-sm hover:text-green-600 transition-colors duration-300 ${location.pathname === link.path ? "text-green-600 font-semibold" : isScrolled ? "text-gray-800" : "text-white hover:text-green-200"}`}>
                            {link.title}
                        </Link>)}
                    </div>
                    {}
                    <div className="md:hidden">
                        <button
                            className={`p-2 rounded-md ${isScrolled ? "text-gray-800" : "text-white"}`}>
                            <i className="fa-solid fa-bars text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}