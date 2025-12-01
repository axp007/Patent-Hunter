import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock, History, Trash2, Globe, Calendar, Users, FileText, ChevronDown, ChevronUp, X, RefreshCw, Award, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// 定义搜索条件类型
interface SearchCriteria {
  keyword: string;
  patentNumber: string;
  applicant: string;
  startDate: string;
  endDate: string;
  patentType: string;
  language: string;
  // 高级搜索选项
  ipcClass: string;
  publicationStartDate: string;
  publicationEndDate: string;
  inventor: string;
  priorityCountry: string;
  priorityNumber: string;
}

// 定义搜索历史记录类型
interface SearchHistoryItem {
  id: string;
  criteria: string;
  timestamp: Date;
}

// 定义热门搜索词类型
interface TrendingSearch {
  id: string;
  term: string;
  count: number;
}

// 定义专利数据库覆盖类型
interface DatabaseCoverage {
  id: string;
  name: string;
  country: string;
  language: string;
  icon: string;
}

// 定义搜索结果类型
interface SearchResult {
  id: string;
  title: string;
  applicant: string;
  date: string;
  country: string;
  abstract: string;
  similarity?: number;
  risk?: string;
}

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  // 搜索条件状态
  const [criteria, setCriteria] = useState<SearchCriteria>({
    keyword: '',
    patentNumber: '',
    applicant: '',
    startDate: '',
    endDate: '',
    patentType: '',
    language: '',
    ipcClass: '',
    publicationStartDate: '',
    publicationEndDate: '',
    inventor: '',
    priorityCountry: '',
    priorityNumber: '',
  });
  
  // 高级搜索面板展开状态
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  
  // 搜索历史记录
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([
    { id: '1', criteria: '关键词: AI专利 相似度>80%', timestamp: new Date('2025-11-26T14:30:00') },
    { id: '2', criteria: '专利号: HT-2025-12345', timestamp: new Date('2025-11-25T09:15:00') },
    { id: '3', criteria: '申请人: 扣子科技', timestamp: new Date('2025-11-24T16:45:00') },
  ]);
  
  // 热门搜索词
  const [trendingSearches, setTrendingSearches] = useState<TrendingSearch[]>([
    { id: '1', term: '人工智能', count: 1284 },
    { id: '2', term: '区块链', count: 956 },
    { id: '3', term: '自动驾驶', count: 873 },
    { id: '4', term: '量子计算', count: 721 },
    { id: '5', term: '生物医药', count: 689 },
  ]);
  
  // 专利数据库覆盖范围
  const [databaseCoverages, setDatabaseCoverages] = useState<DatabaseCoverage[]>([
    { id: 'cn', name: '中国专利数据库', country: 'CN', language: '中文', icon: 'fa-flag-china' },
    { id: 'us', name: '美国专利数据库', country: 'US', language: '英文', icon: 'fa-flag-usa' },
    { id: 'jp', name: '日本专利数据库', country: 'JP', language: '日文', icon: 'fa-flag-japan' },
    { id: 'kr', name: '韩国专利数据库', country: 'KR', language: '韩文', icon: 'fa-flag-korea' },
  ]);
  
  // 模拟搜索结果
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // 处理搜索条件变化
  const handleCriteriaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
  };
  
  // 清空搜索条件
  const handleClearCriteria = () => {
    setCriteria({
      keyword: '',
      patentNumber: '',
      applicant: '',
      startDate: '',
      endDate: '',
      patentType: '',
      language: '',
      ipcClass: '',
      publicationStartDate: '',
      publicationEndDate: '',
      inventor: '',
      priorityCountry: '',
      priorityNumber: '',
    });
    setShowResults(false);
    toast('已清空搜索条件');
  };
  
  // 切换高级搜索面板
  const toggleAdvancedSearch = () => {
    setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
  };
  
  // 执行搜索
  const handleSearch = () => {
    // 验证搜索条件
    if (!criteria.keyword && !criteria.patentNumber && !criteria.applicant) {
      toast('请至少输入一个搜索条件');
      return;
    }
    
    setIsSearching(true);
    
    // 模拟搜索延迟
    setTimeout(() => {
      // 生成模拟搜索结果
      const mockResults: SearchResult[] = [
        {
          id: 'CN-2024-1234567',
          title: '一种基于人工智能的专利文本分析方法',
          applicant: '扣子科技有限公司',
          date: '2024-06-15',
          country: 'CN',
          abstract: '本发明公开了一种基于人工智能的专利文本分析方法，包括文本预处理、特征提取、语义分析等步骤。该方法能够快速识别专利文本中的技术特征，提高专利分析效率...',
          similarity: 87.2,
          risk: '高风险'
        },
        {
          id: 'US-11234567-B2',
          title: 'System and Method for Patent Semantic Analysis Using Deep Learning',
          applicant: 'Coze Tech Inc.',
          date: '2024-01-23',
          country: 'US',
          abstract: 'The present invention provides a system and method for analyzing patent documents using deep learning techniques. The system extracts key technical features and performs semantic comparisons between different patents...',
          similarity: 76.5,
          risk: '待确认'
        },
        {
          id: 'JP-6789012',
          title: '人工知能を活用した特許文書分析システム',
          applicant: 'コーズテック株式会社',
          date: '2023-11-30',
          country: 'JP',
          abstract: '本発明は、人工知能を活用した特許文書分析システムに関するものである。このシステムは、複数言語の特許文書を処理し、技術的特徴を抽出して比較分析することができる...',
          similarity: 62.3,
          risk: '正常'
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
      setShowResults(true);
      
      // 添加到搜索历史
      const newHistoryItem: SearchHistoryItem = {
        id: Date.now().toString(),
        criteria: generateCriteriaString(),
        timestamp: new Date(),
      };
      
      setSearchHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]);
      
      toast('搜索完成，找到3条相关专利');
    }, 1500);
  };
  
  // 生成搜索条件字符串
  const generateCriteriaString = (): string => {
    const parts: string[] = [];
    
    if (criteria.keyword) parts.push(`关键词: ${criteria.keyword}`);
    if (criteria.patentNumber) parts.push(`专利号: ${criteria.patentNumber}`);
    if (criteria.applicant) parts.push(`申请人: ${criteria.applicant}`);
    
    return parts.join(' ');
  };
  
  // 从历史记录加载搜索条件
  const loadFromHistory = (item: SearchHistoryItem) => {
    // 简单解析历史记录中的搜索条件
    // 实际应用中可能需要更复杂的解析逻辑
    const criteriaText = item.criteria;
    
    if (criteriaText.includes('关键词:')) {
      const keyword = criteriaText.match(/关键词: (.+?)( |$)/)?.[1] || '';
      setCriteria(prev => ({ ...prev, keyword }));
    }
    
    if (criteriaText.includes('专利号:')) {
      const patentNumber = criteriaText.match(/专利号: (.+?)( |$)/)?.[1] || '';
      setCriteria(prev => ({ ...prev, patentNumber }));
    }
    
    if (criteriaText.includes('申请人:')) {
      const applicant = criteriaText.match(/申请人: (.+?)( |$)/)?.[1] || '';
      setCriteria(prev => ({ ...prev, applicant }));
    }
    
    toast('已加载历史搜索条件');
  };
  
  // 清除搜索历史
  const clearSearchHistory = () => {
    setSearchHistory([]);
    toast('已清除所有搜索历史');
  };
  
  // 使用热门搜索词
  const applyTrendingTerm = (term: string) => {
    setCriteria(prev => ({ ...prev, keyword: term }));
    toast(`已设置关键词: ${term}`);
  };
  
  // 获取风险等级对应的样式
  const getRiskStyle = (risk?: string) => {
    if (!risk) return '';
    
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
  
  // 查看专利详情
  const viewPatentDetail = (id: string) => {
    navigate(`/patent/${id}`);
  };
  
  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-violet-950 text-gray-100 flex flex-col relative overflow-hidden">
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
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px]"></div>
      </div>
      
      {/* 顶部导航栏 - 玻璃态效果 */}
      <header className="backdrop-blur-lg bg-white/5 border-b border-white/10 z-30">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 mr-2 transition-all duration-300"
              onClick={() => navigate(-1)}
              aria-label="返回"
            >
              <i className="fa-solid fa-arrow-left text-gray-300"></i>
            </motion.button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent flex items-center">
              <ShieldAlert size={20} className="mr-2" />
              专利检索
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
              onClick={() => toggleTheme()}
              aria-label="切换主题"
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
              onClick={() => toast('功能开发中，敬请期待')}
              aria-label="筛选"
            >
              <Filter size={20} className="text-gray-300" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* 主内容区域 - 适配移动端 */}
      <main className="flex-1 p-4 overflow-auto z-10 flex flex-col pb-20">
        {/* 搜索条件区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 mb-6"
        >
          {/* 基本搜索条件 */}
          <div className="space-y-4">
            {/* 关键词搜索 */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="keyword"
                value={criteria.keyword}
                onChange={handleCriteriaChange}
                placeholder="关键词搜索"
                className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            
            {/* 专利号和申请人 - 移动端单列布局 */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="patentNumber"
                  value={criteria.patentNumber}
                  onChange={handleCriteriaChange}
                  placeholder="专利号"
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="applicant"
                  value={criteria.applicant}
                  onChange={handleCriteriaChange}
                  placeholder="申请人"
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            
            {/* 申请日期范围和专利类型 - 移动端单列布局 */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="startDate"
                  value={criteria.startDate}
                  onChange={handleCriteriaChange}
                  placeholder="申请日期起"
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Award size={18} className="text-gray-400" />
                </div>
                <select
                  name="patentType"
                  value={criteria.patentType}
                  onChange={handleCriteriaChange}
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                >
                  <option value="">专利类型</option>
                  <option value="invention">发明专利</option>
                  <option value="utility">实用新型</option>
                  <option value="design">外观设计</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* 语言选择 */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe size={18} className="text-gray-400" />
              </div>
              <select
                name="language"
                value={criteria.language}
                onChange={handleCriteriaChange}
                className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
              >
                <option value="">语言</option><option value="zh">中文</option>
                <option value="en">英文</option>
                <option value="ja">日文</option>
                <option value="ko">韩文</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
            
            {/* 高级搜索选项 */}
            <motion.div
              animate={{ height: isAdvancedSearchOpen ? 'auto' : 0, opacity: isAdvancedSearchOpen ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                {/* IPC分类号 */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="ipcClass"
                    value={criteria.ipcClass}
                    onChange={handleCriteriaChange}
                    placeholder="IPC分类号"
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                
                {/* 公开日期范围 - 移动端单列布局 */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="publicationStartDate"
                      value={criteria.publicationStartDate}
                      onChange={handleCriteriaChange}
                      placeholder="公开日期起"
                      className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="publicationEndDate"
                      value={criteria.publicationEndDate}
                      onChange={handleCriteriaChange}
                      placeholder="公开日期止"
                      className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                
                {/* 发明人和优先权信息 - 移动端单列布局 */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="inventor"
                      value={criteria.inventor}
                      onChange={handleCriteriaChange}
                      placeholder="发明人"
                      className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Award size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="priorityNumber"
                      value={criteria.priorityNumber}
                      onChange={handleCriteriaChange}
                      placeholder="优先权号"
                      className="block w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* 高级搜索切换按钮 */}
            <motion.button
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleAdvancedSearch}
              className="w-full flex items-center justify-center py-2 text-sm text-blue-400 rounded-lg transition-colors"
            >
              {isAdvancedSearchOpen ? (
                <>收起高级选项 <ChevronUp size={16} className="ml-1" /></>
              ) : (
                <>展开高级选项 <ChevronDown size={16} className="ml-1" /></>
              )}
            </motion.button>
            
            {/* 搜索按钮区域 */}
            <div className="pt-2 flex space-x-4">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-lg shadow-lg shadow-blue-600/20 transition-colors flex items-center justify-center"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <RefreshCw size={18} className="mr-2 animate-spin" />
                    搜索中...
                  </>
                ) : (
                  <>
                    <Search size={18} className="mr-2" />
                    智能检索
                  </>
                )}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleClearCriteria}
                className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={18} className="text-gray-300" />
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* 数据库覆盖范围 - 适配移动端 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 mb-6"
        >
          <h2 className="text-base font-semibold mb-3 flex items-center text-gray-200">
            <Globe size={18} className="mr-2 text-blue-400" />
            数据库覆盖范围
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {databaseCoverages.map(database => (
              <motion.div
                key={database.id}
                whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
                className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-lg transition-all"
              >
                <div className={`w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-2`}>
                  <i className={`fa-solid ${database.icon} text-blue-400`}></i>
                </div>
                <p className="text-xs font-medium text-gray-200">{database.name}</p>
                <p className="text-xs text-gray-400">{database.language}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* 热门搜索和搜索历史 - 移动端垂直堆叠 */}
        <div className="space-y-4">
          {/* 热门搜索 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <h2 className="text-base font-semibold mb-3 text-gray-200">热门搜索</h2>
            
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map(item => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => applyTrendingTerm(item.term)}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm flex items-center"
                >
                  <span className="text-gray-300">{item.term}</span>
                  <span className="ml-1.5 text-xs px-1.5 py-0.5 bg-white/10 rounded-full text-gray-400">
                    {item.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* 搜索历史 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold flex items-center text-gray-200">
                <History size={16} className="mr-2 text-gray-400" />
                搜索历史
              </h2>
              
              {searchHistory.length > 0 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={clearSearchHistory}
                  className="text-xs text-gray-400 hover:text-red-400"
                >
                  <Trash2 size={14} className="inline mr-1" />
                  清空
                </motion.button>
              )}
            </div>
            
            {searchHistory.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {searchHistory.map(item => (
                  <motion.div
                    key={item.id}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    onClick={() => loadFromHistory(item)}
                    className="p-2 rounded-lg cursor-pointer flex justify-between items-center text-sm"
                  >
                    <div className="flex items-start">
                      <Clock size={14} className="mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-300">{item.criteria}</p>
                        <p className="text-xs text-gray-400">
                          {item.timestamp.toLocaleString('zh-CN')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400 text-sm">
                暂无搜索历史
              </div>
            )}
          </motion.div>
        </div>
        
        {/* 搜索结果区域 - 设置为弹性增长 */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 flex-grow mt-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold flex items-center text-gray-200">
                  <Search size={18} className="mr-2 text-blue-400" />
                  搜索结果
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    共找到 {searchResults.length} 条相关专利
                  </span>
                </h2>
                
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-blue-400 flex items-center px-3 py-1 rounded-lg"
                  onClick={() => toast('功能开发中，敬请期待')}
                >
                  筛选 <Filter size={14} className="ml-1" />
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {searchResults.map(result => (
                  <motion.div
                    key={result.id}
                    whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                    className="p-3 border border-white/10 rounded-lg hover:shadow-sm transition-all cursor-pointer"
                    onClick={() => viewPatentDetail(result.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm line-clamp-2 text-gray-200">{result.title}</h3>
                      {result.risk && (
                        <span className={`text-xs px-2 py-1 rounded-full border ${getRiskStyle(result.risk)}`}>
                          {result.risk}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                      {result.abstract}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                      <div className="flex items-center">
                        <i className="fa-solid fa-building mr-1"></i>
                        <span>{result.applicant}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <i className="fa-solid fa-calendar mr-1"></i>
                        <span>{result.date}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <i className="fa-solid fa-flag mr-1"></i>
                        <span>{result.country}</span>
                      </div>
                      
                      {result.similarity && (
                        <div className="flex items-center">
                          <i className="fa-solid fa-arrow-trend-up text-blue-400 mr-1"></i>
                          <span className="text-blue-400">{result.similarity}%</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* 结果为空的情况 */}
              {searchResults.length === 0 && !isSearching && (
                <div className="text-center py-8 text-gray-400">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-gray-400" />
                  </div>
                  <p>未找到相关专利</p>
                  <p className="text-sm mt-1">请尝试调整搜索条件</p>
                </div>
              )}
              
              {/* 加载更多按钮 */}
              {searchResults.length > 0 && (
                <div className="mt-6 text-center">
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors"
                    onClick={() => toast('功能开发中，敬请期待')}
                  >
                    加载更多
                  </motion.button>
                </div>
              )}
             </motion.div>
          )}
        </AnimatePresence>
        
        {/* 当没有搜索结果时，添加一个占位元素确保页面充满 */}
        {!showResults && (
          <div className="flex-grow"></div>
        )}
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
            className="flex flex-col items-center justify-center py-1 text-blue-400"
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
};

export default SearchPage;