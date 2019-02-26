import React, { useRef, useState, useEffect, useContext } from "react";

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
  useEffect(() => {
    // const pathEl = document.querySelector('#Connector');
    // const pathEnds = document.querySelector('#ends');
    // const pathLength = pathEl.getTotalLength();
    // pathEnds.setAttribute('stroke-dasharray', pathLength / 3);
  });
  return (
    <g key={`connector-${x1}-${y1}-${x2}-${y2}`}>
      <defs>
        <path
          id={`${x1}-${y1}-${x2}-${y2}`}
          key={`${x1}-${y1}-${x2}-${y2}`}
          d={`M${x1 + 10} ${y1 + 10} c ${(x2 - x1) * 0.75} 0, ${(x2 - x1) *
            0.25} ${y2 - y1}, ${x2 - x1} ${y2 - y1}`}
        />
      </defs>
      <use
        href={`#${x1}-${y1}-${x2}-${y2}`}
        fill="none"
        stroke="#44dd44"
        strokeWidth="1"
      />
      <use
        id={`ends-${x1}-${y1}-${x2}-${y2}`}
        href={`#${x1}-${y1}-${x2}-${y2}`}
        fill="none"
        stroke="#444444"
        strokeWidth="3"
      />
      <text textAnchor="middle" letterSpacing="1px" dy="-4px">
        <textPath href={`#${x1}-${y1}-${x2}-${y2}`} startOffset="50%">
          CONNECTOR
        </textPath>
      </text>
    </g>
  );
}
