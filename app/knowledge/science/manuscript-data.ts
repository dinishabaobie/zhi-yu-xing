export interface ConceptDefinition {
  readonly id: "science" | "technology" | "civilization";
  readonly name: string;
  readonly role: string;
  readonly definition: string;
  readonly points: readonly string[];
  readonly question: string;
}

export interface FrameworkFuel {
  readonly id: "energy" | "information";
  readonly name: string;
  readonly asks: string;
  readonly description: string;
}

export interface AdoptionGate {
  readonly id: string;
  readonly name: string;
  readonly question: string;
}

export interface MaturityStage {
  readonly level: number;
  readonly id: string;
  readonly name: string;
  readonly description: string;
}

export interface CivilizationLine {
  readonly id: "energy" | "information" | "organization" | "legitimacy";
  readonly name: string;
  readonly question: string;
  readonly sequence: readonly string[];
  readonly interpretation: string;
}

export interface HistoricalCoupling {
  readonly id: string;
  readonly period: string;
  readonly title: string;
  readonly shift: string;
  readonly system: string;
  readonly tension: string;
}

export interface HistoricalLaw {
  readonly id: string;
  readonly title: string;
  readonly explanation: string;
  readonly diagnostic: string;
}

export interface EvaluationGroup {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly questions: readonly string[];
}

export interface CriticalGuardrail {
  readonly id: string;
  readonly title: string;
  readonly explanation: string;
}

export const conceptDefinitions = [
  {
    id: "science",
    name: "科学",
    role: "持续生产可靠知识的方法与制度",
    definition:
      "科学不是已经装订好的正确答案，也不只是定律、公式和专家意见。它的可靠性来自一套允许怀疑、暴露错误、重复检验与持续纠正的历史程序。",
    points: [
      "理论有适用尺度：牛顿力学仍适用于日常宏观世界，但在高速、强引力和微观尺度需要新的理论。",
      "成熟的科学态度既信任经得起检验的结论，也不把任何理论神圣化。",
      "近代科学的力量来自哲学家的统一解释、数学证明，与工匠的材料、工具和操作传统逐渐汇流。",
    ],
    question: "什么证据、反例或尺度变化，会迫使这个解释修正？",
  },
  {
    id: "technology",
    name: "技术",
    role: "把目的转化为稳定结果的可复制方案",
    definition:
      "技术不只是机器。物质装置、工艺流程、计算方法、组织程序乃至会计和信用制度，都可能把人的目的转化为可复制、可组合、可规模化的能力。",
    points: [
      "它会降低成本与训练门槛，或提高速度、精度、射程、能量密度和处理规模。",
      "它把部分能力外包给工具，也把依赖个人经验的工作转成标准流程。",
      "发明不等于创新：原理可行还要等待需求、价格、材料、制造、资金、市场和组织共同成熟。",
    ],
    question: "它从原理走向可用，仍缺少哪些互补条件？",
  },
  {
    id: "civilization",
    name: "文明",
    role: "决定能力怎样积累、扩散和分配的整体系统",
    definition:
      "文明为科学和技术提供生存环境：农业剩余、城市、市场、教育、法律、国家、宗教、战争、交通、媒介与价值观，都会保存、选择、放大或压制知识。",
    points: [
      "内史追踪概念、理论、实验和世界图景；外史追踪经济需求、社会结构、教育、国家竞争与权力。",
      "只讲内史会把科学写成观念自己推动观念，只讲外史又会消解理论与证据的约束。",
      "文明既能组织大项目，也可能垄断资源，把创新锁定在战争、监控与控制方向。",
    ],
    question: "这种能力由谁组织、为谁服务，又由谁承担后果？",
  },
] as const satisfies readonly ConceptDefinition[];

export const frameworkFuels = [
  {
    id: "energy",
    name: "能量",
    asks: "人类能够调动多大规模的物质行动？",
    description:
      "从火、农业和畜力，到煤炭、电力、石油与原子能，技术不断扩大可获得能量与单位能量的使用效率。",
  },
  {
    id: "information",
    name: "信息",
    asks: "经验能否跨越时间、空间和个体？",
    description:
      "从语言、文字和印刷，到计算机、互联网、基因测序与人工智能，技术不断扩大信息的产生、保存、处理与流通能力。",
  },
] as const satisfies readonly FrameworkFuel[];

