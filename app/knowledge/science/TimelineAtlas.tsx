"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  TIMELINE_ERAS,
  TIMELINE_EVENTS,
  type TimelineEraId,
  type TimelineEvent,
  type TimelineLane,
} from "./timeline-data";
import {
  getEventReadingProfile,
  type DetailSectionKey,
} from "./timeline-lenses";

type LaneFilter = TimelineLane | "all";
type ThemeName = "light" | "dark";

const laneMeta: Record<
  TimelineLane,
  { label: string; short: string; description: string }
> = {
  science: {
    label: "科学轨",
    short: "知",
    description: "理论、证据、测量与解释",
  },
  technology: {
    label: "技术轨",
    short: "技",
    description: "材料、能量、工艺与系统",
  },
  civilization: {
    label: "文明轨",
    short: "治",
    description: "组织、制度、权力与风险",
  },
};

const allLaneIds = Object.keys(laneMeta) as TimelineLane[];

function eventHasLane(event: TimelineEvent, lane: TimelineLane) {
  return event.lanes.includes(lane);
}

function displayText(value: string) {
  return value.replace(/[\u2013\u2014]/g, "-");
}

function twoDigits(value: number) {
  return String(value).padStart(2, "0");
}

function peoplePreview(value: string) {
  const firstStatement = displayText(value).split(/[。；]/)[0]?.trim() ?? "";
  if (firstStatement.length <= 58) return firstStatement;
  return `${firstStatement.slice(0, 56)}…`;
}

