import React from 'react';
import { motion } from 'framer-motion';

// 导入图片
const futureImage = "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Beautiful%20grassland%20in%20Maqu%20County%2C%20Gansu%2C%20China%20with%20clear%20blue%20sky%20and%20yellow%20river&sign=c6222b4abdd780f0d755f8cbd1218be5";

export default function Page5() {
  // 动画变量
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  // 数据卡片信息
  const keyStats = [
    { value: "35亿元", label: "国家累计投入" },
    { value: "27686.67公顷", label: "沙化地变绿面积" },
    { value: "173亿立方米", label: "清水出境量" },
    { value: "255.6%", label: "农村居民收入增幅" }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* 标题部分 */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 font-sans mb-6">
            账本永续：绿色发展的"草原未来"
          </h1>
          
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img 
              src={futureImage} 
              alt="玛曲草原的未来" 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white text-xl p-6 text-center w-full">
                黄河首曲的绿色故事，正在续写新的篇章
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* 核心数据卡片 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={itemVariants}
        >
          {keyStats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-green-800 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* 内容部分 */}
        <motion.div 
          className="max-w-4xl mx-auto space-y-8 text-gray-800"
          variants={itemVariants}
        >
          <p className="text-lg text-justify leading-relaxed">
            如今的玛曲，草原铺绿、黄河安澜，牧民的脸上洋溢着幸福的笑容。这本生态账本，记录着35亿元投入的决心，铭刻着马春林、卓玛加布、道吉仁青等无数人的坚守，见证着27686.67公顷沙化地变绿、173亿立方米清水出境的奇迹。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            {/* 卓玛加布的话 */}
            <motion.div 
              className="bg-green-50 p-6 rounded-lg shadow-sm border-l-4 border-green-700"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-lg italic mb-4">
                "我们是喝着黄河水长大的，我希望让黄河永远清澈，让子孙后代能看到绿色的草原。"
              </p>
              <p className="text-right font-semibold">
                — 卓玛加布，玛曲县牧民
              </p>
            </motion.div>
            
            {/* 马春林的话 */}
            <motion.div 
              className="bg-green-50 p-6 rounded-lg shadow-sm border-l-4 border-green-700"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-lg italic mb-4">
                "高原治沙没有终点，我们要继续完善技术，让绿色在草原上不断延伸。"
              </p>
              <p className="text-right font-semibold">
                — 马春林，玛曲县治沙工程师
              </p>
            </motion.div>
          </div>
          
          <p className="text-lg text-justify leading-relaxed">
            玛曲的生态账本生动证明，好生态从来不是发展的"包袱"，而是最宝贵的财富。心中有本生态账，算清投入与产出，守住生态底线，就能让绿水青山真正变成代代相传的"金饭碗"。黄河首曲的草原上，绿色发展的故事还在继续，这本生态账本，也将在一代又一代人的坚守中，续写更多"绿进沙退、民富景美"的新篇章。
          </p>
        </motion.div>
        
        {/* 结语部分 */}
        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <div className="inline-block p-8 border-2 border-green-200 rounded-lg bg-green-50">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              生态兴则文明兴，生态衰则文明衰
            </h2>
            <p className="text-gray-700">
              玛曲的实践告诉我们，只要坚持生态优先、绿色发展，<br/>
              就能走出一条生态美、产业兴、百姓富的可持续发展之路。
            </p>
          </div>
        </motion.div>
        
        {/* 返回首页按钮 */}
        <motion.div 
          className="flex justify-center mt-16"
          variants={itemVariants}
        >
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            返回首页
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}