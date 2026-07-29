"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

type Gate = {
  id: string;
  number: string;
  name: string;
  short: string;
  question: string;
  summary: string;
  checks: string[];
  before: string;
  after: string;
};

type Topic = {
  id: string;
  phase: string;
  name: string;
  description: string;
  questions: string[];
  gate: string;
};

type Fallacy = {
  id: string;
  category: string;
  name: string;
  signal: string;
  why: string;
  repair: string;
  example: string;
  breakdown: string;
  better: string;
  source: string;
};

type LearningExample = {
  quote: string;
  breakdown: string;
  better: string;
  source: string;
};

type Scenario = {
  id: string;
  name: string;
  title: string;
  claim: string;
  context: string;
  reference: {
    facts: string;
    premise: string;
    bridge: string;
    revision: string;
  };
};

const gates: Gate[] = [
  {
    id: "words",
    number: "01",
    name: "定词",
    short: "概念与边界",
    question: "我们说的是同一件事吗？",
    summary:
      "概念不清，后面的判断再工整也可能只是在误会里推理。先找出关键词，用实例、反例和工作定义钉住边界。",
    checks: [
      "关键词指向什么对象或性质？",
      "内涵和外延是否前后一致？",
      "定义有没有过宽、过窄或循环？",
      "分类是否使用同一标准并覆盖完整？",
    ],
    before: "真正自律的人从不拖延。",
    after: "如果把“自律”定义为能持续完成重要任务，那么偶尔拖延并不自动排除自律。",
  },
  {
    id: "claims",
    number: "02",
    name: "正句",
    short: "判断与量词",
    question: "这句话到底断定了什么？",
    summary:
      "把感受和暗示改写成能判断真假的命题，并写清对象、范围、否定位置、连接词、语境和隐含预设。",
    checks: [
      "主项、谓项和断定关系清楚吗？",
      "“所有、很多、有些”是否与证据匹配？",
      "否定的是一个词，还是整句话？",
      "“并且、或者、如果、只有”用对了吗？",
    ],
    before: "他已读不回，就是不尊重我。",
    after: "事实是消息已读且两小时未回复；“不尊重我”是一个仍需证据的解释。",
  },
  {
    id: "evidence",
    number: "03",
    name: "验据",
    short: "事实与前提",
    question: "理由取得入场券了吗？",
    summary:
      "前提必须先通过真实性、相关性和充分性三道门。情绪、身份和流行程度都不能替代可以独立核查的证据。",
    checks: [
      "信息来自亲历、原始资料还是转述？",
      "删除这条理由，结论的可信度会下降吗？",
      "复合前提中的每个事实都成立吗？",
      "支持力度配得上结论的强度吗？",
    ],
    before: "大家都推荐这个方案，所以它一定最好。",
    after: "多人推荐只能说明它受欢迎；仍需比较目标、成本、风险和适用条件。",
  },
  {
    id: "bridge",
    number: "04",
    name: "搭桥",
    short: "演绎与条件",
    question: "前提怎样走到了结论？",
    summary:
      "把没有说出口的中间步骤补出来，检查三段论、关系、联言、选言和条件推理的方向是否有效。",
    checks: [
      "前提都真时，结论仍可能是假的吗？",
      "中项真的连接了两端吗？",
      "把充分条件误当成必要条件了吗？",
      "是否遗漏了其他选项或原因？",
    ],
    before: "如果系统故障，页面会打不开。页面打不开，所以系统故障了。",
    after: "系统故障足以导致页面打不开，但网络、权限或浏览器也可能造成同一结果。",
  },
  {
    id: "consistency",
    number: "05",
    name: "查一致",
    short: "逻辑规律",
    question: "对象、时间、方面和含义一致吗？",
    summary:
      "同一律、矛盾律和排中律不是口号。每次判断都要先限定同一对象、同一时间、同一方面和同一词义。",
    checks: [
      "讨论对象或关键词有没有暗中更换？",
      "两个判断真的是在同一条件下冲突吗？",
      "所谓二选一是否穷尽了全部可能？",
      "评价标准是否随着立场改变？",
    ],
    before: "这项规定既完全没有限制，又严重妨碍了我。",
    after: "先分别说明规定在哪个方面没有限制、又在哪个方面构成妨碍，判断是否真正矛盾。",
  },
  {
    id: "probability",
    number: "06",
    name: "校准概率",
    short: "归纳与因果",
    question: "证据有多强，话说多满？",
    summary:
      "归纳、因果、类比和假说通常只能给出程度不同的可能性。主动寻找反例、共同原因和竞争性解释。",
    checks: [
      "样本数量、来源和代表性如何？",
      "相关关系是否被写成因果关系？",
      "类比相似点与结论真的相关吗？",
      "还有哪些解释能预测同一现象？",
    ],
    before: "很多成功人士早起，所以早起会让人成功。",
    after: "早起可能与某些工作习惯相关，但现有信息不足以证明它单独导致成功。",
  },
  {
    id: "rebuild",
    number: "07",
    name: "重建论证",
    short: "反驳与修正",
    question: "怎样把坏论证改成可检验的好论证？",
    summary:
      "写清论题、证明责任、证据、推理桥梁、反例与边界。反驳不是把对方打倒，而是指出哪一步需要修复。",
    checks: [
      "论题能否写成一句清楚的话？",
      "谁提出更强主张，谁承担更多证明责任？",
      "最强反例和替代解释是什么？",
      "什么新证据会让自己修改结论？",
    ],
    before: "这个方案肯定不行，上次就失败了。",
    after: "上次失败暴露了资源配置问题；若本次资源条件没有改善，应降低成功预期并设置退出条件。",
  },
];

const phases = [
  { id: "foundation", number: "I", name: "基础" },
  { id: "connection", number: "II", name: "连接" },
  { id: "calibration", number: "III", name: "校准" },
  { id: "expression", number: "IV", name: "表达" },
];

