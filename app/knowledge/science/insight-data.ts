export type InsightTrackId = "science" | "technology" | "civilization";

export type MechanismLineId = "energy" | "information" | "institution";

export type BookId =
  | "philosophy-of-science"
  | "history-of-science"
  | "global-history-of-technology"
  | "technology-and-civilization";

export interface CoreProposition {
  id: string;
  title: string;
  summary: string;
  question: string;
}

export interface BookContribution {
  id: BookId;
  title: string;
  asks: string;
  contribution: string;
  caution: string;
  layer: string;
}

export interface InsightTrack {
  id: InsightTrackId;
  name: string;
  shortName: string;
  description: string;
  asks: string;
}

export interface MechanismLine {
  id: MechanismLineId;
  name: string;
  question: string;
  sequence: readonly string[];
  interpretation: string;
}

export interface ProgressCheck {
  id: string;
  dimension: string;
  shallowQuestion: string;
  deeperQuestion: string;
}

export interface MaturityLevel {
  level: number;
  id: string;
  name: string;
  description: string;
}

export interface ScientificLiteracyItem {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

export interface SourceBoundary {
  id: string;
  title: string;
  description: string;
  implication: string;
}

export const corePropositions = [
  {
    id: "organized-correction",
    title: "科学的可靠性来自组织纠错",
    summary:
      "科学并非永远正确，而是让主张持续接受证据、反例、复现、批评与修正。",
    question: "什么证据会让这个结论改变？",
  },
  {
    id: "capability-system",
    title: "技术是现实能力的组合",
    summary:
      "技术不是科学的简单下游，而是原理、材料、工艺、标准、组织与场景的共同结果。",
    question: "它从原理走向可用，还缺少哪些条件？",
  },
  {
    id: "social-riverbed",
    title: "历史影响取决于社会承接",
    summary:
      "技术只有与需求、价格、资源、组织、制度和行动者选择汇合，才可能大规模扩散。",
    question: "是谁让它从样品进入日常生活？",
  },
  {
    id: "more-than-capability",
    title: "能力增长不等于文明进步",
    summary:
      "技术会重新分配收益、风险、权力与退出能力，评价不能停在能否做到。",
    question: "谁决定、谁受益、谁承担代价，失败能否止损？",
  },
] as const satisfies readonly CoreProposition[];

export const bookContributions = [
  {
    id: "philosophy-of-science",
    title: "《科学哲学》",
    asks: "科学凭什么值得相信？",
    contribution: "澄清证伪、归纳、解释、实在论、范式、客观性与价值边界。",
    caution: "抽象论证容易忽略方法与制度如何在历史中形成。",
    layer: "认识论",
  },
  {
    id: "history-of-science",
    title: "《科学的历程》",
    asks: "现代科学是怎样长出来的？",
    contribution: "把理论、实验、仪器、制度与社会需求放进长时段历史。",
    caution: "宏观通史容易让已经发生的路线看起来必然且线性。",
    layer: "历史",
  },
  {
    id: "global-history-of-technology",
    title: "《全球科技通史》",
    asks: "科技为何能够积累并加速？",
    contribution: "用能量、信息与创新制度解释技术能力的扩张。",
    caution: "框架过强时，可能低估权力、殖民、分配与文化。",
    layer: "物质",
  },
  {
    id: "technology-and-civilization",
    title: "《技术与文明》",
    asks: "技术怎样重组组织、权力与生活？",
    contribution: "揭示成本、训练门槛、规模、制度反馈、合法性与外部性。",
    caution: "有解释力的故事仍须避免把贡献原因写成决定原因。",
    layer: "政治伦理",
  },
] as const satisfies readonly BookContribution[];

export const insightTracks = [
  {
    id: "science",
    name: "科学轨",
    shortName: "知识",
    description: "追踪理论、证据、测量与解释框架怎样形成并被修正。",
    asks: "我们凭什么相信这种关于世界的说法？",
  },
  {
    id: "technology",
    name: "技术轨",
    shortName: "能力",
    description: "追踪能量、信息、材料与工程能力怎样被复制和扩张。",
    asks: "知识怎样变成稳定、可用、可规模化的能力？",
  },
  {
    id: "civilization",
    name: "文明轨",
    shortName: "治理",
    description: "追踪组织、制度、权力、分配与风险怎样被重新安排。",
    asks: "这种能力由谁组织、为谁服务，又由谁负责？",
  },
] as const satisfies readonly InsightTrack[];

export const mechanismLines = [
  {
    id: "energy",
    name: "能量线",
    question: "人类能够做多大规模的事？",
    sequence: [
      "人体与食物",
      "火与畜力",
      "农业储能",
      "风力与水力",
      "煤与蒸汽",
      "电力",
      "石油与内燃机",
      "原子能",
      "更清洁、可控的能源",
    ],
    interpretation:
      "能量扩大搬运、制造、运输与改造环境的能力，但还要检查效率、污染、风险和代价归属。",
  },
  {
    id: "information",
    name: "信息线",
    question: "经验能否保存，复杂行动能否协同？",
    sequence: [
      "语言",
      "数字与文字",
      "纸张与印刷",
      "大学、期刊与学术社团",
      "电报、电话与广播",
      "计算机与互联网",
      "算法与生命信息技术",
    ],
    interpretation:
      "信息技术持续改变记录成本、传播速度、处理能力与协作规模，也同时放大错误、监控与集中控制。",
  },
  {
    id: "institution",
    name: "制度线",
    question: "发现能否从偶然事件变成持续能力？",
    sequence: [
      "经验传承",
      "工匠与学者",
      "学派与翻译网络",
      "大学与印刷市场",
      "科学社团与期刊",
      "研究型大学与企业实验室",
      "国家大科学工程",
      "全球科研、产业与资本网络",
    ],
    interpretation:
      "知识不会自动保存自己，文字、标准、教育、复现、公开批评与稳定机构使前人成果成为后人的起点。",
  },
] as const satisfies readonly MechanismLine[];

export const progressTrapChecks = [
  {
    id: "volume",
    dimension: "总量",
    shallowQuestion: "产出是否增加？",
    deeperQuestion: "增加的是什么，能否持续？",
  },
  {
    id: "distribution",
    dimension: "分配",
    shallowQuestion: "平均水平是否提高？",
    deeperQuestion: "谁受益、谁承担风险，差距是否固化？",
  },
  {
    id: "power",
    dimension: "权力",
    shallowQuestion: "使用是否方便？",
    deeperQuestion: "谁控制入口、数据、标准与关闭权？",
  },
  {
    id: "resilience",
    dimension: "韧性",
    shallowQuestion: "正常时是否高效？",
    deeperQuestion: "失败时能否降级、退出、恢复与追责？",
  },
  {
    id: "ecology-and-generations",
    dimension: "生态与代际",
    shallowQuestion: "当下是否划算？",
    deeperQuestion: "成本是否被转移给环境、远方与未来的人？",
  },
] as const satisfies readonly ProgressCheck[];

export const futureTechnologyMaturity = [
  {
    level: 1,
    id: "principle",
    name: "原理允许",
    description: "不明显违背现有自然规律。",
  },
  {
    level: 2,
    id: "phenomenon",
    name: "现象出现",
    description: "实验中观察到目标效应。",
  },
  {
    level: 3,
    id: "reproducible",
    name: "结果可复现",
    description: "不同条件或团队能够稳定重复。",
  },
  {
    level: 4,
    id: "engineered",
    name: "工程可用",
    description: "系统能在真实环境中长期、安全运行。",
  },
  {
    level: 5,
    id: "economically-scalable",
    name: "经济可扩散",
    description: "成本、维护与基础设施优于可选方案。",
  },
  {
    level: 6,
    id: "socially-governable",
    name: "社会可治理",
    description: "风险、责任、分配与伦理已有可接受安排。",
  },
] as const satisfies readonly MaturityLevel[];

export const scientificLiteracy = [
  {
    id: "epistemic-restraint",
    title: "认识上的克制",
    description:
      "不把可错误解为不可信，也不把当前最好解释写成终极真理。",
    prompt: "这是事实、模型、推断、预测，还是价值判断？",
  },
  {
    id: "historical-depth",
    title: "历史上的纵深",
    description:
      "看见理论与发明背后的旧观念、工具、制度、交流与失败尝试。",
    prompt: "它替代了什么，又依赖哪些前提？",
  },
  {
    id: "systemic-completeness",
    title: "系统上的完整",
    description:
      "理解技术时，同时检查需求、组织、产权、分配、反馈与生态后果。",
    prompt: "性能之外，系统发生了什么变化？",
  },
  {
    id: "responsibility-in-action",
    title: "行动上的责任",
    description:
      "越靠近能力被社会放大的关键节点，越不能用分工免除责任。",
    prompt: "我参与放大的目标与后果是什么？",
  },
  {
    id: "refusal-and-exit",
    title: "保留拒绝与退出",
    description:
      "自由不仅是选项更多，也包括要求解释、说不、离开与申诉的能力。",
    prompt: "受影响者是否真正拥有拒绝与退出的路径？",
  },
] as const satisfies readonly ScientificLiteracyItem[];

export const sourceBoundaries = [
  {
    id: "uneven-evidence",
    title: "历史解释的证据强度不一",
    description:
      "部分案例更适合视为机制猜想或启发性类比，不能充当已经证实的单一因果结论。",
    implication: "网页应保留限定语，不把相关、贡献与因果混写。",
  },
  {
    id: "time-sensitive-judgments",
    title: "未来判断具有时间边界",
    description:
      "人工智能、量子通信、核聚变等内容来自写作时间不同的笔记。",
    implication: "这些内容用于展示分析框架，不声明当前事实状态。",
  },
  {
    id: "reading-notes-not-verification",
    title: "这是个人读书笔记母稿",
    description:
      "网页融合四篇既有笔记与结构重排版母稿，没有逐条核验原书引文、版本差异与最新研究。",
    implication: "用于学术写作或现实决策时，应回到原书与更新的一手资料。",
  },
] as const satisfies readonly SourceBoundary[];

export const insightData = {
  corePropositions,
  bookContributions,
  tracks: insightTracks,
  mechanismLines,
  progressTrapChecks,
  futureTechnologyMaturity,
  scientificLiteracy,
  sourceBoundaries,
} as const;
