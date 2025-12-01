import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer
} from 'recharts';
import { 
  BarChart3, PieChart as PieChartIcon, TrendingUp, Calendar, 
  Filter, Download, Share2, ArrowLeft, ChevronDown, ChevronUp,
  Search, AlertTriangle, FileText, Users, Award, Globe, Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

// 定义类型
interface AnalyticsDataPoint {
  date: string;
  value: number;
}

interface RiskDistributionData {
  name: string;
  value: number;
  color: string;
}

interface PatentTypeData {
  name: string;
  value: number;
  color: string;
}

interface CountryDistributionData {
  name: string;
  high: number;
  medium: number;
  low: number;
}

interface RecentActivityData {
  id: string;
  title: string;
  description: string;
  type: 'alert' | 'search' | 'report' | 'view';
  time: string;
}

interface KeyMetricData {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: JSX.Element;
  color: string;
}

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [currentDateRange, setCurrentDateRange] = useState('month');
  const [expandedChart, setExpandedChart] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // 模拟趋势数据
  const trendData: AnalyticsDataPoint[] = [
    { date: '01/06', value: 65 },
    { date: '02/06', value: 59 },
    { date: '03/06', value: 80 },
    { date: '04/06', value: 81 },
    { date: '05/06', value: 56 },
    { date: '06/06', value: 55 },
    { date: '07/06', value: 72 },
    { date: '08/06', value: 68 },
    { date: '09/06', value: 91 },
    { date: '10/06', value: 85 },
    { date: '11/06', value: 90 },
    { date: '12/06', value: 95 },
  ];

  // 风险分布数据
  const riskDistributionData: RiskDistributionData[] = [
    { name: '高风险', value: 15, color: '#ef4444' },
    { name: '中风险', value: 32, color: '#f97316' },
    { name: '低风险', value: 68, color: '#22c55e' },
    { name: '无风险', value: 185, color: '#3b82f6' },
  ];

  // 专利类型分布数据
  const patentTypeData: PatentTypeData[] = [
    { name: '发明专利', value: 145, color: '#8b5cf6' },
    { name: '实用新型', value: 85, color: '#3b82f6' },
    { name: '外观设计', value: 70, color: '#22c55e' },
  ];

  // 国家分布数据
  const countryDistributionData: CountryDistributionData[] = [
    { name: '中国', high: 8, medium: 15, low: 65 },
    { name: '美国', high: 5, medium: 10, low: 58 },
    { name: '日本', high: 2, medium: 5, low: 42 },
    { name: '韩国', high: 0, medium: 2, low: 31 },
    { name: '欧洲', high: 0, medium: 0, low: 25 },
  ];

  // 最近活动数据
  const recentActivityData: RecentActivityData[] = [
    { 
      id: '1', 
      title: '检测到高风险专利HT-2025-12345', 
      description: '与您的专利CN-2024-1234567相似度达到87.2%', 
      type: 'alert', 
      time: '10分钟前' 
    },
    { 
      id: '2', 
      title: '系统完成每周专利扫描', 
      description: '共扫描326项专利，发现12项潜在风险', 
      type: 'report', 
      time: '3小时前' 
    },
    { 
      id: '3', 
      title: '生成专利比对报告', 
      description: 'CN-2024-1234567与US-11234567-B2的比对分析已完成', 
      type: 'report', 
      time: '昨天' 
    },
    { 
      id: '4', 
      title: '查看专利详情', 
      description: '查看了专利JP-6789012的详细信息', 
      type: 'view', 
      time: '2天前' 
    },
    { 
      id: '5', 
      title: '专利检索', 
      description: '关键词: 人工智能专利风险评估', 
      type: 'search', 
      time: '3天前' 
    },
  ];

  // 关键指标数据
  const keyMetricsData: KeyMetricData[] = [
    {
      id: '1',
      title: '监控专利总数',
      value: '300',
      change: '5.2%',
      trend: 'up',
      icon: <FileText size={18} />,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: '2',
      title: '高风险专利',
      value: '15',
      change: '25%',
      trend: 'up',
      icon: <AlertTriangle size={18} />,
      color: 'from-red-600 to-orange-600'
    },
    {
      id: '3',
      title: '平均相似度',
      value: '72.5%',
      change: '2.3%',
      trend: 'down',
      icon: <TrendingUp size={18} />,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: '4',
      title: '风险预警准确率',
      value: '92.3%',
      change: '1.2%',
      trend: 'up',
      icon: <Award size={18} />,
      color: 'from-green-600 to-teal-600'
    }
  ];

  // 切换时间范围
  const handleDateRangeChange = (range: string) => {
    setCurrentDateRange(range);
    toast(`已切换至${getDateRangeLabel(range)}数据`);
  };

  // 获取时间范围标签
  const getDateRangeLabel = (range: string): string => {
    switch (range) {
      case 'week': return '本周';
      case 'month': return '本月';
      case 'quarter': return '本季度';
      case 'year': return '本年度';
      default: return '本月';
    }
  };

  // 切换图表展开状态
  const toggleChartExpansion = (chartId: string) => {
    if (expandedChart === chartId) {
      setExpandedChart(null);
    } else {
      setExpandedChart(chartId);
    }
  };

  // 获取活动类型对应的图标和样式
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'alert':
        return { icon: <AlertTriangle size={16} />, color: 'bg-red-500/10 text-red-400' };
      case 'search':
        return { icon: <Search size={16} />, color: 'bg-blue-500/10 text-blue-400' };
      case 'report':
        return { icon: <FileText size={16} />, color: 'bg-green-500/10 text-green-400' };
      case 'view':
        return { icon: <Users size={16} />, color: 'bg-purple-500/10 text-purple-400' };
      default:
        return { icon: <FileText size={16} />, color: 'bg-gray-500/10 text-gray-400' };
    }
  };

  // 下载报告
  const handleDownloadReport = () => {
    toast('报告下载中...');
    setTimeout(() => {
      toast('报告已成功下载');
    }, 1500);
  };

  // 分享报告
  const handleShareReport = () => {
    toast('分享链接已复制到剪贴板');
  };

  // 查看专利详情
  const viewPatentDetail = (patentId: string) => {
    navigate(`/patent/${patentId}`);
  };

  // 骨架屏加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-violet-950 text-gray-100 flex flex-col">
        {/* 背景网格装饰 */}
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYyYzcuNzMgMCAxNC4zOSA1LjUgMTYuNTcgMTIuNTRoLTkuODR6IiBzdHJva2Utb3BhY2l0eT0iLjAyIiBzdHJva2U9IiNmZmYiLz48L2c+PC9zdmc+')] opacity-20 z-0"></div>
        
        {/* 顶部导航栏 */}
        <header className="backdrop-blur-lg bg-white/5 border-b border-white/10 z-30">
          <div className="px-4 py-3 flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 mr-3 transition-all duration-300"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} className="text-gray-300" />
            </motion.button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent flex items-center">
              <BarChart3 size={20} className="mr-2" />
              数据分析中心
            </h1>
          </div>
        </header>

        <main className="flex-1 p-4 z-10">
          {/* 加载骨架屏 */}
          <div className="space-y-4">
            {/* 顶部统计卡片加载 */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-1/2 mb-3"></div>
                  <div className="h-8 bg-white/10 rounded w-2/3 mb-1"></div>
                  <div className="h-3 bg-white/10 rounded w-1/3"></div>
                </div>
              ))}
            </div>
            
            {/* 图表加载 */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
              <div className="h-5 bg-white/10 rounded w-1/4 mb-4"></div>
              <div className="h-64 bg-white/10 rounded"></div>
            </div>
            
            {/* 两列图表加载 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
                <div className="h-5 bg-white/10 rounded w-1/3 mb-4"></div>
                <div className="h-64 bg-white/10 rounded"></div>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
                <div className="h-5 bg-white/10 rounded w-1/3 mb-4"></div>
                <div className="h-64 bg-white/10 rounded"></div>
              </div>
            </div>
            
            {/* 最近活动加载 */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
              <div className="h-5 bg-white/10 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-20 bg-white/10 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        
        {/* 底部导航栏 */}
        <footer className="backdrop-blur-lg bg-white/5 border-t border-white/10 py-2 px-6 z-30">
          <div className="grid grid-cols-4 gap-1">
            <button className="flex flex-col items-center justify-center py-1 text-gray-500">
              <i className="fa-solid fa-chart-bar text-xl"></i>
              <span className="text-xs mt-1">首页</span>
            </button>
            <button className="flex flex-col items-center justify-center py-1 text-gray-500">
              <i className="fa-solid fa-search text-xl"></i>
              <span className="text-xs mt-1">检索</span>
            </button>
            <button className="flex flex-col items-center justify-center py-1 text-gray-500">
              <i className="fa-solid fa-code-compare text-xl"></i>
              <span className="text-xs mt-1">比对</span>
            </button>
            <button className="flex flex-col items-center justify-center py-1 text-gray-500">
              <i className="fa-solid fa-user text-xl"></i>
              <span className="text-xs mt-1">我的</span>
            </button>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-violet-950 text-gray-100 flex flex-col">
      {/* 背景网格装饰 */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYyYzcuNzMgMCAxNC4zOSA1LjUgMTYuNTcgMTIuNTRoLTkuODR6IiBzdHJva2Utb3BhY2l0eT0iLjAyIiBzdHJva2U9IiNmZmYiLz48L2c+PC9zdmc+')] opacity-20 z-0"></div>
      
      {/* 顶部导航栏 - 玻璃态效果 */}
      <header className="backdrop-blur-lg bg-white/5 border-b border-white/10 z-30">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 mr-2 transition-all duration-300"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} className="text-gray-300" />
            </motion.button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent flex items-center">
              <BarChart3 size={20} className="mr-2" />
              数据分析中心
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
              onClick={() => toggleTheme()}
            >
              {theme === 'light' ? (
                <i className="fa-solid fa-moon text-gray-300"></i>
              ) : (
                <i className="fa-solid fa-sun text-yellow-400"></i>
              )}
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
              onClick={() => toast('筛选功能已激活')}
            >
              <Filter size={20} className="text-gray-300" />
            </motion.button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-auto z-10">
        {/* 顶部关键指标卡片 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-4 gap-4 mb-6"
        >
          {keyMetricsData.map(metric => (
            <motion.div
              key={metric.id}
              whileHover={{ y: -5 }}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 transition-all shadow-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-gray-400">{metric.title}</p>
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                  {metric.icon}
                </div>
              </div>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold">{metric.value}</h3>
                <span className={`ml-2 text-xs flex items-center ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.trend === 'up' ? '↑' : '↓'} {metric.change}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* 时间范围选择器 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-lg font-bold text-gray-200 flex items-center">
            <Calendar size={18} className="mr-2 text-blue-400" />
            数据分析
          </h2>
          
          <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-1">
            {['week', 'month', 'quarter', 'year'].map(range => (
              <motion.button
                key={range}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleDateRangeChange(range)}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  currentDateRange === range 
                    ? 'bg-white/20 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {getDateRangeLabel(range)}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* 主要图表区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-200 flex items-center">
              <TrendingUp size={16} className="mr-2 text-blue-400" />
              风险趋势分析
            </h3>
            
            <div className="flex items-center space-x-3">
              <button 
                className="text-xs text-gray-400 hover:text-white flex items-center"
                onClick={() => toggleChartExpansion('trend')}
              >
                {expandedChart === 'trend' ? '收起' : '展开'}
                {expandedChart === 'trend' ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
              </button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-1.5 rounded-full hover:bg-white/10 transition-all"
                onClick={handleDownloadReport}
              >
                <Download size={14} className="text-gray-400" />
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-1.5 rounded-full hover:bg-white/10 transition-all"
                onClick={handleShareReport}
              >
                <Share2 size={14} className="text-gray-400" />
              </motion.button>
            </div>
          </div>
          
          <div className={`${expandedChart === 'trend' ? 'h-[400px]' : 'h-[300px]'} transition-all duration-300`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}`, '风险指数']}
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTrend)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* 两列图表区域 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* 风险分布饼图 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center">
                <PieChartIcon size={16} className="mr-2 text-blue-400" />
                风险分布
              </h3>
              
              <div className="flex items-center space-x-3">
                <button 
                  className="text-xs text-gray-400 hover:text-white flex items-center"
                  onClick={() => toggleChartExpansion('risk')}
                >
                  {expandedChart === 'risk' ? '收起' : '展开'}
                  {expandedChart === 'risk' ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
                </button>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className={`${expandedChart === 'risk' ? 'w-[250px] h-[250px]' : 'w-[200px] h-[200px]'} transition-all duration-300`}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={expandedChart === 'risk' ? 60 : 45}
                      outerRadius={expandedChart === 'risk' ? 90 : 75}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="rgba(0,0,0,0.1)"
                      strokeWidth={1}
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} 项`, '数量']}
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
              
              <div className="grid grid-cols-2 gap-3 mt-2 w-full">
                {riskDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-300">{item.name}</span>
                    <span className="ml-auto text-gray-400">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* 专利类型分布 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center">
                <FileText size={16} className="mr-2 text-blue-400" />
                专利类型分布
              </h3>
              
              <div className="flex items-center space-x-3">
                <button 
                  className="text-xs text-gray-400 hover:text-white flex items-center"
                  onClick={() => toggleChartExpansion('type')}
                >
                  {expandedChart === 'type' ? '收起' : '展开'}
                  {expandedChart === 'type' ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
                </button>
              </div>
            </div>
            
            <div className={`${expandedChart === 'type' ? 'h-[280px]' : 'h-[230px]'} transition-all duration-300`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patentTypeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    type="number" 
                    tick={{ fontSize: 12, fill: '#9ca3af' }} 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fontSize: 12, fill: '#9ca3af' }} 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} 项`, '数量']}
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[0, 4, 4, 0]}
                  >
                    {patentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
        
        {/* 国家分布图表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-200 flex items-center">
              <Globe size={16} className="mr-2 text-blue-400" />
              各国专利风险分布
            </h3>
            
            <div className="flex items-center space-x-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-1.5 rounded-full hover:bg-white/10 transition-all"
                onClick={handleDownloadReport}
              >
                <Download size={14} className="text-gray-400" />
              </motion.button>
            </div>
          </div>
          
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} 项`, '']}
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Bar dataKey="high" name="高风险" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="medium" name="中风险" fill="#f97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="low" name="低风险" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* 最近活动 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center">
            <Clock size={16} className="mr-2 text-blue-400" />
            最近数据分析活动
          </h3>
          
          <div className="space-y-3">
            {recentActivityData.map(activity => (
              <motion.div
                key={activity.id}
                whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                className="p-3 border border-white/10 rounded-lg hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full ${getActivityIcon(activity.type).color} flex items-center justify-center mr-3 flex-shrink-0`}>
                    {getActivityIcon(activity.type).icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-gray-200">{activity.title}</p>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{activity.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      
      {/* 底部导航栏 - 玻璃态效果 */}
      <footer className="backdrop-blur-lg bg-white/5 border-t border-white/10 py-2 px-6 z-30">
        <div className="grid grid-cols-4 gap-1">
          <button 
            className="flex flex-col items-center justify-center py-1 text-gray-500"
            onClick={() => navigate('/')}
          >
            <i className="fa-solid fa-chart-bar text-xl"></i>
            <span className="text-xs mt-1">首页</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center py-1 text-gray-500"
            onClick={() => navigate('/search')}
          >
            <i className="fa-solid fa-search text-xl"></i>
            <span className="text-xs mt-1">检索</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center py-1 text-gray-500"
            onClick={() => navigate('/comparison')}
          >
            <i className="fa-solid fa-code-compare text-xl"></i>
            <span className="text-xs mt-1">比对</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center py-1 text-gray-500"
            onClick={() => navigate('/profile')}
          >
            <i className="fa-solid fa-user text-xl"></i>
            <span className="text-xs mt-1">我的</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AnalyticsPage;