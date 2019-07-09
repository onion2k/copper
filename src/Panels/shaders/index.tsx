import React from "react";

const SHADER_Color = React.lazy(() => import("./color"));
const SHADER_SDF = React.lazy(() => import("./sdf"));
const SHADER_Rings = React.lazy(() => import("./rings"));
const SHADER_Chevron = React.lazy(() => import("./chevron"));
const SHADER_Space = React.lazy(() => import("./space"));
const SHADER_Spiral = React.lazy(() => import("./spiral"));
const SHADER_Swirl = React.lazy(() => import("./swirl"));
const SHADER_Tunnel = React.lazy(() => import("./tunnel"));
const SHADER_Glowlines = React.lazy(() => import("./glowlines"));
const SHADER_StainedGlass = React.lazy(() => import("./stainedglass"));
const SHADER_Spiral2 = React.lazy(() => import("./spiral2"));

const SHADERS: { [s: string]: any } = {
  SHADER_Color: { el: SHADER_Color, title: "Color" },
  SHADER_SDF: { el: SHADER_SDF, title: "SDF Sphere" },
  SHADER_Rings: { el: SHADER_Rings, title: "Rings" },
  SHADER_Chevron: { el: SHADER_Chevron, title: "Chevron" },
  SHADER_Space: { el: SHADER_Space, title: "Space" },
  SHADER_Spiral: { el: SHADER_Spiral, title: "Spiral" },
  SHADER_Spiral2: { el: SHADER_Spiral2, title: "Spiral 2" },
  SHADER_Swirl: { el: SHADER_Swirl, title: "Swirl" },
  SHADER_Tunnel: { el: SHADER_Tunnel, title: "Tunnel" },
  SHADER_Glowlines: { el: SHADER_Glowlines, title: "Lines" },
  SHADER_StainedGlass: { el: SHADER_StainedGlass, title: "Stained Glass" }
};

export default SHADERS;
