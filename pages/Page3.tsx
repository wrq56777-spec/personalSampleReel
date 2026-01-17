import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

// 图片地址
const restorationImage = "https://x0.ifengimg.com/ucms/2024_41/E02BE28AC3F2225DB88F89BC64E24F8872331A9C_size74_w720_h405.jpg";
import 马春林 from '../assets/images/马春林.jpg';
const engineerImage = 马春林;
const herdsmanImage = "https://x0.ifengimg.com/ucms/2024_41/766F0481DA2797CE6DA57323F00C14E0064867A9_size93_w720_h480.jpg";

// 政策数据
const policyData = [
  { id: 1, title: "《甘南黄河重要水源补给生态功能区生态保护与建设规划》", desc: "采用工程和生物相结合的措施完成流动沙丘和重度退化草地（黑土滩）综合治理面积33.08万亩。", source: "甘南藏族自治州发展和改革委员会" },
  { id: 2, title: "草原生态保护补助奖励政策", desc: "推动玛曲县草原禁牧和草畜平衡制度的落实，草原保护和草原畜牧业基础设施不断改善，有效减轻天然草原的放牧压力草原生态环境加快恢复牧民政策性收益和务工收入持续增加。", source: "甘肃省林业和草原局" },
  { id: 3, title: "《甘南州草畜平衡管理办法》", desc: "核定玛曲县240万个羊单位的草原生态红线。", source: "玛曲县人民政府" },
  { id: 4, title: "玛曲县沙化退化草原综合治理总体规划》", desc: "系统推进沙化草原巩固治理和系统修复。", source: "" },
  { id: 5, title: "《甘南州草畜平衡条例》", desc: "为草畜平衡管理提供法律保障。", source: "玛曲县人民政府" },
  { id: 6, title: "《甘肃省草原条例》", desc: "强化草原沙化防治法律责任。", source: "甘南藏族自治州林业和草原局" },
  { id: 7, title: "《玛曲县草原鼠害综合防治实施方案》", desc: "推广生物防治技术。", source: "玛曲县人民政府" },
  { id: 8, title: "《国家重点生态功能区转移支付管理办法》", desc: "专项支持沙化草原治理。", source: "玛曲县人民政府" },
  { id: 9, title: "《甘南州山水林田湖草沙一体化保护和修复工程前期工作方案》", desc: "", source: "玛曲县人民政府" },
  { id: 10, title: "《第三轮草原生态保护补助奖励政策实施指导意见》", desc: "", source: "甘南藏族自治州农业农村局" },
  { id: 11, title: "《甘南黄河上游水源涵养区山水林田湖草沙一体化保护和修复工程实施方案》", desc: "玛曲沙化退化草地修复治理项目共治理沙化草地11.47万亩。", source: "" },
  { id: 12, title: "《玛曲县国土空间总体规划（2021-2035年）》", desc: "划定生态保护红线5484.76平方千米（占全域57%）", source: "玛曲县人民政府" },
  { id: 13, title: "《甘南州黄河流域生态保护和高质量发展规划》", desc: "将玛曲沙化草原治理列为重点工程", source: "" },
  { id: 14, title: "《玛曲县退牧还湿实施方案》", desc: "退牧还湿总面积60499亩退牧还草40000亩", source: "" },
  { id: 15, title: "《甘肃省\"三北\"工程建设实施方案》", desc: "专项支持黄河沿岸阻沙林带建设", source: "" }
];