export const adoptionGates = [
  {
    id: "concept",
    name: "概念",
    question: "有没有新概念或数学结构使它可理解？旧理论为何曾经合理？",
  },
  {
    id: "tool",
    name: "工具",
    question: "有没有仪器、材料和加工精度使它可观察、可制造？",
  },
  {
    id: "cost",
    name: "成本",
    question: "谁付得起？它能否先在狭窄小市场里活下来并持续试错？",
  },
  {
    id: "organization",
    name: "组织",
    question: "需要什么标准、训练和协作？失败时由谁维护与接管？",
  },
  {
    id: "institution",
    name: "制度",
    question: "法律是否允许它扩散？谁拥有产权、数据和控制权？",
  },
  {
    id: "legitimacy",
    name: "分配与合法性",
    question: "谁得红利、谁失去议价权？多数人还能否获得有尊严的参与？",
  },
  {
    id: "feedback",
    name: "反馈与外部性",
    question: "它会强化什么组织、锁定什么路径？最坏后果是否可逆？",
  },
] as const satisfies readonly AdoptionGate[];

export const maturityStages = [
  {
    level: 1,
    id: "principle",
    name: "理论允许",
    description: "不明显违背现有自然规律，但还不等于现实中能够实现。",
  },
  {
    level: 2,
    id: "laboratory",
    name: "实验室证明",
    description: "目标现象已经出现，并能在受控条件下被重复观察。",
  },
  {
    level: 3,
    id: "engineering",
    name: "工程稳定",
    description: "系统能够在真实环境中长期、安全、可维护地运行。",
  },
  {
    level: 4,
    id: "economic",
    name: "经济可扩散",
    description: "成本、供应链和基础设施相较替代方案具有持续优势。",
  },
  {
    level: 5,
    id: "social",
    name: "社会可治理",
    description: "责任、风险、分配、申诉与伦理已经形成可接受安排。",
  },
] as const satisfies readonly MaturityStage[];

export const civilizationLines = [
  {
    id: "energy",
    name: "能量线",
    question: "人类能够做多大的事？",
    sequence: [
      "人体与食物",
      "火",
      "农业、畜力、水力与风力",
      "煤炭与蒸汽机",
      "电力",
      "石油与内燃机",
      "原子能",
      "清洁能源与可能的可控核聚变",
    ],
    interpretation:
      "能量增加扩大生产、交通与战争能力，却不自动等于福祉。还要检查单位能量创造的价值、污染和风险由谁承担，以及能源系统是否形成不可逆依赖。",
  },
  {
    id: "information",
    name: "信息线",
    question: "经验能否跨越时间、空间与个体？",
    sequence: [
      "语言",
      "数字与文字",
      "纸张与印刷",
      "大学、学会与期刊",
      "电报、电话与广播",
      "传感器、计算机与互联网",
      "基因测序、精准医疗与基因编辑",
      "生成式人工智能与自然语言接口",
    ],
    interpretation:
      "信息线解释科技为何能够叠加。记录、传播和处理成本持续下降，但错误、操纵、监控和认知污染也会同步扩张。",
  },
  {
    id: "organization",
    name: "组织线",
    question: "许多个体能否形成持续能力？",
    sequence: [
      "部落经验传承",
      "城市中的工匠与学者",
      "希腊学派",
      "伊斯兰翻译中心与医院",
      "中世纪大学",
      "印刷市场、科学院与科学社团",
      "研究型大学与企业实验室",
      "国家大科学工程",
      "全球科研、产业与资本网络",
    ],
    interpretation:
      "人才训练、设备共享、资金持续、结论检验与复杂分工，决定知识能否变成稳定文明能力。技术又会反过来决定谁值得被组织、谁能够被替代。",
  },
  {
    id: "legitimacy",
    name: "合法性与边界线",
    question: "扩大的力量是否仍受共同体控制？",
    sequence: [
      "学习与技能",
      "有意义的参与",
      "相称的回报",
      "可预期且有尊严的生活",
      "知情与质疑",
      "申诉与纠错",
      "拒绝与退出",
    ],
    interpretation:
      "科学能够说明怎样更有效，却不能独自回答为了谁、牺牲谁、接受多大风险。目标设定、数据可见、申诉权、紧急权力期限与后果可逆性必须由公共制度处理。",
  },
] as const satisfies readonly CivilizationLine[];

