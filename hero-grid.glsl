/**
 * @resolution
 */
uniform vec2 u_resolution;

/**
 * @label Grid Size
 * @default 38
 * @range 8.0, 120.0
 */
uniform float u_grid;

/**
 * @label Line Color
 * @color
 * @default #C6C0AC
 */
uniform vec3 u_line;

/**
 * @label Opacity
 * @default 0.45
 * @range 0.0, 1.0
 */
uniform float u_opacity;

/**
 * @label Glow Center X
 * @default 0.72
 * @range 0.0, 1.0
 */
uniform float u_cx;

void main() {
  vec2 uv = gl_FragCoord.xy;
  vec2 f = fract(uv / u_grid);
  vec2 d = min(f, 1.0 - f) * u_grid;
  float gridLine = min(d.x, d.y);
  float a = (1.0 - smoothstep(0.0, 1.25, gridLine)) * u_opacity;
  vec2 c = u_resolution * vec2(u_cx, 0.46);
  float dist = distance(uv, c) / (u_resolution.x * 0.55);
  float mask = 1.0 - smoothstep(0.20, 1.05, dist);
  gl_FragColor = vec4(u_line, a * mask);
}