const topics: Topic[] = [
  {
    id: "fact-idea",
    phase: "foundation",
    name: "事实与观念",
    description:
      "事实独立于我们的想法；观念是头脑对事实的反映，可能准确，也可能混入记忆、期待与情绪。",
    questions: ["我直接观察到了什么？", "哪一部分只是解释？", "原始材料在哪里？"],
    gate: "正句",
  },
  {
    id: "concept",
    phase: "foundation",
    name: "概念的内涵与外延",
    description:
      "内涵说明概念包含哪些本质属性，外延说明它适用于哪些对象。二者共同决定词的边界。",
    questions: ["包含哪些属性？", "覆盖哪些对象？", "有没有边界反例？"],
    gate: "定词",
  },
  {
    id: "definition",
    phase: "foundation",
    name: "定义与划分",
    description:
      "好的工作定义通常先指出所属大类，再给出区别于同类事物的关键特征；划分则必须标准统一、层级清楚。",
    questions: ["定义过宽或过窄吗？", "是否循环定义？", "分类标准统一吗？"],
    gate: "定词",
  },
  {
    id: "proposition",
    phase: "foundation",
    name: "判断与命题",
    description:
      "命题是可以进入真假判断的表达。量词、否定、连接词、语境和预设都会改变它实际断定的内容。",
    questions: ["对象是谁？", "范围多大？", "否定管到哪里？"],
    gate: "正句",
  },
  {
    id: "premise-conclusion",
    phase: "connection",
    name: "前提与结论",
    description:
      "论证由一个或多个前提支持结论。先恢复骨架，才能区分“给出理由”和“只是表态”。",
    questions: ["结论是什么？", "显性前提有哪些？", "隐藏前提是什么？"],
    gate: "搭桥",
  },
  {
    id: "syllogism",
    phase: "connection",
    name: "三段论与中项",
    description:
      "三段论依靠中项连接大项与小项。中项若没有真正周延或词义发生变化，两端就没有被接起来。",
    questions: ["共有几个概念？", "中项连接两端了吗？", "结论扩大范围了吗？"],
    gate: "搭桥",
  },
  {
    id: "compound",
    phase: "connection",
    name: "复合命题",
    description:
      "“并且”要求各项同时为真；“或者”要区分可兼容与互相排斥；否定范围不同，结论也会完全不同。",
    questions: ["支命题是什么？", "或者能否同时成立？", "否定对象是什么？"],
    gate: "搭桥",
  },
  {
    id: "conditional",
    phase: "connection",
    name: "充分、必要与充要",
    description:
      "“只要 A 就 B”说的是 A 足够；“只有 A 才 B”说的是 A 不可缺；“当且仅当”才是双向条件。",
    questions: ["箭头方向是什么？", "是在肯定前件吗？", "有没有肯定后件？"],
    gate: "搭桥",
  },
  {
    id: "laws",
    phase: "calibration",
    name: "三条逻辑规律",
    description:
      "同一律要求对象和词义稳定；矛盾律排除同一条件下的同时肯定与否定；排中律针对真正的 P 与非 P。",
    questions: ["条件是否相同？", "是真矛盾还是不同方面？", "真的是二选一吗？"],
    gate: "查一致",
  },
  {
    id: "induction",
    phase: "calibration",
    name: "归纳与样本",
    description:
      "从有限样本推广到更大范围时，结论通常只是或然的。样本数量、代表性和反例决定支持强度。",
    questions: ["样本怎样产生？", "覆盖不同情形吗？", "反例会改变什么？"],
    gate: "校准概率",
  },
  {
    id: "causality",
    phase: "calibration",
    name: "因果与竞争解释",
    description:
      "先后与相关只是因果线索。还要检查共同原因、反向因果、选择偏差、作用机制和替代解释。",
    questions: ["原因在结果之前吗？", "有共同原因吗？", "机制和反事实是什么？"],
    gate: "校准概率",
  },
  {
    id: "analogy",
    phase: "calibration",
    name: "类比与假说",
    description:
      "类比是否可靠，取决于相似点是否与结论相关；假说则必须推出可检查的预测，并与竞争解释比较。",
    questions: ["关键相似是什么？", "关键差异是什么？", "什么观察能区分假说？"],
    gate: "校准概率",
  },
  {
    id: "argument",
    phase: "expression",
    name: "论题、论据与方式",
    description:
      "一个完整论证要有清楚且不变的论题、真实且独立成立的论据，以及把证据连接到结论的有效方式。",
    questions: ["论题变了吗？", "论据能独立成立吗？", "支持关系写出来了吗？"],
    gate: "重建论证",
  },
  {
    id: "burden",
    phase: "expression",
    name: "证明责任",
    description:
      "提出越强、越反常或影响越大的主张，需要承担越充分的证明责任。不能要求别人先证明自己错。",
    questions: ["谁提出主张？", "主张有多强？", "目前证据达到什么门槛？"],
    gate: "重建论证",
  },
  {
    id: "refutation",
    phase: "expression",
    name: "证明与反驳",
    description:
      "有效反驳可以针对论题、论据或论证方式。最好的回应指出断点，并说明怎样补证或降级结论。",
    questions: ["是在反驳主张还是攻击人？", "断点在哪里？", "怎样才可能修复？"],
    gate: "重建论证",
  },
  {
    id: "threshold",
    phase: "expression",
    name: "结论与行动阈值",
    description:
      "“我该相信什么”与“我现在该做什么”不是同一问题。高风险决策可能在证据尚不完美时仍需要行动。",
    questions: ["结论应是必然还是可能？", "错误代价如何？", "什么条件触发行动？"],
    gate: "重建论证",
  },
];

const topicExamples: Record<string, LearningExample> = {
  "fact-idea": {
    quote: "“消息显示已读，他两小时没回，所以他根本不尊重我。”",
    breakdown:
      "“已读且两小时未回复”是可核查事实；“不尊重我”是对动机的解释。事实没有自动锁定这一种解释。",
    better:
      "消息已读但暂未回复，原因未知。我可以先确认对方是否方便沟通，再判断关系问题。",
    source: "《简单的逻辑学》最佳实践 · “已读不回”完整示范",
  },
  concept: {
    quote: "“土豆”和“马铃薯”是两个词；“讲故事、讲价钱、讲卫生”都有“讲”。",
    breakdown:
      "不同语词可能表达同一概念，同一语词也可能表达不同概念。判断词义必须回到语境。",
    better:
      "讨论前先问“这里的‘讲’具体是什么意思”，不能只因字面相同就认为概念相同。",
    source: "《写给中学生的逻辑学》第1章 · 语词与概念",
  },
  definition: {
    quote: "“中学生是在学校读书的人。”",
    breakdown:
      "这个定义过宽：小学生和大学生也都在学校读书，定义覆盖了不属于“中学生”的对象。",
    better: "中学生是在中学阶段接受教育的学生。",
    source: "《写给中学生的逻辑学》第1章 · 定义必须相称",
  },
  proposition: {
    quote: "“所有鸟都会飞。”",
    breakdown:
      "量词“所有”让结论覆盖每一只鸟，但企鹅、鸵鸟等反例足以推翻全称判断。",
    better: "多数常见鸟类具有飞行能力，但也存在不会飞的鸟。",
    source: "《写给中学生的逻辑学》第2章 · 量项要准确",
  },
  "premise-conclusion": {
    quote:
      "“学校应该增加午休时间，因为充足休息有助于恢复注意力，现有时间不足以完成用餐和休息。”",
    breakdown:
      "结论是“增加午休时间”；前提是休息影响注意力，以及现有时长不足。理由与结论之间的方向清楚。",
    better:
      "再补充学生用餐与休息时长的数据，并说明增加多少分钟、影响哪些课程，论证会更完整。",
    source: "《写给中学生的逻辑学》第7章 · 什么是论证",
  },
  syllogism: {
    quote: "“所有哺乳动物都是恒温动物；鲸是哺乳动物；所以鲸是恒温动物。”",
    breakdown:
      "“哺乳动物”作为中项，把“鲸”和“恒温动物”可靠连接起来；结论没有超出前提范围。",
    better: "这是结构有效的三段论；下一步只需确认两个前提的真实性。",
    source: "《写给中学生的逻辑学》第3章 · 三段论",
  },
  compound: {
    quote: "“你要么完全支持这个方案，要么就是反对改革。”",
    breakdown:
      "“要么……要么……”把选项写成互相排斥且只有两个，但现实还可能有条件支持、修改后支持或暂缓判断。",
    better: "你可以支持改革目标，同时对这份方案的成本或步骤提出保留意见。",
    source: "《写给中学生的逻辑学》第4章 · 选言命题与假两难",
  },
  conditional: {
    quote: "“如果服务器断电，网站会离线；网站离线了；所以一定断电。”",
    breakdown:
      "这是肯定后件。断电足以导致离线，但网络、程序和配置错误也可能导致同一结果。",
    better: "网站离线说明需要排查，断电只是候选原因之一。",
    source: "《简单的逻辑学》第5章 · 肯定后件",
  },
  laws: {
    quote: "“小王去年不是学生，今年是学生，所以这两句话自相矛盾。”",
    breakdown:
      "矛盾律要求同一对象、同一时间、同一方面。两句话的时间条件不同，并不构成逻辑矛盾。",
    better: "小王的身份在不同时间发生了变化，两句话可以同时为真。",
    source: "《写给中学生的逻辑学》第5章 · 矛盾律的适用条件",
  },
  induction: {
    quote: "“尝了一勺汤不咸，所以整锅汤都不咸。”",
    breakdown:
      "这是不完全归纳。可靠程度取决于汤是否搅匀、取样位置是否有代表性以及味觉是否正常。",
    better: "这勺汤不咸；若汤已充分搅匀，它能为整锅汤不咸提供一定支持。",
    source: "《写给中学生的逻辑学》第6章 · 不完全归纳",
  },
  causality: {
    quote: "“使用学习软件的学生平均成绩更高，所以软件一定提高成绩。”",
    breakdown:
      "成绩与软件使用相关，但也可能是更自律的学生更愿意使用软件，或家庭资源同时影响二者。",
    better:
      "使用软件与更高成绩相关；是否存在因果作用，还需控制学习投入等因素并比较干预结果。",
    source: "《写给中学生的逻辑学》第6章 · 相关不等于因果",
  },
  analogy: {
    quote: "“公司像家庭，所以员工应像家庭成员一样无条件服从。”",
    breakdown:
      "类比抓住了合作与归属感，却忽略劳动关系、合同权利和退出机制这些与结论相关的关键差异。",
    better: "公司可以倡导互助，但管理要求仍需接受合同、职责与权利边界的约束。",
    source: "《写给中学生的逻辑学》第6章 · 机械类比",
  },
  argument: {
    quote: "“这条规定合理，因为它是一条合乎理性的规定。”",
    breakdown:
      "论据只是把结论换了一种说法，没有提供能独立成立的事实、规则或效果证据。",
    better: "说明规定解决什么问题、依据哪些事实、代价是什么，再判断它是否合理。",
    source: "《简单的逻辑学》第5章 · 循环论证",
  },
  burden: {
    quote: "“你证明不了这个传言是假的，所以它就是真的。”",
    breakdown:
      "缺乏反证不是正证。提出传言的人仍需承担与主张强度相匹配的举证责任。",
    better: "目前证据不足，应暂缓判断；若要接受传言，需要提供可核查的积极证据。",
    source: "《简单的逻辑学》第5章 · 诉诸无知",
  },
  refutation: {
    quote:
      "对方说“应限制儿童使用某类应用的时长”，回应却是“你想让孩子完全接触不到科技”。",
    breakdown:
      "回应攻击了一个更极端、更容易反驳的替身，没有触及“限制某类应用时长”这一真实主张。",
    better: "先准确复述限制对象、时长和理由，再针对效果、执行成本或副作用提出反驳。",
    source: "《简单的逻辑学》第5章 · 稻草人",
  },
  threshold: {
    quote: "“这个计划可能失败，所以现在不应该开始。”",
    breakdown:
      "“是否相信最终会成功”和“是否值得做一次低成本试验”使用了不同门槛。可能失败不自动推出不行动。",
    better: "在失败损失可控时先做小规模试验，并预先设定停止与重新评估条件。",
    source: "《简单的逻辑学》最佳实践 · 相信阈值与行动阈值",
  },
};

