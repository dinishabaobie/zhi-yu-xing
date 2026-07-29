import type { TimelineEvent, TimelineLane } from "./timeline-data";

export type DetailSectionKey =
  | "turningPoint"
  | "people"
  | "conditionsAndImpact"
  | "tension";

export interface DetailSectionProfile {
  readonly key: DetailSectionKey;
  readonly label: string;
  readonly title: string;
  readonly tone: "shift" | "actor" | "system" | "critical";
}

export interface EventReadingProfile {
  readonly id:
    | "knowledge-shift"
    | "capability-shift"
    | "civilization-shift"
    | "coupling"
    | "system-risk";
  readonly label: string;
  readonly description: string;
  readonly fuels: readonly string[];
  readonly gates: readonly string[];
  readonly laws: readonly string[];
  readonly question: string;
  readonly sections: readonly DetailSectionProfile[];
}

const energyTerms =
  /能量|火|农业|粮食|畜力|水力|风力|煤|蒸汽|电力|石油|内燃机|原子|核能|材料|交通|气候|化肥|动力/;
const informationTerms =
  /信息|语言|文字|数字|印刷|通信|电报|电话|无线电|计算|数据|算法|平台|人工智能|基因|生命|互联网|模型|知识|测序/;

function hasLane(event: TimelineEvent, lane: TimelineLane) {
  return event.lanes.includes(lane);
}

function allEventText(event: TimelineEvent) {
  return [
    event.title,
    event.people,
    event.turningPoint,
    event.conditionsAndImpact,
    event.tension,
    ...event.mainline,
    ...event.keywords,
  ].join(" ");
}

function eventFuels(text: string) {
  const fuels: string[] = [];
  if (energyTerms.test(text)) fuels.push("能量");
  if (informationTerms.test(text)) fuels.push("信息");
  return fuels.length > 0 ? fuels : ["组织能力"];
}

function eventGates(event: TimelineEvent, text: string) {
  const gates: string[] = [];

  if (hasLane(event, "science")) gates.push("概念");
  if (hasLane(event, "technology")) gates.push("工具");
  if (/成本|价格|工资|煤价|资本|市场|供应链|付费|经济/.test(text)) {
    gates.push("成本");
  }
  if (
    hasLane(event, "civilization") ||
    /共同体|团队|协作|分工|训练|标准/.test(text)
  ) {
    gates.push("组织");
  }
  if (
    hasLane(event, "civilization") &&
    /制度|国家|大学|社团|法律|监管|政府|军队|市场|产权/.test(text)
  ) {
    gates.push("制度");
  }
  if (
    /分配|权力|议价|尊严|不平等|谁|申诉|拒绝|退出|伦理|合法/.test(
      event.tension,
    ) ||
    event.eraId === "E09"
  ) {
    gates.push("分配与合法性");
  }
  gates.push("反馈与外部性");

  return [...new Set(gates)];
}

function eventLaws(event: TimelineEvent, text: string) {
  const laws: string[] = [];

  if (/保存|传承|教育|大学|印刷|共同体|期刊|翻译/.test(text)) {
    laws.push("积累需要制度");
  }
  if (event.lanes.length === 3 || /汇合|交点|连接|跨学科/.test(text)) {
    laws.push("突破来自多要素交点");
  }
  if (/小市场|煤矿|成本|价格|采用者|基础设施|需求/.test(text)) {
    laws.push("低河床决定落地");
  }
  if (/旧制度|迟滞|来不及|授权链|治理滞后/.test(text)) {
    laws.push("技术快于制度");
  }
  if (/锁定|依赖|退出成本|既得利益/.test(text)) {
    laws.push("成功制造路径锁定");
  }
  if (
    laws.length === 0 ||
    /代价|污染|暴力|风险|战争|压迫|异化|反噬/.test(event.tension)
  ) {
    laws.push("进步自带反噬");
  }

  return [...new Set(laws)].slice(0, 3);
}

