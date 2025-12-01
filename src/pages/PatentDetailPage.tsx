import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, Users, Calendar, Globe, Award, ArrowLeft, 
  Download, Share2, BookmarkPlus, Copy, ChevronDown, 
  ChevronUp, AlertTriangle, CheckCircle2, Star, ShieldAlert,
  BarChart3, Search, Eye, HelpCircle, ThumbsUp, ThumbsDown,
  MessageCircle, Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

// 定义类型
interface PatentDetail {
  id: string;
  title: string;
  abstract: string;
  claims: string[];
  description: string;
  applicant: string;
  inventor: string;
  filingDate: string;
  publicationDate: string;
  priorityDate: string;
  country: string;
  type: string;
  status: 'active' | 'expired' | 'pending';
  ipcClassification: string;
  familyMembers: string[];
  similarPatents: SimilarPatent[];
  riskAssessment: RiskAssessment;
  legalStatus: LegalStatus[];
  citations: Citation[];
}

interface SimilarPatent {
  id: string;
  title: string;
  similarity: number;
  riskLevel: 'high' | 'medium' | 'low';
}

interface RiskAssessment {
  level: 'high' | 'medium' | 'low' | 'none';
  score: number;
  description: string;
  details: RiskDetail[];
}

interface RiskDetail {
  id: string;
  factor: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

interface LegalStatus {
  date: string;
  event: string;
  description: string;
}

interface Citation {
  id: string;
  patentId: string;
  title: string;
  type: 'cited' | 'citing';
  date: string;
}

const PatentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [patent, setPatent] = useState<PatentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({
    claims: false,
    description: false,
    similarPatents: false,
    riskAssessment: false,
    legalStatus: false,
    citations: false,
  });

  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setPatent({
        id: id || 'CN-2024-1234567',
        title: '一种基于人工智能的专利文本分析方法',
        abstract: '本发明公开了一种基于人工智能的专利文本分析方法，包括文本预处理、特征提取、语义分析等步骤。该方法能够快速识别专利文本中的技术特征，提高专利分析效率和准确性。具体而言，本发明首先对专利文本进行清洗和标准化处理，然后利用深度学习模型提取文本中的技术特征和关键词，接着进行语义分析和相似度计算，最后生成专利分析报告。本发明适用于大规模专利文本的快速分析，可广泛应用于专利检索、侵权风险评估、技术趋势分析等领域。',
        claims: [
          '一种基于人工智能的专利文本分析方法，其特征在于，包括以下步骤：',
          '步骤1：对专利文本进行预处理，包括清洗、分词和标准化；',
          '步骤2：利用深度学习模型从预处理后的文本中提取技术特征；',
          '步骤3：对提取的技术特征进行语义分析和向量化表示；',
          '步骤4：计算不同专利文本之间的相似度；',
          '步骤5：生成专利分析报告，包括技术特征总结、相似度排名和风险评估。'
        ],
        description: '本发明涉及人工智能技术领域，特别涉及一种基于人工智能的专利文本分析方法。\n\n在当今知识经济时代，专利作为重要的知识产权形式，其数量呈现爆炸式增长。然而，传统的专利分析方法主要依赖人工阅读和分析，效率低下且容易出错。随着人工智能技术的发展，利用机器学习和自然语言处理技术进行专利文本分析成为可能。\n\n本发明的目的在于提供一种基于人工智能的专利文本分析方法，能够自动、快速、准确地分析专利文本，提取技术特征，计算相似度，并生成分析报告。\n\n本发明的技术方案包括以下步骤：\n\n1. 文本预处理：去除专利文本中的噪声信息，进行分词处理，并将文本标准化。\n2. 特征提取：利用预训练的深度学习模型（如BERT、GPT等）提取文本的特征表示。\n3. 语义分析：对提取的特征进行语义理解，识别专利中的技术概念和关系。\n4. 相似度计算：基于特征表示计算不同专利之间的相似度。\n5. 报告生成：根据分析结果生成包含技术特征、相似度排名和风险评估的专利分析报告。\n\n本发明的有益效果在于：大大提高了专利分析的效率和准确性，降低了人工成本；能够处理大规模的专利文本数据；提供了客观、量化的专利分析结果；可广泛应用于专利检索、侵权风险评估、技术趋势分析等场景。',
        applicant: '扣子科技有限公司',
        inventor: '张三, 李四, 王五',
        filingDate: '2023-06-15',
        publicationDate: '2024-06-15',
        priorityDate: '2023-06-15',
        country: 'CN',
        type: '发明专利',
        status: 'active',
        ipcClassification: 'G06F 16/33, G06F 40/284, G06N 3/04',
        familyMembers: ['CN-2023-7654321', 'US-11234567-B2', 'JP-6789012', 'EP-4123456-A1'],
        similarPatents: [
          {
            id: 'US-11234567-B2',
            title: 'System and Method for Patent Semantic Analysis Using Deep Learning',
            similarity: 87.2,
            riskLevel: 'high'
          },
          {
            id: 'JP-6789012',
            title: '人工知能を活用した特許文書分析システム',
            similarity: 76.5,
            riskLevel: 'medium'
          },
          {
            id: 'EP-4123456-A1',
            title: 'Method for Automatically Analyzing Patent Documents',
            similarity: 68.7,
            riskLevel: 'low'
          }
        ],
        riskAssessment: {
          level: 'high',
          score: 87.2,
          description: '该专利与现有技术在核心技术特征上存在高度相似性，存在较高的侵权风险',
          details: [
            {
              id: '1',
              factor: '技术方案相似度',
              description: '与对比专利US-11234567-B2在技术方案上相似度高达92%',
              severity: 'high'
            },
            {
              id: '2',
              factor: '权利要求覆盖度',
              description: '权利要求1-3被对比专利的权利要求完全覆盖',
              severity: 'high'
            },
            {
              id: '3',
              factor: '技术领域重叠',
              description: '两者均属于人工智能和自然语言处理领域',
              severity: 'medium'
            }
          ]
        },
        legalStatus: [
          {
            date: '2024-06-15',
            event: '授权公告',
            description: '该专利已获得授权'
          },
          {
            date: '2023-12-15',
            event: '实质审查请求',
            description: '申请人提出实质审查请求'
          },
          {
            date: '2023-06-15',
            event: '申请日',
            description: '该专利的申请日期'
          }
        ],
        citations: [
          {
            id: '1',
            patentId: 'CN-2022-1234567',
            title: '基于深度学习的文本分类方法',
            type: 'cited',
            date: '2022-03-10'
          },
          {
            id: '2',
            patentId: 'US-10123456-A1',
            title: 'Method and System for Natural Language Processing',
            type: 'cited',
            date: '2018-09-15'
          },
          {
            id: '3',
            patentId: 'CN-2024-7654321',
            title: '一种改进的专利文本分析系统',
            type: 'citing',
            date: '2024-03-20'
          }
        ]
      });
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [id]);

  // 获取风险等级对应的样式
  const getRiskStyle = (riskLevel: string) => {
    switch(riskLevel) {
      case 'high':
        return { className: 'bg-red-500/10 text-red-400 border border-red-500/30', icon: <AlertTriangle size={16} /> };
      case 'medium':
        return { className: 'bg-orange-500/10 text-orange-400 border border-orange-500/30', icon: <AlertTriangle size={16} /> };
      case 'low':
        return { className: 'bg-blue-500/10 text-blue-400 border border-blue-500/30', icon: <CheckCircle2 size={16} /> };
      case 'none':
        return { className: 'bg-green-500/10 text-green-400 border border-green-500/30', icon: <CheckCircle2 size={16} /> };
      default:
        return { className: 'bg-gray-500/10 text-gray-400 border border-gray-500/30', icon: <AlertTriangle size={16} /> };
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

  // 切换展开/折叠状态
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // 复制专利ID
  const copyPatentId = () => {
    if (patent) {
      navigator.clipboard.writeText(patent.id);
      toast(`已复制专利号: ${patent.id}`);
    }
  };

  // 下载专利
  const downloadPatent = () => {
    toast('专利文件下载中...');
    setTimeout(() => {
      toast('专利文件已成功下载');
    }, 1500);
  };

  // 分享专利
  const sharePatent = () => {
    toast('分享链接已复制到剪贴板');
  };

  // 添加书签
  const addBookmark = () => {
    toast('已添加到收藏夹');
  };

  // 查看相似专利
  const viewSimilarPatent = (patentId: string) => {
    navigate(`/patent/${patentId}`);
  };

  // 比对专利
  const comparePatent = (patentId: string) => {
    navigate(`/comparison?patent1=${patent?.id}&patent2=${patentId}`);
  };

  // 骨架屏加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-violet-950 text-gray-100 flex flex-col">
        {/* 背景网格装饰 */}<div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYyYzcuNzMgMCAxNC4zOSA1LjUgMTYuNTcgMTIuNTRoLTkuODR6IiBzdHJva2Utb3BhY2l0eT0iLjAyIiBzdHJva2U9IiNmZmYiLz48L2c+PC9zdmc+')] opacity-20 z-0"></div>
        
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
              专利详情
            </h1>
          </div>
        </header>

        <main className="flex-1 p-4 z-10">
          {/* 加载骨架屏 */}
          <div className="space-y-4">
            {/* 专利标题和ID加载 */}
            <div className="animate-pulse">
              <div className="h-6 bg-white/10 rounded w-4/5 mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-1/3 mb-4"></div>
            </div>
            
            {/* 基本信息卡片加载 */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i}>
                    <div className="h-3 bg-white/10 rounded w-1/2 mb-1"></div>
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 标签页加载 */}
            <div className="flex space-x-4 animate-pulse">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-8 bg-white/10 rounded-lg w-1/4"></div>
              ))}
            </div>
            
            {/* 内容区域加载 */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
              <div className="h-6 bg-white/10 rounded w-1/3 mb-3"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-4 bg-white/10 rounded w-full"></div>
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

  if (!patent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-violet-950 text-gray-100 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={24} className="text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-200 mb-2">未找到专利</h2>
          <p className="text-gray-400 mb-6">无法找到指定的专利信息，请检查专利号是否正确</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/patents')}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-lg shadow-lg shadow-blue-600/20"
          >
            返回专利列表
          </motion.button>
        </div>
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
              专利详情
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
              onClick={copyPatentId}
            >
              <Copy size={20} className="text-gray-300" />
            </motion.button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-auto z-10">
        {/* 专利标题和ID */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold text-gray-200 mb-2">{patent.title}</h2>
          <div className="flex items-center">
            <p className="text-sm text-blue-400 font-medium">{patent.id}</p>
            {patent.status !== 'none' && (
              <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getStatusStyle(patent.status).className}`}>
                {getStatusStyle(patent.status).text}
              </span>
            )}
          </div>
        </motion.div>
        
        {/* 专利基本信息卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 mb-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">申请人</p>
              <p className="text-sm text-gray-200">{patent.applicant}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">发明人</p>
              <p className="text-sm text-gray-200">{patent.inventor}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">申请日</p>
              <p className="text-sm text-gray-200">{patent.filingDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">公开日</p>
              <p className="text-sm text-gray-200">{patent.publicationDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">优先权日</p>
              <p className="text-sm text-gray-200">{patent.priorityDate || '无'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">国家/地区</p>
              <p className="text-sm text-gray-200">{patent.country}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">专利类型</p>
              <p className="text-sm text-gray-200">{patent.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">IPC分类</p>
              <p className="text-sm text-gray-200">{patent.ipcClassification}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">同族专利</p>
              <p className="text-sm text-gray-200">{patent.familyMembers.length} 项</p>
            </div>
          </div>
        </motion.div>
        
        {/* 风险评估卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 mb-6 ${
            patent.riskAssessment.level === 'high' ? 'border-red-500/30' : 
            patent.riskAssessment.level === 'medium' ? 'border-orange-500/30' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <ShieldAlert size={18} className={
                patent.riskAssessment.level === 'high' ? 'text-red-400' : 
                patent.riskAssessment.level === 'medium' ? 'text-orange-400' : 'text-blue-400'
              } />
              <h3 className="text-base font-semibold text-gray-200 ml-2">风险评估</h3>
            </div>
            <div className={`text-sm px-3 py-1 rounded-full border ${getRiskStyle(patent.riskAssessment.level).className} flex items-center`}>
              {getRiskStyle(patent.riskAssessment.level).icon}
              <span className="ml-1 capitalize">
                {patent.riskAssessment.level === 'high' ? '高风险' : 
                 patent.riskAssessment.level === 'medium' ? '中风险' : 
                 patent.riskAssessment.level === 'low' ? '低风险' : '无风险'}
              </span>
            </div>
          </div>
          
          <div className="flex items-end mb-3">
            <span className="text-2xl font-bold" style={{ 
              color: patent.riskAssessment.level === 'high' ? '#ef4444' : 
                     patent.riskAssessment.level === 'medium' ? '#f97316' : '#22c55e'
            }}>
              {patent.riskAssessment.score}%
            </span>
            <span className="text-xs text-gray-400 ml-2 mb-1">相似度</span>
          </div>
          
          <p className="text-sm text-gray-300 mb-3">{patent.riskAssessment.description}</p>
          
          <motion.button
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleSection('riskAssessment')}
            className="w-full flex items-center justify-between text-xs text-blue-400 py-1"
          >
            <span>查看风险评估详情</span>
            {expandedSections.riskAssessment ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </motion.button>
          
          {expandedSections.riskAssessment && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-3"
            >
              {patent.riskAssessment.details.map(detail => (
                <div key={detail.id} className="p-3 rounded-lg border border-white/10">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-gray-200">{detail.factor}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      detail.severity === 'high' ? 'bg-red-500/10 text-red-400' : 
                      detail.severity === 'medium' ? 'bg-orange-500/10 text-orange-400' : 
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {detail.severity === 'high' ? '高' : 
                       detail.severity === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{detail.description}</p>
                </div>
              ))}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/reports')}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm rounded-lg shadow-lg shadow-blue-600/20 flex items-center justify-center"
              >
                <FileText size={14} className="mr-2" />
                生成完整风险评估报告
              </motion.button>
            </motion.div>
          )}
        </motion.div>
        
        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-4 gap-3 mb-6"
        >
          <motion.button
            whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadPatent}
            className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-lg transition-all"
          >
            <Download size={18} className="text-blue-400 mb-1" />
            <span className="text-xs text-gray-300">下载专利</span>
          </motion.button>
          
          <motion.button
            whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={sharePatent}
            className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-lg transition-all"
          >
            <Share2 size={18} className="text-green-400 mb-1" />
            <span className="text-xs text-gray-300">分享</span>
          </motion.button>
          
          <motion.button
            whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={addBookmark}
            className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-lg transition-all"
          >
            <BookmarkPlus size={18} className="text-yellow-400 mb-1" />
            <span className="text-xs text-gray-300">收藏</span>
          </motion.button>
          
          <motion.button
            whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/search')}
            className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-lg transition-all"
          >
            <Search size={18} className="text-purple-400 mb-1" />
            <span className="text-xs text-gray-300">相似检索</span>
          </motion.button>
        </motion.div>
        
        {/* 标签页导航 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === 'overview' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-white/5 border border-white/10 text-gray-300'
            }`}
          >
            概览
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('claims')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === 'claims' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-white/5 border border-white/10 text-gray-300'
            }`}
          >
            权利要求
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('similar')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === 'similar' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-white/5 border border-white/10 text-gray-300'
            }`}
          >
            相似专利
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('legal')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === 'legal' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-white/5 border border-white/10 text-gray-300'
            }`}
          >
            法律状态
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('citations')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === 'citations' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-white/5 border border-white/10 text-gray-300'
            }`}
          >
            引用信息
          </motion.button>
        </motion.div>
        
        {/* 内容区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4"
        >
          {/* 概览标签页 */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-base font-semibold text-gray-200 mb-3">摘要</h3>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line mb-6">{patent.abstract}</p>
              
              <h3 className="text-base font-semibold text-gray-200 mb-3">技术领域</h3>
              <p className="text-sm text-gray-300 mb-6">人工智能、自然语言处理、专利分析</p>
              
              <h3 className="text-base font-semibold text-gray-200 mb-3">技术方案摘要</h3>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line mb-3">{patent.description}</p>
              
              <motion.button
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleSection('description')}
                className="w-full flex items-center justify-between text-xs text-blue-400 py-1"
              >
                <span>查看完整技术方案</span>
                {expandedSections.description ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </motion.button>
              
              {expandedSections.description && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3"
                >
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{patent.description}</p>
                </motion.div>
              )}
            </div>
          )}
          
          {/* 权利要求标签页 */}
          {activeTab === 'claims' && (
            <div>
              <h3 className="text-base font-semibold text-gray-200 mb-3">权利要求</h3>
              
              <div className="space-y-4">
                {patent.claims.map((claim, index) => (
                  <div key={index} className="p-3 rounded-lg border border-white/10">
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-blue-400 mr-2">{index + 1}.</span>
                      <p className="text-sm text-gray-300">{claim}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {patent.claims.length > 5 && (
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleSection('claims')}
                  className="w-full flex items-center justify-between text-xs text-blue-400 py-2 mt-4"
                >
                  <span>{expandedSections.claims ? '收起' : '查看全部权利要求'}</span>
                  {expandedSections.claims ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </motion.button>
              )}
            </div>
          )}
          
          {/* 相似专利标签页 */}
          {activeTab === 'similar' && (
            <div>
              <h3 className="text-base font-semibold text-gray-200 mb-3">相似专利</h3>
              
              {patent.similarPatents.length > 0 ? (
                <div className="space-y-4">
                  {patent.similarPatents.slice(0, expandedSections.similarPatents ? patent.similarPatents.length : 3).map((similarPatent, index) => (
                    <div key={index} className="p-3 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-gray-200 line-clamp-2">{similarPatent.title}</h4>
                        <div className={`text-xs px-2 py-1 rounded-full border ${getRiskStyle(similarPatent.riskLevel).className} flex items-center`}>
                          {getRiskStyle(similarPatent.riskLevel).icon}
                          <span className="ml-1 capitalize">
                            {similarPatent.riskLevel === 'high' ? '高风险' : 
                             similarPatent.riskLevel === 'medium' ? '中风险' : '低风险'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-400 mb-3">
                        <FileText size={12} className="mr-1" />
                        <span>{similarPatent.id}</span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="text-sm font-medium text-blue-400 mr-2">{similarPatent.similarity}%</div>
                        <div className="flex-1 h-1.5 bg-gray-700 rounded-full">
                          <div 
                            className={`h-1.5 rounded-full ${
                              similarPatent.riskLevel === 'high' ? 'bg-red-500' : 
                              similarPatent.riskLevel === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${similarPatent.similarity}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => viewSimilarPatent(similarPatent.id)}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition-colors"
                        >
                          查看详情
                        </motion.button>
                        
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => comparePatent(similarPatent.id)}
                          className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-xs transition-colors"
                        >
                          专利比对
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-gray-400" />
                  </div>
                  <p>未找到相似专利</p>
                  <p className="text-sm mt-1">该专利与现有专利相似度较低</p>
                </div>
              )}
              
              {patent.similarPatents.length > 3 && (
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleSection('similarPatents')}
                  className="w-full flex items-center justify-between text-xs text-blue-400 py-2 mt-4"
                >
                  <span>{expandedSections.similarPatents ? '收起' : '查看更多相似专利'}</span>
                  {expandedSections.similarPatents ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </motion.button>
              )}
            </div>
          )}
          
          {/* 法律状态标签页 */}
          {activeTab === 'legal' && (
            <div>
              <h3 className="text-base font-semibold text-gray-200 mb-3">法律状态</h3>
              
              {patent.legalStatus.length > 0 ? (
                <div className="space-y-4">
                  {patent.legalStatus.map((status, index) => (
                    <div key={index} className="relative pl-6 pb-4 border-l-2 border-white/10 last:pb-0 last:border-l-0">
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-gray-900"></div>
                      <div className="mb-1">
                        <span className="text-sm font-medium text-gray-200">{status.event}</span>
                        <span className="text-xs text-gray-400 ml-2">{status.date}</span>
                      </div>
                      <p className="text-sm text-gray-400">{status.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={24} className="text-gray-400" />
                  </div>
                  <p>暂无法律状态信息</p>
                  <p className="text-sm mt-1">请稍后再试或联系客服获取更多信息</p>
                </div>
              )}
            </div>
          )}
          
          {/* 引用信息标签页 */}
          {activeTab === 'citations' && (
            <div>
              <h3 className="text-base font-semibold text-gray-200 mb-3">引用信息</h3>
              
              {patent.citations.length > 0 ? (
                <div className="space-y-4">
                  {patent.citations.map((citation, index) => (
                    <div key={index} className="p-3 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-gray-200 line-clamp-2">{citation.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          citation.type === 'cited' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'
                        }`}>
                          {citation.type === 'cited' ? '被引用' : '引用'}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-400 mb-2">
                        <FileText size={12} className="mr-1" />
                        <span>{citation.patentId}</span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock size={12} className="mr-1" />
                        <span>{citation.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={24} className="text-gray-400" />
                  </div>
                  <p>暂无引用信息</p>
                  <p className="text-sm mt-1">该专利暂无引用或被引用记录</p>
                </div>
              )}
            </div>
          )}
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

export default PatentDetailPage;