const fallacyCategories = [
  { id: "premise", name: "前提失真" },
  { id: "relevance", name: "理由无关" },
  { id: "structure", name: "结构无效" },
  { id: "scope", name: "范围越界" },
];

const fallacies: Fallacy[] = [
  {
    id: "deny-antecedent",
    category: "structure",
    name: "否定前件",
    signal: "如果 A 则 B；非 A；所以非 B。",
    why: "A 可能只是 B 的一个充分条件，而不是 B 的唯一来源。",
    repair: "列出其他足以产生 B 的条件，或补证 A 同时也是必要条件。",
    example: "“如果下雨，路面会湿；今天没下雨；所以路面不湿。”",
    breakdown: "洒水车和清洁作业也能让路面湿。“下雨”并不是路面湿的必要条件。",
    better: "今天没下雨，只能排除一种原因；还要实际观察路面并检查其他来源。",
    source: "《简单的逻辑学》第5章 · 01 否定前件",
  },
  {
    id: "affirm-consequent",
    category: "structure",
    name: "肯定后件",
    signal: "如果 A 则 B；B；所以 A。",
    why: "同一个结果可能由不同原因产生，结果成立不能锁定其中一个原因。",
    repair: "列出竞争性原因，并寻找能区分它们的新证据。",
    example: "“如果服务器断电，网站会离线；网站离线了；所以一定断电。”",
    breakdown: "网络、程序和配置错误都可能使网站离线，断电只是候选原因之一。",
    better: "网站离线说明需要排查；应分别检查供电、网络、程序与配置。",
    source: "《简单的逻辑学》第5章 · 02 肯定后件",
  },
  {
    id: "bad-middle",
    category: "structure",
    name: "中项没有接上",
    signal: "两个前提看似共享一个词，实际范围或含义不同。",
    why: "中项没有在同一意义上连接大项和小项，三段论的桥梁只是表面存在。",
    repair: "把三个概念逐一标出，检查中项在至少一个前提中是否真正覆盖所需范围。",
    example: "“有些骗子穿西装；小王穿西装；所以小王是骗子。”",
    breakdown: "“穿西装的人”没有覆盖整个类别，只是骗子与小王共享的一个表面属性。",
    better: "穿西装不能支持小王是骗子；需要检查与欺骗行为直接相关的事实。",
    source: "《简单的逻辑学》第5章 · 03 中项不周延",
  },
  {
    id: "equivocation",
    category: "premise",
    name: "偷换概念",
    signal: "同一个词在论证前后使用了不同含义。",
    why: "前提支持的是含义 A，结论却使用含义 B，支持关系在词义变化处断裂。",
    repair: "给关键词加上操作性定义，并在每次出现时检查指向是否相同。",
    example:
      "先把“自由”定义为不受非法强迫，随后却说“任何规则都是对自由的侵犯”。",
    breakdown: "前半段的自由排除非法强迫，后半段却变成不受任何规则约束。",
    better: "分别讨论规则是否合法、是否必要，以及它对具体自由造成何种限制。",
    source: "《简单的逻辑学》第5章 · 04 偷换概念",
  },
  {
    id: "begging",
    category: "premise",
    name: "循环论证",
    signal: "理由换一种说法重复结论，没有独立证据。",
    why: "结论不能成为自己的证明，否则听起来完整，实际上没有增加任何支持。",
    repair: "追问：如果暂时不接受结论，还有什么独立事实会让人相信它？",
    example: "“这条规定是合理的，因为它是一条合乎理性的规定。”",
    breakdown: "“合乎理性”只是“合理”的近义改写，没有提供新的事实或规则。",
    better: "说明规定解决什么问题、效果如何、代价是什么，再判断是否合理。",
    source: "《简单的逻辑学》第5章 · 05 窃取论题",
  },
  {
    id: "false-assumption",
    category: "premise",
    name: "虚假假设",
    signal: "问题或前提中偷塞了一个尚未证明的事实。",
    why: "回答被迫从一个未经允许的起点出发，后面的推理都会受到污染。",
    repair: "把隐含假设单独列出，先核查它是否成立。",
    example: "“你什么时候停止篡改数据？”",
    breakdown: "问题预设对方曾经篡改数据；直接回答任何时间都会接受这一预设。",
    better: "先问“是否存在篡改数据的证据”，确认后再讨论发生时间。",
    source: "《简单的逻辑学》第5章 · 06 虚假假设",
  },
  {
    id: "strawman",
    category: "relevance",
    name: "稻草人",
    signal: "把对方主张改成更极端、更容易攻击的版本。",
    why: "被反驳的不是原来的论题，讨论看似推进，实际已经换题。",
    repair: "先用对方愿意承认的最强版本复述，再针对真实主张回应。",
    example:
      "对方说“应限制儿童使用某类应用的时长”，回应却是“你想让孩子完全接触不到科技”。",
    breakdown: "“限制某类应用的时长”被夸成“完全拒绝科技”，原主张没有被回应。",
    better: "讨论限制对象、具体时长、预期效果和可能副作用。",
    source: "《简单的逻辑学》第5章 · 07 稻草人",
  },
  {
    id: "tradition",
    category: "relevance",
    name: "误用传统",
    signal: "把“过去一直如此”直接写成“现在仍应如此”。",
    why: "传统能说明做法的历史，却不能自动证明它在当前条件下仍有效或正当。",
    repair: "评价当下的效果、代价和价值，同时避免反向的“唯新是好”。",
    example: "“这个流程用了二十年，从来都这样，所以没必要改变。”",
    breakdown: "使用时间只说明它稳定存在，没有回答环境、目标和成本是否已经变化。",
    better: "保留流程中仍有效的部分，并用当前数据评估哪些环节需要更新。",
    source: "《简单的逻辑学》第5章 · 08 误用传统",
  },
  {
    id: "two-wrongs",
    category: "relevance",
    name: "以暴易暴",
    signal: "用他人的错误为自己的同类错误辩护。",
    why: "一个错误不会把另一个错误变正确，只会让需要处理的问题增加。",
    repair: "分别评价双方行为，不让报复成为理由。",
    example: "“他们先造谣，所以我们也可以造谣。”",
    breakdown: "对方先犯错只能说明需要追责，不能证明自己的造谣行为合理。",
    better: "反驳对方的虚假信息并保留证据，不复制同样的错误。",
    source: "《简单的逻辑学》第5章 · 09 以暴易暴",
  },
  {
    id: "majority",
    category: "relevance",
    name: "诉诸多数",
    signal: "把“很多人相信”直接写成“所以是真的”。",
    why: "流行程度描述的是信念分布，不自动决定命题是否符合现实。",
    repair: "把人数信息与事实证据分开，继续寻找独立支持。",
    example: "“这条养生说法全网都在转，所以肯定有效。”",
    breakdown: "转发量只能证明它流行，不能证明相关机制和效果真实存在。",
    better: "先找原始研究、样本和适用条件，再判断它是否有效。",
    source: "《简单的逻辑学》第5章 · 10 民主谬误",
  },
  {
    id: "ad-hominem",
    category: "relevance",
    name: "人身攻击",
    signal: "从观点转向说话者的性格、身份或动机。",
    why: "一个人可能有偏见，但这本身不能证明他的具体命题为假。",
    repair: "把身份信息移除，直接检查论证；利益冲突只能调整证据权重。",
    example: "“别听他分析预算，他以前工作就不认真。”",
    breakdown: "过去的工作评价没有直接回应这次预算分析中的数字和推理。",
    better: "指出预算数据、假设或计算中的具体错误；若质疑可信度，也要补充独立核查。",
    source: "《简单的逻辑学》第5章 · 11 对人不对事",
  },
  {
    id: "force",
    category: "relevance",
    name: "诉诸强力",
    signal: "用职位、威胁或惩罚替代证明。",
    why: "强制能改变人的行为，却不能使命题获得真实性。",
    repair: "去掉威胁，检查还剩下哪些理由。",
    example: "“这个方案当然正确，不同意的人年终考核会受影响。”",
    breakdown: "考核后果解释了人们为何服从，没有证明方案本身正确。",
    better: "公开方案目标、证据、成本和风险，让观点由理由而不是权力支持。",
    source: "《简单的逻辑学》第5章 · 12 压制理性",
  },
  {
    id: "authority",
    category: "relevance",
    name: "滥用专家意见",
    signal: "只因专家或名人支持，就把结论说成确定。",
    why: "权威意见受专业范围、证据质量、领域共识和利益冲突限制。",
    repair: "核查专家是否相关、是否准确转述，以及他依据了什么证据。",
    example: "“这位知名演员推荐了这种疗法，所以它肯定安全有效。”",
    breakdown: "知名度不等于医学专长，推荐也没有展示临床证据和风险。",
    better: "查看相关专业机构、研究证据、适应症与副作用。",
    source: "《简单的逻辑学》第5章 · 13 滥用专家意见",
  },
  {
    id: "quantification",
    category: "scope",
    name: "质的量化",
    signal: "把一个精确指标当成完整真实。",
    why: "指标只操作化测量了部分性质，不能穷尽体验、情境和质量。",
    repair: "说明指标测到了什么、遗漏了什么，以及误差和构成维度。",
    example: "“满意度是 8.2 分，所以用户体验已经完全没有问题。”",
    breakdown: "8.2 分压缩了不同任务、用户和痛点，也没有说明低分集中在哪里。",
    better: "总体满意度较高，但仍需结合分项、访谈和失败任务寻找具体问题。",
    source: "《简单的逻辑学》第5章 · 14 质的量化",
  },
  {
    id: "origin",
    category: "premise",
    name: "起源谬误",
    signal: "只因观点来自某个好或坏的来源，就判定它本身好坏。",
    why: "来源能影响先验可信度，却不能替代对具体对象和证据的检查。",
    repair: "先记录来源，再继续检查主张本身。",
    example: "“这个方法出自名校，所以一定适合我们的团队。”",
    breakdown: "名校来源不证明方法在当前规模、资源和目标下同样有效。",
    better: "把来源当作线索，再用小规模试验验证本地适用性。",
    source: "《简单的逻辑学》第5章 · 15 以出身论英雄",
  },
  {
    id: "stop-analysis",
    category: "scope",
    name: "止于分析",
    signal: "只把整体拆成部分，却不解释各部分怎样连接。",
    why: "能列出组成部分不等于理解关系、反馈、顺序和整体功能。",
    repair: "分析之后必须综合，画出关系和作用路径。",
    example: "“项目失败涉及人员、预算、需求和时间，分析到这里就结束。”",
    breakdown: "罗列了四个部分，却没有说明哪个先发生、怎样相互放大。",
    better: "补出因果链：需求频繁变化如何增加返工、消耗预算并挤压时间。",
    source: "《简单的逻辑学》第5章 · 16 止于分析",
  },
  {
    id: "reductionism",
    category: "scope",
    name: "简化主义",
    signal: "用一个局部因素解释整个复杂对象。",
    why: "单一因素也许相关，却无法解释剩余现象和系统关系。",
    repair: "说明它能解释多少，并列出其他层次。",
    example: "“组织的问题全是某个员工造成的。”",
    breakdown: "个人行为可能是因素，但流程、激励、资源和管理反馈也可能共同作用。",
    better: "区分个人责任与系统条件，分别寻找证据和改善措施。",
    source: "《简单的逻辑学》第5章 · 17 简化主义",
  },
  {
    id: "category-error",
    category: "premise",
    name: "分类错误",
    signal: "把对象放入错误类别，再套用不合适的规则。",
    why: "类别一旦判错，后续推理即使整齐，也会在错误规则上运行。",
    repair: "回到定义，检查对象是否满足该类别的必要条件。",
    example: "“两项数据相关，所以它们已经属于被证明的因果关系。”",
    breakdown: "统计相关被误放进因果证明类别，遗漏机制、时序和替代解释。",
    better: "先归类为相关线索，再设计能区分因果解释的检查。",
    source: "《简单的逻辑学》第5章 · 18 分类错误",
  },
  {
    id: "red-herring",
    category: "relevance",
    name: "红鲱鱼",
    signal: "抛出情绪冲击强、但与当前结论无关的信息。",
    why: "新议题可能重要，却没有回答原问题，注意力被转移。",
    repair: "承认新议题可另行讨论，然后返回当前论题。",
    example: "讨论产品是否安全，却突然转向“员工多年没加薪”。",
    breakdown: "薪资问题值得讨论，但它没有改变产品安全所需的检测证据。",
    better: "先完成安全问题的证据审查，再为薪资问题单独立项。",
    source: "《简单的逻辑学》第5章 · 19 混淆视听",
  },
  {
    id: "ridicule",
    category: "relevance",
    name: "诉诸嘲笑",
    signal: "让听众发笑或轻蔑，以此代替反驳。",
    why: "一个观点听起来可笑，也仍需指出前提或结构的具体问题。",
    repair: "去掉笑话和讽刺，写出剩余的反驳。",
    example: "“远程办公？那不就是让大家穿睡衣在家混日子吗？”",
    breakdown: "嘲讽制造了轻蔑感，没有评价产出、协作和管理数据。",
    better: "比较不同岗位的产出、沟通成本和可监督性，再确定适用范围。",
    source: "《简单的逻辑学》第5章 · 20 以笑饰非",
  },
  {
    id: "pity",
    category: "relevance",
    name: "诉诸怜悯",
    signal: "用悲惨处境替代当前标准所需的证据。",
    why: "同情可能影响救助或资源分配，却不能自动证明答案或事实正确。",
    repair: "区分事实评价与援助决定，分别使用合适标准。",
    example: "“他最近经历很困难，所以这次考试应该判为及格。”",
    breakdown: "处境值得帮助，却不能证明答案达到了及格标准。",
    better: "按统一标准评分，同时另行提供补考、延期或支持资源。",
    source: "《简单的逻辑学》第5章 · 21 以泪掩过",
  },
  {
    id: "ignorance",
    category: "premise",
    name: "诉诸无知",
    signal: "把缺乏反证当成正证，或把缺乏正证当成反证。",
    why: "没有证明 X 为假，不等于证明 X 为真；举证责任没有消失。",
    repair: "证据不足时输出“尚未确定”，并写明需要什么证据。",
    example: "“没人能证明这个传言是假的，所以它一定是真的。”",
    breakdown: "当前没有反证，只能说明调查尚不充分，不能为传言增加积极支持。",
    better: "在出现可核查的正面证据前暂缓相信和传播。",
    source: "《简单的逻辑学》第5章 · 22 无力反驳不算证明",
  },
  {
    id: "false-dilemma",
    category: "scope",
    name: "虚假两难",
    signal: "只给两个选项，却没有证明其他可能不存在。",
    why: "选择空间被人为缩小，结论来自遗漏选项，而不是完整比较。",
    repair: "寻找中间状态、组合方案、延期选择或第三条路径。",
    example: "“你要么完全支持这个方案，要么就是改革的敌人。”",
    breakdown: "还存在条件支持、修改后支持、支持目标但反对手段等选项。",
    better: "把对目标、手段、成本和时点的立场分别说明。",
    source: "《简单的逻辑学》第5章 · 23 两难陷阱",
  },
  {
    id: "false-cause",
    category: "scope",
    name: "以先后论因果",
    signal: "A 先发生、B 后发生，就宣布 A 导致 B。",
    why: "共同原因、反向因果和巧合都可能产生同样的时间顺序。",
    repair: "补充机制、共同变化、对照和竞争解释。",
    example: "“更换学习软件后成绩提高，所以一定是软件带来了提高。”",
    breakdown: "同期的复习时间、教师变化和学生选择都可能解释成绩变化。",
    better: "软件使用后成绩提高，但是否有因果作用需要对照更多条件。",
    source: "《简单的逻辑学》第5章 · 24 以先后论因果",
  },
  {
    id: "sentimental",
    category: "scope",
    name: "选择性证据",
    signal: "因热爱或厌恶，只保留有利材料。",
    why: "每句话也许都是真的，整体图景仍可能因系统性遗漏而失真。",
    repair: "预先规定纳入标准，主动寻找反例和失败案例。",
    example: "“我喜欢这个品牌，所以只收集它的成功测评来证明质量最好。”",
    breakdown: "喜爱改变了证据选择，负面样本和比较基准被排除。",
    better: "使用同一标准同时收集成功、失败和竞品资料。",
    source: "《简单的逻辑学》第5章 · 25 情感误导",
  },
  {
    id: "pragmatic",
    category: "scope",
    name: "功利误导",
    signal: "只问手段能否成功，不评估手段本身与外部代价。",
    why: "有效不自动等于正当，短期结果也可能制造长期损失。",
    repair: "同时评价目标、手段、受影响者、可逆性和替代方案。",
    example: "“只要能完成销售目标，隐瞒产品风险也没关系。”",
    breakdown: "目标达成被当成唯一标准，客户损害、信任和法律风险被删除。",
    better: "在不隐瞒关键信息的前提下寻找可持续的销售方案。",
    source: "《简单的逻辑学》第5章 · 26 功利误导",
  },
  {
    id: "avoid-conclusion",
    category: "scope",
    name: "避免结论",
    signal: "把所有可调查的问题都宣布为永远无解。",
    why: "谨慎要求根据证据校准结论，不是取消形成判断的可能。",
    repair: "区分可下结论、需补信息和暂不可判，并写出解除条件。",
    example: "“我们不可能百分之百确定，所以这个问题永远不能判断。”",
    breakdown: "把“不能绝对确定”偷换成“不能形成任何程度的判断”。",
    better: "根据现有证据给出暂定结论，并明确哪些新信息会使它改变。",
    source: "《简单的逻辑学》第5章 · 27 避免结论",
  },
  {
    id: "oversimplification",
    category: "scope",
    name: "过度简化",
    signal: "为获得鲜明答案，删除会改变结论的重要条件。",
    why: "简单表达本身无错；问题在于关键结构、尺度和例外被抹掉。",
    repair: "保留决定结论的条件，并明确适用边界。",
    example: "“这个项目失败，全是因为某个员工不努力。”",
    breakdown: "一句话删除了需求变化、资源不足、流程和管理等可能因素。",
    better: "个人执行是候选原因之一，还需检查系统条件和各因素的贡献。",
    source: "《简单的逻辑学》第5章 · 28 简化推理",
  },
  {
    id: "hasty",
    category: "scope",
    name: "轻率概括",
    signal: "由很少、偏斜或方便取得的样本推广到整体。",
    why: "样本没有覆盖总体的重要差异，结论范围超过证据覆盖范围。",
    repair: "扩大并分层取样，主动寻找反例，降低量词强度。",
    example: "“我遇到的几位这所学校的学生都很有礼貌，所以全校学生都很有礼貌。”",
    breakdown: "少数偶遇样本可能不具代表性，也没有覆盖不同年级和情境。",
    better: "我遇到的这几位学生都很有礼貌，但不能据此评价整个学校。",
    source: "《写给中学生的逻辑学》第6章 · 轻率概括",
  },
  {
    id: "weak-analogy",
    category: "scope",
    name: "机械类比",
    signal: "因为表面相似，就推断关键方面也相同。",
    why: "只有与结论相关的结构性相似才能提供支持，关键差异可能直接破坏类比。",
    repair: "列出关键相似与关键差异，并说明它们与结论的关系。",
    example: "“公司像家庭，所以员工应像家庭成员一样无条件服从。”",
    breakdown: "类比忽略劳动合同、权利边界和退出机制等关键差异。",
    better: "公司可以倡导互助，但管理要求仍要接受职责、合同与权利边界的约束。",
    source: "《写给中学生的逻辑学》第6章 · 机械类比",
  },
];

