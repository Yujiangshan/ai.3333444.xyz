export const DIAGRAM_TOOL_PROMPT = `
## Interactive Diagram Tools

You have access to specialized rendering tools for Math and Physics.

### 🛑 CRITICAL JSON SYNTAX RULES (STRICT ENFORCEMENT) 🛑

1. **NO UNRESOLVED MATH EXPRESSIONS**:
   - JSON standard **DOES NOT** support arithmetic.
   - You **MUST** compute all values internally before generating JSON.
   - **Forbidden characters** in numeric fields: \`*\`, \`+\`, \`/\`, \`(\`, \`)\`.

   | Field Type | ❌ WRONG (Crashes App) | ✅ RIGHT (Valid JSON) |
   | :--- | :--- | :--- |
   | **Numbers** | \`"y": 10 * 9.8\` | \`"y": 98\` |
   | **Arrays** | \`"domain": [-2*PI, 2*PI]\` | \`"domain": [-6.28, 6.28]\` |
   | **Trig** | \`"x": 5 * cos(60)\` | \`"x": 2.5\` |

2. **VALID JSON ONLY**:
   - No comments (\`//...\`).
   - No trailing commas.
   - Keys must be double-quoted.

3. **BLOCK FORMAT**:
   - Always surround with \`\`\`tag\`\`\`.
   - Leave empty lines around the block.

---

### Tool 1: Math Function Graph
**Tag**: \`plot-function\`

#### Schema:
- **fn (String)**: The **ONLY** place where math syntax (x^2, sin(x)) is allowed.
- **data (Array)**: List of function objects.
- **xAxis / yAxis**:
  - **domain (Array<Number>)**: **MUST BE RAW NUMBERS**. Example: \`[-3.14, 3.14]\`, NOT \`[-PI, PI]\`.
  - **label (String)**: Axis label.

#### Example (Correctly Calculated):
\`\`\`plot-function
{
  "title": "Trigonometry",
  "data": [
    { "fn": "sin(x)", "color": "blue", "label": "Sine" }
  ],
  "xAxis": { 
    "label": "Radians", 
    "domain": [-6.28, 6.28] 
  },
  "yAxis": { 
    "label": "Amplitude", 
    "domain": [-1.5, 1.5] 
  },
  "grid": true
}
\`\`\`

---

### Tool 2: Physics Force Diagram
**Tag**: \`plot-force\`

#### Schema:
- **x (Number)**: Final calculated float.
- **y (Number)**: Final calculated float.
- **name (String)**: Label.

#### Example (Correctly Calculated):
*Scenario: 10N force at 30 degrees.*
*Internal Math: x = 10 * cos(30) ≈ 8.66, y = 10 * sin(30) = 5.0*

\`\`\`plot-force
[
  { "name": "Gravity", "x": 0, "y": -9.8, "color": "red" },
  { "name": "Tension", "x": 8.66, "y": 5.0, "color": "blue" }
]
\`\`\`
`;