// 资金投入数据
const fundingData = [
  { name: '三轮草原生态保护补助奖励政策', startYear: 2014, endYear: 2025, amount: 7.53 },
  { name: '甘南黄河上游水源涵养区山水林田湖草沙一体化保护和修复工程', startYear: 2021, endYear: 2025, amount: 8.71 },
  { name: '甘南黄河重要水源补给生态功能区规划', startYear: 2014, endYear: 2020, amount: 6.00 },
  { name: '退化草原人工种草生态修复试点', startYear: 2019, endYear: 2025, amount: 1.06 },
  { name: '沙化退化草原巩固治理项目', startYear: 2017, endYear: 2020, amount: 0.50 },
  { name: '国家沙化土地封禁保护区建设', startYear: 2017, endYear: 2020, amount: 0.08 },
  { name: '退牧还湿与退牧还草补助', startYear: 2022, endYear: 2025, amount: 0.35 },
  { name: '鼠害致沙化草原治理专项资金', startYear: 2020, endYear: 2025, amount: 0.20 },
  { name: '生态管护员制度', startYear: 2014, endYear: 2025, amount: 1.86 },
  { name: '沙化草原综合治理示范项目', startYear: 2014, endYear: 2015, amount: 0.17 },
  { name: '黄河上游(若尔盖片区)玛曲县水源涵养与生态保护修复项目', startYear: 2024, endYear: 2025, amount: 2.70 },
  { name: '生态保护修复专项中央预算内投资', startYear: 2024, endYear: 2025, amount: 1.66 }
];

// 固沙技术数据
const sandFixingTechData = [
  {
    name: '草方格沙障',
    rate: 90,
    area: '流动沙丘/重度沙化区',
    description: '在流动沙丘等重度沙化区，草方格沙障的固沙率达90%以上，为植被恢复创造条件。',
    image: '/src/assets/images/草方格沙障.jpg'
  },
  {
    name: '植物纤维沙障',
    rate: 85,
    area: '半流动沙地',
    description: '环保可降解，适用于半流动沙地的治理。',
    image: '/src/assets/images/植物纤维可降解沙障.jpg'
  },
  {
    name: '植物活体沙障',
    rate: 88,
    area: '缓坡沙地/河岸带',
    description: '用山生柳、沙棘等乡土灌木扦插形成屏障，兼具固沙与生态修复功能。',
    image: '/src/assets/images/植物活体沙障.jpg'
  },
  {
    name: '柳条沙障',
    rate: 82,
    area: '干涸河道/河岸沙化区',
    description: '适应水湿条件，特别适合在干涸河道和河岸沙化区域使用。',
    image: '/src/assets/images/柳条沙障.jpg'
  }
];

// 植被恢复技术数据
const vegetationTechData = [
  { name: '缓释营养棒', value: 85, description: '让60度以上高陡基岩边坡植被覆盖率达85%以上' },
  { name: '草种混合物', value: 30, description: '壕沟种植法将种子成活率提高30%' },
  { name: '牧草混播', value: 75, description: '一年生+多年生牧草混播模式实现快速覆盖与长期稳定的有机结合' }
];

// 配套技术数据
const supportingTechData = [
  { name: '围栏封育', area: 25000, description: '防止牲畜进入，促进自然恢复' },
  { name: '鼠害防控', area: 18000, description: '生物防治技术，保护草原植被' },
  { name: '精准施肥', area: 12000, description: '提高土壤肥力，促进植被生长' },
  { name: '生态草帘覆盖', area: 10000, description: '减少水分蒸发，保持土壤湿度' }
];

