import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area, AreaChart } from 'recharts';
import { Bell, Search, FileText, AlertTriangle, BarChart3, Award } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

// 模拟数据
const riskStats = [
  { name: '高风险', value: 12, color: '#ef4444' },
  { name: '待确认', value: 28, color: '#f97316' },
  { name: '正常', value: 156, color: '#22c55e' },
];

const similarityTrend = [
  { date: '00:00', score: 72 },
  { date: '04:00', score: 75 },
  { date: '08:00', score: 80 },
  { date: '12:00', score: 78 },
  { date: '16:00', score: 85 },
  { date: '20:00', score: 82 },
];

const riskDistributionData = [
  { name: '中国', high: 5, medium: 12, low: 45 },
  { name: '美国', high: 4, medium: 9, low: 38 },
  { name: '日本', high: 2, medium: 5, low: 42 },
  { name: '韩国', high: 1, medium: 2, low: 31 },
];

const recentAlerts = [
  { id: 'HT-2025-12345', title: '一种基于AI的专利文本分析方法', risk: '高风险', time: '10分钟前' },
  { id: 'CN-2025-67890', title: '多语言专利语义向量映射系统', risk: '待确认', time: '30分钟前' },
];

export default function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 处理通知点击
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (unreadCount > 0) {
      setUnreadCount(0);
      toast('已将所有通知标记为已读');
    }
  };
  
  // 获取格式化的当前时间
  const getFormattedTime = () => {
    return currentTime.toLocaleString('zh-CN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).replace(/\//g, '-');
  };
  
  // 获取风险等级对应的样式
  const getRiskStyle = (risk: string) => {
    switch(risk) {
      case '高风险':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case '待确认':
        return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case '正常':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };
  
  // 处理导航
  const handleNavigate = (route: string) => {
    navigate(route);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 text-gray-100 flex flex-col relative overflow-hidden h-screen">
      {/* 背景装饰 */}
      <div className="fixed inset-0 z-0">
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYyYzcuNzMgMCAxNC4zOSA1LjUgMTYuNTcgMTIuNTRoLTkuODR6IiBzdHJva2Utb3BhY2l0eT0iLjAyIiBzdHJva2U9IiNmZmYiLz48L2c+PC9zdmc+')] opacity-30"></div>
        
        {/* 粒子效果 */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 rounded-full bg-blue-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                boxShadow: '0 0 8px 1px rgba(59, 130, 246, 0.6)',
                animation: `pulse ${Math.random() * 5 + 3}s infinite`,
              }}
            />
          ))}
        </div>
        
        {/* 光晕效果 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px]"></div>
      </div>
      
      {/* 顶部导航栏 */}
      <header className="backdrop-blur-md bg-slate-900/50 border-b border-blue-900/30 z-30">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 mr-2 transition-all duration-300"
              onClick={() => toggleTheme()}
              aria-label="切换主题"
            >
              {theme === 'light' ? (
                <i className="fa-solid fa-moon text-gray-300"></i>
              ) : (
                <i className="fa-solid fa-sun text-yellow-400"></i>
              )}
            </motion.button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent flex items-center">
              <i className="fa-solid fa-search-location mr-2"></i>
              专利猎人
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
                aria-label="通知"
              >
                <Bell size={20} className="text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg shadow-lg z-40"
                  >
                    <div className="p-3 border-b border-white/10 flex justify-between items-center">
                      <h3 className="font-semibold text-sm text-gray-200">通知中心</h3>
                      <button 
                        className="text-xs text-blue-400 hover:underline"
                        onClick={() => setUnreadCount(0)}
                      >
                        全部标为已读
                      </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {[
                        { id: 1, title: '检测到高风险专利HT-2025-12345', time: '10分钟前', read: false },
                        { id: 2, title: '系统已完成每周专利扫描', time: '3小时前', read: false },
                        { id: 3, title: '新功能"技术特征比对"已上线', time: '1天前', read: false },
                      ].map(notification => (
                        <motion.div 
                          key={notification.id}
                          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                          className={`p-3 border-b border-white/5 hover:bg-white/5 cursor-pointer ${!notification.read && 'bg-blue-500/10'}`}
                        >
                          <p className={`text-sm ${!notification.read ? 'font-semibold text-blue-400' : 'text-gray-300'}`}>{notification.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
              aria-label="更多选项"
            >
              <i className="fa-solid fa-ellipsis-vertical text-gray-300"></i>
            </motion.button>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1 p-4 flex flex-col z-10 overflow-hidden pb-20">
        {/* 欢迎消息 */}
        <div className="mb-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-bold text-gray-100">欢迎回来，专利猎人</h2>
              <p className="text-xs text-blue-300">
                {getFormattedTime()}
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full text-xs font-medium flex items-center shadow-lg shadow-blue-600/20"
              onClick={() => navigate('/search')}
            >
              <Search size={14} className="mr-1" />
              快速检索
            </motion.button>
          </motion.div>
        </div>
        
        {/* 核心指标卡片 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-3 mb-3"
        >
          <div className="backdrop-blur-sm bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-700/30 rounded-xl p-3">
            <p className="text-xs text-blue-300 mb-1">多模态监控</p>
            <div className="flex justify-between items-end">
              <p className="text-xl font-bold text-white">256<span className="text-xs font-normal text-blue-300 ml-1">项</span></p>
              <i className="fa-solid fa-eye text-blue-400 text-opacity-70"></i>
            </div>
            <p className="text-xs text-green-400 mt-1 flex items-center">
              <i className="fa-solid fa-arrow-up mr-1"></i> 较上周增长8%
            </p>
          </div>
          
          <div className="backdrop-blur-sm bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-700/30 rounded-xl p-3">
            <p className="text-xs text-purple-300 mb-1">风险评估</p>
            <div className="flex justify-between items-end">
              <p className="text-xl font-bold text-white">12<span className="text-xs font-normal text-purple-300 ml-1">高风险</span></p>
              <i className="fa-solid fa-shield-halved text-purple-400 text-opacity-70"></i>
            </div>
            <p className="text-xs text-red-400 mt-1 flex items-center">
              <i className="fa-solid fa-arrow-up mr-1"></i> 较上周增长2项
            </p>
          </div>
          
          <div className="backdrop-blur-sm bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 border border-indigo-700/30 rounded-xl p-3">
            <p className="text-xs text-indigo-300 mb-1">周对比评估</p>
            <div className="flex justify-between items-end">
              <p className="text-xl font-bold text-white">42<span className="text-xs font-normal text-indigo-300 ml-1">次</span></p>
              <i className="fa-solid fa-code-compare text-indigo-400 text-opacity-70"></i>
            </div>
            <p className="text-xs text-green-400 mt-1 flex items-center">
              <i className="fa-solid fa-arrow-up mr-1"></i> 较上周增长12%
            </p>
          </div>
          
          <div className="backdrop-blur-sm bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border border-cyan-700/30 rounded-xl p-3">
            <p className="text-xs text-cyan-300 mb-1">准确率</p>
            <div className="flex justify-between items-end">
              <p className="text-xl font-bold text-white">92%<span className="text-xs font-normal text-cyan-300 ml-1">±1%</span></p>
              <i className="fa-solid fa-chart-line text-cyan-400 text-opacity-70"></i>
            </div>
            <p className="text-xs text-green-400 mt-1 flex items-center">
              <i className="fa-solid fa-arrow-up mr-1"></i> 较上周增长1%
            </p>
          </div>
        </motion.div>
        
        {/* 主要内容区域 */}
        <div className="flex-1 flex flex-col space-y-3 overflow-y-auto">
          {/* 3D齿轮动画 - 已修复：删除overflow-hidden */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="backdrop-blur-md bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-xl p-4 relative flex items-center justify-center z-50"
          >
            {/* 动画背景元素 */}
            <div className="absolute inset-0 overflow-hidden">
              {/* 外环 */}
              <div className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/30"></div>
              <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20"></div>
              <div className="absolute top-1/2 left-1/2 w-[220px] h-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/10"></div>
              
              {/* 放射状线条 */}
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={i} className="absolute top-1/2 left-1/2 h-0.5 w-[130px] bg-blue-500/20 origin-left z-10"
                  style={{ transform: `translateY(-50%) rotate(${i * 15}deg)` }}
                ></div>
              ))}
              
              {/* 装饰光点 */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={`dot-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-blue-400 z-10"
                  style={{ 
                    top: '50%', 
                    left: '50%', 
                    transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateX(140px)`,
                    boxShadow: '0 0 8px 2px rgba(59, 130, 246, 0.6)'
                  }}
                ></div>
              ))}
            </div>
            
            {/* 中央齿轮 */}
            <motion.div 
              className="relative z-50 w-44 h-44"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {/* 外部齿轮 */}
              <div className="absolute inset-0 rounded-full border-8 border-blue-500/30 flex items-center justify-center z-50">
                {/* 齿轮齿 */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div 
                    key={`tooth-${i}`}
                    className="absolute w-5 h-14 bg-gradient-to-br from-blue-500 to-violet-500 rounded-md z-50"
                    style={{ 
                      top: '50%', 
                      left: '50%', 
                      transform: `translate(-50%, -50%) rotate(${i * 18}deg) translateY(-88px)`,
                      boxShadow: '0 0 8px 1px rgba(59, 130, 246, 0.6)'
                    }}
                  ></div>
                ))}
              </div>
              
              {/* 内部齿轮 */}
              <motion.div 
                className="absolute inset-1/4 rounded-full border-4 border-violet-500/40 flex items-center justify-center z-50"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-1/3 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center z-50">
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">12</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* 文字说明 */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-center z-50">
              <p className="text-xs text-blue-300">全球专利侵权风险智能预警系统</p>
              <p className="text-xs text-blue-300/70">实时监控 · AI分析 · 智能预警</p>
            </div>
          </motion.div>
          
          {/* 实时风险监控 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-md bg-slate-900/30 border border-blue-900/30 rounded-xl p-4 h-[300px] flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center">
                <AlertTriangle size={16} className="mr-2 text-red-400" />
                实时风险监控
              </h3>
              <span className="text-xs text-blue-400">今日更新</span>
            </div>
            
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={similarityTrend} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorSimilarity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10, fill: '#9ca3af' }} 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: '#9ca3af' }} 
                    domain={[60, 100]} 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '相似度']}
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fill="url(#colorSimilarity)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">今日最高</p>
                <p className="text-sm font-bold text-blue-400">85.3%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">平均相似度</p>
                <p className="text-sm font-bold text-blue-400">78.8%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">监控频率</p>
                <p className="text-sm font-bold text-blue-400">15分钟/次</p>
              </div>
            </div>
          </motion.div>
          
          {/* 风险分布 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="backdrop-blur-md bg-slate-900/30 border border-blue-900/30 rounded-xl p-4 h-[300px] flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center">
                <BarChart3 size={16} className="mr-2 text-blue-400" />
                风险分布
              </h3>
              <span className="text-xs text-blue-400">按国家/地区</span>
            </div>
            
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskDistributionData}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: '#9ca3af' }} 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: '#9ca3af' }} 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="high" 
                    name="高风险"
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#ef4444', stroke: '#fff', strokeWidth: 1 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="medium" 
                    name="中风险"
                    stroke="#f97316" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#f97316', stroke: '#fff', strokeWidth: 1 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="low" 
                    name="低风险"
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#22c55e', stroke: '#fff', strokeWidth: 1 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          {/* 专利风险统计 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-md bg-slate-900/30 border border-blue-900/30 rounded-xl p-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center">
                <Award size={16} className="mr-2 text-yellow-400" />
                专利风险统计
              </h3>
              <span className="text-xs text-blue-400">本周</span>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="rgba(0,0,0,0.3)"
                      strokeWidth={1}
                    >
                      {riskStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} 件`, '数量']}
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
            
            <div className="grid grid-cols-3 gap-2 mt-1">
              {riskStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-gray-400 mb-1">{stat.name}</p>
                  <p className="text-sm font-medium" style={{ color: stat.color }}>{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* 实时预警 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="backdrop-blur-md bg-slate-900/30 border border-blue-900/30 rounded-xl p-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-200 flex items-center">
                <Bell size={16} className="mr-2 text-red-400" />
                实时预警
              </h3>
              <span className="text-xs text-red-400 font-medium flex items-center">
                <i className="fa-solid fa-bolt mr-1"></i> 2 个高风险
              </span>
            </div>
            
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {recentAlerts.map((alert) => (
                <motion.div 
                  key={alert.id}
                  whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className="p-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => navigate(`/patent/${alert.id}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-gray-200 line-clamp-2">{alert.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskStyle(alert.risk)}`}>
                      {alert.risk}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 truncate">{alert.id}</p>
                    <p className="text-xs text-gray-400">{alert.time}</p>
                  </div>
                </motion.div>
              ))}
              
              {/* 历史预警记录 */}
              {[
                { id: 'JP-2025-54321', title: '人工智能专利检索系统', risk: '正常', time: '2小时前' },
                { id: 'US-2025-98765', title: '基于深度学习的专利分类方法', risk: '待确认', time: '5小时前' },
                { id: 'CN-2025-13579', title: '多语言专利翻译工具', risk: '正常', time: '昨天' },
              ].map((alert) => (
                <motion.div 
                  key={alert.id}
                  whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className="p-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => navigate(`/patent/${alert.id}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-gray-300 line-clamp-2">{alert.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskStyle(alert.risk)}`}>
                      {alert.risk}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 truncate">{alert.id}</p>
                    <p className="text-xs text-gray-400">{alert.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* 功能入口 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="backdrop-blur-md bg-slate-900/30 border border-blue-900/30 rounded-xl p-4 flex flex-col"
          >
            <h3 className="text-sm font-semibold text-gray-200 mb-2">核心功能</h3>
            
            <div className="grid grid-cols-2 gap-2 flex-1">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-sm bg-gradient-to-br from-blue-900/30 to-blue-800/10 border border-blue-700/20 rounded-lg p-3 flex flex-col items-center justify-center"
                onClick={() => handleNavigate('/search')}
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-1">
                  <Search className="text-blue-400" size={16} />
                </div>
                <p className="text-xs text-gray-300">专利检索</p>
              </motion.button>
              
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-sm bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-700/20 rounded-lg p-3 flex flex-col items-center justify-center"
                onClick={() => handleNavigate('/comparison')}
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mb-1">
                  <FileText className="text-purple-400" size={16} />
                </div>
                <p className="text-xs text-gray-300">专利比对</p>
              </motion.button>
              
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-sm bg-gradient-to-br from-cyan-900/30 to-cyan-800/10 border border-cyan-700/20 rounded-lg p-3 flex flex-col items-center justify-center"
                onClick={() => toast('功能开发中，敬请期待')}
              >
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mb-1">
                  <BarChart3 className="text-cyan-400" size={16} />
                </div>
                <p className="text-xs text-gray-300">数据分析</p>
              </motion.button>
              
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-sm bg-gradient-to-br from-green-900/30 to-green-800/10 border border-green-700/20 rounded-lg p-3 flex flex-col items-center justify-center"
                onClick={() => toast('功能开发中，敬请期待')}
              >
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
                  <i className="fa-solid fa-file-lines text-green-400 text-sm"></i>
                </div>
                <p className="text-xs text-gray-300">报告生成</p>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* 底部导航栏 */}
      <footer className="backdrop-blur-md bg-slate-900/50 border-t border-blue-900/30 py-3 px-6 z-30">
        <div className="grid grid-cols-4 gap-1">
          <button 
            className="flex flex-col items-center justify-center py-1 text-blue-400"
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
            className="flex flex-col items-center justify-center py-1 text-gray-500"
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
}