import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, Download, Share2, Calendar, Search, Filter, 
  Trash2, ChevronDown, ChevronUp, ArrowLeft, AlertTriangle,
  BarChart3, Award, Globe, Clock, Star, PlusCircle, X
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

// 定义类型
interface Report {
  id: string;
  title: string;
  type: 'risk' | 'comparison' | 'analytics' | 'weekly';
  date: string;
  status: 'completed' | 'generating' | 'failed';
  priority: 'high' | 'medium' | 'low';
  description: string;
  fileSize?: string;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

interface RecentActivity {
  id: string;
  action: string;
  time: string;
  description: string;
}

const ReportsPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setReports([
        {
          id: 'R-2025-001',
          title: '高风险专利分析报告',
          type: 'risk',
          date: '2025-11-27',
          status: 'completed',
          priority: 'high',
          description: '对近期检测到的高风险专利进行详细分析',
          fileSize: '2.4 MB'
        },
        {
          id: 'R-2025-002',
          title: '专利相似度比对报告',
          type: 'comparison',
          date: '2025-11-25',
          status: 'completed',
          priority: 'medium',
          description: 'CN-2024-1234567与US-11234567-B2的详细比对分析',
          fileSize: '1.8 MB'
        },
        {
          id: 'R-2025-003',
          title: '每周专利监控报告',
          type: 'weekly',
          date: '2025-11-24',
          status: 'completed',
          priority: 'medium',
          description: '第47周全球专利监控结果汇总',
          fileSize: '3.1 MB'
        },
        {
          id: 'R-2025-004',
          title: '行业专利趋势分析',
          type: 'analytics',
          date: '2025-11-20',
          status: 'completed',
          priority: 'low',
          description: '人工智能领域专利申请趋势分析',
          fileSize: '2.7 MB'
        },
        {
          id: 'R-2025-005',
          title: '竞争对手专利分析',
          type: 'analytics',
          date: '2025-11-27',
          status: 'generating',
          priority: 'high',
          description: '主要竞争对手近期专利申请情况分析'
        }
      ]);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // 报告模板数据
  const reportTemplates: ReportTemplate[] = [
    {
      id: 'risk',
      name: '风险评估报告',
      description: '对指定专利进行全面风险评估',
      icon: <AlertTriangle size={20} />,
      color: 'from-red-600 to-orange-600'
    },
    {
      id: 'comparison',
      name: '专利比对报告',
      description: '比对分析两个或多个专利的异同',
      icon: <BarChart3 size={20} />,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'analytics',
      name: '数据分析报告',
      description: '基于专利数据的趋势和统计分析',
      icon: <BarChart3 size={20} />,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'weekly',
      name: '每周监控报告',
      description: '定期生成的专利监控汇总报告',
      icon: <Calendar size={20} />,
      color: 'from-green-600 to-teal-600'
    }
  ];