const scenarios: Scenario[] = [
  {
    id: "message",
    name: "人际",
    title: "已读不回",
    claim: "“他看见消息却没有回复，说明他根本不尊重我。”",
    context:
      "材料只确认消息显示已读，两小时内没有回复。双方近期没有发生明确冲突。",
    reference: {
      facts: "可确认事实是消息显示已读，且两小时内未回复。",
      premise:
        "隐藏前提是：尊重我的人一定会在两小时内回复；没有及时回复只有“不尊重”这一种解释。",
      bridge:
        "从行为到动机存在读心跳跃，且遗漏忙碌、准备稍后回复、误触等竞争解释。",
      revision:
        "目前只能确认对方暂未回复，原因未知。可以先询问是否方便沟通，而不是直接给关系定性。",
    },
  },
  {
    id: "work",
    name: "工作",
    title: "一次延期",
    claim: "“上一次延期了，所以这个方案本身不可行。”",
    context:
      "上次试运行发生延期，但同时存在人员临时调走和外部接口变更两个条件。",
    reference: {
      facts: "上一次实施确实延期；同时有人员与接口条件发生变化。",
      premise: "隐藏前提是延期完全由方案本身造成，且本次条件与上次相同。",
      bridge:
        "单个案例不足以排除外部原因，也不能直接推广到所有后续实施。",
      revision:
        "上次延期暴露了方案对资源与接口变更的敏感性；应先验证这些条件是否改善，再决定是否继续。",
    },
  },
  {
    id: "news",
    name: "新闻",
    title: "专家都这样说",
    claim: "“权威专家已经发话，所以这件事肯定没有争议。”",
    context:
      "短视频只截取了一位专家的十秒发言，没有给出完整出处、专业领域和数据。",
    reference: {
      facts: "一段短视频呈现了一位被称为专家的人的部分发言。",
      premise: "隐藏前提是该专家身份可靠、专业相关、转述完整，并代表领域共识。",
      bridge: "权威意见可以提供线索，但不能替代出处、数据和共识范围的核查。",
      revision:
        "这段发言值得追查，但目前不足以断定没有争议；需要找到完整来源和其他独立证据。",
    },
  },
  {
    id: "decision",
    name: "决策",
    title: "可能失败",
    claim: "“这个计划可能失败，所以现在不应该开始。”",
    context:
      "计划有可控的小额试验阶段，失败损失有限，成功则能获得关键反馈。",
    reference: {
      facts: "计划存在失败可能；首轮试验的成本和损失有明确上限。",
      premise: "隐藏前提是只要可能失败就不值得行动，且不行动没有机会成本。",
      bridge: "把相信阈值与行动阈值混在了一起，也没有比较试验的学习价值。",
      revision:
        "无需确信计划最终成功才开始；可以在损失上限内先做小规模试验，并设定停止条件。",
    },
  },
];

