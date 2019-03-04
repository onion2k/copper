import React, { useRef, useState, useLayoutEffect, useContext } from "react";

interface iConnectorMapLine {
  id: string;
  title: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function ConnectorMapLine({
  id,
  title,
  x1,
  y1,
  x2,
  y2
}: iConnectorMapLine) {
  const pathRef = useRef<SVGPathElement>(null);
  const endsRef = useRef<SVGUseElement>(null);
  useLayoutEffect(() => {
    const pathEl = pathRef.current;
    const pathEnds = endsRef.current;
    if (pathEl && pathEnds) {
      const pathLength = pathEl.getTotalLength();
      pathEnds.setAttribute("stroke-dasharray", String(pathLength / 3));
    }
  });
  return (
    <g key={`connector-${x1}-${y1}-${x2}-${y2}`}>
      <defs>
        <path
          ref={pathRef}
          id={`${x1}-${y1}-${x2}-${y2}`}
          key={`${x1}-${y1}-${x2}-${y2}`}
          d={`M${x1} ${y1} c ${(x2 - x1) * 0.75} 0, ${(x2 - x1) * 0.25} ${y2 -
            y1}, ${x2 - x1} ${y2 - y1}`}
        />
      </defs>
      <use
        href={`#${x1}-${y1}-${x2}-${y2}`}
        fill="none"
        stroke="#44dd44"
        strokeWidth="1"
      />
      <use
        ref={endsRef}
        id={`ends-${x1}-${y1}-${x2}-${y2}`}
        href={`#${x1}-${y1}-${x2}-${y2}`}
        fill="none"
        stroke="#444444"
        strokeWidth="2"
      />
      <text textAnchor="middle" dy="-4px">
        <textPath href={`#${x1}-${y1}-${x2}-${y2}`} startOffset="50%">
          {title}
        </textPath>
      </text>
    </g>
  );
}