  // 最近活动数据
  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      action: '报告生成完成',
      time: '10分钟前',
      description: '高风险专利分析报告已生成完成'
    },
    {
      id: '2',
      action: '报告下载',
      time: '1小时前',
      description: '专利相似度比对报告被下载'
    },
    {
      id: '3',
      action: '报告分享',
      time: '3小时前',
      description: '每周专利监控报告分享给团队成员'
    },
    {
      id: '4',
      action: '报告生成开始',
      time: '昨天',
      description: '竞争对手专利分析报告开始生成'
    }
  ];

  // 获取报告类型对应的图标和颜色
  const getReportTypeInfo = (type: string) => {
    switch(type) {
      case 'risk':
        return { icon: <AlertTriangle size={16} />, color: 'bg-red-500/10 text-red-400' };
      case 'comparison':
        return { icon: <BarChart3 size={16} />, color: 'bg-blue-500/10 text-blue-400' };
      case 'analytics':
        return { icon: <BarChart3 size={16} />, color: 'bg-purple-500/10 text-purple-400' };
      case 'weekly':
        return { icon: <Calendar size={16} />, color: 'bg-green-500/10 text-green-400' };
      default:
        return { icon: <FileText size={16} />, color: 'bg-gray-500/10 text-gray-400' };
    }
  };

  // 获取报告状态对应的样式和文本
  const getReportStatusInfo = (status: string) => {
    switch(status) {
      case 'completed':
        return { className: 'bg-green-500/10 text-green-400', text: '已完成' };
      case 'generating':
        return { className: 'bg-blue-500/10 text-blue-400', text: '生成中' };
      case 'failed':
        return { className: 'bg-red-500/10 text-red-400', text: '生成失败' };
      default:
        return { className: 'bg-gray-500/10 text-gray-400', text: '未知' };
    }
  };

  // 获取报告优先级对应的样式
  const getReportPriorityInfo = (priority: string) => {
    switch(priority) {
      case 'high':
        return { className: 'bg-red-500/10 text-red-400', icon: <Star size={12} /> };
      case 'medium':
        return { className: 'bg-orange-500/10 text-orange-400', icon: <Star size={12} /> };
      case 'low':
        return { className: 'bg-blue-500/10 text-blue-400', icon: <Star size={12} /> };
      default:
        return { className: 'bg-gray-500/10 text-gray-400', icon: <Star size={12} /> };
    }
  };

  // 过滤报告
  const filteredReports = reports.filter(report => {
    const statusMatch = filterStatus === 'all' || report.status === filterStatus;
    const typeMatch = filterType === 'all' || report.type === filterType;
    return statusMatch && typeMatch;
  });

  // 下载报告
  const handleDownloadReport = (report: Report) => {
    if (report.status !== 'completed') {
      toast('报告尚未生成完成，无法下载');
      return;
    }
    toast(`报告下载中: ${report.title}`);
    setTimeout(() => {
      toast(`报告已成功下载: ${report.title}`);
    }, 1500);
  };

  // 分享报告
  const handleShareReport = (report: Report) => {
    if (report.status !== 'completed') {
      toast('报告尚未生成完成，无法分享');
      return;
    }
    toast(`分享链接已复制到剪贴板: ${report.title}`);
  };

  // 删除报告
  const handleDeleteReport = (id: string) => {
    setReports(prev => prev.filter(report => report.id !== id));
    toast('报告已删除');
  };

  // 查看报告详情
  const handleViewReportDetails = (report: Report) => {
    setSelectedReport(report);
    setIsDetailModalOpen(true);
  };

  // 生成新报告
  const handleGenerateReport = (templateId: string) => {
    setIsNewReportModalOpen(false);
    setIsGeneratingReport(true);
    
    // 模拟报告生成过程
    setTimeout(() => {
      const newReport: Report = {
        id: `R-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        title: `${getTemplateName(templateId)} ${new Date().toLocaleDateString()}`,
        type: templateId as Report['type'],
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
        priority: 'medium',
        description: `根据${getTemplateName(templateId)}模板生成的报告`,
        fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB`
      };
      
      setReports(prev => [newReport, ...prev]);
      setIsGeneratingReport(false);
      toast('新报告已成功生成');
    }, 2000);
  };

  // 获取模板名称
  const getTemplateName = (templateId: string): string => {
    const template = reportTemplates.find(t => t.id === templateId);
    return template ? template.name : '自定义报告';
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
              <FileText size={20} className="mr-2" />
              报告生成系统
            </h1>
          </div>
        </header>

        <main className="flex-1 p-4 z-10">
          {/* 加载骨架屏 */}
          <div className="space-y-4">
            {/* 顶部操作区加载 */}
            <div className="flex justify-between items-center animate-pulse">
              <div className="h-6 bg-white/10 rounded w-1/4"></div>
              <div className="h-8 bg-white/10 rounded w-1/5"></div>
            </div>
            
            {/* 过滤器加载 */}
            <div className="flex space-x-4 animate-pulse">
              <div className="h-9 bg-white/10 rounded w-1/4"></div>
              <div className="h-9 bg-white/10 rounded w-1/4"></div>
            </div>
            
            {/* 报告列表加载 */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
                  <div className="h-5 bg-white/10 rounded w-3/5 mb-2"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2 mb-3"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-white/10 rounded w-1/4"></div>
                    <div className="h-8 bg-white/10 rounded w-1/5"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 模板和活动区域加载 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
                <div className="h-5 bg-white/10 rounded w-1/3 mb-4"></div>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-24 bg-white/10 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
                <div className="h-5 bg-white/10 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-16 bg-white/10 rounded-lg"></div>
                  ))}
                </div>
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
              <FileText size={20} className="mr-2" />
              报告生成系统
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
        {/* 顶部操作区 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <h2 className="text-lg font-bold text-gray-200 flex items-center">
            <FileText size={18} className="mr-2 text-blue-400" />
            我的报告
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsNewReportModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-lg shadow-lg shadow-blue-600/20 flex items-center"
          >
            <PlusCircle size={16} className="mr-2" />
            生成新报告
          </motion.button>
        </motion.div>
        
        {/* 过滤器 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-6"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={16} className="text-gray-400" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block pl-10 pr-3 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
            >
              <option value="all">所有状态</option>
              <option value="completed">已完成</option>
              <option value="generating">生成中</option>
              <option value="failed">生成失败</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FileText size={16} className="text-gray-400" />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="block pl-10 pr-3 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
            >
              <option value="all">所有类型</option>
              <option value="risk">风险评估报告</option>
              <option value="comparison">专利比对报告</option>
              <option value="analytics">数据分析报告</option>
              <option value="weekly">每周监控报告</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索报告..."
              className="block pl-10 pr-3 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </motion.div>
        
        {/* 报告列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 mb-6"
        >
          {filteredReports.length > 0 ? (
            filteredReports.map(report => (
              <motion.div
                key={report.id}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm text-gray-200">{report.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getReportStatusInfo(report.status).className}`}>
                      {getReportStatusInfo(report.status).text}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getReportPriorityInfo(report.priority).className} flex items-center`}>
                      {getReportPriorityInfo(report.priority).icon}
                    </span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-400 mb-3">{report.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar size={12} className="mr-1" />
                      <span>{report.date}</span>
                    </div>
                    {report.fileSize && (
                      <div className="flex items-center text-xs text-gray-400">
                        <FileText size={12} className="mr-1" />
                        <span>{report.fileSize}</span>
                      </div>
                    )}
                    <div className={`flex items-center text-xs ${getReportTypeInfo(report.type).color}`}>
                      {getReportTypeInfo(report.type).icon}
                      <span className="ml-1 capitalize">
                        {report.type === 'risk' ? '风险评估' : 
                         report.type === 'comparison' ? '专利比对' : 
                         report.type === 'analytics' ? '数据分析' : '每周监控'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewReportDetails(report)}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-all"
                    >
                      <FileText size={14} className="text-gray-400" />
                    </motion.button>
                    
                    <motion.button whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownloadReport(report)}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-all"
                    >
                      <Download size={14} className="text-gray-400" />
                    </motion.button>
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleShareReport(report)}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-all"
                    >
                      <Share2 size={14} className="text-gray-400" />
                    </motion.button>
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteReport(report.id)}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-all"
                    >
                      <Trash2 size={14} className="text-gray-400" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <FileText size={24} className="text-gray-400" />
              </div>
              <p>暂无报告</p>
              <p className="text-sm mt-1">点击"生成新报告"创建您的第一个报告</p>
            </div>
          )}
        </motion.div>
        
        {/* 报告模板和最近活动 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 报告模板 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <h3 className="text-sm font-semibold text-gray-200 mb-4">报告模板</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {reportTemplates.map(template => (
                <motion.div
                  key={template.id}
                  whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleGenerateReport(template.id)}
                  className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-lg transition-all cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${template.color} flex items-center justify-center mb-2`}>
                    {template.icon}
                  </div>
                  <p className="text-xs font-medium text-gray-200 text-center">{template.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* 最近活动 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center">
              <Clock size={16} className="mr-2 text-blue-400" />
              最近活动
            </h3>
            
            <div className="space-y-3">
              {recentActivities.map(activity => (
                <motion.div
                  key={activity.id}
                  whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                  className="p-3 border border-white/10 rounded-lg hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-200">{activity.action}</p>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{activity.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
            className="flex flex-col items-center justify-center py-1 text-gray-500"
            onClick={() => navigate('/profile')}
          >
            <i className="fa-solid fa-user text-xl"></i>
            <span className="text-xs mt-1">我的</span>
          </button>
        </div>
      </footer>
      
      {/* 生成新报告模态框 */}
      {isNewReportModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-200">生成新报告</h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsNewReportModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-all"
              >
                <X size={18} className="text-gray-400" />
              </motion.button>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-400">选择要生成的报告类型</p>
              
              <div className="grid grid-cols-2 gap-3">
                {reportTemplates.map(template => (
                  <motion.div
                    key={template.id}
                    whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleGenerateReport(template.id)}
                    className="flex flex-col p-4 bg-white/5 border border-white/10 rounded-lg transition-all cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${template.color} flex items-center justify-center mb-2`}>
                      {template.icon}
                    </div>
                    <h4 className="text-sm font-medium text-gray-200">{template.name}</h4>
                    <p className="text-xs text-gray-400 mt-1">{template.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* 报告详情模态框 */}
      {isDetailModalOpen && selectedReport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-200">{selectedReport.title}</h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-all"
              >
                <X size={18} className="text-gray-400" />
              </motion.button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">报告ID</p>
                <p className="text-sm text-gray-200">{selectedReport.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">生成日期</p>
                <p className="text-sm text-gray-200">{selectedReport.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">报告类型</p>
                <p className="text-sm text-gray-200 capitalize">
                  {selectedReport.type === 'risk' ? '风险评估报告' : 
                   selectedReport.type === 'comparison' ? '专利比对报告' : 
                   selectedReport.type === 'analytics' ? '数据分析报告' : '每周监控报告'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">状态</p>
                <span className={`text-sm px-2 py-0.5 rounded-full ${getReportStatusInfo(selectedReport.status).className}`}>
                  {getReportStatusInfo(selectedReport.status).text}
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-1">报告描述</p>
              <p className="text-sm text-gray-200">{selectedReport.description}</p>
            </div>
            
            {selectedReport.status === 'completed' && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-400">报告内容预览</p>
                  <p className="text-xs text-gray-400">{selectedReport.fileSize}</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 h-40 overflow-y-auto">
                  <p className="text-sm text-gray-300 mb-3">报告摘要:</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    本报告基于最新专利数据，对{selectedReport.type === 'risk' ? '相关专利的侵权风险' : 
                    selectedReport.type === 'comparison' ? '指定专利之间的技术特征' : 
                    selectedReport.type === 'analytics' ? '行业专利趋势' : '本周监控到的专利情况'}进行了全面分析。
                    通过人工智能算法和专业的专利分析方法，本报告提供了详细的数据分析、图表可视化和专业建议，
                    帮助您更好地了解专利态势，做出明智的决策。
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed mt-2">
                    完整报告包含详细的数据分析、图表可视化、风险评估和专业建议，请下载查看完整内容。
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors"
              >
                关闭
              </motion.button>
              
              {selectedReport.status === 'completed' && (
                <>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShareReport(selectedReport)}
                    className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/15 transition-colors"
                  >
                    分享报告
                  </motion.button>
                  
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleDownloadReport(selectedReport);
                      setIsDetailModalOpen(false);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm rounded-lg shadow-lg shadow-blue-600/20"
                  >
                    下载报告
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* 报告生成中指示器 */}
      {isGeneratingReport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-20 right-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4 z-50 flex items-center shadow-lg"
        >
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
          <div>
            <p className="text-sm text-gray-200">报告生成中...</p>
            <p className="text-xs text-gray-400">请稍候，正在处理您的请求</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReportsPage;