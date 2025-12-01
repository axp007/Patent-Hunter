import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, Filter, ArrowLeft, ChevronDown, ChevronUp, 
  FileText, Users, Calendar, Globe, Award, Download,
  Star, Trash2, Copy, Eye, Bell, AlertTriangle,
  CheckCircle2, XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

// 定义类型
interface Patent {
  id: string;
  title: string;
  applicant: string;
  inventor: string;
  date: string;
  country: string;
  type: string;
  status: 'active' | 'expired' | 'pending';
  riskLevel: 'high' | 'medium' | 'low' | 'none';
  similarity?: number;
}

interface FilterOption {
  id: string;
  name: string;
  value: string;
}

const PatentsPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [patents, setPatents] = useState<Patent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    country: 'all',
    type: 'all',
    status: 'all',
    riskLevel: 'all'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPatents, setSelectedPatents] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setPatents([
        {
          id: 'CN-2024-1234567',
          title: '一种基于人工智能的专利文本分析方法',
          applicant: '扣子科技有限公司',
          inventor: '张三, 李四, 王五',
          date: '2024-06-15',
          country: 'CN',
          type: '发明专利',
          status: 'active',
          riskLevel: 'high',
          similarity: 87.2
        },
        {
          id: 'US-11234567-B2',
          title: 'System and Method for Patent Semantic Analysis Using Deep Learning',
          applicant: 'Coze Tech Inc.',
          inventor: 'John Smith, Jane Doe',
          date: '2024-01-23',
          country: 'US',
          type: '发明专利',
          status: 'active',
          riskLevel: 'medium',
          similarity: 76.5
        },
        {
          id: 'JP-6789012',
          title: '人工知能を活用した特許文書分析システム',
          applicant: 'コーズテック株式会社',
          inventor: '田中太郎, 鈴木花子',
          date: '2023-11-30',
          country: 'JP',
          type: '发明专利',
          status: 'active',
          riskLevel: 'low'
        },
        {
          id: 'CN-2023-7654321',
          title: '区块链技术在专利管理中的应用',
          applicant: '区块链创新科技有限公司',
          inventor: '赵六, 钱七, 孙八',
          date: '2023-09-18',
          country: 'CN',
          type: '发明专利',
          status: 'expired',
          riskLevel: 'none'
        },
        {
          id: 'KR-10-2024-0056789',
          title: 'AI 기반 특허 분석 시스템',
          applicant: '코제 테크놀로지 주식회사',
          inventor: '김민수, 박지영',
          date: '2024-03-10',
          country: 'KR',
          type: '实用新型',
          status: 'pending',
          riskLevel: 'medium'
        },
        {
          id: 'CN-2024-0012345',
          title: '量子计算专利检索方法及系统',
          applicant: '量子科技研究院',
          inventor: '周九, 吴十, 郑一',
          date: '2024-05-20',
          country: 'CN',
          type: '发明专利',
          status: 'active',
          riskLevel: 'high',
          similarity: 91.3
        },
        {
          id: 'EP-4123456-A1',
          title: 'Method for Automatically Analyzing Patent Documents',
          applicant: 'European Research Institute',
          inventor: 'Maria Garcia, Hans Mueller',
          date: '2024-02-15',
          country: 'EP',
          type: '发明专利',
          status: 'active',
          riskLevel: 'low'
        },
        {
          id: 'CN-2023-0987654',
          title: '生物医药领域专利智能分类方法',
          applicant: '健康医药科技有限公司',
          inventor: '陈二, 杨三, 朱四',
          date: '2023-12-05',
          country: 'CN',
          type: '发明专利',
          status: 'active',
          riskLevel: 'medium',
          similarity: 68.7
        },
        {
          id: 'US-11123456-A1',
          title: 'Apparatus and Method for Patent Image Analysis',
          applicant: 'Image Recognition Technologies LLC',
          inventor: 'Robert Johnson, Lisa Brown',
          date: '2023-10-12',
          country: 'US',
          type: '实用新型',
          status: 'expired',
          riskLevel: 'none'
        },
        {
          id: 'CN-2024-5432109',
          title: '自动驾驶技术专利风险评估系统',
          applicant: '智能驾驶科技有限公司',
          inventor: '马五, 牛六, 羊七',
          date: '2024-04-08',
          country: 'CN',
          type: '发明专利',
          status: 'pending',
          riskLevel: 'high',
          similarity: 82.4
        }
      ]);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // 过滤选项
  const filterOptions = {
    country: [
      { id: 'all', name: '所有国家', value: 'all' },
      { id: 'cn', name: '中国', value: 'CN' },
      { id: 'us', name: '美国', value: 'US' },
      { id: 'jp', name: '日本', value: 'JP' },
      { id: 'kr', name: '韩国', value: 'KR' },
      { id: 'ep', name: '欧洲', value: 'EP' }
    ],
    type: [
      { id: 'all', name: '所有类型', value: 'all' },
      { id: 'invention', name: '发明专利', value: '发明专利' },
      { id: 'utility', name: '实用新型', value: '实用新型' },
      { id: 'design', name: '外观设计', value: '外观设计' }
    ],
    status: [
      { id: 'all', name: '所有状态', value: 'all' },
      { id: 'active', name: '有效', value: 'active' },
      { id: 'expired', name: '已过期', value: 'expired' },
      { id: 'pending', name: '审查中', value: 'pending' }
    ],
    riskLevel: [
      { id: 'all', name: '所有风险', value: 'all' },
      { id: 'high', name: '高风险', value: 'high' },
      { id: 'medium', name: '中风险', value: 'medium' },
      { id: 'low', name: '低风险', value: 'low' },
      { id: 'none', name: '无风险', value: 'none' }
    ]
  };

  // 获取风险等级对应的样式
  const getRiskStyle = (riskLevel: string) => {
    switch(riskLevel) {
      case 'high':
        return { className: 'bg-red-500/10 text-red-400 border border-red-500/30', icon: <AlertTriangle size={14} /> };
      case 'medium':
        return { className: 'bg-orange-500/10 text-orange-400 border border-orange-500/30', icon: <AlertTriangle size={14} /> };
      case 'low':
        return { className: 'bg-blue-500/10 text-blue-400 border border-blue-500/30', icon: <CheckCircle2 size={14} /> };
      case 'none':
        return { className: 'bg-green-500/10 text-green-400 border border-green-500/30', icon: <CheckCircle2 size={14} /> };
      default:
        return { className: 'bg-gray-500/10 text-gray-400 border border-gray-500/30', icon: <XCircle size={14} /> };
    }
  };

  // 获取专利状态对应的样式
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'active':
        return { className: 'bg-green-500/10 text-green-400', text: '有效' };
      case 'expired':
        return { className: 'bg-gray-500/10 text-gray-400', text: '已过期' };
      case 'pending':
        return { className: 'bg-yellow-500/10 text-yellow-400', text: '审查中' };
      default:
        return { className: 'bg-gray-500/10 text-gray-400', text: '未知' };
    }
  };

  // 过滤专利
  const filteredPatents = patents.filter(patent => {
    const matchesSearch = patent.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         patent.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patent.applicant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = selectedFilters.country === 'all' || patent.country === selectedFilters.country;
    const matchesType = selectedFilters.type === 'all' || patent.type === selectedFilters.type;
    const matchesStatus = selectedFilters.status === 'all' || patent.status === selectedFilters.status;
    const matchesRiskLevel = selectedFilters.riskLevel === 'all' || patent.riskLevel === selectedFilters.riskLevel;
    
    return matchesSearch && matchesCountry && matchesType && matchesStatus && matchesRiskLevel;
  });

  // 分页逻辑
  const totalPages = Math.ceil(filteredPatents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatents = filteredPatents.slice(startIndex, endIndex);

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 处理过滤选项变化
  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  // 查看专利详情
  const viewPatentDetail = (id: string) => {
    if (isMultiSelectMode) {
      togglePatentSelection(id);
    } else {
      navigate(`/patent/${id}`);
    }
  };

  // 切换多选模式
  const toggleMultiSelectMode = () => {
    setIsMultiSelectMode(!isMultiSelectMode);
    setSelectedPatents([]);
  };

  // 切换专利选择
  const togglePatentSelection = (id: string) => {
    setSelectedPatents(prev => 
      prev.includes(id) 
        ? prev.filter(patentId => patentId !== id) 
        : [...prev, id]
    );
  };

  // 批量操作 - 下载选中的专利
  const handleBatchDownload = () => {
    if (selectedPatents.length === 0) {
      toast('请先选择要下载的专利');
      return;
    }
    toast(`正在下载${selectedPatents.length}个专利文件...`);
    setTimeout(() => {
      toast(`已成功下载${selectedPatents.length}个专利文件`);
      setSelectedPatents([]);
      setIsMultiSelectMode(false);
    }, 1500);
  };

  // 批量操作 - 删除选中的专利
  const handleBatchDelete = () => {
    if (selectedPatents.length === 0) {
      toast('请先选择要删除的专利');
      return;
    }
    setPatents(prev => prev.filter(patent => !selectedPatents.includes(patent.id)));
    toast(`已删除${selectedPatents.length}个专利`);
    setSelectedPatents([]);
    setIsMultiSelectMode(false);
  };

  // 复制专利ID
  const copyPatentId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    toast(`已复制专利号: ${id}`);
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
              专利列表
            </h1>
          </div>
        </header>

        <main className="flex-1 p-4 z-10">
          {/* 加载骨架屏 */}
          <div className="space-y-4">
            {/* 搜索框加载 */}
            <div className="relative animate-pulse">
              <div className="h-10 bg-white/10 rounded-lg w-full"></div>
            </div>
            
            {/* 过滤器加载 */}
            <div className="grid grid-cols-4 gap-4 animate-pulse">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 bg-white/10 rounded-lg"></div>
              ))}
            </div>
            
            {/* 专利列表加载 */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
                  <div className="h-5 bg-white/10 rounded w-3/5 mb-2"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2 mb-3"></div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="h-6 bg-white/10 rounded-full w-1/6"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* 分页加载 */}
            <div className="flex justify-between items-center animate-pulse">
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
              <div className="h-8 bg-white/10 rounded w-1/4"></div>
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
              专利列表
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
              className={`p-2 rounded-full transition-all duration-300 ${
                isMultiSelectMode ? 'bg-blue-500/20' : 'hover:bg-white/10'
              }`}
              onClick={toggleMultiSelectMode}
            >
              <CheckCircle2 size={20} className={isMultiSelectMode ? 'text-blue-400' : 'text-gray-300'} />
            </motion.button>
            
            {isMultiSelectMode && selectedPatents.length > 0 && (
              <div className="flex items-center space-x-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
                  onClick={handleBatchDownload}
                >
                  <Download size={20} className="text-gray-300" />
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
                  onClick={handleBatchDelete}
                >
                  <Trash2 size={20} className="text-gray-300" />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-auto z-10">
        {/* 搜索框 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="搜索专利标题、专利号或申请人..."
            className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </motion.div>
        
        {/* 过滤选项 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-4 gap-4 mb-6"
        >
          {/* 国家过滤 */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe size={16} className="text-gray-400" />
            </div>
            <select
              value={selectedFilters.country}
              onChange={(e) => handleFilterChange('country', e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
            >
              {filterOptions.country.map(option => (
                <option key={option.id} value={option.value}>{option.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
          
          {/* 类型过滤 */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Award size={16} className="text-gray-400" />
            </div>
            <select
              value={selectedFilters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
            >
              {filterOptions.type.map(option => (
                <option key={option.id} value={option.value}>{option.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
          
          {/* 状态过滤 */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CheckCircle2 size={16} className="text-gray-400" />
            </div>
            <select
              value={selectedFilters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
            >
              {filterOptions.status.map(option => (
                <option key={option.id} value={option.value}>{option.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
          
          {/* 风险等级过滤 */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AlertTriangle size={16} className="text-gray-400" />
            </div>
            <select
              value={selectedFilters.riskLevel}
              onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
            >
              {filterOptions.riskLevel.map(option => (
                <option key={option.id} value={option.value}>{option.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </motion.div>
        
        {/* 专利列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 mb-6"
        >
          {currentPatents.length > 0 ? (
            currentPatents.map(patent => (
              <motion.div
                key={patent.id}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 transition-all ${
                  isMultiSelectMode && selectedPatents.includes(patent.id) ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => viewPatentDetail(patent.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    {isMultiSelectMode && (
                      <div 
                        className={`w-4 h-4 rounded border ${
                          selectedPatents.includes(patent.id) 
                            ? 'border-blue-500 bg-blue-500/30' 
                            : 'border-white/30'
                        } mr-3 flex items-center justify-center`}
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePatentSelection(patent.id);
                        }}
                      >
                        {selectedPatents.includes(patent.id) && (
                          <CheckCircle2 size={10} className="text-blue-400" />
                        )}
                      </div>
                    )}
                    <h3 className="font-medium text-sm text-gray-200">{patent.title}</h3>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {patent.riskLevel !== 'none' && (
                      <div className={`text-xs px-2 py-1 rounded-full border ${getRiskStyle(patent.riskLevel).className} flex items-center`}>
                        {getRiskStyle(patent.riskLevel).icon}
                        <span className="ml-1 capitalize">
                          {patent.riskLevel === 'high' ? '高风险' : 
                           patent.riskLevel === 'medium' ? '中风险' : '低风险'}
                        </span>
                      </div>
                    )}
                    
                    {patent.similarity !== undefined && (
                      <div className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 flex items-center">
                        <i className="fa-solid fa-arrow-trend-up text-xs mr-1"></i>
                        {patent.similarity}%
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-3 text-xs">
                  <div className="flex items-center text-gray-400">
                    <FileText size={12} className="mr-1" />
                    <span 
                      className="hover:underline cursor-pointer"
                      onClick={(e) => copyPatentId(patent.id, e)}
                    >
                      {patent.id}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <Users size={12} className="mr-1" />
                    <span>{patent.applicant}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <Calendar size={12} className="mr-1" />
                    <span>{patent.date}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <Globe size={12} className="mr-1" />
                    <span>{patent.country}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <Award size={12} className="mr-1" />
                    <span>{patent.type}</span>
                  </div>
                  
                  <div className={`flex items-center ${getStatusStyle(patent.status).className}`}>
                    <CheckCircle2 size={12} className="mr-1" />
                    <span>{getStatusStyle(patent.status).text}</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="text-xs text-blue-400 hover:underline flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/patent/${patent.id}`);
                    }}
                  >
                    <Eye size={12} className="mr-1" />
                    查看详情
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <FileText size={24} className="text-gray-400" />
              </div>
              <p>未找到符合条件的专利</p>
              <p className="text-sm mt-1">请尝试调整搜索条件</p>
            </div>
          )}
        </motion.div>
        
        {/* 分页控件 */}
        {filteredPatents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-between items-center"
          >
            <div className="text-sm text-gray-400">
              显示 {(startIndex + 1)} 至 {Math.min(endIndex, filteredPatents.length)} 条，共 {filteredPatents.length} 条
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded-lg border ${
                  currentPage === 1 
                    ? 'border-white/10 text-gray-500 cursor-not-allowed' 
                    : 'border-white/20 text-gray-300 hover:bg-white/10'
                } transition-all`}
              >
                上一页
              </motion.button>
              
              <div className="flex items-center">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // 分页逻辑：显示当前页、前两页和后两页，或调整为适合的页码显示
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <motion.button
                      key={pageNum}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg mx-0.5 ${
                        currentPage === pageNum 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'text-gray-400 hover:text-gray-200'
                      } transition-all`}
                    >
                      {pageNum}
                    </motion.button>
                  );
                })}
              </div>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 rounded-lg border ${
                  currentPage === totalPages 
                    ? 'border-white/10 text-gray-500 cursor-not-allowed' 
                    : 'border-white/20 text-gray-300 hover:bg-white/10'
                } transition-all`}
              >
                下一页
              </motion.button>
            </div>
          </motion.div>
        )}
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

export default PatentsPage;