const sources = [
  {
    book: "《写给中学生的逻辑学》",
    note: "7 章 · 概念、判断、推理、规律、概率与论证",
    chapters: [
      ["01", "概念要明确", "定词"],
      ["02", "判断要恰当", "正句"],
      ["03", "推理要合乎逻辑（上）", "搭桥"],
      ["04", "推理要合乎逻辑（下）", "搭桥"],
      ["05", "思维要符合逻辑规律", "查一致"],
      ["06", "或然性推理也应合乎逻辑", "校准"],
      ["07", "论证要有说服力", "重建"],
    ],
  },
  {
    book: "《简单的逻辑学》",
    note: "5 章 · 从事实、观念和语言走向正确论证",
    chapters: [
      ["01", "学习逻辑学的思想准备", "事实"],
      ["02", "逻辑学的基本原理", "规律"],
      ["03", "论证：逻辑学的语言", "结构"],
      ["04", "非逻辑思维的根源", "动机"],
      ["05", "非逻辑思维的主要形式", "断点"],
    ],
  },
];

type PracticeAnswer = {
  facts: string;
  premise: string;
  bridge: string;
  revision: string;
};

const emptyAnswer: PracticeAnswer = {
  facts: "",
  premise: "",
  bridge: "",
  revision: "",
};

