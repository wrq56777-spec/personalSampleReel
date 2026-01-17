import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, ReferenceDot, Label
} from 'recharts';

  // 图片地址
  const restoredGrasslandImage = "https://d.ifengimg.com/w1080_h720_q90_webp/e0.ifengimg.com/12/2019/0525/E96F7B45BF191F138045B73A0E06AA2343FEAC24_size113_w1080_h720.jpeg";

// 沙化土地面积数据
const sandAreaData = [
  { year: '2010', fixed: 12000, semiFixed: 28000, moving: 12000 },
  { year: '2011', fixed: 11500, semiFixed: 29000, moving: 12500 },
  { year: '2012', fixed: 11000, semiFixed: 30000, moving: 13500 },
  { year: '2013', fixed: 10800, semiFixed: 30500, moving: 14500 },
  { year: '2014', fixed: 10500, semiFixed: 31000, moving: 14700 },
  { year: '2016', fixed: 12000, semiFixed: 28500, moving: 14500 },
  { year: '2017', fixed: 13000, semiFixed: 26000, moving: 13000 },
  { year: '2018', fixed: 14000, semiFixed: 24000, moving: 12000 },
  { year: '2019', fixed: 15000, semiFixed: 22000, moving: 11000 },
  { year: '2020', fixed: 16000, semiFixed: 20000, moving: 10000 },
  { year: '2021', fixed: 17000, semiFixed: 18000, moving: 9000 },
  { year: '2022', fixed: 18000, semiFixed: 16000, moving: 8000 },
  { year: '2023', fixed: 19000, semiFixed: 14000, moving: 7000 },
  { year: '2024', fixed: 20000, semiFixed: 12000, moving: 6000 }
];

// 黄河水量数据
const waterVolumeData = [
  { year: '2010', volume: 114.0 },
  { year: '2014', volume: 142.0 },
  { year: '2015', volume: 118.0 },
  { year: '2016', volume: 148.0 },
  { year: '2019', volume: 201.2 },
  { year: '2020', volume: 157.4 },
  { year: '2021', volume: 196.0 },
  { year: '2023', volume: 168.6 },
  { year: '2024', volume: 173.0 }
];

// 空气质量数据
const airQualityData = [
  { year: '2018', rate: 0.8260 },
  { year: '2019', rate: 0.92 },
  { year: '2020', rate: 0.92 },
  { year: '2021', rate: 0.92 },
  { year: '2022', rate: 0.9670 },
  { year: '2023', rate: 0.9980 },
  { year: '2024', rate: 0.9940 }
];

