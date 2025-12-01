import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ShieldAlert, ArrowLeft, Check, AlertTriangle, X, ChevronDown, ChevronUp, Search, FileText, Users, Calendar, Globe, Copy, Share2, Download, Award, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

// 定义专利数据类型
interface Patent {
  id: string;
  title: string;
  applicant: string;
  date: string;
  country: string;
  type: string;
  abstract: string;
  similarity?: number;
  risk?: string;
}

// 定义技术特征类型
interface TechFeature {
  id: string;
  name: string;
  description: string;
  weight: number;
  matched: boolean;
  children?: TechFeature[];
}

// 模拟专利数据
const patentA: Patent = {
  id: 'CN-2024-1234567',
  title: '一种基于人工智能的专利文本分析方法',
  applicant: '扣子科技有限公司',
  date: '2024-06-15',
  country: 'CN',
  type: '发明专利',
  abstract: '本发明公开了一种基于人工智能的专利文本分析方法，包括文本预处理、特征提取、语义分析等步骤。该方法能够快速识别专利文本中的技术特征，提高专利分析效率和准确性。',
};

const patentB: Patent = {
  id: 'US-11234567-B2',
  title: 'System and Method for Patent Semantic Analysis Using Deep Learning',
  applicant: 'Coze Tech Inc.',
  date: '2024-01-23',
  country: 'US',
  type: '发明专利',
  abstract: 'The present invention provides a system and method for analyzing patent documents using deep learning techniques. The system extracts key technical features and performs semantic comparisons between different patents.',
};

// 模拟技术特征数据
const techFeaturesA: TechFeature[] = [
  {
    id: 'f1',
    name: '文本预处理模块',
    description: '对专利文本进行清洗、分词和标准化处理',
    weight: 0.3,
    matched: true,
    children: [
      {
        id: 'f1-1',
        name: '专利文本清洗',
        description: '去除噪声数据和格式化内容',
        weight: 0.1,
        matched: true,
      },
      {
        id: 'f1-2',
        name: '多语言分词处理',
        description: '支持中英文日韩等多语言分词',
        weight: 0.1,
        matched: true,
      },
      {
        id: 'f1-3',
        name: '文本标准化',
        description: '统一术语表述和格式',
        weight: 0.1,
        matched: false,
      },
    ],
  },
  {
    id: 'f2',
    name: '特征提取引擎',
    description: '从专利文本中提取技术特征',
    weight: 0.4,
    matched: true,
    children: [
      {
        id: 'f2-1',
        name: '关键词抽取',
        description: '识别专利中的核心技术词汇',
        weight: 0.1,
        matched: true,
      },
      {
        id: 'f2-2',
        name: '技术概念识别',
        description: '提取专利中的技术概念',
        weight: 0.1,
        matched: true,
      },
      {
        id: 'f2-3',
        name: '权利要求解析',
        description: '解析专利权利要求书的结构',
        weight: 0.2,
        matched: true,
      },
    ],
  },
  {
    id: 'f3',
    name: '语义分析模块',
    description: '对专利文本进行语义理解和分析',
    weight: 0.3,
    matched: false,
    children: [
      {
        id: 'f3-1',
        name: '上下文理解',
        description: '理解技术术语的上下文含义',
        weight: 0.1,
        matched: false,
      },
      {
        id: 'f3-2',
        name: '技术关联分析',
        description: '分析不同技术特征之间的关联',
        weight: 0.1,
        matched: false,
      },
      {
        id: 'f3-3',
        name: '语义相似度计算',
        description: '计算不同专利文本的语义相似度',
        weight: 0.1,
        matched: true,
      },
    ],
  },
];

