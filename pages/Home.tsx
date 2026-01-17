import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
const heroImage = "https://d.ifengimg.com/w1080_h720_q90_webp/e0.ifengimg.com/12/2019/0525/E96F7B45BF191F138045B73A0E06AA2343FEAC24_size113_w1080_h720.jpeg";

const sliderData = [{
    id: 1,
    content: "但谁能想到 水草丰美的玛曲草原 \n这片承载着黄河45%水源补给量的\"高原水塔\"\n曾一度在沙化的侵蚀下岌岌可危",
    className: "text-2xl font-bold text-white text-center"
}, {
    id: 2,
    content: "\"风一吹，沙子满天飞，沙子混着土往嘴里钻，牛羊都没地方吃草。\"",
    author: "——玛曲县 河曲马场德吉村牧民 才让卓玛",
    contentClassName: "text-2xl font-sans text-white text-center",
    authorClassName: "text-xl font-sans text-amber-700 text-center mt-4"
}, {
    id: 3,
    content: "\"一到冬春季节，漫天的沙子吹得眼睛睁不开，嘴里都是。\"",
    author: "——玛曲县自然资源局 工作人员 马春林",
    contentClassName: "text-2xl font-sans text-white text-center",
    authorClassName: "text-xl font-sans text-amber-700 text-center mt-4"
}, {
    id: 4,
    content: "\"那时候的草原，风一吹就漫天黄沙，牛羊只能在沙砾间隙啃食稀疏的草根，\n脚一踩下去，沙层能没过脚踝，牧草根都露在外面几乎枯死。\"",
    author: "——玛曲县牧民 道青仁吉",
    contentClassName: "text-2xl font-sans text-white text-center",
    authorClassName: "text-xl font-sans text-amber-700 text-center mt-4"
}];

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % sliderData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen">
            {}
            <div className="relative h-screen overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={heroImage} alt="阿万苍湿地的花海" className="w-full h-full object-cover" />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
                </div>
                {}
                <div
                    className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
                    <div className="space-y-6 max-w-3xl ml-[48px]">
                        <h1 className="text-3xl md:text-4xl font-bold text-white text-left">图中的草原花海<br />位于甘肃省甘南州玛曲县
                                                    </h1>
                        <div className="h-4"></div> {}
                        <h4
                            className="text-lg md:text-xl font-normal text-white text-left leading-relaxed">玛曲，藏语「黄河」的意思，<br />是全国唯一一座以黄河命名的县，<br />位于甘南藏族自治州西南部，<br />地处青、甘、川三省交界。<br />黄河从青海巴颜喀拉山东流至玛曲地区时，<br />拐了一个 400 多公里的大弯，<br />从欧拉秀玛回流向青海，<br />形成了久负盛名的「天下黄河第一弯」，<br />也顺势造就了美丽的玛曲草原。
                                                    </h4>
                    </div>
                    {}
                     <div
                        className="flex justify-end">
                        <a
                            href="https://www.bilibili.com/video/BV1GnBrBeEQx/?spm_id_from=333.337.search-card.all.click&vd_source=881020b89ab7935f2470637bd2dcdec7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-lg border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
                            style={{
                                textAlign: "center"
                            }}>观看草原风貌
                                                    </a>
                    </div>
                </div>
            </div>
            {}
            <div ref={sliderRef} className="bg-[#0A151C] py-20 px-6">
                <div className="max-w-5xl mx-auto relative">
                    {}
                    <button
                        onClick={() => setCurrentSlide(prev => (prev - 1 + sliderData.length) % sliderData.length)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:text-green-400 transition-colors focus:outline-none z-10"
                        aria-label="Previous slide">
                        <i className="fa-solid fa-chevron-left text-2xl"></i>
                    </button>
                    {}
                    <button
                        onClick={() => setCurrentSlide(prev => (prev + 1) % sliderData.length)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:text-green-400 transition-colors focus:outline-none z-10"
                        aria-label="Next slide">
                        <i className="fa-solid fa-chevron-right text-2xl"></i>
                    </button>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{
                                opacity: 0,
                                x: 100
                            }}
                            animate={{
                                opacity: 1,
                                x: 0
                            }}
                            exit={{
                                opacity: 0,
                                x: -100
                            }}
                            transition={{
                                duration: 0.5
                            }}
                            className="py-10">
                            {sliderData[currentSlide].id === 1 ? <div
                                className={sliderData[currentSlide].className}
                                dangerouslySetInnerHTML={{
                                    __html: sliderData[currentSlide].content.replace(/\n/g, "<br>")
                                }} /> : <div className="space-y-4">
                                <div
                                    className={sliderData[currentSlide].contentClassName}
                                    dangerouslySetInnerHTML={{
                                        __html: sliderData[currentSlide].content.replace(/\n/g, "<br>")
                                    }} />
                                <div
                                    className={sliderData[currentSlide].authorClassName}
                                    dangerouslySetInnerHTML={{
                                        __html: sliderData[currentSlide].author
                                    }} />
                            </div>}
                            {}
                            <div className="flex justify-center mt-12 space-x-2">
                                {sliderData.map((_, index) => <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white w-12" : "bg-white/40"}`}
                                    aria-label={`Go to slide ${index + 1}`} />)}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            {}
            <div className="py-16 bg-white text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-green-800 font-sans mb-8">账本赤字：沙进草退的"生存危机"
                                                </h2>
                <motion.div
                    className="flex justify-center"
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.5,
                        duration: 1
                    }}>
                    <a
                        href="/page2"
                        className="text-green-600 text-lg flex items-center gap-2 hover:underline">
                        <span>继续阅读</span>
                        <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </motion.div>
            </div>
        </div>
    );
}