export default function Page3() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const policySectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: policySectionRef,
    offset: ["start end", "end start"]
  });

  // 生成甘特图数据
  const 甘特图Data = fundingData.map(project => {
    const yearRange = Array.from({ length: 2025 - 2014 + 1 }, (_, i) => 2014 + i);
    const bars = yearRange.map(year => {
      if (year >= project.startYear && year <= project.endYear) {
        return {
          name: project.name,
          year,
          value: 1,
          amount: project.amount
        };
      }
      return null;
    }).filter(Boolean);
    
    return bars;
  }).flat();

  // 处理部分展开/收起
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // 颜色生成函数
  const getColorForIndex = (index: number) => {
    const colors = ['#2e7d32', '#388e3c', '#43a047', '#4caf50', '#558b2f', '#689f38'];
    return colors[index % colors.length];
  };

  // 动画变量
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
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
            账本投入：真金白银+硬核技术的"治沙攻坚"
          </h1>
          
           <div className="relative">
            <img
              src={restorationImage}
              alt="沙化带复绿"
              className="w-full max-w-4xl max-h-96 object-cover rounded-lg shadow-md mx-auto block"
              style={{ aspectRatio: '4/3' }}
            />
            <p className="text-gray-500 text-sm text-right mt-2 italic  mx-auto w-full max-w-4xl">
              甘肃省甘南藏族自治州玛曲县城郊黄河岸边的沙化带已被牧草和灌木复绿<br/>
              新华社记者　陈斌　摄
            </p>
          </div>
        </motion.div>
        
        {/* 介绍文字 */}
        <motion.p 
          className="text-lg text-gray-800 mb-12 text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >
          为扭转生态颓势，玛曲开始系统性填充生态账本的"投入项"，政策、资金、技术多管齐下，打响了一场为期十余年的治沙攻坚战。
        </motion.p>
        
        {/* 政策部分 */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-green-800 mb-6 border-b-2 border-green-200 pb-2">
            政策投入：全方位织就生态保护网
          </h2>
          
           <p className="text-xl text-gray-800 mb-8 text-justify">
              政策层面，一张全方位的生态保护网逐步织就。2014年以来，《甘南黄河重要水源补给生态功能区生态保护与建设规划》《玛曲县沙化退化草原综合治理总体规划》等15项政策相继出台，从法律保障、资金支持、管理规范等多方面为治沙提供支撑。《甘南州草畜平衡管理办法》划定240万个羊单位的草原生态红线，《第三轮草原生态保护补助奖励政策》推动禁牧和草畜平衡制度落地，让生态保护有章可循、有法可依。
            </p>
          
             {/* 政策卡片滚动区域 */}
          <div ref={policySectionRef} className="relative h-[1000px] overflow-hidden">
            <div className="absolute inset-0 flex items-center">
              {policyData.map((policy, index) => (
                <motion.div
                  key={policy.id}
                  className={`absolute p-8 bg-white rounded-lg shadow-lg max-w-xl transition-all duration-300 ${
                    index % 2 === 0 ? 'left-6 md:left-16' : 'right-6 md:right-16'
                  }`}
                  style={{ 
                    top: `${5 + (index * 90) / policyData.length}%`,
                    rotateY: index % 2 === 0 ? '10deg' : '-10deg',
                    // 为特定卡片（id为14和15）设置更高的透明度和z-index
                    opacity: policy.id === 14 || policy.id === 15 ? 1 : 0.7 + (index * 0.02),
                    scale: policy.id === 14 || policy.id === 15 ? 0.95 : 0.85 + (index * 0.015),
                    zIndex: policy.id === 14 || policy.id === 15 ? 999 : index
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    opacity: 1,
                    rotateY: 0,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
                    zIndex: 9999,
                    transformOrigin: 'center center'
                  }}
                >
                  <h3 className="text-lg font-semibold text-green-800 mb-3">{policy.title}</h3>
                  {policy.desc && <p className="text-gray-600 mb-3">{policy.desc}</p>}
                  {policy.source && <p className="text-gray-500 text-xs italic">— {policy.source}</p>}
                </motion.div>
              ))}
           </div>
          </div>
        </motion.section>
        
         {/* 资金投入部分 */}
         <motion.section 
           className="mb-16"
           variants={itemVariants}
         >
            <h2 className="text-2xl font-bold text-green-800 mb-6 border-b-2 border-green-200 pb-2">
               资金投入：真金白银注入治沙动力
             </h2>
             
              <p className="text-xl text-gray-800 mb-8 text-justify">
                 资金投入上，真金白银的支持为治沙注入动力。2014至2025年间，国家累计投入超35亿元，涵盖三轮草原生态保护补助奖励、山水林田湖草沙一体化保护和修复等12大类重点项目。其中，仅甘南黄河上游水源涵养区山水林田湖草沙一体化保护和修复工程就投入8.71亿元，草原生态保护补助奖励政策累计发放5.58亿元，生态管护员制度投入1.86亿元，真金白银的投入为治沙提供了坚实保障。
               </p>
              
                {/* 资金投入甘特图 */}
               <div className="bg-white p-6 rounded-lg shadow-md h-[600px]">
                 <ResponsiveContainer width="100%" height="100%">
                   {/* 将 start/end 转为 offset/duration，再用堆叠条实现甘特图 */}
                   {(() => {
                     const chartData = fundingData.map(d => ({
                       ...d,
                       offset: d.startYear - 2014,
                       duration: d.endYear - d.startYear
                     }));
                     return (
                       <BarChart
                         layout="vertical"
                         data={chartData}
                         margin={{ top: 20, right: 30, left: 280, bottom: 60 }}
                       >
                         <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                         <XAxis 
                           type="number"
                           domain={[0, 11]} // 从2014开始到2025，共11个单位
                           ticks={[0,2,4,6,8,10,11]}
                           tick={{ fontSize: 12 }}
                           tickFormatter={(n) => `${n + 2014}`}
                         />
                         <YAxis 
                           type="category" 
                           dataKey="name" 
                           width={280}
                           tick={{ fontSize: 12 }}
                           tickLine={false}
                           axisLine={false}
                         />
                         <Tooltip 
                           formatter={(value: any, name: any, props: any) => {
                             const data = props.payload;
                             return [
                               `实施周期: ${data.startYear} - ${data.endYear}`,
                               `投入金额: ${data.amount} 亿元`
                             ];
                           }}
                           labelFormatter={(label) => `项目: ${label}`}
                           contentStyle={{ 
                             borderRadius: '8px', 
                             border: 'none', 
                             boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                           }}
                         />
                         {/* 透明的偏移量条，用于把可见条推到正确年份起点 */}
                         <Bar dataKey="offset" stackId="a" fill="transparent" />
                         {/* 可见时长条（duration）按条目填色 */}
                         <Bar dataKey="duration" stackId="a" barSize={16} name="项目周期">
                           {chartData.map((entry, index) => {
                             const maxAmount = Math.max(...chartData.map(d => d.amount));
                             const minAmount = Math.min(...chartData.map(d => d.amount));
                             const ratio = (entry.amount - minAmount) / (maxAmount - minAmount || 1);
                             const baseR = 60;
                             const baseG = 150;
                             const baseB = 70;
                             const r = Math.max(20, baseR - Math.floor(ratio * 40));
                             const g = Math.max(80, baseG - Math.floor(ratio * 70));
                             const b = Math.max(30, baseB - Math.floor(ratio * 40));
                             return (
                               <Cell 
                                 key={`cell-${index}`} 
                                 fill={`rgb(${r}, ${g}, ${b})`}
                                 radius={[4, 4, 4, 4]}
                               />
                             );
                           })}
                         </Bar>
                       </BarChart>
                     );
                   })()}
                 </ResponsiveContainer>
                 <p className="text-gray-500 text-xs text-center">
                   数据来源：玛曲县财政局、发展和改革委员会 | 注：颜色越深表示投入资金越多
                 </p>
               </div>
         </motion.section>
        
        {/* 技术创新部分 */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-green-800 mb-6 border-b-2 border-green-200 pb-2">
            技术创新：治沙的"硬核密码"
          </h2>
          
           <p className="text-xl text-gray-800 mb-8 text-justify">
              技术创新则成为治沙的"硬核密码"。针对玛曲高寒、多风、植物生长期短的特殊环境，当地探索出一套因地制宜的治理技术体系。在流动沙丘等重度沙化区，草方格沙障的固沙率达90%以上，为植被恢复创造条件；植物活体沙障用山生柳、沙棘等乡土灌木扦插形成屏障，兼具固沙与生态修复功能；"缓释营养棒+挂网喷播植草"技术让60度以上高陡基岩边坡植被覆盖率达85%以上，"草种+有机肥混合物"壕沟种植法则将种子成活率提高30%。
            </p>
          
          {/* 固沙技术 */}
          <div className="mb-12">
            <button 
              onClick={() => toggleSection('sandFixing')}
              className="w-full flex justify-between items-center text-left bg-white p-4 rounded-lg shadow-md hover:bg-green-50 transition-colors"
            >
              <h3 className="text-xl font-bold text-green-800 flex items-center">
                <i className="fa-solid fa-shield-alt mr-3"></i>
                固沙技术
              </h3>
              <i className={`fa-solid transition-transform duration-300 ${activeSection === 'sandFixing' ? 'fa-chevron-down rotate-180' : 'fa-chevron-down'}`}></i>
            </button>
            
            {activeSection === 'sandFixing' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 grid grid-cols-2 gap-6"
              >
                {sandFixingTechData.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg shadow-md border-l-4 border-green-600 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <img
                      src={tech.image}
                      alt={tech.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-green-800 mb-2">{tech.name}</h4>
                      <p className="text-sm text-gray-600 mb-2"><strong>适用区域：</strong>{tech.area}</p>
                      <p className="text-sm text-gray-600 mb-2"><strong>效果指标：</strong>固沙率 {tech.rate}%</p>
                      <p className="text-sm text-gray-600">{tech.description}</p>
                    </div>
                  </motion.div>
                ))}
                
                {/* <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sandFixingTechData}
                        cx="50%"
                        cy="50%"
                        innerRadius="40%"
                        outerRadius="70%"
                        paddingAngle={5}
                        dataKey="rate"
                        nameKey="name"
                        label={(entry) => `${entry.name}: ${entry.rate}%`}
                      >
                        {sandFixingTechData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getColorForIndex(index)} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div> */}
              </motion.div>
            )}
          </div>
          
          {/* 植被恢复技术 */}
          <div className="mb-12">
            <button 
              onClick={() => toggleSection('vegetation')}
              className="w-full flex justify-between items-center text-left bg-white p-4 rounded-lg shadow-md hover:bg-green-50 transition-colors"
            >
              <h3 className="text-xl font-bold text-green-800 flex items-center">
                <i className="fa-solid fa-seedling mr-3"></i>
                植被恢复技术
              </h3>
              <i className={`fa-solid transition-transform duration-300 ${activeSection === 'vegetation' ? 'fa-chevron-down rotate-180' : 'fa-chevron-down'}`}></i>
            </button>
            
            {activeSection === 'vegetation' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold text-green-800 mb-4">草灌结合模式</h4>
                    <img src="/src/assets/images/草灌结合3.jpg" alt="草灌结合模式" className="w-full h-48 object-cover rounded-lg mb-4" />
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <i className="fa-solid fa-check-circle text-green-600 mt-1 mr-2"></i>
                        <span>山生柳+沙棘+披碱草混播模式</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fa-solid fa-check-circle text-green-600 mt-1 mr-2"></i>
                        <span>金露梅+嵩草+针茅组合模式</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fa-solid fa-check-circle text-green-600 mt-1 mr-2"></i>
                        <span>高山柳+披碱草+老芒麦固沙模式</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold text-green-800 mb-4">适生植物优选</h4>
                    <img src="/src/assets/images/适生植物-金露梅.jpg" alt="适生植物优选" className="w-full h-48 object-cover rounded-lg mb-4" />
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <i className="fa-solid fa-leaf text-green-600 mt-1 mr-2"></i>
                        <span>乡土灌木：山生柳、沙棘、金露梅</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fa-solid fa-leaf text-green-600 mt-1 mr-2"></i>
                        <span>优良牧草：披碱草、老芒麦、垂穗披碱草</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fa-solid fa-leaf text-green-600 mt-1 mr-2"></i>
                        <span>固沙草本：嵩草、针茅、羊茅</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {vegetationTechData.map((tech, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-600 hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
                      >
                        <h4 className="text-md font-semibold text-green-800 mb-2">{tech.name}</h4>
                        {/* <p className="text-sm text-gray-600 mb-2">
                          {tech.name === '草种混合物' ? `提高成活率 ${tech.value}%` : `覆盖率 ${tech.value}%`}
                        </p> */}
                        <p className="text-xs text-gray-500">{tech.description}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* <div className="bg-white p-4 rounded-lg shadow-md h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={vegetationTechData}
                        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Bar dataKey="value" fill="#4caf50" radius={[0, 4, 4, 0]}>
                          {vegetationTechData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColorForIndex(index)} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div> */}
                </div>
              </motion.div>
            )}
          </div>
          
          {/* 配套技术措施 */}
          <div className="mb-12">
            <button 
              onClick={() => toggleSection('supporting')}
              className="w-full flex justify-between items-center text-left bg-white p-4 rounded-lg shadow-md hover:bg-green-50 transition-colors"
            >
              <h3 className="text-xl font-bold text-green-800 flex items-center">
                <i className="fa-solid fa-tools mr-3"></i>
                配套技术措施
              </h3>
              <i className={`fa-solid transition-transform duration-300 ${activeSection === 'supporting' ? 'fa-chevron-down rotate-180' : 'fa-chevron-down'}`}></i>
            </button>
            
            {activeSection === 'supporting' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {supportingTechData.map((tech, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-600 hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
                    >
                      <h4 className="text-md font-semibold text-green-800 mb-2">{tech.name}</h4>
                      <p className="text-sm text-gray-600 mb-2"><strong>实施面积：</strong>{tech.area.toLocaleString()} 亩</p>
                      <p className="text-sm text-gray-600">{tech.description}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={supportingTechData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis tickFormatter={(tick) => `${Number(tick).toLocaleString()} 亩`} />
                      <Tooltip formatter={(value) => `${value.toLocaleString()} 亩`} />
                      <Bar dataKey="area" name="实施面积" fill="#4caf50" radius={[4, 4, 0, 0]}>
                        {supportingTechData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getColorForIndex(index)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
        
        {/* 治沙人物部分 */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 治沙工程师 */}
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6 border-b-2 border-green-200 pb-2">
                治沙工程师：马春林
              </h2>
              
               <p className="text-xl text-gray-800 mb-6 text-justify">
                治沙工程师马春林是这些技术的实践者与推广者。2012年大学毕业后，他放弃了城市的工作机会，回到家乡扎根治沙一线。"按照'因地制宜、因害设防'的原则，我们要像下围棋一样，一步步把黄沙'围'起来，让绿色'长'出来。"马春林说。压沙季节，他每天与工程队奔波在海拔3400米以上的治沙点，皮肤和衣服常被沙砾划破，妻子总调侃"压沙季得天天帮他补裤子"。他带领团队推广的"一年生+多年生牧草混播"模式，实现了快速覆盖与长期稳定的有机结合，让治沙效率大幅提升。
              </p>
              
              <div className="relative">
                <img 
                  src={engineerImage} 
                  alt="马春林介绍治沙情况" 
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-gray-500 text-sm text-right mt-2 italic">
                  2024年5月，玛曲县自然资源局工作人员对该县欧拉镇欧强村阻沙林带建设试点项目治理情况进行介绍。九美旦增 摄
                </p>
              </div>
            </div>
            
            {/* 牧民参与 */}
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6 border-b-2 border-green-200 pb-2">
                牧民参与：卓玛加布
              </h2>
              
              <div className="relative mb-6">
                <img 
                  src={herdsmanImage} 
                  alt="卓玛加布查看灌木生长" 
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-gray-500 text-sm text-left mt-2 italic">
                  牧民卓玛加布在黄河玛曲段干流沿岸一处草原沙化治理点查看他参与种植的灌木生长情况<br/>
                  新华社记者　陈斌　摄
                </p>
              </div>
              
               <p className="text-xl text-gray-800 text-justify">
                牧民的主动参与，让生态账本的"投入项"更具温度。"环保愚公"卓玛加布从2003年起就带领家人清理草场垃圾，2012年更是拿出60多万元积蓄加入治沙行列，发明的"废草皮移植法"被县畜牧林业局推广。"治沙不能光靠政府，我们现在不治沙，往后没有草场了怎么办？"卓玛加布带头减畜，说服村民转变传统观念，还成立公司解决23名农牧民就业，用产业带动生态保护意识提升。道吉仁青也响应草畜平衡政策，将自家超载的牲畜核减一半，加入生态管护队，成为草原的"守护者"。
              </p>
            </div>
          </div>
        </motion.section>
        
        {/* 导航到下一页 */}
        <motion.div 
          className="flex justify-center mt-16"
          variants={itemVariants}
        >
          <a 
            href="/page4" 
            className="text-green-600 text-lg flex items-center gap-2 hover:underline"
          >
            <span>继续阅读：账本盈余</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}