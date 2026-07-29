"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ConnectionLine = {
  id: string;
  d: string;
};

type ConnectionDiagram = {
  lines: ConnectionLine[];
  label: string;
  labelX: number;
  labelY: number;
};

type EvidenceConnectionMapProps = {
  labels: Record<string, string>;
  defaultRelationId: string;
};

const emptyDiagram: ConnectionDiagram = {
  lines: [],
  label: "",
  labelX: 0,
  labelY: 0,
};

export function EvidenceConnectionMap({
  labels,
  defaultRelationId,
}: EvidenceConnectionMapProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const pinnedRelationRef = useRef<string | null>(null);
  const activeRelationRef = useRef(defaultRelationId);
  const [diagram, setDiagram] = useState<ConnectionDiagram>(emptyDiagram);

  const drawRelation = useCallback(
    (relationId: string) => {
      const layer = layerRef.current;
      const workbench = layer?.parentElement;
      if (!layer || !workbench) return;

      activeRelationRef.current = relationId;
      const rootRect = workbench.getBoundingClientRect();
      const related = Array.from(
        workbench.querySelectorAll<HTMLElement>(
          `[data-relation-id="${relationId}"]`,
        ),
      );
      const sources = related.filter((item) =>
        item.classList.contains("evidence-quote-anchor"),
      );
      const targets = related.filter((item) =>
        item.classList.contains("claim-item"),
      );

      workbench
        .querySelectorAll<HTMLElement>("[data-relation-id]")
        .forEach((item) => {
          const isRelated = item.dataset.relationId === relationId;
          item.classList.toggle("is-related", isRelated);
          item.setAttribute("aria-pressed", String(isRelated));
        });

      const lines: ConnectionLine[] = [];
      let labelX = 0;
      let labelY = 0;

      sources.forEach((source, sourceIndex) => {
        const sourceRect = source.getBoundingClientRect();
        targets.forEach((target, targetIndex) => {
          const targetRect = target.getBoundingClientRect();
          const fromX = sourceRect.right - rootRect.left;
          const fromY =
            sourceRect.top - rootRect.top + sourceRect.height / 2;
          const toX = targetRect.left - rootRect.left;
          const toY = targetRect.top - rootRect.top + targetRect.height / 2;
          const middleX = (fromX + toX) / 2;

          lines.push({
            id: `${relationId}-${sourceIndex}-${targetIndex}`,
            d: `M ${fromX} ${fromY} C ${middleX} ${fromY}, ${middleX} ${toY}, ${toX} ${toY}`,
          });

          if (sourceIndex === 0 && targetIndex === 0) {
            labelX = middleX;
            labelY = (fromY + toY) / 2;
          }
        });
      });

      setDiagram({
        lines,
        label: labels[relationId] ?? "原句与判断",
        labelX,
        labelY,
      });
    },
    [labels],
  );

  useEffect(() => {
    const layer = layerRef.current;
    const workbench = layer?.parentElement;
    if (!layer || !workbench) return;

    const relationNode = (target: EventTarget | null) =>
      target instanceof Element
        ? target.closest<HTMLElement>("[data-relation-id]")
        : null;

    const showNodeRelation = (target: EventTarget | null) => {
      if (pinnedRelationRef.current) return;
      const node = relationNode(target);
      if (node?.dataset.relationId) drawRelation(node.dataset.relationId);
    };

    const restoreDefault = () => {
      if (!pinnedRelationRef.current) drawRelation(defaultRelationId);
    };

    const togglePinned = (target: EventTarget | null) => {
      const node = relationNode(target);
      const relationId = node?.dataset.relationId;
      if (!relationId) return;

      pinnedRelationRef.current =
        pinnedRelationRef.current === relationId ? null : relationId;
      drawRelation(pinnedRelationRef.current ?? defaultRelationId);
    };

    const handlePointerOver = (event: PointerEvent) =>
      showNodeRelation(event.target);
    const handlePointerLeave = () => restoreDefault();
    const handleClick = (event: MouseEvent) => togglePinned(event.target);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (!relationNode(event.target)) return;
      event.preventDefault();
      togglePinned(event.target);
    };
    const redraw = () =>
      drawRelation(
        pinnedRelationRef.current ?? activeRelationRef.current,
      );

    workbench.addEventListener("pointerover", handlePointerOver);
    workbench.addEventListener("pointerleave", handlePointerLeave);
    workbench.addEventListener("click", handleClick);
    workbench.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", redraw);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(redraw);
    resizeObserver?.observe(workbench);

    const frame = window.requestAnimationFrame(() =>
      drawRelation(defaultRelationId),
    );
    document.fonts?.ready?.then(redraw);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", redraw);
      workbench.removeEventListener("pointerover", handlePointerOver);
      workbench.removeEventListener("pointerleave", handlePointerLeave);
      workbench.removeEventListener("click", handleClick);
      workbench.removeEventListener("keydown", handleKeyDown);
    };
  }, [defaultRelationId, drawRelation]);

  return (
    <div className="case-connection-layer" ref={layerRef} aria-hidden="true">
      <svg>
        {diagram.lines.map((line) => (
          <path className="case-connection-path" d={line.d} key={line.id} />
        ))}
      </svg>
      {diagram.lines.length > 0 ? (
        <span
          className="case-connection-label"
          style={{ left: diagram.labelX, top: diagram.labelY }}
        >
          {diagram.label}
        </span>
      ) : null}
    </div>
  );
}