export const historicalCouplings = [
  {
    id: "coupling-tools-language",
    period: "史前",
    title: "工具、火与语言：身体之外的能力",
    shift:
      "石器、远程武器与火把力量和能量移到身体之外；语言让经验、计划和想象进入群体记忆。",
    system:
      "工具提高能量效率，语言提高信息效率，协作把个体能力放大成群体能力。科技史最早的基本结构已经形成。",
    tension:
      "远程武器既提高狩猎效率，也扩大群体暴力；史前创新属于漫长共同积累，不能压缩成第一位发明者。",
  },
  {
    id: "coupling-agriculture-writing",
    period: "约公元前1万年起",
    title: "农业、城市与文字：剩余和外部记忆",
    shift:
      "农业把太阳能变成可储存粮食，城市把剩余组织成分工，数字与文字让记忆越过个人寿命。",
    system:
      "水利、测量、征税、运输、账目与行政彼此强化，工匠、军人、管理者和知识生产者得以脱离直接食物生产。",
    tension:
      "承载力扩大并不等于个体更自由；阶层、强制劳动、战争、疾病与人口压力也随密度和剩余增长。",
  },
  {
    id: "coupling-rationality-relay",
    period: "古典时代至中世纪",
    title: "希腊理性与文明接力：从诀窍到普遍解释",
    shift:
      "公开论证、概念分析、数学证明和统一原理，使“知识为什么成立”成为独立问题。",
    system:
      "埃及、美索不达米亚、印度、中国、希腊、伊斯兰与欧洲的保存、翻译、改造和传播，共同构成长时段知识接力。",
    tension:
      "理论传统没有沿单一路线直线上升。欧洲近代科学的形成不能被倒推成民族天赋或其他文明缺乏理性。",
  },
  {
    id: "coupling-scientific-revolution",
    period: "约1450至1700年",
    title: "科学革命：新世界图景与新知识制度",
    shift:
      "哥白尼、第谷、开普勒、伽利略与牛顿让模型、观测、数学和实验相互纠正，天上与地上的运动进入同一解释。",
    system:
      "印刷、远航、望远镜、显微镜、皇家学会与科学院，使仪器能够创造新事实，公开交流能够持续生产知识。",
    tension:
      "这不是一个天才的一次顿悟。模型、数据、仪器、方法争论和共同体制度缺一不可。",
  },
  {
    id: "coupling-industrial-revolution",
    period: "18至19世纪",
    title: "工业革命：科学、工匠、市场与能源闭环",
    shift:
      "蒸汽、电力、石油与化工把科学问题、工程装置和生产需求连接成持续反馈。",
    system:
      "煤矿小市场、工资与煤价、加工精度、资本、月光社网络、研究型大学和企业实验室，共同让创新从偶然活动变成持续供给。",
    tension:
      "轧棉机延长奴隶制，铁路强化军国动员，流水线降低价格也制造异化。生产力增长从不自动等于人的解放。",
  },
  {
    id: "coupling-big-science",
    period: "20世纪",
    title: "大科学：微观知识、国家能力与全球风险",
    shift:
      "相对论、量子论、分子生命科学和动态地球图景，支持原子能、半导体、雷达、计算机、药物、航天与基因工程。",
    system:
      "昂贵设备、跨学科团队、国家投入和工业体系形成科学、军队、政府与产业复合体，曼哈顿工程成为转折标志。",
    tension:
      "核武器把毁灭性权力集中给少数人；能力已经全球化，问责却仍主要停留在民族国家内部。",
  },
  {
    id: "coupling-information-life",
    period: "20世纪中后期至今",
    title: "信息与生命时代：从操纵物质到操纵规则",
    shift:
      "晶体管、计算机、互联网和手机外包判断、记忆、协调与监督；测序、精准医疗和基因编辑开始读取并修改生命信息。",
    system:
      "芯片、通信协议、平台、临床体系、样本与计算基础设施共同运转。系统论、生态学和复杂性研究又强调反馈、层级与涌现。",
    tension:
      "平台记录并预测行为，生命技术可能改变后代。部分之和未必足以解释整体，能做到也不等于应该做。",
  },
  {
    id: "coupling-generative-ai",
    period: "21世纪",
    title: "生成式人工智能：语言、知识与行动闭环",
    shift:
      "自然语言逐渐成为调用计算、连接知识与操作工具的通用接口，机器开始外包部分表达、判断、协调和创造过程。",
    system:
      "大规模数据、算力、模型、芯片、能源、云平台、数据标注、开源社区与工业实验室共同支撑能力扩散。",
    tension:
      "语言流畅不等于事实可靠，生成答案不等于承担责任。谁设定目标、分享收益、审计错误，以及普通人能否拒绝和退出，才是文明问题。",
  },
] as const satisfies readonly HistoricalCoupling[];

export const historicalLaws = [
  {
    id: "accumulation-needs-institutions",
    title: "科技能够叠加，但叠加需要制度",
    explanation:
      "后人能从前人的定理、数据、设计和标准出发，但战争、政治崩溃、机构消失与传播中断都可能让知识倒退。",
    diagnostic: "记录、教育、公开争论和跨代组织是否足以保存纠错过程？",
  },
  {
    id: "intersection-breakthrough",
    title: "突破发生在理论、工具、组织和需求的交点",
    explanation:
      "所谓天才往往在多种条件接近成熟时看见关键连接。个人仍重要，但个人传奇不能替代形成突破的系统条件。",
    diagnostic: "知识、工具、组织与真实需求这四块，哪一块仍然缺失？",
  },
  {
    id: "low-riverbed",
    title: "“低河床”决定可能何时变成现实",
    explanation:
      "技术要足够解决真实问题，原方案又足够昂贵或稀缺，还需要早期采用者、小市场、基础设施、制度与跨域者。",
    diagnostic: "它能否在一个付得起成本的小场景中先活下来并反复试错？",
  },
  {
    id: "feasible-range",
    title: "技术先改变可行范围，社会再选择具体方向",
    explanation:
      "技术会预设成本、权限、集中程度与可监控性，却不会自动导向唯一制度；法律、市场和文化继续选择并承担后果。",
    diagnostic: "哪些选择因它变得更便宜、更快、更容易规模化？",
  },
  {
    id: "institutional-lag",
    title: "技术速度常快于制度速度",
    explanation:
      "机枪、核武器和平台都曾被装进旧授权、旧劳动与旧隐私规则。灾难常来自新能力与旧制度的不适配。",
    diagnostic: "哪一套旧规则仍在管理已经改变尺度的新能力？",
  },
  {
    id: "path-lock-in",
    title: "成功会制造路径锁定",
    explanation:
      "铁路动员、化石能源、汽车城市和平台网络会通过基础设施、人才与既得利益保护自身，暂时优势容易被误认成永远正确。",
    diagnostic: "退出成本是否持续升高，失败时还有没有替代系统？",
  },
  {
    id: "progress-backlash",
    title: "每一次进步都自带反噬",
    explanation:
      "农业、国家、化肥、自动化、专家治理与信息网络都同时解决旧问题、制造更高层级的新问题。",
    diagnostic: "收益归谁、风险归谁、失败是否可逆、人是否仍能知情、拒绝与退出？",
  },
] as const satisfies readonly HistoricalLaw[];

export const crossDomainCapabilities = [
  {
    id: "hard-boundaries",
    title: "理解技术的硬边界",
    description: "知道它真正能做什么、不能做什么，以及证据处于哪个成熟阶段。",
  },
  {
    id: "real-needs",
    title: "理解真实需要",
    description: "知道谁有问题、谁愿意付费、谁会受损，找到技术与社会相遇的低河床。",
  },
  {
    id: "system-consequences",
    title: "看见系统后果",
    description: "把产品、组织、权力、分配、生态和伦理放进同一张因果图。",
  },
  {
    id: "capacity-to-refuse",
    title: "保留拒绝能力",
    description: "面对算法、绩效、舆论和消费命令，仍能暂停、质疑、说不并离开。",
  },
] as const;

