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
};

const emptyDiagram: ConnectionDiagram = {
  lines: [],
  label: "",
  labelX: 0,
  labelY: 0,
};

export function EvidenceConnectionMap({
  labels,
}: EvidenceConnectionMapProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const pinnedRelationRef = useRef<string | null>(null);
  const activeRelationRef = useRef<string | null>(null);
  const [diagram, setDiagram] = useState<ConnectionDiagram>(emptyDiagram);

  const clearRelation = useCallback(() => {
    const layer = layerRef.current;
    const workbench = layer?.parentElement;
    if (!workbench) return;

    activeRelationRef.current = null;
    workbench.classList.remove("is-focusing");
    workbench
      .querySelectorAll<HTMLElement>("[data-relation-id]")
      .forEach((item) => {
        item.classList.remove("is-related");
        item.setAttribute("aria-pressed", "false");
      });
    setDiagram(emptyDiagram);
  }, []);

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
        item.classList.contains("analysis-node"),
      );

      workbench.classList.add("is-focusing");
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

    const clearUnpinned = () => {
      if (!pinnedRelationRef.current) clearRelation();
    };

    const togglePinned = (target: EventTarget | null) => {
      const node = relationNode(target);
      const relationId = node?.dataset.relationId;
      if (!relationId) return;

      pinnedRelationRef.current =
        pinnedRelationRef.current === relationId ? null : relationId;
      if (pinnedRelationRef.current) {
        drawRelation(pinnedRelationRef.current);
      } else {
        clearRelation();
      }
    };

    const handlePointerOver = (event: PointerEvent) =>
      showNodeRelation(event.target);
    const handlePointerLeave = () => clearUnpinned();
    const handleFocusIn = (event: FocusEvent) =>
      showNodeRelation(event.target);
    const handleFocusOut = (event: FocusEvent) => {
      if (
        event.relatedTarget instanceof Node &&
        workbench.contains(event.relatedTarget)
      ) {
        return;
      }
      clearUnpinned();
    };
    const handleClick = (event: MouseEvent) => togglePinned(event.target);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (!relationNode(event.target)) return;
      event.preventDefault();
      togglePinned(event.target);
    };
    const redraw = () => {
      const relationId =
        pinnedRelationRef.current ?? activeRelationRef.current;
      if (relationId) drawRelation(relationId);
    };

    workbench.addEventListener("pointerover", handlePointerOver);
    workbench.addEventListener("pointerleave", handlePointerLeave);
    workbench.addEventListener("focusin", handleFocusIn);
    workbench.addEventListener("focusout", handleFocusOut);
    workbench.addEventListener("click", handleClick);
    workbench.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", redraw);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(redraw);
    resizeObserver?.observe(workbench);

    const frame = window.requestAnimationFrame(redraw);
    document.fonts?.ready?.then(redraw);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", redraw);
      workbench.removeEventListener("pointerover", handlePointerOver);
      workbench.removeEventListener("pointerleave", handlePointerLeave);
      workbench.removeEventListener("focusin", handleFocusIn);
      workbench.removeEventListener("focusout", handleFocusOut);
      workbench.removeEventListener("click", handleClick);
      workbench.removeEventListener("keydown", handleKeyDown);
    };
  }, [clearRelation, drawRelation]);

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