const techFeaturesB: TechFeature[] = [
  {
    id: 'f1',
    name: 'Text Preprocessing Module',
    description: 'Cleans, tokenizes, and normalizes patent text',
    weight: 0.25,
    matched: true,
    children: [
      {
        id: 'f1-1',
        name: 'Patent Text Cleaning',
        description: 'Removes noise and formatted content',
        weight: 0.1,
        matched: true,
      },
      {
        id: 'f1-2',
        name: 'Multilingual Tokenization',
        description: 'Supports tokenization in multiple languages',
        weight: 0.1,
        matched: true,
      },
      {
        id: 'f1-3',
        name: 'Text Normalization',
        description: 'Unifies terminology and formats',
        weight: 0.05,
        matched: false,
      },
    ],
  },
  {
    id: 'f2',
    name: 'Feature Extraction Engine',
    description: 'Extracts technical features from patent text',
    weight: 0.45,
    matched: true,
    children: [
      {
        id: 'f2-1',
        name: 'Keyword Extraction',
        description: 'Identifies core technical terms in patents',
        weight: 0.1,
        matched: true,
      },
      {
        id: 'f2-2',
        name: 'Technical Concept Recognition',
        description: 'Extracts technical concepts from patents',
        weight: 0.15,
        matched: true,
      },
      {
        id: 'f2-3',
        name: 'Claim Analysis',
        description: 'Analyzes the structure of patent claims',
        weight: 0.2,
        matched: true,
      },
    ],
  },
  {
    id: 'f3',
    name: 'Deep Learning Semantic Analysis',
    description: 'Performs semantic understanding using deep learning',
    weight: 0.3,
    matched: false,
    children: [
      {
        id: 'f3-1',
        name: 'Contextual Understanding',
        description: 'Understands the contextual meaning of technical terms',
        weight: 0.1,
        matched: false,
      },
      {
        id: 'f3-2',
        name: 'Technical Relationship Analysis',
        description: 'Analyzes relationships between different technical features',
        weight: 0.1,
        matched: false,
      },
      {
        id: 'f3-3',
        name: 'Semantic Similarity Calculation',
        description: 'Calculates semantic similarity between different patents',
        weight: 0.1,
        matched: true,
      },
    ],
  },
];

// 相似度分析数据
const similarityData = [
  { name: '匹配特征', value: 65, color: '#22c55e' },
  { name: '部分匹配特征', value: 18, color: '#f97316' },
  { name: '不匹配特征', value: 17, color: '#ef4444' },
];

// 特征重要性数据
const featureImportanceData = [
  { name: '权利要求', importance: 85 },
  { name: '技术方案', importance: 75 },
  { name: '具体实施方式', importance: 60 },
  { name: '摘要', importance: 45 },
  { name: '背景技术', importance: 30 },
];

const ComparisonPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [expandedFeaturesA, setExpandedFeaturesA] = useState<string[]>([]);
  const [expandedFeaturesB, setExpandedFeaturesB] = useState<string[]>([]);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(true);
  const [riskLevel, setRiskLevel] = useState<'high' | 'medium' | 'low'>('high');
  const [activeView, setActiveView] = useState<'overview' | 'patentA' | 'patentB'>('overview');

  // 切换特征展开/折叠状态
  const toggleFeatureA = (featureId: string) => {
    setExpandedFeaturesA(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const toggleFeatureB = (featureId: string) => {
    setExpandedFeaturesB(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  // 复制专利ID
  const copyPatentId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast(`已复制专利号: ${id}`);
  };

  // 渲染技术特征树
  const renderFeatureTree = (
    features: TechFeature[],
    expandedFeatures: string[],
    toggleFeature: (id: string) => void,
    isLeft: boolean
  ) => {
    return features.map(feature => (
      <div key={feature.id} className="mb-3">
        <motion.div
          whileHover={{ x: isLeft ? 4 : -4 }}
          className={`p-3 rounded-lg border transition-all cursor-pointer ${
            feature.matched
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-gray-800/50 border-gray-700'
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {feature.matched ? (
                <Check size={16} className="text-green-500 mr-2" />
              ) : (
                <X size={16} className="text-red-500 mr-2" />
              )}
              <h4 className={`text-sm font-medium ${feature.matched ? 'text-green-400' : 'text-gray-300'}`}>
                {feature.name}
              </h4>
            </div>
            {feature.children && feature.children.length > 0 && (
              <button
                onClick={() => toggleFeature(feature.id)}
                className="text-gray-400 hover:text-white"
              >
                {expandedFeatures.includes(feature.id) ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">{feature.description}</p>
          
          {/* 子特征 */}
          {feature.children && feature.children.length > 0 && expandedFeatures.includes(feature.id) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`ml-6 mt-2 border-l-2 ${
                feature.matched ? 'border-green-500/30' : 'border-gray-700'
              } pl-4`}
            >
              {renderFeatureTree(feature.children, expandedFeatures, toggleFeature, isLeft)}
            </motion.div>
          )}
        </motion.div>
      </div>
    ));
  };

  // 获取风险等级对应的样式和文本
  const getRiskInfo = () => {
    switch(riskLevel) {
      case 'high':
        return {
          className: 'bg-red-500/20 border-red-500/40 text-red-400',
          text: '高风险',
          icon: <AlertTriangle size={16} className="mr-2" />,
          description: '两个专利在核心技术特征上高度相似，存在较高侵权风险',
        };
      case 'medium':
        return {
          className: 'bg-orange-500/20 border-orange-500/40 text-orange-400',
          text: '中等风险',
          icon: <AlertTriangle size={16} className="mr-2" />,
          description: '两个专利在部分技术特征上存在相似性，需进一步评估',
        };
      case 'low':
        return {
          className: 'bg-green-500/20 border-green-500/40 text-green-400',
          text: '低风险',
          icon: <Check size={16} className="mr-2" />,
          description: '两个专利技术特征差异较大，侵权风险较低',
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-violet-950 text-gray-100 flex flex-col">
      {/* 背景网格装饰 */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYyYzcuNzMgMCAxNC4zOSA1LjUgMTYuNTcgMTIuNTRoLTkuODR6IiBzdHJva2Utb3BhY2l0eT0iLjAyIiBzdHJva2U9IiNmZmYiLz48L2c+PC9zdmc+')] opacity-20 z-0"></div>
      
      {/* 顶部导航栏 - 玻璃态效果 */}
      <header className="backdrop-blur-lg bg-white/5 border-b border-white/10 z-30">
        <div className="px-4 py-3 flex items-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-white/10 mr-3 transition-all duration-300"
            onClick={() => navigate(-1)}
            aria-label="返回"
          >
            <ArrowLeft size={20} className="text-gray-300" />
          </motion.button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent flex items-center">
            <ShieldAlert size={20} className="mr-2" />
            专利技术比对
          </h1>
        </div>
      </header>

      <main className="flex-1 p-4 flex flex-col overflow-hidden z-10 pb-20">
        {/* 顶部统计卡片 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 mb-4"
        >
          <div className="flex flex-col justify-between items-center">
            <div className="flex items-center mb-4">
              <div className="mr-6">
                <p className="text-xs text-gray-400">整体相似度</p>
                <div className="flex items-end">
                  <span className="text-4xl font-bold text-blue-400">82.7</span>
                  <span className="text-gray-400 ml-1 mb-1">%</span>
                </div>
              </div>
              
              <div className={`px-4 py-2 rounded-lg border flex items-center ${getRiskInfo().className}`}>
                {getRiskInfo().icon}
                <span className="text-sm font-medium">{getRiskInfo().text}</span>
              </div>
            </div>
            
            <div className="flex space-x-2 w-full">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs flex items-center justify-center transition-all"
                onClick={() => toast('功能开发中，敬请期待')}
              >
                <Share2 size={14} className="mr-1" />
                分享报告
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs flex items-center justify-center transition-all"
                onClick={() => toast('功能开发中，敬请期待')}
              >
                <Download size={14} className="mr-1" />
                导出PDF
              </motion.button>
            </div>
          </div>
          
          <p className="text-xs text-gray-400 mt-3">{getRiskInfo().description}</p>
        </motion.div>
        
        {/* 移动端视图切换 */}
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('overview')}
            className={`px-4 py-2 rounded-lg text-sm flex-shrink-0 transition-all ${
              activeView === 'overview' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-white/5 border border-white/10 text-gray-300'
            }`}
          >
            比对概览
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('patentA')}
            className={`px-4 py-2 rounded-lg text-sm flex-shrink-0 transition-all ${
              activeView === 'patentA' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-white/5 border border-white/10 text-gray-300'
            }`}
          >
            专利 A 详情
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('patentB')}
            className={`px-4 py-2 rounded-lg text-sm flex-shrink-0 transition-all ${
              activeView === 'patentB' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-white/5 border border-white/10 text-gray-300'
            }`}
          >
            专利 B 详情
          </motion.button>
        </div>
        
        {/* 主要内容区域 - 移动端根据视图切换显示内容 */}
        <div className="flex-1 overflow-hidden">
          {/* 比对概览视图 */}
          {activeView === 'overview' && (
            <div className="space-y-4 h-full overflow-y-auto">
              {/* 相似度分析 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <h3 className="text-sm font-semibold text-gray-200 mb-3">相似度分析</h3>
                
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={similarityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={45}
                          paddingAngle={3}
                          dataKey="value"
                          stroke="rgba(0,0,0,0.1)"
                          strokeWidth={1}
                        >
                          {similarityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, '占比']}
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {similarityData.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-400 mb-1">{item.name}</div>
                      <div className="text-sm font-medium" style={{ color: item.color }}>{item.value}%</div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* 特征重要性分布 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-200">特征重要性分布</h3>
                  <button
                    onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                    className="text-xs text-blue-400 flex items-center"
                  >
                    {showTechnicalDetails ? (
                      <>隐藏详情 <ChevronUp size={12} className="ml-1" /></>
                    ) : (
                      <>显示详情 <ChevronDown size={12} className="ml-1" /></>
                    )}
                  </button>
                </div>
                
                {showTechnicalDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="h-48"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={featureImportanceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          type="number" 
                          domain={[0, 100]} 
                          tick={{ fontSize: 10, fill: '#9ca3af' }}
                          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          tick={{ fontSize: 10, fill: '#9ca3af' }}
                          width={80}
                          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        />
                        <Tooltip
                          formatter={(value) => [`${value}%`, '重要性']}
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                        <Bar 
                          dataKey="importance" 
                          fill="#3b82f6"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <p className="text-xs text-gray-300">权利要求书相似度: <span className="text-blue-400 ml-1">87.3%</span></p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                    <p className="text-xs text-gray-300">说明书相似度: <span className="text-purple-400 ml-1">78.9%</span></p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <p className="text-xs text-gray-300">技术方案相似度: <span className="text-green-400 ml-1">84.5%</span></p>
                  </div>
                </div>
              </motion.div>
              
              {/* 侵权风险评估 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <h3 className="text-sm font-semibold text-gray-200 mb-3">侵权风险评估</h3>
                
                <div className={`p-3 rounded-lg border mb-3 ${getRiskInfo().className}`}>
                  <div className="flex items-center">
                    {getRiskInfo().icon}
                    <span className="text-sm font-medium">{getRiskInfo().text}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{getRiskInfo().description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">权利要求覆盖度</span>
                    <div className="flex items-center">
                      <span className="text-xs text-red-400 font-medium">75%</span>
                      <i className="fa-solid fa-arrow-trend-up text-red-400 ml-1 text-xs"></i>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-400">技术特征重叠度</span>
                    <div className="flex items-center">
                      <span className="text-xs text-orange-400 font-medium">65%</span>
                      <i className="fa-solid fa-arrow-trend-up text-orange-400 ml-1 text-xs"></i>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg text-xs font-medium flex items-center justify-center shadow-lg shadow-blue-600/20"
                >
                  <Zap size={14} className="mr-1" />
                  生成完整评估报告
                </motion.button>
              </motion.div>
            </div>
          )}
          
          {/* 专利 A 详情视图 */}
          {activeView === 'patentA' && (
            <div className="flex flex-col h-full">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base font-semibold text-gray-200">专利 A</h3>
                  <button 
                    onClick={() => copyPatentId(patentA.id)}
                    className="text-xs text-blue-400 hover:underline flex items-center"
                  >
                    <Copy size={12} className="mr-1" />
                    复制ID
                  </button>
                </div>
                
                <h4 className="text-sm font-medium text-blue-400 mb-2">{patentA.id}</h4>
                <p className="text-sm mb-4 line-clamp-3">{patentA.title}</p>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center text-gray-400">
                    <Users size={12} className="mr-2 text-gray-500" />
                    <span>{patentA.applicant}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar size={12} className="mr-2 text-gray-500" />
                    <span>{patentA.date}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Globe size={12} className="mr-2 text-gray-500" />
                    <span>{patentA.country}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FileText size={12} className="mr-2 text-gray-500" />
                    <span>{patentA.type}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-400 mt-3 line-clamp-3">{patentA.abstract}</p>
              </div>
              
              <motion.div 
                className="flex-1 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 overflow-hidden flex flex-col"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-200">技术特征树</h3>
                  <div className="text-xs text-gray-400 flex items-center">
                    <Check size={12} className="text-green-500 mr-1" />
                    <span>已匹配</span>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2">
                  {renderFeatureTree(techFeaturesA, expandedFeaturesA, toggleFeatureA, true)}
                </div>
              </motion.div>
            </div>
          )}
          
          {/* 专利 B 详情视图 */}
          {activeView === 'patentB' && (
            <div className="flex flex-col h-full">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base font-semibold text-gray-200">专利 B</h3>
                  <button 
                    onClick={() => copyPatentId(patentB.id)}
                    className="text-xs text-blue-400 hover:underline flex items-center"
                  >
                    <Copy size={12} className="mr-1" />
                    复制ID
                  </button>
                </div>
                
                <h4 className="text-sm font-medium text-blue-400 mb-2">{patentB.id}</h4>
                <p className="text-sm mb-4 line-clamp-3">{patentB.title}</p>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center text-gray-400">
                    <Users size={12} className="mr-2 text-gray-500" />
                    <span>{patentB.applicant}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar size={12} className="mr-2 text-gray-500" />
                    <span>{patentB.date}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Globe size={12} className="mr-2 text-gray-500" />
                    <span>{patentB.country}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FileText size={12} className="mr-2 text-gray-500" />
                    <span>{patentB.type}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-400 mt-3 line-clamp-3">{patentB.abstract}</p>
              </div>
              
              <motion.div 
                className="flex-1 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 overflow-hidden flex flex-col"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-200">技术特征树</h3>
                  <div className="text-xs text-gray-400 flex items-center">
                    <Check size={12} className="text-green-500 mr-1" />
                    <span>已匹配</span>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2">
                  {renderFeatureTree(techFeaturesB, expandedFeaturesB, toggleFeatureB, false)}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      
      {/* 底部导航栏 - 适配移动端安全区域 */}
      <footer className="backdrop-blur-lg bg-white/5 border-t border-white/10 py-3 px-6 z-30">
        <div className="grid grid-cols-4 gap-1">
          <button 
            className="flex flex-col items-center justify-center py-1 text-gray-500"
            onClick={() => navigate('/')}
            aria-label="首页"
          >
            <i className="fa-solid fa-chart-bar text-xl"></i>
            <span className="text-xs mt-1">首页</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center py-1 text-gray-500"
            onClick={() => navigate('/search')}
            aria-label="检索"
          >
            <i className="fa-solid fa-search text-xl"></i>
            <span className="text-xs mt-1">检索</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center py-1 text-blue-400"
            onClick={() => navigate('/comparison')}
            aria-label="比对"
          >
            <i className="fa-solid fa-code-compare text-xl"></i>
            <span className="text-xs mt-1">比对</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center py-1 text-gray-500"
            onClick={() => navigate('/profile')}
            aria-label="我的"
          >
            <i className="fa-solid fa-user text-xl"></i>
            <span className="text-xs mt-1">我的</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ComparisonPage;