function updateUrlHash(hash: string) {
  if (typeof window === "undefined") return;
  window.history.replaceState(null, "", hash);
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
}

export function LogicSite() {
  const [activeGate, setActiveGate] = useState(gates[0].id);
  const [activeTopic, setActiveTopic] = useState(topics[0].id);
  const [fallacyCategory, setFallacyCategory] = useState(
    fallacyCategories[0].id,
  );
  const [activeFallacy, setActiveFallacy] = useState(
    fallacies.find((item) => item.category === fallacyCategories[0].id)?.id ??
      fallacies[0].id,
  );
  const [activeScenario, setActiveScenario] = useState(scenarios[0].id);
  const [answer, setAnswer] = useState<PracticeAnswer>(emptyAnswer);
  const [showReference, setShowReference] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const gate = gates.find((item) => item.id === activeGate) ?? gates[0];
  const topic = topics.find((item) => item.id === activeTopic) ?? topics[0];
  const topicExample = topicExamples[topic.id];
  const scenario =
    scenarios.find((item) => item.id === activeScenario) ?? scenarios[0];
  const visibleFallacies = fallacies.filter(
    (item) => item.category === fallacyCategory,
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => searchRef.current?.focus(), 30);
    }
  }, [searchOpen]);

  useEffect(() => {
    const stored = window.localStorage.getItem(
      `logic-practice-${activeScenario}`,
    );
    const frame = window.requestAnimationFrame(() => {
      setAnswer(stored ? JSON.parse(stored) : emptyAnswer);
      setShowReference(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeScenario]);

  useEffect(() => {
    window.localStorage.setItem(
      `logic-practice-${activeScenario}`,
      JSON.stringify(answer),
    );
  }, [answer, activeScenario]);

  const searchItems = useMemo(
    () => [
      ...gates.map((item) => ({
        id: item.id,
        type: "七关",
        title: item.name,
        detail: item.question,
        section: "path",
      })),
      ...topics.map((item) => ({
        id: item.id,
        type: "知识",
        title: item.name,
        detail: item.description,
        section: "knowledge",
      })),
      ...fallacies.map((item) => ({
        id: item.id,
        type: "断点",
        title: item.name,
        detail: item.signal,
        section: "fallacies",
      })),
      ...scenarios.map((item) => ({
        id: item.id,
        type: "练习",
        title: item.title,
        detail: item.claim,
        section: "practice",
      })),
    ],
    [],
  );

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return searchItems.slice(0, 8);
    return searchItems
      .filter((item) =>
        `${item.title}${item.detail}${item.type}`.toLowerCase().includes(query),
      )
      .slice(0, 12);
  }, [searchItems, searchQuery]);

  const completedFields = Object.values(answer).filter(
    (value) => value.trim().length > 0,
  ).length;

  function selectGate(id: string) {
    setActiveGate(id);
    updateUrlHash(`#gate-${id}`);
  }

  function selectSearchResult(item: (typeof searchItems)[number]) {
    if (item.section === "path") setActiveGate(item.id);
    if (item.section === "knowledge") setActiveTopic(item.id);
    if (item.section === "fallacies") {
      const match = fallacies.find((fallacy) => fallacy.id === item.id);
      if (match) setFallacyCategory(match.category);
      setActiveFallacy(item.id);
    }
    if (item.section === "practice") setActiveScenario(item.id);
    setSearchOpen(false);
    setSearchQuery("");
    window.setTimeout(() => scrollToSection(item.section), 30);
    updateUrlHash(`#${item.section}-${item.id}`);
  }

  function updateAnswer(
    key: keyof PracticeAnswer,
    event: ChangeEvent<HTMLTextAreaElement>,
  ) {
    setAnswer((current) => ({ ...current, [key]: event.target.value }));
  }

  return (
    <div className="logic-field-guide site-shell">
      <a className="skip-link" href="#main">
        跳到正文
      </a>

      <header className="masthead">
        <div className="masthead-inner">
          <a
            className="brand"
            href="#top"
            aria-label="逻辑学网站首页"
            onClick={() => setMobileOpen(false)}
          >
            <span className="brand-mark" aria-hidden="true" />
            <span>
              <strong>逻辑学</strong>
              <small>A FIELD GUIDE TO REASONING</small>
            </span>
          </a>

          <nav
            className={`main-nav${mobileOpen ? " is-open" : ""}`}
            aria-label="主要导航"
          >
            {[
              ["path", "七关"],
              ["knowledge", "知识"],
              ["fallacies", "断点"],
              ["practice", "练习"],
              ["sources", "来源"],
            ].map(([id, label]) => (
              <button
                className="nav-link"
                key={id}
                onClick={() => {
                  scrollToSection(id);
                  setMobileOpen(false);
                }}
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            className="search-trigger"
            onClick={() => setSearchOpen(true)}
            aria-label="打开全局搜索，快捷键 Command K 或 Control K"
          >
            SEARCH / ⌘K
          </button>

          <button
            className="mobile-menu-button"
            aria-label={mobileOpen ? "关闭导航菜单" : "打开导航菜单"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
          </button>
        </div>
      </header>

      <main id="main">
        <section className="section-wrap hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">VOL. 01 / 思考的结构</p>
            <h1>
              在结论之前，
              <br />
              先看见理由。
            </h1>
            <p className="hero-intro">
              把事实、解释、前提与结论放回各自的位置。
              <br />
              不是为了赢，而是为了知道自己该相信到什么程度。
            </p>

            <div className="daily-argument">
              <span className="micro-label">TODAY&apos;S ARGUMENT / 001</span>
              <blockquote>
                “很多成功人士都早起，所以早起会让人成功。”
              </blockquote>
              <p>哪一步把“同时出现”写成了“必然导致”？</p>
              <div className="hero-actions">
                <button
                  className="text-action"
                  onClick={() => {
                    selectGate("probability");
                    scrollToSection("path");
                  }}
                >
                  拆开这句话
                </button>
                <button
                  className="text-action subtle"
                  onClick={() => scrollToSection("path")}
                >
                  先看七关
                </button>
              </div>
            </div>
            <span className="hero-margin-note">
              WORDS → CLAIMS → REASONS → CONCLUSION
            </span>
          </div>

          <aside className="argument-field" aria-label="一段论证的结构示例">
            <div className="argument-head">
              <strong>ANATOMY OF AN ARGUMENT</strong>
              <span>01 / 07</span>
            </div>
            <div className="therefore">
              <span className="therefore-symbol" aria-hidden="true">
                ∴
              </span>
              <div className="therefore-copy">
                <small>所以</small>
                <strong>结论</strong>
              </div>
            </div>
            <div className="argument-rows">
              <div className="argument-row">
                <span>P₁ / OBSERVATION</span>
                <strong>一些成功人士早起</strong>
                <i className="argument-status dot" aria-label="事实可确认" />
              </div>
              <div className="argument-row">
                <span>P₂ / MISSING PREMISE</span>
                <strong>早起是成功的充分原因</strong>
                <i className="argument-status cross" aria-label="前提缺失" />
              </div>
              <div className="argument-row">
                <span>C / OVERCLAIM</span>
                <strong>早起会让人成功</strong>
                <i className="argument-status break" aria-label="结论过强" />
              </div>
            </div>
            <p className="break-label">
              断点：相关不等于因果 / CORRELATION ≠ CAUSATION
            </p>
          </aside>
        </section>

        <section className="section section-wrap" id="path">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A METHOD IN SEVEN MOVEMENTS</p>
              <h2>七关，不是七章目录。</h2>
            </div>
            <p>
              每一关都是面对真实观点时可以立即执行的动作。从词义到结论，让问题依次通过七个检查位置。
            </p>
          </div>

          <div className="gate-tabs" role="tablist" aria-label="七关逻辑路径">
            {gates.map((item) => (
              <button
                className="gate-tab"
                key={item.id}
                id={`gate-tab-${item.id}`}
                role="tab"
                aria-selected={item.id === activeGate}
                aria-controls="gate-detail"
                onClick={() => selectGate(item.id)}
              >
                <small>{item.number}</small>
                <strong>{item.name}</strong>
                <span>{item.short}</span>
              </button>
            ))}
          </div>

          <div
            className="gate-detail"
            id="gate-detail"
            role="tabpanel"
            aria-labelledby={`gate-tab-${gate.id}`}
          >
            <div>
              <span className="gate-number">{gate.number}</span>
              <p className="gate-question">{gate.question}</p>
            </div>
            <div>
              <p className="gate-summary">{gate.summary}</p>
              <ul className="check-list">
                {gate.checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="example-label">BEFORE / AFTER</p>
              <div className="example-before">
                <span>原始说法</span>
                <p>{gate.before}</p>
              </div>
              <div className="example-after">
                <span>校准之后</span>
                <p>{gate.after}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-wrap" id="knowledge">
          <div className="section-heading">
            <div>
              <p className="eyebrow">KNOWLEDGE AS A STRUCTURE</p>
              <h2>两本书，一张知识地图。</h2>
            </div>
            <p>
              不按书名分成两座孤岛。概念、判断、推理、概率与论证被放进同一条从基础到表达的路径中；点开任一知识点，都能用原笔记例子继续拆解。
            </p>
          </div>

          <div className="knowledge-layout">
            {phases.map((phase) => (
              <div className="knowledge-phase" key={phase.id}>
                <div className="phase-head">
                  <small>PHASE {phase.number}</small>
                  <h3>{phase.name}</h3>
                </div>
                {topics
                  .filter((item) => item.phase === phase.id)
                  .map((item) => (
                    <button
                      className="topic-button"
                      key={item.id}
                      aria-pressed={item.id === activeTopic}
                      onClick={() => {
                        setActiveTopic(item.id);
                        updateUrlHash(`#knowledge-${item.id}`);
                      }}
                    >
                      <strong>{item.name}</strong>
                      <span>↗</span>
                    </button>
                  ))}
              </div>
            ))}
          </div>

          <div className="topic-detail" aria-live="polite">
            <div>
              <span className="micro-label">SELECTED TOPIC</span>
              <h3>{topic.name}</h3>
            </div>
            <div>
              <p>{topic.description}</p>
            </div>
            <div>
              <span className="micro-label">检查问题 / 关联 {topic.gate}</span>
              <ul>
                {topic.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>
            <div className="topic-example">
              <div>
                <span className="micro-label">EXAMPLE FROM THE NOTES</span>
                <small>{topicExample.source}</small>
              </div>
              <div>
                <span>笔记例子</span>
                <blockquote>{topicExample.quote}</blockquote>
              </div>
              <div>
                <span>怎么拆</span>
                <p>{topicExample.breakdown}</p>
              </div>
              <div>
                <span>更稳妥地说</span>
                <p>{topicExample.better}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-wrap" id="fallacies">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHERE SUPPORT BREAKS</p>
              <h2>先看断点，再记名称。</h2>
            </div>
            <p>
              谬误不是贴在人身上的标签。它只是说明：从理由到结论的支持关系，在某个具体位置失效了。展开任一项，先读笔记例子，再看断点与修正版。
            </p>
          </div>

          <div className="fallacy-filters" aria-label="按断点位置筛选">
            {fallacyCategories.map((category) => (
              <button
                className="filter-button"
                key={category.id}
                aria-pressed={category.id === fallacyCategory}
                onClick={() => {
                  setFallacyCategory(category.id);
                  const first = fallacies.find(
                    (item) => item.category === category.id,
                  );
                  if (first) setActiveFallacy(first.id);
                }}
              >
                {category.name} ·{" "}
                {
                  fallacies.filter(
                    (item) => item.category === category.id,
                  ).length
                }
              </button>
            ))}
          </div>

          <div className="fallacy-list">
            {visibleFallacies.map((item, index) => {
              const open = activeFallacy === item.id;
              return (
                <article className="fallacy-item" key={item.id}>
                  <button
                    className="fallacy-toggle"
                    aria-expanded={open}
                    onClick={() => {
                      setActiveFallacy(open ? "" : item.id);
                      updateUrlHash(`#fallacies-${item.id}`);
                    }}
                  >
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <strong>{item.name}</strong>
                    <span>{item.signal}</span>
                    <b aria-hidden="true">{open ? "−" : "+"}</b>
                  </button>
                  {open && (
                    <div className="fallacy-detail">
                      <div className="fallacy-example">
                        <small>EXAMPLE FROM THE NOTES / 笔记例子</small>
                        <blockquote>{item.example}</blockquote>
                        <span>{item.source}</span>
                      </div>
                      <div>
                        <small>THE BREAK / 断在哪里</small>
                        <p>{item.breakdown}</p>
                      </div>
                      <div>
                        <small>WHY IT FAILS / 为什么不成立</small>
                        <p>{item.why}</p>
                      </div>
                      <div>
                        <small>HOW TO REPAIR / 怎样修</small>
                        <p>{item.repair}</p>
                        <em>{item.better}</em>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="section section-wrap" id="practice">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PRACTICE BEFORE CONFIDENCE</p>
              <h2>把一句判断，亲手拆开。</h2>
            </div>
            <p>
              先写自己的拆解，再看参考答案。练习会保存在当前浏览器中，不需要账号，也不会上传。
            </p>
          </div>

          <div className="practice-grid">
            <div className="scenario-panel">
              <div className="scenario-tabs" role="tablist" aria-label="练习场景">
                {scenarios.map((item) => (
                  <button
                    className="scenario-tab"
                    key={item.id}
                    role="tab"
                    aria-selected={item.id === activeScenario}
                    onClick={() => {
                      setActiveScenario(item.id);
                      updateUrlHash(`#practice-${item.id}`);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="scenario-copy">
                <span className="micro-label">SCENARIO / {scenario.name}</span>
                <h3>{scenario.title}</h3>
                <blockquote className="scenario-quote">
                  {scenario.claim}
                </blockquote>
                <p className="scenario-context">{scenario.context}</p>
              </div>
            </div>

            <div className="work-panel">
              <div className="work-head">
                <h3>我的拆解</h3>
                <span className="progress-label">
                  {completedFields} / 4 已填写
                </span>
              </div>
              {(
                [
                  ["facts", "事实账本", "只写可以直接确认的观察与材料"],
                  ["premise", "隐藏前提", "结论成立还暗中需要哪些假定"],
                  ["bridge", "支持断点", "从前提到结论在哪一步跳跃"],
                  ["revision", "修正版", "把结论降到证据真正支持的程度"],
                ] as const
              ).map(([key, label, placeholder]) => (
                <div className="analysis-field" key={key}>
                  <label htmlFor={`practice-${key}`}>{label}</label>
                  <textarea
                    id={`practice-${key}`}
                    value={answer[key]}
                    onChange={(event) => updateAnswer(key, event)}
                    placeholder={placeholder}
                  />
                </div>
              ))}
              <div className="work-actions">
                <button
                  className="solid-action"
                  onClick={() => setShowReference((show) => !show)}
                >
                  {showReference ? "收起参考拆解" : "查看参考拆解"}
                </button>
                <button
                  className="text-action subtle"
                  onClick={() => setAnswer(emptyAnswer)}
                >
                  清空本题
                </button>
              </div>

              {showReference && (
                <div className="reference-answer" aria-live="polite">
                  <h4>一种更稳妥的拆解</h4>
                  <dl>
                    {(
                      [
                        ["事实", scenario.reference.facts],
                        ["前提", scenario.reference.premise],
                        ["断点", scenario.reference.bridge],
                        ["修正", scenario.reference.revision],
                      ] as const
                    ).map(([label, content]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{content}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section section-wrap" id="sources">
          <div className="section-heading">
            <div>
              <p className="eyebrow">READ BACK TO THE SOURCES</p>
              <h2>知识重组，但出处保留。</h2>
            </div>
            <p>
              网站负责建立联系，原书负责提供完整语境。每个知识点最终都能追溯到两套读书笔记中的章节。
            </p>
          </div>
          <div className="source-grid">
            {sources.map((source, sourceIndex) => (
              <div className="source-column" key={source.book}>
                <span className="micro-label">
                  SOURCE / {String(sourceIndex + 1).padStart(2, "0")}
                </span>
                <h3>{source.book}</h3>
                <p>{source.note}</p>
                {source.chapters.map(([number, title, tag]) => (
                  <div className="source-row" key={number}>
                    <span>{number}</span>
                    <span>{title}</span>
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-wrap footer-inner">
          <div>
            <h2>逻辑不是胜负术。</h2>
            <p>
              它是一套让观念贴近事实、让语言表达清楚、让结论得到充分支持，并允许现实纠正自己的思维纪律。
            </p>
          </div>
          <div className="footer-links">
            {[
              ["path", "七关路径"],
              ["knowledge", "知识地图"],
              ["fallacies", "谬误断点"],
              ["practice", "练习场"],
              ["sources", "两本书"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </div>
          <div className="footer-mark" aria-hidden="true">
            ∴
          </div>
        </div>
      </footer>

      {searchOpen && (
        <div
          className="search-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSearchOpen(false);
          }}
        >
          <div
            className="search-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="全局搜索"
          >
            <div className="search-head">
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="搜索概念、推理、谬误或练习"
                aria-label="搜索"
              />
              <button
                className="search-close"
                onClick={() => setSearchOpen(false)}
                aria-label="关闭搜索"
              >
                ×
              </button>
            </div>
            <div className="search-results">
              <p className="search-hint">
                {searchQuery
                  ? `找到 ${searchResults.length} 个相关入口`
                  : "可以试试：因果、定义、已读不回、权威"}
              </p>
              {searchResults.length ? (
                searchResults.map((item) => (
                  <button
                    className="search-result"
                    key={`${item.type}-${item.id}`}
                    onClick={() => selectSearchResult(item)}
                  >
                    <small>{item.type}</small>
                    <strong>{item.title}</strong>
                    <span>→</span>
                  </button>
                ))
              ) : (
                <div className="empty-state">
                  <strong>暂时没有直接匹配</strong>
                  <p>试试更短的关键词，例如“因果”“前提”或“情绪”。</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