export const technologyEvaluationGroups = [
  {
    id: "knowledge",
    label: "A / 知识层",
    title: "它是什么",
    questions: [
      "它最初解决什么真实问题？在它之前，人们怎样解释或处理？",
      "哪些观察或实验使旧解释失效？它推翻了哪个旧观念？",
      "同时期有哪些竞争方案？它的适用条件和边界在哪里？",
      "它依赖哪些仪器、材料和工程能力？",
    ],
  },
  {
    id: "capability",
    label: "B / 能力层",
    title: "它能做什么",
    questions: [
      "它依赖新的能量能力，还是新的信息能力？",
      "优势来自速度、成本、规模、精度，还是可复制性？",
      "它处于理论、实验、工程、经济、社会五阶段的哪一级？",
      "它需要哪些互补基础设施、人才与制度才能落地？",
    ],
  },
  {
    id: "power",
    label: "C / 权力层",
    title: "谁说了算",
    questions: [
      "它降低了谁的成本，又提高了谁的成本？",
      "它使谁更重要，又使谁变得可以被替代？",
      "它要求集中标准化，还是开放分布式的组织形式？",
      "控制它的人获得什么新权力？红利归谁，风险归谁？",
    ],
  },
  {
    id: "feedback",
    label: "D / 后果层",
    title: "反馈会走向哪里",
    questions: [
      "它解决旧问题后，会制造什么更高层级的新问题？",
      "它会强化、保护或扭曲什么制度？又会锁定什么路径？",
      "最坏后果是否可逆？影响范围有多大？",
      "普通人还有没有知情、拒绝、退出和纠错的能力？",
    ],
  },
] as const satisfies readonly EvaluationGroup[];

export const criticalGuardrails = [
  {
    id: "no-linear-progress",
    title: "不把科技史写成直线上升的进步神话",
    explanation:
      "知识会失传，制度会崩溃，技术也会服务压迫。拥有更强能力，不代表拥有更多智慧与正义。",
  },
  {
    id: "no-civilizational-ranking",
    title: "不把近代科学的形成写成文明高下",
    explanation:
      "不同文明形成了各自的数学、医学、天文、材料与工程传统。要解释具体闭环条件，而不是用结果倒推文化优劣。",
  },
  {
    id: "no-single-cause",
    title: "不把重要因素写成单一决定原因",
    explanation:
      "弩、修道院、煤炭与铁路都揭示真实机制，却不能独自解释复杂历史。好解释必须容纳反例、失败和偶然。",
  },
  {
    id: "no-neutrality-excuse",
    title: "不把“技术没有善恶”当作免责",
    explanation:
      "设计架构、所有权、默认规则与基础设施本身就在分配能力。技术没有意志，却始终带着政治结构。",
  },
  {
    id: "no-expert-monopoly",
    title: "不让专家主义取代公共选择",
    explanation:
      "专家擅长事实与手段，但不能垄断价值判断。数据公开、利益披露、理由可追溯、申诉、司法审查与事后问责缺一不可。",
  },
  {
    id: "no-stale-forecast",
    title: "不把过时预测继续当作事实",
    explanation:
      "人工智能、核聚变、量子通信、基因编辑和太空技术都在变化。通史中的未来章节应提供判断框架，而不是固定时间表。",
  },
] as const satisfies readonly CriticalGuardrail[];

export const civilizationPrinciples = [
  "相信证据，但不迷信权威。",
  "尊重理论，但记得理论有边界。",
  "赞赏效率，也计算分配与外部性。",
  "依靠专业分工，同时保留整体责任。",
  "鼓励创新，也为失败准备退出和修复机制。",
  "扩大人的能力，但不让人沦为系统中可随意替换的部件。",
  "追求进步，同时承认人属于自然与社会关系之中。",
] as const;

export const civilizationChain = [
  "经验",
  "信息",
  "知识",
  "技术",
  "组织",
  "集体能力",
] as const;
