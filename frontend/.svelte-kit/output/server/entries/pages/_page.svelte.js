import { a6 as ssr_context, a4 as spread_props, a7 as fallback, a8 as attr_class, a9 as clsx, e as escape_html, aa as store_get, ab as unsubscribe_stores, ac as bind_props, ad as attr, ae as ensure_array_like, af as attr_style, ag as stringify, ah as head } from "../../chunks/index.js";
import "clsx";
import { w as writable } from "../../chunks/index2.js";
import { I as Icon } from "../../chunks/Icon.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Award($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"
      }
    ],
    ["circle", { "cx": "12", "cy": "8", "r": "6" }]
  ];
  Icon($$renderer, spread_props([{ name: "award" }, props, { iconNode }]));
}
function Briefcase($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      { "d": "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" }
    ],
    [
      "rect",
      { "width": "20", "height": "14", "x": "2", "y": "6", "rx": "2" }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "briefcase" }, props, { iconNode }]));
}
function Calendar($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "rect",
      { "width": "18", "height": "18", "x": "3", "y": "4", "rx": "2" }
    ],
    ["path", { "d": "M3 10h18" }]
  ];
  Icon($$renderer, spread_props([{ name: "calendar" }, props, { iconNode }]));
}
function Code($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "m16 18 6-6-6-6" }],
    ["path", { "d": "m8 6-6 6 6 6" }]
  ];
  Icon($$renderer, spread_props([{ name: "code" }, props, { iconNode }]));
}
function Folder_open($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
      }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "folder-open" }, props, { iconNode }]));
}
function Mail($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }],
    [
      "rect",
      { "x": "2", "y": "4", "width": "20", "height": "16", "rx": "2" }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "mail" }, props, { iconNode }]));
}
function Map_pin($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    ["circle", { "cx": "12", "cy": "10", "r": "3" }]
  ];
  Icon($$renderer, spread_props([{ name: "map-pin" }, props, { iconNode }]));
}
function Pencil($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
      }
    ],
    ["path", { "d": "m15 5 4 4" }]
  ];
  Icon($$renderer, spread_props([{ name: "pencil" }, props, { iconNode }]));
}
function Phone($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "phone" }, props, { iconNode }]));
}
function Rocket($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" }],
    [
      "path",
      {
        "d": "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"
      }
    ],
    [
      "path",
      {
        "d": "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"
      }
    ],
    [
      "path",
      { "d": "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "rocket" }, props, { iconNode }]));
}
function Shield_off($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "m2 2 20 20" }],
    [
      "path",
      {
        "d": "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71"
      }
    ],
    [
      "path",
      {
        "d": "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264"
      }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "shield-off" }, props, { iconNode }]));
}
function Shield($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "shield" }, props, { iconNode }]));
}
function Trophy($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"
      }
    ],
    [
      "path",
      {
        "d": "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"
      }
    ],
    ["path", { "d": "M18 9h1.5a1 1 0 0 0 0-5H18" }],
    ["path", { "d": "M4 22h16" }],
    [
      "path",
      { "d": "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" }
    ],
    ["path", { "d": "M6 9H4.5a1 1 0 0 1 0-5H6" }]
  ];
  Icon($$renderer, spread_props([{ name: "trophy" }, props, { iconNode }]));
}
function User($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }],
    ["circle", { "cx": "12", "cy": "7", "r": "4" }]
  ];
  Icon($$renderer, spread_props([{ name: "user" }, props, { iconNode }]));
}
function Wrench($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"
      }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "wrench" }, props, { iconNode }]));
}
const cvData = writable(null);
const isAdmin = writable(false);
function EditableText($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let path = $$props["path"];
    let value = $$props["value"];
    let multiline = fallback($$props["multiline"], false);
    let className = fallback($$props["className"], "");
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="editable-wrapper"><span${attr_class(clsx(className), "svelte-1j4s0gp")}>${escape_html(value)}</span> `);
      if (store_get($$store_subs ??= {}, "$isAdmin", isAdmin)) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button class="edit-btn" title="แก้ไข">`);
        Pencil($$renderer2, { size: 14 });
        $$renderer2.push(`<!----></button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { path, value, multiline, className });
  });
}
function ProfileCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    $$renderer2.push(`<section id="profile" class="glass-card profile-section svelte-1j7scqf"><div class="profile-header svelte-1j7scqf"><div class="avatar-ring"><div class="avatar-placeholder">${escape_html(data.profile.name.charAt(0))}</div></div> <div class="profile-info svelte-1j7scqf">`);
    EditableText($$renderer2, {
      path: "profile.name",
      value: data.profile.name,
      className: "profile-name gradient-text"
    });
    $$renderer2.push(`<!----> <div class="contact-row svelte-1j7scqf" style="margin-top: 0.75rem;"><div class="contact-item">`);
    Map_pin($$renderer2, { size: 16 });
    $$renderer2.push(`<!----> `);
    EditableText($$renderer2, { path: "profile.location", value: data.profile.location });
    $$renderer2.push(`<!----></div> <div class="contact-item">`);
    Phone($$renderer2, { size: 16 });
    $$renderer2.push(`<!----> `);
    EditableText($$renderer2, { path: "profile.phone", value: data.profile.phone });
    $$renderer2.push(`<!----></div> <div class="contact-item">`);
    Mail($$renderer2, { size: 16 });
    $$renderer2.push(`<!----> `);
    EditableText($$renderer2, { path: "profile.email", value: data.profile.email });
    $$renderer2.push(`<!----></div></div> `);
    if (data.socialLinks) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="social-links svelte-1j7scqf" style="margin-top: 1rem;">`);
      if (data.socialLinks.github) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<a${attr("href", data.socialLinks.github)} target="_blank" rel="noopener noreferrer" class="social-btn social-github">`);
        Code($$renderer2, { size: 16 });
        $$renderer2.push(`<!----> GitHub</a>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (data.socialLinks.linkedin) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<a${attr("href", data.socialLinks.linkedin)} target="_blank" rel="noopener noreferrer" class="social-btn social-linkedin">`);
        Briefcase($$renderer2, { size: 16 });
        $$renderer2.push(`<!----> LinkedIn</a>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="summary-section" style="margin-top: 1.5rem;"><h3 class="summary-title svelte-1j7scqf">`);
    User($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> เกี่ยวกับฉัน</h3> <div class="summary-box">`);
    EditableText($$renderer2, {
      path: "profile.summary",
      value: data.profile.summary,
      multiline: true
    });
    $$renderer2.push(`<!----></div></div></section>`);
    bind_props($$props, { data });
  });
}
function EducationCard($$renderer, $$props) {
  let education = $$props["education"];
  $$renderer.push(`<section id="education" class="glass-card"><h2 class="section-title cyan">🎓 การศึกษา</h2> <div class="edu-list svelte-zdy1g8"><!--[-->`);
  const each_array = ensure_array_like(education);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let edu = each_array[i];
    $$renderer.push(`<div class="edu-card"><div class="edu-institution">`);
    EditableText($$renderer, {
      path: `education[${i}].institution`,
      value: edu.institution,
      className: "edu-name"
    });
    $$renderer.push(`<!----></div> <div class="edu-period svelte-zdy1g8">`);
    Calendar($$renderer, { size: 14 });
    $$renderer.push(`<!----> `);
    EditableText($$renderer, { path: `education[${i}].period`, value: edu.period });
    $$renderer.push(`<!----></div> <div class="edu-details svelte-zdy1g8">`);
    EditableText($$renderer, {
      path: `education[${i}].details`,
      value: edu.details,
      multiline: true
    });
    $$renderer.push(`<!----></div></div>`);
  }
  $$renderer.push(`<!--]--></div></section>`);
  bind_props($$props, { education });
}
function CertCard($$renderer, $$props) {
  let certifications = $$props["certifications"];
  $$renderer.push(`<section class="glass-card"><h2 class="section-title violet">🏆 ใบรับรอง</h2> <div class="cert-list svelte-18anigo"><!--[-->`);
  const each_array = ensure_array_like(certifications);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let cert = each_array[i];
    $$renderer.push(`<div class="cert-badge"><div class="cert-icon">`);
    Award($$renderer, { size: 22 });
    $$renderer.push(`<!----></div> <div class="cert-info svelte-18anigo">`);
    EditableText($$renderer, {
      path: `certifications[${i}].name`,
      value: cert.name,
      className: "cert-name"
    });
    $$renderer.push(`<!----> <div class="cert-date svelte-18anigo">`);
    Calendar($$renderer, { size: 12 });
    $$renderer.push(`<!----> `);
    EditableText($$renderer, { path: `certifications[${i}].date`, value: cert.date });
    $$renderer.push(`<!----></div></div></div>`);
  }
  $$renderer.push(`<!--]--></div></section>`);
  bind_props($$props, { certifications });
}
function AchievementCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let grouped;
    let achievements = $$props["achievements"];
    function groupByCategory(items) {
      const groups = {};
      items.forEach((item) => {
        const cat = item.category || "อื่นๆ";
        if (!groups[cat]) {
          groups[cat] = [];
        }
        groups[cat].push(item);
      });
      return groups;
    }
    function getOriginalIndex(item) {
      return achievements.indexOf(item);
    }
    grouped = groupByCategory(achievements);
    $$renderer2.push(`<section class="glass-card"><h2 class="section-title amber">🏅 ผลงานและเกียรติบัตร</h2> <!--[-->`);
    const each_array = ensure_array_like(Object.entries(grouped));
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let [category, items] = each_array[$$index_1];
      $$renderer2.push(`<div class="achievement-group"><div class="achievement-group-title">`);
      Folder_open($$renderer2, { size: 16 });
      $$renderer2.push(`<!----> ${escape_html(category)}</div> <!--[-->`);
      const each_array_1 = ensure_array_like(items);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let item = each_array_1[$$index];
        const idx = getOriginalIndex(item);
        $$renderer2.push(`<div class="achievement-item"><div class="achievement-title svelte-89h2sp">`);
        Trophy($$renderer2, { size: 14, class: "trophy-icon" });
        $$renderer2.push(`<!----> `);
        EditableText($$renderer2, {
          path: `achievements[${idx}].title`,
          value: item.title,
          className: "achievement-text"
        });
        $$renderer2.push(`<!----></div> <div class="achievement-date svelte-89h2sp">`);
        Calendar($$renderer2, { size: 12 });
        $$renderer2.push(`<!----> `);
        EditableText($$renderer2, { path: `achievements[${idx}].date`, value: item.date });
        $$renderer2.push(`<!----></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (achievements.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="empty-text svelte-89h2sp">ยังไม่มีข้อมูลผลงาน</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></section>`);
    bind_props($$props, { achievements });
  });
}
function SkillsSection($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let programmingSkills, toolsSkills;
    let skills = $$props["skills"];
    function splitSkills(raw) {
      return raw.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    }
    programmingSkills = splitSkills(skills.programming);
    toolsSkills = splitSkills(skills.tools);
    $$renderer2.push(`<section id="skills" class="glass-card"><h2 class="section-title emerald">⚡ ทักษะ</h2> <div class="skills-grid svelte-ehyn8l"><div class="skills-category"><h3 class="category-title svelte-ehyn8l">`);
    Code($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> ภาษาโปรแกรมมิ่ง</h3> `);
    if (store_get($$store_subs ??= {}, "$isAdmin", isAdmin)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="edit-raw svelte-ehyn8l">`);
      EditableText($$renderer2, {
        path: "skills.programming",
        value: skills.programming,
        className: "raw-text"
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="tags-container svelte-ehyn8l"><!--[-->`);
      const each_array = ensure_array_like(programmingSkills);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let skill = each_array[i];
        $$renderer2.push(`<span class="skill-tag cyan"${attr_style(`animation-delay: ${stringify(i * 0.05)}s`)}>${escape_html(skill)}</span>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="skills-category"><h3 class="category-title svelte-ehyn8l">`);
    Wrench($$renderer2, { size: 18 });
    $$renderer2.push(`<!----> เครื่องมือและ Frameworks</h3> `);
    if (store_get($$store_subs ??= {}, "$isAdmin", isAdmin)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="edit-raw svelte-ehyn8l">`);
      EditableText($$renderer2, {
        path: "skills.tools",
        value: skills.tools,
        className: "raw-text"
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="tags-container svelte-ehyn8l"><!--[-->`);
      const each_array_1 = ensure_array_like(toolsSkills);
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let skill = each_array_1[i];
        $$renderer2.push(`<span class="skill-tag violet"${attr_style(`animation-delay: ${stringify(i * 0.05)}s`)}>${escape_html(skill)}</span>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { skills });
  });
}
function ProjectCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let projects = $$props["projects"];
    $$renderer2.push(`<section id="projects" class="glass-card"><h2 class="section-title cyan">🚀 โปรเจค</h2> <div class="project-grid svelte-oviq8z"><!--[-->`);
    const each_array = ensure_array_like(projects);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let project = each_array[i];
      $$renderer2.push(`<div class="project-card"><div class="project-header svelte-oviq8z"><div class="project-icon svelte-oviq8z">`);
      Rocket($$renderer2, { size: 20 });
      $$renderer2.push(`<!----></div> <div class="project-title-wrap svelte-oviq8z">`);
      EditableText($$renderer2, {
        path: `projects[${i}].title`,
        value: project.title,
        className: "project-title"
      });
      $$renderer2.push(`<!----> `);
      if (project.code) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="project-code-badge svelte-oviq8z">`);
        Code($$renderer2, { size: 12 });
        $$renderer2.push(`<!----> `);
        EditableText($$renderer2, {
          path: `projects[${i}].code`,
          value: project.code,
          className: "code-text"
        });
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div></div> <div class="project-desc svelte-oviq8z">`);
      EditableText($$renderer2, {
        path: `projects[${i}].description`,
        value: project.description,
        multiline: true,
        className: "desc-text"
      });
      $$renderer2.push(`<!----></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (projects.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="empty-text svelte-oviq8z">ยังไม่มีข้อมูลโปรเจค</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></section>`);
    bind_props($$props, { projects });
  });
}
function LoadingScreen($$renderer) {
  $$renderer.push(`<div class="loading-screen svelte-1p9h290"><div class="loading-outer svelte-1p9h290"><div class="loading-spinner svelte-1p9h290"></div> <div class="loading-ring svelte-1p9h290"></div></div> <p class="loading-text svelte-1p9h290">กำลังโหลดข้อมูล...</p> <div class="loading-dots svelte-1p9h290"><span class="dot svelte-1p9h290"></span> <span class="dot svelte-1p9h290"></span> <span class="dot svelte-1p9h290"></span></div></div>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    onDestroy(() => {
    });
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>พอร์ตโฟลิโอ | Napatwan Chaiban</title>`);
      });
    });
    $$renderer2.push(`<div class="container section-gap svelte-1uha8ag">`);
    if (!store_get($$store_subs ??= {}, "$cvData", cvData)) {
      $$renderer2.push("<!--[0-->");
      LoadingScreen($$renderer2);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div>`);
      ProfileCard($$renderer2, { data: store_get($$store_subs ??= {}, "$cvData", cvData) });
      $$renderer2.push(`<!----></div> <div class="grid-2">`);
      EducationCard($$renderer2, {
        education: store_get($$store_subs ??= {}, "$cvData", cvData).education
      });
      $$renderer2.push(`<!----> `);
      CertCard($$renderer2, {
        certifications: store_get($$store_subs ??= {}, "$cvData", cvData).certifications
      });
      $$renderer2.push(`<!----></div> <div>`);
      AchievementCard($$renderer2, {
        achievements: store_get($$store_subs ??= {}, "$cvData", cvData).achievements
      });
      $$renderer2.push(`<!----></div> <div>`);
      SkillsSection($$renderer2, {
        skills: store_get($$store_subs ??= {}, "$cvData", cvData).skills
      });
      $$renderer2.push(`<!----></div> <div>`);
      ProjectCard($$renderer2, {
        projects: store_get($$store_subs ??= {}, "$cvData", cvData).projects
      });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="admin-toggle"><button${attr_class(`btn ${store_get($$store_subs ??= {}, "$isAdmin", isAdmin) ? "btn-primary" : "btn-ghost"}`)}>`);
    if (store_get($$store_subs ??= {}, "$isAdmin", isAdmin)) {
      $$renderer2.push("<!--[0-->");
      Shield_off($$renderer2, { size: 18 });
      $$renderer2.push(`<!----> ออกจากโหมดแอดมิน`);
    } else {
      $$renderer2.push("<!--[-1-->");
      Shield($$renderer2, { size: 18 });
      $$renderer2.push(`<!----> โหมดแอดมิน`);
    }
    $$renderer2.push(`<!--]--></button></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
