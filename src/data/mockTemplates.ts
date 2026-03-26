export interface Tool {
  name: string;
  icon: string;
  color: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  tools: Tool[];
  nodes: number;
  downloads: number;
  rating: number;
  author: string;
  lastUpdated: string;
  thumbnail: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  useCase: string;
  estimatedTime: string;
}

export const mockTemplates: WorkflowTemplate[] = [
  {
    id: '1',
    name: 'Slack to Email Notification',
    description: 'Automatically forward important Slack messages to email for key stakeholders',
    category: 'Communication',
    tags: ['slack', 'email', 'notification', 'communication'],
    tools: [
      { name: 'Slack', icon: '💬', color: '#4A154B' },
      { name: 'Gmail', icon: '📧', color: '#EA4335' },
      { name: 'Filter', icon: '🔍', color: '#E50914' },
      { name: 'Webhook', icon: '🔗', color: '#FFA500' }
    ],
    nodes: 4,
    downloads: 1243,
    rating: 4.8,
    author: 'WorkflowMaster',
    lastUpdated: '2025-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
    complexity: 'Beginner',
    useCase: 'Keep team leaders informed of critical Slack messages via email',
    estimatedTime: '10 minutes'
  },
  {
    id: '2',
    name: 'Discord Bot with AI Responses',
    description: 'Create an intelligent Discord bot that responds to messages using OpenAI GPT',
    category: 'Social Media',
    tags: ['discord', 'ai', 'bot', 'openai', 'chatgpt'],
    tools: [
      { name: 'Discord', icon: '🎮', color: '#5865F2' },
      { name: 'OpenAI', icon: '🤖', color: '#00A67E' },
      { name: 'HTTP Request', icon: '🌐', color: '#FF6B6B' },
      { name: 'Code', icon: '💻', color: '#4ECDC4' },
      { name: 'If', icon: '❓', color: '#45B7D1' },
      { name: 'Set', icon: '📝', color: '#96CEB4' },
      { name: 'Wait', icon: '⏰', color: '#FFEAA7' }
    ],
    nodes: 7,
    downloads: 892,
    rating: 4.6,
    author: 'BotBuilder',
    lastUpdated: '2025-01-10',
    thumbnail: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=300&h=200&fit=crop',
    complexity: 'Intermediate',
    useCase: 'Automated customer support and community engagement',
    estimatedTime: '25 minutes'
  },
  {
    id: '3',
    name: 'Automated Email Marketing Campaign',
    description: 'Set up automated email sequences based on user behavior and preferences',
    category: 'Marketing',
    tags: ['email', 'marketing', 'automation', 'mailchimp', 'campaign'],
    tools: [
      { name: 'Mailchimp', icon: '🐵', color: '#FFE01B' },
      { name: 'Webhook', icon: '🔗', color: '#FFA500' },
      { name: 'Google Sheets', icon: '📊', color: '#34A853' },
      { name: 'If', icon: '❓', color: '#45B7D1' },
      { name: 'Switch', icon: '🔀', color: '#A855F7' },
      { name: 'Wait', icon: '⏰', color: '#FFEAA7' },
      { name: 'HTTP Request', icon: '🌐', color: '#FF6B6B' },
      { name: 'Set', icon: '📝', color: '#96CEB4' },
      { name: 'Code', icon: '💻', color: '#4ECDC4' },
      { name: 'Merge', icon: '🔗', color: '#F39C12' },
      { name: 'Schedule Trigger', icon: '⏱️', color: '#E74C3C' },
      { name: 'Function', icon: '⚡', color: '#9B59B6' }
    ],
    nodes: 12,
    downloads: 2156,
    rating: 4.9,
    author: 'MarketingPro',
    lastUpdated: '2025-01-20',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop',
    complexity: 'Advanced',
    useCase: 'Nurture leads and convert prospects into customers',
    estimatedTime: '45 minutes'
  },
  {
    id: '4',
    name: 'Google Sheets Data Sync',
    description: 'Sync data between multiple Google Sheets and external databases automatically',
    category: 'Data Management',
    tags: ['google-sheets', 'database', 'sync', 'data', 'automation'],
    tools: [
      { name: 'Google Sheets', icon: '📊', color: '#34A853' },
      { name: 'MySQL', icon: '🗄️', color: '#00618A' },
      { name: 'Schedule Trigger', icon: '⏱️', color: '#E74C3C' },
      { name: 'Set', icon: '📝', color: '#96CEB4' },
      { name: 'If', icon: '❓', color: '#45B7D1' },
      { name: 'Code', icon: '💻', color: '#4ECDC4' }
    ],
    nodes: 6,
    downloads: 1567,
    rating: 4.7,
    author: 'DataWizard',
    lastUpdated: '2025-01-18',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    complexity: 'Intermediate',
    useCase: 'Keep spreadsheets and databases in perfect sync',
    estimatedTime: '20 minutes'
  },
  {
    id: '5',
    name: 'Twitter Content Scheduler',
    description: 'Schedule and post content across multiple Twitter accounts with analytics',
    category: 'Social Media',
    tags: ['twitter', 'social-media', 'scheduler', 'content', 'analytics'],
    tools: [
      { name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
      { name: 'Google Sheets', icon: '📊', color: '#34A853' },
      { name: 'Schedule Trigger', icon: '⏱️', color: '#E74C3C' },
      { name: 'If', icon: '❓', color: '#45B7D1' },
      { name: 'Set', icon: '📝', color: '#96CEB4' },
      { name: 'Code', icon: '💻', color: '#4ECDC4' },
      { name: 'HTTP Request', icon: '🌐', color: '#FF6B6B' },
      { name: 'Wait', icon: '⏰', color: '#FFEAA7' }
    ],
    nodes: 8,
    downloads: 934,
    rating: 4.5,
    author: 'SocialGuru',
    lastUpdated: '2025-01-12',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop',
    complexity: 'Intermediate',
    useCase: 'Maintain consistent social media presence',
    estimatedTime: '30 minutes'
  },
  {
    id: '6',
    name: 'API Data Pipeline',
    description: 'Create robust data pipelines that fetch, transform, and store API data',
    category: 'Data Management',
    tags: ['api', 'pipeline', 'data', 'transformation', 'webhook'],
    tools: [
      { name: 'HTTP Request', icon: '🌐', color: '#FF6B6B' },
      { name: 'Code', icon: '💻', color: '#4ECDC4' },
      { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
      { name: 'If', icon: '❓', color: '#45B7D1' },
      { name: 'Switch', icon: '🔀', color: '#A855F7' },
      { name: 'Set', icon: '📝', color: '#96CEB4' },
      { name: 'Schedule Trigger', icon: '⏱️', color: '#E74C3C' },
      { name: 'Function', icon: '⚡', color: '#9B59B6' },
      { name: 'Error Trigger', icon: '⚠️', color: '#E67E22' },
      { name: 'Webhook', icon: '🔗', color: '#FFA500' },
      { name: 'Redis', icon: '📦', color: '#DC382D' },
      { name: 'Wait', icon: '⏰', color: '#FFEAA7' },
      { name: 'Merge', icon: '🔗', color: '#F39C12' },
      { name: 'Split In Batches', icon: '📋', color: '#8E44AD' },
      { name: 'NoOp', icon: '🚫', color: '#95A5A6' }
    ],
    nodes: 15,
    downloads: 756,
    rating: 4.4,
    author: 'APIExpert',
    lastUpdated: '2025-01-08',
    thumbnail: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=300&h=200&fit=crop',
    complexity: 'Advanced',
    useCase: 'Process and transform data from multiple APIs',
    estimatedTime: '60 minutes'
  },
  {
    id: '7',
    name: 'Customer Support Automation',
    description: 'Automate customer support responses and ticket routing based on keywords',
    category: 'Customer Service',
    tags: ['support', 'automation', 'tickets', 'customer-service', 'ai'],
    tools: [
      { name: 'Zendesk', icon: '🎫', color: '#03363D' },
      { name: 'OpenAI', icon: '🤖', color: '#00A67E' },
      { name: 'Gmail', icon: '📧', color: '#EA4335' },
      { name: 'Slack', icon: '💬', color: '#4A154B' },
      { name: 'If', icon: '❓', color: '#45B7D1' },
      { name: 'Switch', icon: '🔀', color: '#A855F7' },
      { name: 'HTTP Request', icon: '🌐', color: '#FF6B6B' },
      { name: 'Code', icon: '💻', color: '#4ECDC4' },
      { name: 'Set', icon: '📝', color: '#96CEB4' },
      { name: 'Wait', icon: '⏰', color: '#FFEAA7' }
    ],
    nodes: 10,
    downloads: 1345,
    rating: 4.8,
    author: 'SupportHero',
    lastUpdated: '2025-01-22',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=200&fit=crop',
    complexity: 'Intermediate',
    useCase: 'Provide instant, intelligent customer support',
    estimatedTime: '35 minutes'
  },
  {
    id: '8',
    name: 'E-commerce Order Processing',
    description: 'Streamline order processing from multiple platforms into a unified system',
    category: 'E-commerce',
    tags: ['ecommerce', 'orders', 'processing', 'shopify', 'woocommerce'],
    tools: [
      { name: 'Shopify', icon: '🛍️', color: '#96BF48' },
      { name: 'WooCommerce', icon: '🛒', color: '#96588A' },
      { name: 'MySQL', icon: '🗄️', color: '#00618A' },
      { name: 'Webhook', icon: '🔗', color: '#FFA500' },
      { name: 'If', icon: '❓', color: '#45B7D1' },
      { name: 'Switch', icon: '🔀', color: '#A855F7' },
      { name: 'Set', icon: '📝', color: '#96CEB4' },
      { name: 'Code', icon: '💻', color: '#4ECDC4' },
      { name: 'HTTP Request', icon: '🌐', color: '#FF6B6B' },
      { name: 'Gmail', icon: '📧', color: '#EA4335' },
      { name: 'Function', icon: '⚡', color: '#9B59B6' }
    ],
    nodes: 11,
    downloads: 1789,
    rating: 4.7,
    author: 'EcomMaster',
    lastUpdated: '2025-01-25',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
    complexity: 'Advanced',
    useCase: 'Unify order management across platforms',
    estimatedTime: '40 minutes'
  }
];