function DetailPanel({
  event,
  onSelectRelated,
  mobile = false,
}: {
  event: TimelineEvent;
  onSelectRelated: (id: string) => void;
  mobile?: boolean;
}) {
  const era = TIMELINE_ERAS.find((item) => item.id === event.eraId);
  const detailId = `${mobile ? "mobile" : "desktop"}-${event.id}`;
  const readingProfile = getEventReadingProfile(event);
  const relatedIds = [
    ...(event.parentId ? [event.parentId] : []),
    ...(event.childIds ?? []),
  ];
  const sectionContent: Record<DetailSectionKey, string> = {
    turningPoint: event.turningPoint,
    people: event.people,
    conditionsAndImpact: event.conditionsAndImpact,
    tension: event.tension,
  };

  return (
    <div className="reading-pane-content">
      <div className="reading-pane-kicker">
        <span>{event.id}</span>
        <span aria-hidden="true">/</span>
        <span>{displayText(event.date)}</span>
      </div>

      <div className="reading-pane-era">
        <span>{era?.id}</span>
        <span>{era?.title}</span>
      </div>

      <h2 id={mobile ? "mobile-event-title" : "event-title"}>
        {displayText(event.title)}
      </h2>

      <div className="detail-lanes" aria-label="事件所在轨道">
        {event.lanes.map((lane) => (
          <span className={`lane-label lane-${lane}`} key={lane}>
            <span className="lane-glyph" aria-hidden="true">
              {laneMeta[lane].short}
            </span>
            {laneMeta[lane].label}
          </span>
        ))}
      </div>

      <aside
        className={`detail-lens detail-lens--${readingProfile.id}`}
        aria-label="当前节点的阅读镜头"
      >
        <header>
          <span>阅读镜头</span>
          <strong>{readingProfile.label}</strong>
        </header>
        <p>{readingProfile.description}</p>
        <dl>
          <div>
            <dt>两种燃料</dt>
            <dd>{readingProfile.fuels.join(" + ")}</dd>
          </div>
          <div>
            <dt>当前闸门</dt>
            <dd>{readingProfile.gates.join(" · ")}</dd>
          </div>
          <div>
            <dt>历史规律</dt>
            <dd>{readingProfile.laws.join(" · ")}</dd>
          </div>
        </dl>
        <p className="detail-lens__question">
          <span>本节点追问</span>
          {readingProfile.question}
        </p>
      </aside>

      {readingProfile.sections.map((section, index) => {
        const sectionId = `${detailId}-${section.key}-title`;
        return (
          <section
            key={section.key}
            className={[
              "detail-section",
              index === 0 ? "detail-lead" : "",
              `detail-section--${section.tone}`,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-labelledby={sectionId}
          >
            <p className="detail-index">
              {twoDigits(index + 1)} / {section.label}
            </p>
            <h3 id={sectionId}>{section.title}</h3>
            <p>{displayText(sectionContent[section.key])}</p>
          </section>
        );
      })}

      <div className="keyword-list" aria-label="关键词">
        {event.keywords.map((keyword) => (
          <span key={keyword}>{displayText(keyword)}</span>
        ))}
      </div>

      {relatedIds.length > 0 ? (
        <div className="related-events">
          <p>关联节点</p>
          <div>
            {relatedIds.map((id) => {
              const related = TIMELINE_EVENTS.find((item) => item.id === id);
              if (!related) return null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelectRelated(id)}
                >
                  <span>{id}</span>
                  {displayText(related.title)}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function TimelineAtlas() {
  const [selectedEventId, setSelectedEventId] = useState("T01");
  const [eraFilter, setEraFilter] = useState<TimelineEraId | "all">("all");
  const [laneFilter, setLaneFilter] = useState<LaneFilter>("all");
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<ThemeName>("light");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const readingPaneRef = useRef<HTMLElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const eventScrollRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const selectedEvent =
    TIMELINE_EVENTS.find((event) => event.id === selectedEventId) ??
    TIMELINE_EVENTS[0];

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("zh-CN");

    return TIMELINE_EVENTS.filter((event) => {
      if (eraFilter !== "all" && event.eraId !== eraFilter) return false;
      if (laneFilter !== "all" && !eventHasLane(event, laneFilter)) {
        return false;
      }
      if (!normalizedQuery) return true;

      const searchable = [
        event.id,
        event.date,
        event.title,
        event.people,
        event.turningPoint,
        event.conditionsAndImpact,
        event.tension,
        ...event.keywords,
      ]
        .join(" ")
        .toLocaleLowerCase("zh-CN");

      return searchable.includes(normalizedQuery);
    });
  }, [eraFilter, laneFilter, query]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTheme(
        document.documentElement.dataset.theme === "dark" ? "dark" : "light",
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const hashId = window.location.hash.replace("#event-", "");
    const frame = window.requestAnimationFrame(() => {
      if (TIMELINE_EVENTS.some((event) => event.id === hashId)) {
        setSelectedEventId(hashId);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      window.history.replaceState(null, "", `#event-${selectedEventId}`);
      readingPaneRef.current?.scrollTo({ top: 0, behavior: "auto" });
      mobileSheetRef.current?.scrollTo({ top: 0, behavior: "auto" });

      if (window.matchMedia("(min-width: 960px)").matches) {
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const eventScroll = eventScrollRef.current;
        const selectedEventNode = eventRefs.current[selectedEventId];

        if (eventScroll && selectedEventNode) {
          const scrollRect = eventScroll.getBoundingClientRect();
          const eventRect = selectedEventNode.getBoundingClientRect();
          const centeredTop =
            eventScroll.scrollTop +
            eventRect.top -
            scrollRect.top -
            (eventScroll.clientHeight - eventRect.height) / 2;

          eventScroll.scrollTo({
            top: Math.max(0, centeredTop),
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedEventId]);

  useEffect(() => {
    if (
      filteredEvents.length === 0 ||
      filteredEvents.some((event) => event.id === selectedEventId)
    ) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setSelectedEventId(filteredEvents[0].id);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [filteredEvents, selectedEventId]);

  function selectEvent(id: string, openOnMobile = false) {
    const target = TIMELINE_EVENTS.find((event) => event.id === id);
    const targetIsVisible = filteredEvents.some((event) => event.id === id);

    if (target && !targetIsVisible) {
      setEraFilter(target.eraId);
      setLaneFilter("all");
      setQuery("");
    }
    setSelectedEventId(id);

    if (
      openOnMobile &&
      window.matchMedia("(max-width: 959px)").matches &&
      dialogRef.current &&
      !dialogRef.current.open
    ) {
      window.requestAnimationFrame(() => dialogRef.current?.showModal());
    }
  }

  function selectEra(nextEra: TimelineEraId | "all") {
    setEraFilter(nextEra);
  }

  function resetFilters() {
    setEraFilter("all");
    setLaneFilter("all");
    setQuery("");
  }

  function toggleTheme() {
    const nextTheme: ThemeName = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("zhiyuxing-theme", nextTheme);
    setTheme(nextTheme);
  }

  return (
    <section className="atlas-shell" id="timeline" aria-label="科学史互动时间轴">
      <aside className="era-index" aria-label="九个历史时代">
        <div className="atlas-intro">
          <p className="eyebrow">个人读书笔记母稿 / 01</p>
          <h1>
            科学、技术
            <br />
            与文明
          </h1>
          <p className="atlas-deck">
            知识如何成为力量
            <br />
            力量如何接受治理
          </p>
        </div>

        <label className="search-field">
          <span>检索节点或人物</span>
          <span className="search-input-wrap">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="牛顿、蒸汽、治理…"
            />
          </span>
        </label>

        <label className="mobile-era-select">
          <span>选择时代</span>
          <select
            value={eraFilter}
            onChange={(event) =>
              selectEra(event.target.value as TimelineEraId | "all")
            }
          >
            <option value="all">全部九个时代</option>
            {TIMELINE_ERAS.map((era) => (
              <option value={era.id} key={era.id}>
                {era.id} {era.title}
              </option>
            ))}
          </select>
        </label>

        <nav className="era-list" aria-label="按时代筛选">
          <button
            type="button"
            className={eraFilter === "all" ? "is-active" : ""}
            aria-pressed={eraFilter === "all"}
            onClick={() => selectEra("all")}
          >
            <span className="era-code">ALL</span>
            <span className="era-name">
              <strong>完整历程</strong>
              <small>九个时代 · {TIMELINE_EVENTS.length}个节点</small>
            </span>
          </button>
          {TIMELINE_ERAS.map((era) => {
            const eraCount = TIMELINE_EVENTS.filter(
              (event) => event.eraId === era.id,
            ).length;
            return (
              <button
                type="button"
                key={era.id}
                className={eraFilter === era.id ? "is-active" : ""}
                aria-pressed={eraFilter === era.id}
                onClick={() => selectEra(era.id)}
              >
                <span className="era-code">{era.id}</span>
                <span className="era-name">
                  <strong>{era.title}</strong>
                  <small>{displayText(era.period)}</small>
                </span>
                <span className="era-count">{eraCount}</span>
              </button>
            );
          })}
        </nav>

        <p className="source-note">
          四本书的个人综合阅读，不冒充逐条核验的百科。
          <a href="#source-boundaries">查看材料边界</a>
        </p>
      </aside>

      <div className="timeline-film">
        <div className="film-perforations film-perforations-left" aria-hidden />
        <div className="film-perforations film-perforations-right" aria-hidden />

        <div className="timeline-toolbar">
          <div>
            <p className="eyebrow">TIME FILM / 9 ERAS</p>
            <h2>三条轨道上的能力扩张</h2>
          </div>
          <div className="toolbar-actions">
            <span className="result-count" aria-live="polite">
              {filteredEvents.length} / {TIMELINE_EVENTS.length}
            </span>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                theme === "light" ? "切换到深色模式" : "切换到浅色模式"
              }
            >
              {theme === "light" ? "暗室" : "明室"}
            </button>
          </div>
        </div>

        <fieldset className="lane-filter">
          <legend className="sr-only">按轨道筛选</legend>
          <button
            type="button"
            className={laneFilter === "all" ? "is-active" : ""}
            aria-pressed={laneFilter === "all"}
            onClick={() => setLaneFilter("all")}
          >
            全部轨道
          </button>
          {allLaneIds.map((lane) => (
            <button
              type="button"
              key={lane}
              className={`lane-filter-${lane} ${
                laneFilter === lane ? "is-active" : ""
              }`}
              aria-pressed={laneFilter === lane}
              onClick={() => setLaneFilter(lane)}
              title={laneMeta[lane].description}
            >
              <span className="lane-glyph" aria-hidden="true">
                {laneMeta[lane].short}
              </span>
              {laneMeta[lane].label}
            </button>
          ))}
        </fieldset>

        <div className="lane-headings" aria-hidden="true">
          <span>年代 / DATE</span>
          {allLaneIds.map((lane) => (
            <span key={lane}>{laneMeta[lane].label}</span>
          ))}
          <span>节点 / EVENT</span>
        </div>

        <div className="event-scroll" tabIndex={-1} ref={eventScrollRef}>
          {filteredEvents.length > 0 ? (
            <ol className="event-list">
              {filteredEvents.map((event) => {
                const isSelected = selectedEventId === event.id;
                const era = TIMELINE_ERAS.find(
                  (item) => item.id === event.eraId,
                );

                return (
                  <li
                    key={event.id}
                    ref={(node) => {
                      eventRefs.current[event.id] = node;
                    }}
                    className={[
                      "timeline-event",
                      isSelected ? "is-selected" : "",
                      `kind-${event.kind}`,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={
                      {
                        "--era-order":
                          TIMELINE_ERAS.findIndex(
                            (item) => item.id === event.eraId,
                          ) + 1,
                      } as CSSProperties
                    }
                  >
                    <div className="event-date">
                      <span>{displayText(event.date)}</span>
                      <small>{event.id}</small>
                    </div>

                    <div className="event-rails" aria-hidden="true">
                      {allLaneIds.map((lane) => (
                        <span
                          key={lane}
                          className={`rail rail-${lane} ${
                            eventHasLane(event, lane) ? "is-on" : ""
                          }`}
                        >
                          <i>{laneMeta[lane].short}</i>
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="event-card"
                      aria-pressed={isSelected}
                      aria-label={`${displayText(event.date)}，${displayText(
                        event.title,
                      )}，查看详情`}
                      onClick={() => selectEvent(event.id, true)}
                    >
                      <span className="event-card-meta">
                        <span>{era?.id}</span>
                        {event.kind === "branch" ? <span>支线</span> : null}
                        {event.kind === "cluster" ? <span>分岔</span> : null}
                      </span>
                      <strong>{displayText(event.title)}</strong>
                      <span className="event-people-brief">
                        <span aria-hidden="true">人物</span>
                        {peoplePreview(event.people)}
                      </span>
                      <span className="event-open-cue">
                        查看节点 <span aria-hidden="true">↗</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="empty-state">
              <p className="eyebrow">NO MATCH</p>
              <h3>这组条件下没有节点</h3>
              <p>尝试清除检索词，或回到全部时代与轨道。</p>
              <button type="button" onClick={resetFilters}>
                重置筛选
              </button>
            </div>
          )}
        </div>
      </div>

      <aside
        className="reading-pane"
        aria-labelledby="event-title"
        ref={readingPaneRef}
      >
        <DetailPanel
          event={selectedEvent}
          onSelectRelated={(id) => selectEvent(id)}
        />
      </aside>

      <dialog
        className="mobile-reading-dialog"
        ref={dialogRef}
        aria-labelledby="mobile-event-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="mobile-dialog-sheet" ref={mobileSheetRef}>
          <div className="mobile-dialog-header">
            <span>节点阅读</span>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="关闭节点详情"
            >
              关闭
            </button>
          </div>
          <DetailPanel
            event={selectedEvent}
            mobile
            onSelectRelated={(id) => selectEvent(id)}
          />
        </div>
      </dialog>
    </section>
  );
}
