const levelLabels = ["Emerging", "Developing", "Proficient", "Advanced", "Expert"];

function getRadarPoint(index, total, radius, center) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  };
}

function buildPolygonPoints(skills, maxRadius, center) {
  return skills
    .map(([, level], index) => {
      const point = getRadarPoint(index, skills.length, (level / 5) * maxRadius, center);
      return `${point.x},${point.y}`;
    })
    .join(" ");
}

function buildRingPoints(total, radius, center) {
  return Array.from({ length: total }, (_, index) => {
    const point = getRadarPoint(index, total, radius, center);
    return `${point.x},${point.y}`;
  }).join(" ");
}

function SkillOrbitCard({ name, level, index }) {
  const fill = (level / 5) * 100;
  const label = levelLabels[level - 1] ?? "Proficient";

  return (
    <article
      className="skills-orbit-card team-glass-card"
      style={{ animationDelay: `${120 + index * 80}ms` }}
      aria-label={`${name}: ${level} out of 5, ${label}`}
    >
      <div className="skills-orbit-card-glow" aria-hidden="true" />
      <div className="skills-orbit-ring-wrap">
        <svg className="skills-orbit-ring" viewBox="0 0 72 72" aria-hidden="true">
          <circle cx="36" cy="36" r="30" className="skills-orbit-ring-track" />
          <circle
            cx="36"
            cy="36"
            r="30"
            className="skills-orbit-ring-progress"
            pathLength="100"
            strokeDasharray={`${fill} 100`}
          />
        </svg>
        <span className="skills-orbit-level">{level}</span>
      </div>
      <h3 className="skills-orbit-name">{name}</h3>
      <p className="skills-orbit-label">{label}</p>
    </article>
  );
}

export default function SkillsMatrix({ skills }) {
  const center = 180;
  const maxRadius = 118;
  const polygonPoints = buildPolygonPoints(skills, maxRadius, center);

  return (
    <div className="skills-matrix">
      <div className="skills-matrix-radar-panel team-glass-card">
        <div className="skills-matrix-radar-glow" aria-hidden="true" />
        <svg className="skills-matrix-radar" viewBox="0 0 360 360" role="img" aria-label="Team skills radar chart">
          {[1, 2, 3, 4, 5].map((step) => (
            <polygon
              key={step}
              points={buildRingPoints(skills.length, (step / 5) * maxRadius, center)}
              className="skills-matrix-grid-ring"
            />
          ))}

          {skills.map(([name], index) => {
            const outer = getRadarPoint(index, skills.length, maxRadius, center);
            const inner = getRadarPoint(index, skills.length, maxRadius * 0.18, center);
            const label = getRadarPoint(index, skills.length, maxRadius + 28, center);

            return (
              <g key={name}>
                <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} className="skills-matrix-axis" />
                <circle cx={outer.x} cy={outer.y} r="4.5" className="skills-matrix-node-dot" />
                <text x={label.x} y={label.y} className="skills-matrix-axis-label">
                  {name.split(" ")[0]}
                </text>
              </g>
            );
          })}

          <polygon points={polygonPoints} className="skills-matrix-shape" />
          <polygon points={polygonPoints} className="skills-matrix-shape-glow" />
        </svg>

        <div className="skills-matrix-radar-core team-glass-card">
          <p className="skills-matrix-radar-core-value">
            {Math.round(skills.reduce((sum, [, level]) => sum + level, 0) / skills.length)}/5
          </p>
          <p className="skills-matrix-radar-core-label">Avg stack</p>
        </div>
      </div>

      <div className="skills-orbit-grid">
        {skills.map(([name, level], index) => (
          <SkillOrbitCard key={name} name={name} level={level} index={index} />
        ))}
      </div>
    </div>
  );
}
