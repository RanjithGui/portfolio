import { Gravity, MatterBody } from "./ui/gravity"

const SKILL_PILLS = [
  // Languages
  { label: "Kotlin",            bg: "#3B82F6", text: "#fff" },
  { label: "Java",              bg: "#E76229", text: "#fff" },
  { label: "TypeScript",        bg: "#3178C6", text: "#fff" },
  // UI / Frameworks
  { label: "Jetpack Compose",   bg: "#8B5CF6", text: "#fff" },
  { label: "XML Layouts",       bg: "#6B7280", text: "#fff" },
  { label: "React Native",      bg: "#61DAFB", text: "#1a1a1a" },
  // Architecture
  { label: "MVVM",              bg: "#1f464d", text: "#fff" },
  { label: "Clean Architecture",bg: "#0015ff", text: "#fff" },
  { label: "Hilt",              bg: "#E794DA", text: "#1a1a1a" },
  // Networking / Data
  { label: "Retrofit",          bg: "#ff5941", text: "#fff" },
  { label: "REST APIs",         bg: "#14b8a6", text: "#fff" },
  { label: "Firebase",          bg: "#F59E0B", text: "#1a1a1a" },
  { label: "Razorpay",          bg: "#072654", text: "#fff" },
  // Android Platform
  { label: "Android SDK",       bg: "#3DDC84", text: "#1a1a1a" },
  // Backend
  { label: "Node.js",           bg: "#417e38", text: "#fff" },
  // DevOps / Version Control
  { label: "Git",               bg: "#F05033", text: "#fff" },
  { label: "GitLab CI/CD",      bg: "#FC6D26", text: "#fff" },
  // Tools / Process
  { label: "Jira",              bg: "#0052CC", text: "#fff" },
  { label: "GitHub Copilot",    bg: "#24292e", text: "#fff" },
  { label: "Agile",             bg: "#ffd726", text: "#1a1a1a" },
]

// Spread pills evenly across the top in a grid pattern
function getPosition(index) {
  const cols = 5
  const col = index % cols
  const row = Math.floor(index / cols)
  const xPositions = ["8%", "23%", "40%", "60%", "78%"]
  const yStart = 3
  const yStep = 12
  return {
    x: xPositions[col],
    y: `${yStart + row * yStep}%`,
  }
}

export function SkillsSection() {
  return (
    <section id="skills" className="section" style={{ position: "relative" }}>
      <div
        className="section-heading"
        style={{ maxWidth: "54rem", margin: "0 auto", paddingBottom: "2rem", textAlign: "center" }}
      >
        <p className="eyebrow">Skills</p>
        <h2>Tools &amp; technologies I work with</h2>
      </div>

      {/* Physics container — tall enough for 4 rows of pills to fall */}
      <div style={{ position: "relative", width: "100%", height: "620px" }}>
        <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full" grabCursor>
          {SKILL_PILLS.map((skill, i) => {
            const { x, y } = getPosition(i)
            return (
              <MatterBody
                key={skill.label}
                matterBodyOptions={{ friction: 0.5, restitution: 0.3, density: 0.002 }}
                x={x}
                y={y}
                angle={Math.round((Math.random() - 0.5) * 18)}
              >
                <div
                  className="rounded-full px-6 py-3 text-base font-semibold whitespace-nowrap select-none"
                  style={{ backgroundColor: skill.bg, color: skill.text }}
                >
                  {skill.label}
                </div>
              </MatterBody>
            )
          })}
        </Gravity>
      </div>
    </section>
  )
}
