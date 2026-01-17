import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// 图片地址
const overgrazingImage = "https://pic.baike.soso.com/ugc/baikepic2/0/ori-20221227173811-1763324205_jpeg_631_405_37429.jpg/800";
const rodentDamageImage = "http://photocdn.sohu.com/20110615/Img310270581.jpg";
const climateChangeImage = "https://d.ifengimg.com/w1080_h719_q90_webp/e0.ifengimg.com/07/2019/0525/808A1333A099D9DFE6F6ED76769FF9F80953A9F9_size130_w1080_h719.jpeg";
const sandInvasionImage = "https://x0.ifengimg.com/ucms/2024_41/70F4F4B05757A0A0EFF189DFCCD37796EE460107_size103_w543_h720.jpg";

// 水球图数据
const waterBallData = [
  { name: '草原综合植被盖度', value: 96.5, color: '#2e7d32' },
  { name: '沙化区域植被盖度', value: 10, color: '#9e9e9e' },
  { name: '流沙面积占比', value: 50, color: '#ffb74d' }
];

// 水球组件 - 整体代表100%，水量根据比例填充（使用矩形填充 + 波浪叠加确保线性比例）
function WaterBall(props: { value: number; color: string; label?: string; size?: number; idSuffix?: string }) {
  const { value, color, label, size = 160, idSuffix = '' } = props;
  const percent = Math.max(0, Math.min(100, Number(value)));
  const clipId = useMemo(() => `water-clip-${Math.random().toString(36).slice(2, 9)}-${idSuffix}`, [idSuffix]);
  const waveId = `${clipId}-wave`;

  // 容器矩形参数（位于 SVG 内部，圆形裁剪会将其裁切成圆形）
  const containerX = 15;
  const containerY = 15;
  const containerW = 170;
  const containerH = 170;

  // 水高（按百分比线性计算），并保证极小值可见
  const minVisiblePx = percent > 0 ? 4 : 0;
  const waterHeightPx = Math.max((percent / 100) * containerH, minVisiblePx);
  const fillY = containerY + (containerH - waterHeightPx);

  // 波浪需要一个基准偏移来将路径放在水面位置（路径内部以 y=50 为基准）
  const waveBaseOffset = fillY - 50;

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg viewBox="0 0 200 200" width={size} height={size} className="waterball-svg">
        <defs>
          {/* 圆形裁剪路径 */}
          <clipPath id={clipId}>
            <circle cx="100" cy="100" r="85" />
          </clipPath>
          {/* 波浪路径（可重复使用） */}
          <path id={waveId} d="M0 50 C 25 40 50 60 75 50 C100 40 125 60 150 50 C175 40 200 60 225 50 V200 H0 Z" />
        </defs>

        {/* 外边框圆 - 代表100%的容器 */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="3" />

        {/* 被裁剪的水面层 */}
        <g clipPath={`url(#${clipId})`}>
          {/* 空容器背景（用于显示容器内部的底色） */}
          <rect x={containerX} y={containerY} width={containerW} height={containerH} fill="#f9fafb" />

          {/* 实际水体：矩形填充保证线性高度 */}
          <rect x={containerX} y={fillY} width={containerW} height={waterHeightPx} fill={color} />

          {/* 波浪叠加在水体顶部，位置根据 fillY 调整 */}
          <g transform={`translate(${containerX}, ${waveBaseOffset})`} style={{ transition: 'transform 0.6s ease-out' }}>
            <g style={{ transformOrigin: '50% 50%', animation: 'wave-y 3s ease-in-out infinite' }}>
              <use href={`#${waveId}`} x="0" y="0" fill={color} opacity="0.95" />
              <use href={`#${waveId}`} x="-70" y="6" fill={color} opacity="0.7" />
            </g>
          </g>
        </g>

        {/* 内边框 - 分隔容器和水面 */}
        <circle cx="100" cy="100" r="85" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" />

        {/* 中心百分比文字 */}
        <text x="100" y="110" textAnchor="middle" fontSize="28" fontWeight={700} fill="#1f2937" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3)' }}>
          {percent.toFixed(percent % 1 === 0 ? 0 : 1)}%
        </text>
      </svg>

      {/* label 在 svg 外 */}
      {label && <div style={{ position: 'absolute', left: 0, right: 0, bottom: -28, textAlign: 'center', fontSize: 12, color: '#374151' }}>{label}</div>}

      <style>{`
        .waterball-svg { display: block; }
        @keyframes wave-y {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}

export default function Page2() {
  const [showDetail, setShowDetail] = useState(false);

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

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* 标题部分 */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 font-sans mb-6">
            账本赤字：沙进草退的"生存危机"
          </h1>
        </motion.div>
        
        {/* 主要内容部分 */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          variants={itemVariants}
        >
          {/* 左侧内容 */}
          <div>
            <p className="text-lg text-gray-800 mb-8 text-justify">
              <strong>玛曲的生态账本，曾被刺眼的"赤字"填满。</strong><br/>
              上世纪末至21世纪初，过度放牧、鼠害侵袭与自然气候变迁叠加，让这片草原陷入"沙进草退"的恶性循环。2012年，全县沙化土地总面积高达56226.67公顷，流动沙丘、半固定沙丘在草原上呈斑块状集中连片分布，仅裸沙面积就达8153.33公顷，潜在沙化草地更是蔓延至45180公顷。
            </p>
            
              {/* 三因素卡片 */}
              <div className="space-y-8">
                {/* 过度放牧 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow p-5">
                  <div className="flex flex-row gap-6 items-start">
                    <div className="w-1/2">
                      <img 
                        src={overgrazingImage} 
                        alt="过度放牧" 
                        className="w-full h-48 object-cover rounded"
                        style={{ aspectRatio: '16/9' }}
                      />
                    </div>
                    <div className="w-1/2 p-1">
                      <h3 className="text-xl font-semibold text-green-800 mb-2">过度放牧</h3>
                      <p className="text-gray-700 text-justify" style={{ margin: '5px 0' }}>
                        "多养牛羊多赚钱"的传统观念，让草原承载量持续超标，超载率一度高达36.33%，175.25万个羊单位的超载牲畜，不断啃食着草原的生机。
                      </p>
                    </div>
                  </div>
                </div>
               
                {/* 鼠害侵袭 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow p-5">
                  <div className="flex flex-row gap-6 items-start">
                    <div className="w-1/2">
                      <img 
                        src={rodentDamageImage} 
                        alt="鼠害侵袭" 
                        className="w-full h-48 object-cover rounded"
                        style={{ aspectRatio: '16/9' }}
                      />
                    </div>
                    <div className="w-1/2 p-1">
                      <h3 className="text-xl font-semibold text-green-800 mb-2">鼠害侵袭</h3>
                      <p className="text-gray-700 text-justify" style={{ margin: '5px 0' }}>
                        甘南州草原主要危害鼠种为高原鼢鼠和高原鼠兔两类。截至2022年底，全甘南州鼠害危害面积达536万亩。
                      </p>
                    </div>
                  </div>
                </div>
               
                {/* 自然变迁 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow p-5">
                  <div className="flex flex-row gap-6 items-start">
                    <div className="w-1/2">
                      <img 
                        src={climateChangeImage} 
                        alt="自然变迁" 
                        className="w-full h-48 object-cover rounded"
                        style={{ aspectRatio: '16/9' }}
                      />
                    </div>
                    <div className="w-1/2 p-1">
                      <h3 className="text-xl font-semibold text-green-800 mb-2">自然变迁</h3>
                      <p className="text-gray-700 text-justify" style={{ margin: '5px 0' }}>
                        玛曲地气高寒，多雨多风。黄河涨水就会淹没两岸相邻的草场，退水后河沙就留了下来。加上干支流多次改道，沙化问题逐渐蔓延。
                      </p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
          
          {/* 右侧内容 */}
          <div className="space-y-8">
            {/* 右侧图片 */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <img 
                  src={sandInvasionImage} 
                  alt="沙丘侵入的草场" 
                  className="w-full h-auto rounded object-cover"
                  style={{ aspectRatio: '4/2.7', objectPosition: 'center top' }}
                />
              <p className="text-gray-500 text-sm text-right mt-2 italic">
                2011年6月9日，甘肃省甘南藏族自治州玛曲县欧拉乡欧强村村民豆格甲走在被沙丘侵入的草场边缘<br/>
                新华社记者 聂建江 摄
              </p>
            </div>
            
            {/* 水球图 */}
            <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-80 mb-4">
              {!showDetail ? (
                <div className="relative h-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-around">
                    {waterBallData.map((entry, index) => (
                      <div key={index} className="flex flex-col items-center" style={{ width: 160 }}>
                        <WaterBall value={entry.value} color={entry.color} label={entry.name} idSuffix={String(index)} />
                      </div>
                    ))}
                  </div>
                  <button
                    className="absolute bottom-0 text-gray-500 text-sm underline hover:text-green-700 transition-colors"
                    onClick={() => setShowDetail(true)}
                  >
                    点击查看
                  </button>
                </div>
              ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <p className="text-lg text-gray-800 font-sans text-justify">
                      当时的玛曲，草原综合植被盖度虽维持在96.5%的水平，但沙化区域的扩张速度远超植被自然恢复速度。流动沙地的植被盖度不足10%，流沙面积占比超50%，风沙活动频繁，每年春季，黄沙甚至会掩埋牧民的房屋和牲畜棚圈。牧民的收入也陷入"越穷越养、越养越穷"的怪圈，牛羊品质下降，出栏价格低迷，单一的畜牧收入难以支撑家庭开支。
                    </p>
                    
                    <div className="bg-green-50 border-l-4 border-green-800 p-4 italic">
                      <p className="text-gray-900 text-justify">
                        玛曲县河曲马场万头牦牛养殖基地负责人道吉仁青说，过去家中最多养过300多头牦牛，牦牛多了，收入没有增加多少，可草场却日渐萎缩。"那时候牦牛长得慢，活干得多，钱赚得少，草场还一天天退化。"道吉仁青说。
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* 导航到下一页 */}
        <motion.div 
          className="flex justify-center mt-16"
          variants={itemVariants}
        >
          <a 
            href="/page3" 
            className="text-green-600 text-lg flex items-center gap-2 hover:underline"
          >
            <span>继续阅读：账本投入</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}