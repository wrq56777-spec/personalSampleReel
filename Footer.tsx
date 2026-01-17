import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">数据来源：</h3>
            <ul className="space-y-2 text-gray-600">
              <li>玛曲县人民政府</li>
              <li>玛曲县政府工作报告</li>
              <li>玛曲县生态保护规划</li>
              <li>甘肃省林业和草原局</li>
              <li>第五次全国荒漠化和沙化监测报告</li>
              <li>国家林业和草原局政府网</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">指导老师：</h3>
            <ul className="space-y-2 text-gray-600">
              <li>梁玮</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">小组成员：</h3>
            <ul className="space-y-2 text-gray-600">
              <li>吴睿祺</li>
              <li>田益瑕</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2026 黄河"蓄水池"的重生账本 | 版权所有</p>
        </div>
      </div>
    </footer>
  );
}