// WaterBall component for Page4 — 改为按百分比线性填充整个圆形容器（仅修改此组件）
function WaterBall(props: { value: number; color?: string; size?: number; idSuffix?: string }) {
  const { value, color = '#43A047', size = 80, idSuffix = '' } = props as any;
  const percent = Math.max(0, Math.min(100, Number(value)));
  const clipId = useMemo(() => `aq-clip-${Math.random().toString(36).slice(2, 9)}-${idSuffix}`, [idSuffix]);
  const waveId = `${clipId}-wave`;

  // 在 SVG (0..200) 范围内保留一个稍小的矩形作为填充容器，圆形裁剪会把它裁成圆形
  const containerX = 10;
  const containerY = 10;
  const containerW = 180;
  const containerH = 180;

  // 线性计算水高，保证极小值可见
  const minVisiblePx = percent > 0 ? Math.max(2, Math.round(size * 0.03)) : 0;
  const waterHeightPx = Math.max((percent / 100) * containerH, minVisiblePx);
  const fillY = containerY + (containerH - waterHeightPx);

  // 波浪放置的纵向偏移（wave path 基准 y=50）
  const waveBaseOffset = fillY - 50;

  return (
    <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <svg viewBox="0 0 200 200" width={size} height={size} className="aq-waterball-svg" role="img" aria-label={`${percent}%`}>
        <defs>
          <clipPath id={clipId}>
            <circle cx="100" cy="100" r="90" />
          </clipPath>
          <path id={waveId} d="M0 50 C 25 40 50 60 75 50 C100 40 125 60 150 50 C175 40 200 60 225 50 V200 H0 Z" />
        </defs>

        <circle cx="100" cy="100" r="94" fill="none" stroke="#e6f2ef" strokeWidth="4" />

        <g clipPath={`url(#${clipId})`}>
          {/* 容器背景 */}
          <rect x={containerX} y={containerY} width={containerW} height={containerH} fill="#f6fffb" />

          {/* 线性矩形填充保证水位与百分比一致 */}
          <rect x={containerX} y={fillY} width={containerW} height={waterHeightPx} fill={color} />

          {/* 波浪在水面位置叠加，水平对齐容器 */}
          <g transform={`translate(${containerX}, ${waveBaseOffset})`} style={{ transition: 'transform 0.6s ease-out' }}>
            <g style={{ transformOrigin: '50% 50%', animation: 'aq-wave-y 3s ease-in-out infinite' }}>
              <use href={`#${waveId}`} x="0" y="0" fill={color} opacity="0.9" />
              <use href={`#${waveId}`} x="-70" y="6" fill={color} opacity="0.7" />
            </g>
            <g transform="translate(0,4)" style={{ opacity: 0.55 }}>
              <use href={`#${waveId}`} x="0" y="0" fill={color} />
            </g>
          </g>
        </g>

        <circle cx="100" cy="100" r="90" fill="none" stroke="#ffffff" strokeWidth="6" opacity="0.12" />
        <text x="100" y="110" textAnchor="middle" fontSize={Math.max(16, Math.round(size / 1.5))} fontWeight={700} fill="#ffffff" style={{ textShadow: '0 1px 0 rgba(0,0,0,0.15)' }}>
          {percent.toFixed(percent % 1 === 0 ? 0 : 1)}%
        </text>
      </svg>

      <style>{`
        .aq-waterball-svg { display: block; }
        @keyframes aq-wave-y {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}

// 城乡居民收入数据
const incomeData = [
  { year: '2011', rural: 4283, urban: 13918 },
  { year: '2012', rural: 4798, urban: 15861 },
  { year: '2013', rural: 5317, urban: 17066 },
  { year: '2014', rural: 5959, urban: 18502 },
  { year: '2016', rural: 7748, urban: 22390 },
  { year: '2017', rural: 8410, urban: 24010 },
  { year: '2018', rural: 9221, urban: 25770 },
  { year: '2019', rural: 10096, urban: 27756 },
  { year: '2020', rural: 10913, urban: 28896 },
  { year: '2021', rural: 12138.45, urban: 30745.95 },
  { year: '2022', rural: 13007.56, urban: 31840.5 },
  { year: '2023', rural: 14095, urban: 33881 },
  { year: '2024', rural: 15231.2, urban: 35653 }
];

// 城乡居民收入结构数据
const incomeStructureData = {
  years: ['2019', '2020', '2021', '2022', '2023', '2024'],
  types: ['工资性收入', '经营净收入', '财产净收入', '转移净收入'],
  urban: [
    [27412.6, 140.03, 439.82, 0],
    [28478, 146, 451, 0],
    [30120.52, 153.2, 460.76, 11.47],
    [31170.36, 160.93, 496.35, 12.86],
    [33084.32, 232.19, 544.8, 19.68],
    [34750.22, 282.13, 594.7, 25.95]
  ],
  rural: [
    [80.8, 6931.22, 28.59, 3055.24],
    [83, 7664, 29, 3137],
    [88.92, 8707.29, 32.21, 3310.03],
    [90.62, 9532.93, 33.16, 3350.85],
    [129.61, 10413.83, 36.59, 3514.97],
    [155.41, 11297.08, 39.46, 3739.26]
  ]
};

export default function Page4() {
  const [selectedYear, setSelectedYear] = useState(5); // 默认2024年
  
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
  
  // 颜色配置
  const colors = {
    fixedSand: '#556B2F',
    semiFixedSand: '#FFA500',
    movingSand: '#8B4513',
    water: '#3498db',
    ruralIncome: '#2ecc71',
    urbanIncome: '#3498db',
    urbanColors: ['#1E88E5', '#42A5F5', '#64B5F6', '#90CAF9'],
    ruralColors: ['#43A047', '#66BB6A', '#81C784', '#A5D6A7']
  };
 
  // 计算水量的平均值、最低点与峰值（用于图上标注）
  const { avgVolume, minPoint, maxPoint } = useMemo(() => {
    if (!waterVolumeData || waterVolumeData.length === 0) {
      return { avgVolume: 0, minPoint: null, maxPoint: null };
    }

    const volumes = waterVolumeData.map((d) => Number(d.volume || 0));
    const sum = volumes.reduce((s, v) => s + v, 0);
    const avg = sum / volumes.length;

    let minVal = Number.POSITIVE_INFINITY;
    let maxVal = Number.NEGATIVE_INFINITY;
    let minItem = waterVolumeData[0];
    let maxItem = waterVolumeData[0];

    waterVolumeData.forEach((d) => {
      const v = Number(d.volume || 0);
      if (v < minVal) { minVal = v; minItem = d; }
      if (v > maxVal) { maxVal = v; maxItem = d; }
    });

    // 保持一位小数（与数据展示风格一致）
    return {
      avgVolume: Math.round(avg * 10) / 10,
      minPoint: minItem,
      maxPoint: maxItem
    };
  }, []);
 
  // 带背景的数值气泡，用于标注峰值/低值
  function BubbleLabel(props: any) {
    const { x, y, value } = props as any;
    if (x == null || y == null) return null;
    const display = typeof value === 'number' ? (Math.round(value * 10) / 10) : value;
    const radius = 18;
    return (
      <g transform={`translate(${x}, ${y - radius - 8})`} style={{ pointerEvents: 'none' }}>
        <circle cx={0} cy={0} r={radius} fill={colors.water} stroke="#ffffff" strokeWidth={2} />
        <text x={0} y={6} textAnchor="middle" fill="#ffffff" fontSize={12} fontWeight={700}>
          {display}
        </text>
      </g>
    );
  }

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
            账本盈余：绿进沙退的"生态红利"
          </h1>
          
          <p className="text-lg text-gray-800 max-w-4xl mx-auto">
            持续的投入终见成效，玛曲的生态账本迎来了丰厚的"盈余"，生态改善与民生增收形成良性循环。
          </p>
        </motion.div>
        
        {/* 生态改善部分 */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-green-800 mb-8 border-b-2 border-green-200 pb-2">
            生态数据的巨变：草原重生的见证
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h4 className="text-gray-800 mb-6 text-justify">
                生态数据的巨变，见证着草原的重生。有数据表明2000-2021年,玛曲县植被覆盖度显著改善，改善区域主要分布在玛曲县东南边缘的齐哈玛乡、采日玛乡、曼日玛乡和黄河干流之间的大片区域,占整个县域国土面积的38.36%。曾经的流动沙丘被绿色覆盖，山生柳、沙棘等灌木成林，金露梅点缀其间，草原恢复了往日的生机。
              </h4>
              
              <p className="text-gray-800 mb-6 text-justify">
                沙化土地面积也从2012年的56226.67公顷持续缩减，2024年已降至28540公顷，12年间减少近一半，累计缩减27686.67公顷，相当于39000多个标准足球场的面积。
              </p>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={restoredGrasslandImage} 
                  alt="恢复的草原" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-green-50">
                  <p className="text-gray-800 italic">
                    "曾经的沙丘如今已变成了绿色的海洋，这是我们坚持治沙的最好回报。"
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* 沙化土地面积图表 */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-green-800 mb-4 text-center">
                  玛曲县沙化土地面积变化趋势 (2010-2024)
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={sandAreaData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorFixed" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.fixedSand} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={colors.fixedSand} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorSemiFixed" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.semiFixedSand} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={colors.semiFixedSand} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorMoving" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.movingSand} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={colors.movingSand} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis name="面积（公顷）" />
                      <Tooltip
                        formatter={(value, name, props) => {
                          let seriesName = '';
                          if (name === 'fixed') seriesName = '固定沙丘地';
                          else if (name === 'semiFixed') seriesName = '半固定沙丘地';
                          else if (name === 'moving') seriesName = '流动沙丘地';

                          return `${seriesName} ${value} 公顷`;
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="fixed" 
                        stackId="1"
                        stroke={colors.fixedSand} 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorFixed)" 
                        name="固定沙丘地"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="semiFixed" 
                        stackId="1"
                        stroke={colors.semiFixedSand} 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorSemiFixed)" 
                        name="半固定沙丘地"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="moving" 
                        stackId="1"
                        stroke={colors.movingSand} 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorMoving)" 
                        name="流动沙丘地"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-gray-500 text-xs text-center mt-2">
                  数据来源：玛曲县生态环境局 | 注：2015年数据缺失
                </p>
              </div>
            </div>
          </div>
          
          {/* 黄河水量和空气质量部分 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* 黄河水量 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-green-800 mb-4 text-center">
                黄河玛曲段出境水量变化
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={waterVolumeData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.water} stopOpacity={0.5}/>
                        <stop offset="95%" stopColor={colors.water} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis name="水量（亿立方米）" />
                    <Tooltip formatter={(value) => `${value} 亿立方米`} />

                    {/* 平均值参考线（虚线），将标签放到图内以免超出边界 */}
                    {Number.isFinite(avgVolume) && (
                      <ReferenceLine
                        y={avgVolume}
                        stroke={colors.water}
                        strokeDasharray="6 6"
                        strokeWidth={1}
                        label={{ position: 'insideRight', value: `平均 ${avgVolume} 亿`, fill: colors.water }}
                      />
                    )}

                    {/* 峰值与低值标注：使用 ReferenceDot 并直接显示数值标签 */}
                    {maxPoint && (
                      <ReferenceDot
                        x={maxPoint.year}
                        y={maxPoint.volume}
                        r={6}
                        fill={colors.water}
                        stroke="#fff"
                        strokeWidth={2}
                        label={{
                          position: 'top',
                          value: `${Number(maxPoint.volume).toFixed(1)} 亿`,
                          fill: colors.water,
                          fontWeight: 700
                        }}
                      />
                    )}
                    {minPoint && (
                      <ReferenceDot
                        x={minPoint.year}
                        y={minPoint.volume}
                        r={6}
                        fill={colors.water}
                        stroke="#fff"
                        strokeWidth={2}
                        label={{
                          position: 'bottom',
                          value: `${Number(minPoint.volume).toFixed(1)} 亿`,
                          fill: colors.water,
                          fontWeight: 700
                        }}
                      />
                    )}

                    <Area 
                      type="monotone" 
                      dataKey="volume" 
                      stroke={colors.water} 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorWater)" 
                      name="出境水量"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-500 text-xs text-center mt-2">
                数据来源：甘肃省水文局、黄河水利委员会等权威机构
              </p>
            </div>
            
            {/* 空气质量 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-green-800 mb-4 text-center">
                环境空气质量优良天数比例 (2018-2024)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 min-h-[280px] items-start">
                {airQualityData.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-3 rounded-lg shadow-sm relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-green-700 to-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.year}
                    </div>
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="relative w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center overflow-hidden mb-2">
                        {/* 使用动态双波水球 */}
                        <WaterBall value={item.rate * 100} color="#34a853" size={64} idSuffix={String(index)} />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-700">
                          {item.rate * 100}%
                        </div>
                        <div className="text-xs text-gray-500">
                          优良天数
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-500 text-xs text-center mt-2">
                数据来源：环境监测统计报告
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="text-gray-800 text-justify">
              黄河的水文数据同样亮眼。随着草原生态屏障功能的恢复，黄河玛曲段出境水量从2010年的114亿立方米稳步增长，2019年达到201.2亿立方米的峰值，2024年稳定在173亿立方米，十年间增长近五成，为黄河流域生态安全提供了有力支撑，"高原水塔"的功能持续增强。
            </h4>
            
            <p className="text-gray-800 mt-4 text-justify">
              玛曲县的空气质量持续优化。近年来，其空气质量优良天数比例保持在高位，2023年达到99.8%，2024年也维持在99.4%的优异水平。在2024年全省县级城市空气质量排名中，玛曲县位列前茅，成为甘肃省空气质量最好的地区之一，这标志着"黄河蓄水池"的蓝天底色更加纯净，生态安全屏障更加牢固。
            </p>
          </div>
        </motion.section>
        
        {/* 民生改善部分 */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-green-800 mb-8 border-b-2 border-green-200 pb-2">
            牧民收入账本：生态红利的直接体现
          </h2>
          
          <h4 className="text-gray-800 mb-8 text-justify">
            生态改善的同时，牧民的收入账本也愈发厚实。2016-2024 年，当地畜牧业牲畜年均增量达33.22万头，稳定的草原生态为传统畜牧业筑牢发展根基，形成"生态好、牲畜壮"的良性循环。牧民们的收入规模更是实现跨越式提升，2011-2024 年农村居民人均纯收入从4283元增至15231元，增幅达255.6%，城镇居民人均可支配收入从 13918 元增至 35653 元，增长 156.2%。同时，玛曲县居民收入结构由传统的"畜牧业经营收入占绝对主导"转变为"畜牧业经营为基础、工资性收入为重点、转移性收入为补充、财产性收入为新增长点"的多元格局，这种转变不仅增强了牧民抗风险能力，更让 "好生态" 真正转化为看得见、摸得着的增收红利。
          </h4>
          
          {/* 城乡居民收入对比图表 */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-12">
            <h3 className="text-lg font-semibold text-green-800 mb-4 text-center">
              城乡居民收入对比 (2011-2024)
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={incomeData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis 
                    tickFormatter={(value) => 
                      value >= 10000 ? `${(value / 10000).toFixed(0)}万` : value
                    }
                    name="收入（元）"
                  />
                  <Tooltip 
                    formatter={(value) => 
                      value >= 10000 ? `${(value / 10000).toFixed(2)}万元` : `${value}元`
                    }
                  />
                  <Legend />
                  <Bar 
                    dataKey="rural" 
                    name="农村居民收入" 
                    fill={colors.ruralIncome}
                    label={{
                      show: true,
                      position: 'top',
                      formatter: (value: number) => 
                        value >= 10000 ? `${(value / 10000).toFixed(1)}万` : value
                    }}
                  />
                  <Bar 
                    dataKey="urban" 
                    name="城镇居民收入" 
                    fill={colors.urbanIncome}
                    label={{
                      show: true,
                      position: 'top',
                      formatter: (value: number) => 
                        value >= 10000 ? `${(value / 10000).toFixed(1)}万` : value
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-gray-500 text-xs text-center mt-2">
              数据来源：玛曲县统计局
            </p>
          </div>
          
          {/* 城乡居民收入结构图表 */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-4 text-center">
            农村收入结构变化
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center mb-6">
              <label className="text-gray-700 mr-3 mb-2 md:mb-0">选择年份：</label>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {incomeStructureData.years.map((year, index) => (
                  <option key={index} value={index}>{year}年</option>
                ))}
              </select>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeStructureData.types.map((type, index) => ({
                      name: `农村${type}`,
                      value: incomeStructureData.rural[selectedYear][index]
                    }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    label={(entry) => {
                      // 计算百分比
                      const total = incomeStructureData.rural[selectedYear].reduce((sum, value) => sum + value, 0);
                      const percentage = ((entry.value / total) * 100).toFixed(0);
                      return `${percentage}%`;
                    }}
                  >
                    {incomeStructureData.types.map((_, index) => (
                      <Cell key={`rural-${index}`} fill={colors.ruralColors[index % colors.ruralColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}元`} />
                  <Legend 
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-800">
            <p className="text-gray-800 text-justify italic">
              "以前养300多头牦牛，草场吃不消，牛羊长得慢，一年忙下来也赚不了多少钱。"道吉仁青算了一笔增收账，"现在减畜后，牛羊吃得壮，出栏价格涨了25%，加上护林员工资和生态奖补，一年收入比以前多了3万多。"沙化治理项目每年还能提供0.5万人次就业，日工资180-320元，山水林田湖草沙工程更是带动4800余人次务工，人均增收7500元。此外，生态旅游、特色产品加工等新兴产业崛起，牧家乐、藏家乐收入占比达15%，户均年增收2-3万元，让牧民的"钱袋子"越来越鼓。
            </p>
          </div>
        </motion.section>
        
        {/* 导航到下一页 */}
        <motion.div 
          className="flex justify-center mt-16"
          variants={itemVariants}
        >
          <a 
            href="/page5" 
            className="text-green-600 text-lg flex items-center gap-2 hover:underline"
          >
            <span>继续阅读：账本永续</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}