const profileCopy = {
  "knowledge-shift": {
    label: "知识转向",
    description: "先读旧解释如何被证据改写，再看新理论的适用边界。",
    question: "什么证据让旧解释不再够用，而新解释又在哪些尺度失效？",
    sections: [
      {
        key: "turningPoint",
        label: "证据转折",
        title: "旧解释怎样被改写",
        tone: "shift",
      },
      {
        key: "conditionsAndImpact",
        label: "方法与仪器",
        title: "哪些工具和制度让新事实可见",
        tone: "system",
      },
      {
        key: "people",
        label: "知识接力",
        title: "谁提出、检验并修正了它",
        tone: "actor",
      },
      {
        key: "tension",
        label: "理论边界",
        title: "它不能被外推成什么",
        tone: "critical",
      },
    ],
  },
  "capability-shift": {
    label: "能力转向",
    description: "先读能力跨过的边界，再检查它如何越过成本与组织闸门。",
    question: "这项技术让什么变得更快、更便宜或可规模化，代价又转移给了谁？",
    sections: [
      {
        key: "turningPoint",
        label: "能力变化",
        title: "它跨过了哪一道现实边界",
        tone: "shift",
      },
      {
        key: "conditionsAndImpact",
        label: "落地闸门",
        title: "它怎样从可行变成可复制",
        tone: "system",
      },
      {
        key: "people",
        label: "制造网络",
        title: "谁把诀窍做成稳定方案",
        tone: "actor",
      },
      {
        key: "tension",
        label: "效率代价",
        title: "能力扩张带来了什么反噬",
        tone: "critical",
      },
    ],
  },
  "civilization-shift": {
    label: "组织转向",
    description: "先看共同体与制度，再看技术怎样重排参与、权力和收益。",
    question: "谁被组织进来、谁被排除出去，谁拥有拒绝和退出的能力？",
    sections: [
      {
        key: "people",
        label: "行动者",
        title: "谁推动、执行又承受这次变化",
        tone: "actor",
      },
      {
        key: "turningPoint",
        label: "组织变化",
        title: "协作与权力怎样被重新安排",
        tone: "shift",
      },
      {
        key: "conditionsAndImpact",
        label: "制度条件",
        title: "哪些规则让它保存并扩散",
        tone: "system",
      },
      {
        key: "tension",
        label: "合法性",
        title: "共同体失去了什么控制",
        tone: "critical",
      },
    ],
  },
  coupling: {
    label: "关键耦合",
    description: "把理论、工具、组织与需求放在同一张图里阅读。",
    question: "如果拿走其中一项条件，这次突破还会以同样方式发生吗？",
    sections: [
      {
        key: "turningPoint",
        label: "耦合",
        title: "哪些力量在这里汇流",
        tone: "shift",
      },
      {
        key: "people",
        label: "接力",
        title: "谁发现了关键连接",
        tone: "actor",
      },
      {
        key: "conditionsAndImpact",
        label: "社会化",
        title: "知识怎样变成集体能力",
        tone: "system",
      },
      {
        key: "tension",
        label: "反噬",
        title: "能力增长为何不等于进步",
        tone: "critical",
      },
    ],
  },
  "system-risk": {
    label: "系统风险",
    description: "先检查能力尺度与基础设施，再追问控制、可逆性和责任。",
    question: "最坏后果能否被看见、阻止、逆转和追责？",
    sections: [
      {
        key: "turningPoint",
        label: "尺度变化",
        title: "系统边界发生了什么变化",
        tone: "shift",
      },
      {
        key: "conditionsAndImpact",
        label: "基础设施",
        title: "它依赖哪些资源、平台与授权",
        tone: "system",
      },
      {
        key: "tension",
        label: "控制边界",
        title: "失败能否退出、逆转与追责",
        tone: "critical",
      },
      {
        key: "people",
        label: "责任网络",
        title: "谁设定目标，又由谁承担后果",
        tone: "actor",
      },
    ],
  },
} as const;

export function getEventReadingProfile(
  event: TimelineEvent,
): EventReadingProfile {
  const text = allEventText(event);
  const isSystemRisk =
    event.eraId === "E09" ||
    /全球风险|核武器|毁灭|治理越界|生物安全|气候危机/.test(text);
  const isCoupling = event.lanes.length === 3;
  const isKnowledgeShift =
    hasLane(event, "science") && !hasLane(event, "technology");
  const isCapabilityShift =
    hasLane(event, "technology") && !hasLane(event, "science");

  const id: EventReadingProfile["id"] = isSystemRisk
    ? "system-risk"
    : isCoupling
      ? "coupling"
      : isKnowledgeShift
        ? "knowledge-shift"
        : isCapabilityShift
          ? "capability-shift"
          : "civilization-shift";
  const copy = profileCopy[id];

  return {
    id,
    label: copy.label,
    description: copy.description,
    fuels: eventFuels(text),
    gates: eventGates(event, text),
    laws: eventLaws(event, text),
    question: copy.question,
    sections: copy.sections,
  };
}
