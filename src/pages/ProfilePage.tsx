import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { User, Settings, Bell, HelpCircle, LogOut, ChevronRight, Calendar, Search, ShieldAlert, Award, Download, BarChart3, FileText, Globe, Eye, CheckCircle2, AlertCircle, Star, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { AuthContext } from '@/contexts/authContext';
import { useContext } from 'react';

// 模拟数据 - 用户信息
const userInfo = {
  name: "专利猎人",
  role: "企业高级用户",
  avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=professional%20business%20person%20avatar%20technology%20industry&sign=ec25a05bea851df73c1607c78e6ae50b",
  email: "xiaoxiaopeng@example.com",
  company: "小鹏linux科技创新有限公司",
  joinDate: "2024-05-15",
};

// 模拟数据 - 使用统计
const usageStats = [
  { name: '监控专利', value: 128 },
  { name: '风险预警', value: 12 },
  { name: '查询次数', value: 576 },
];

// 模拟数据 - 最近活动
const recentActivities = [
  { id: 1, title: "收到新的高风险专利预警", type: "alert", time: "10分钟前" },
  { id: 2, title: "完成专利检索：AI 人工智能", type: "search", time: "1小时前" },
  { id: 3, title: "生成专利比对报告", type: "report", time: "3小时前" },
  { id: 4, title: "查看了专利 CN-2024-1234567 详情", type: "view", time: "昨天" },
  { id: 5, title: "系统自动完成每周扫描任务", type: "system", time: "2天前" },
];

// 模拟数据 - 订阅服务
const subscriptionInfo = {
  plan: "企业专业版",
  expireDate: "2026-05-15",
  features: ["全球专利监控", "无限次检索", "高级比对分析", "每日风险报告", "多用户管理"],
  usage: [
    { name: '1月', count: 420 },
    { name: '2月', count: 480 },
    { name: '3月', count: 510 },
    { name: '4月', count: 576 },
  ]
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);

  // 处理编辑用户信息
  const handleEditUserInfo = () => {
    if (isEditing) {
      // 保存修改
      // 实际项目中这里应该调用API保存用户信息
      toast("用户信息已更新");
    }
    setIsEditing(!isEditing);
  };

  // 处理用户信息输入变化
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempUserInfo(prev => ({ ...prev, [name]: value }));
  };

  // 处理退出登录
  const handleLogout = () => {
    logout();
    toast("已成功退出登录");
    navigate('/');
  };

  // 获取活动类型对应的图标和颜色
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'alert':
        return { icon: <AlertCircle size={16} />, color: 'text-red-500 bg-red-500/10' };
      case 'search':
        return { icon: <Search size={16} />, color: 'text-blue-500 bg-blue-500/10' };
      case 'report':
        return { icon: <FileText size={16} />, color: 'text-green-500 bg-green-500/10' };
      case 'view':
        return { icon: <Eye size={16} />, color: 'text-purple-500 bg-purple-500/10' };
      case 'system':
        return { icon: <Globe size={16} />, color: 'text-orange-500 bg-orange-500/10' };
      default:
        return { icon: <CheckCircle2 size={16} />, color: 'text-gray-500 bg-gray-500/10' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-violet-950 text-gray-100 flex flex-col">
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
              <i className="fa-solid fa-arrow-left text-gray-300"></i>
            </motion.button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent flex items-center">
              <User size={20} className="mr-2" />
              个人中心
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
              onClick={() => toggleTheme()}
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-gray-300" />
              ) : (
                <Sun size={20} className="text-yellow-400" />
              )}
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Settings size={20} className="text-gray-300" />
            </motion.button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-auto z-10">
        {/* 用户信息卡片 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 mb-6 h-[235px]"
        >
          <div className="flex items-center mb-4">
            <div className="relative mr-4">
              <div className="w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden">
                <img 
                  src={tempUserInfo.avatar} 
                  alt="用户头像" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center border-2 border-gray-900">
                <i className="fa-solid fa-camera text-xs text-white"></i>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={tempUserInfo.name}
                    onChange={handleUserInfoChange}
                    className="text-lg font-bold bg-transparent border-b border-blue-500 outline-none"
                  />
                ) : (
                  <h2 className="text-lg font-bold">{tempUserInfo.name}</h2>
                )}
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEditUserInfo}
                  className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-full text-xs font-medium transition-colors"
                >
                  {isEditing ? '保存' : '编辑'}
                </motion.button>
              </div>
              
              <p className="text-sm text-blue-400">{tempUserInfo.role}</p>
              
              <div className="flex items-center mt-1 text-xs text-gray-400">
                <i className="fa-solid fa-building mr-1"></i>
                {isEditing ? (
                  <input
                    type="text"
                    name="company"
                    value={tempUserInfo.company}
                    onChange={handleUserInfoChange}
                    className="bg-transparent border-b border-blue-500 outline-none"
                  />
                ) : (
                  <span>{tempUserInfo.company}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">监控专利</p>
              <p className="text-xl font-bold text-blue-400">128</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">风险预警</p>
              <p className="text-xl font-bold text-red-400">12</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">查询次数</p>
              <p className="text-xl font-bold text-green-400">576</p>
            </div>
          </div>
        </motion.div>
        
        {/* 主要内容区域 - 两列布局 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 左侧 - 使用统计和最近活动 */}
          <div className="md:col-span-2 space-y-4">
            {/* 使用统计图表 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 h-[305px]"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-200 flex items-center">
                  <BarChart3 size={16} className="mr-2 text-blue-400" />
                  使用统计
                </h3>
                <div className="text-xs text-gray-400">近6个月</div>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subscriptionInfo.usage}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
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
                      formatter={(value) => [`${value} 次`, '使用次数']}
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      </linearGradient>
                    </defs>
                    <Bar 
                      dataKey="count" 
                      fill="url(#barGradient)" 
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            {/* 最近活动 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 h-[500px]"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-200 flex items-center">
                  <Calendar size={16} className="mr-2 text-blue-400" />
                  最近活动
                </h3>
                <button className="text-xs text-blue-400 hover:underline">查看全部</button>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {recentActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    className="p-3 rounded-lg hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start">
                      <div className={`w-8 h-8 rounded-full ${getActivityIcon(activity.type).color} flex items-center justify-center mr-3 flex-shrink-0`}>
                        {getActivityIcon(activity.type).icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-200">{activity.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* 右侧 - 订阅信息和功能入口 */}
          <div className="space-y-4">
            {/* 订阅信息 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-200">订阅服务</h3>
                  <p className="text-xs text-gray-400 mt-1">企业专业版</p>
                </div>
                <div className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium">
                  有效
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">到期日期</p>
                  <p className="text-sm font-medium">{subscriptionInfo.expireDate}</p>
                </div>
                <div className="h-8 w-px bg-gray-700"></div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">剩余天数</p>
                  <p className="text-sm font-medium text-green-400">168天</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {subscriptionInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-xs">
                    <CheckCircle2 size={12} className="text-green-500 mr-2" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg text-xs font-medium flex items-center justify-center shadow-lg shadow-blue-600/20"
              >
                <Star size={14} className="mr-1" />
                升级订阅
              </motion.button>
            </motion.div>
            
            {/* 功能入口 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 h-[345px]"
            >
              <h3 className="text-sm font-semibold text-gray-200 mb-3">快捷功能</h3>
              
              <div className="space-y-2">
                <motion.button
                  whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className="w-full p-3 rounded-lg flex items-center justify-between transition-all"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                      <Bell size={16} className="text-blue-400" />
                    </div>
                    <span className="text-sm">消息通知</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-500" />
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className="w-full p-3 rounded-lg flex items-center justify-between transition-all"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                      <FileText size={16} className="text-green-400" />
                    </div>
                    <span className="text-sm">我的报告</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-500" />
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className="w-full p-3 rounded-lg flex items-center justify-between transition-all"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mr-3">
                      <HelpCircle size={16} className="text-orange-400" />
                    </div>
                    <span className="text-sm">帮助中心</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-500" />
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className="w-full p-3 rounded-lg flex items-center justify-between transition-all"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <Download size={16} className="text-purple-400" />
                    </div>
                    <span className="text-sm">下载中心</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-500" />
                </motion.button>
              </div>
            </motion.div>
            
            {/* 系统信息和退出登录 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 h-[140px]"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-200">系统信息</h3>
                <span className="text-xs text-gray-400">v2.3.1</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
              >
                <LogOut size={16} className="mr-2" />
                退出登录
              </motion.button>
            </motion.div>
          </div>
        </div>
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
            className="flex flex-col items-center justify-center py-1 text-blue-400"
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

export default ProfilePage;