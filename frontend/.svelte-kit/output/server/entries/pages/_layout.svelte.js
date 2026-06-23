import { a4 as spread_props, a5 as slot } from "../../chunks/index.js";
import "clsx";
import { I as Icon } from "../../chunks/Icon.js";
function Terminal($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M12 19h8" }],
    ["path", { "d": "m4 17 6-6-6-6" }]
  ];
  Icon($$renderer, spread_props([{ name: "terminal" }, props, { iconNode }]));
}
function Navbar($$renderer) {
  $$renderer.push(`<nav class="navbar"><div class="navbar-inner"><a href="#profile" class="navbar-brand">`);
  Terminal($$renderer, { size: 20 });
  $$renderer.push(`<!----> <span>&lt; /> Portfolio</span></a> <div class="navbar-links"><a href="#profile">โปรไฟล์</a> <a href="#education">การศึกษา</a> <a href="#skills">ทักษะ</a> <a href="#projects">โปรเจค</a></div></div></nav>`);
}
function Footer($$renderer) {
  $$renderer.push(`<footer class="footer"><p>สร้างด้วย <span class="heart">❤️</span> โดย Napatwan Chaiban</p> <p style="margin-top: 0.5rem;">© 2026 — Powered by SvelteKit + NestJS</p></footer>`);
}
function _layout($$renderer, $$props) {
  Navbar($$renderer);
  $$renderer.push(`<!----> <main><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></main> `);
  Footer($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _layout as default
};
