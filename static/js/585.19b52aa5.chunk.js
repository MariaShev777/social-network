"use strict";(self.webpackChunksamurai_way=self.webpackChunksamurai_way||[]).push([[585],{6585:function(e,r,n){n.r(r);var t=n(885),s=n(2791),u=n(6822),i=n(364),c=n(184);r.default=function(){return(0,c.jsx)("div",{children:(0,c.jsx)(a,{})})};var a=function(){var e=(0,i.I0)(),r=(0,i.v9)((function(e){return e.chat.status}));return(0,s.useEffect)((function(){return e((0,u.WE)()),function(){e((0,u.R7)())}}),[]),(0,c.jsxs)("div",{children:["error"===r&&(0,c.jsx)("div",{children:"Some error occurred. Please refresh the page"}),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o,{}),(0,c.jsx)(h,{})]})]})},o=s.memo((function(){var e=(0,i.v9)((function(e){return e.chat.messages})),r=(0,s.useRef)(null),n=(0,s.useState)(!1),u=(0,t.Z)(n,2),a=u[0],o=u[1];return(0,s.useEffect)((function(){var e;a&&(null===(e=r.current)||void 0===e||e.scrollIntoView({behavior:"smooth"}))}),[e]),(0,c.jsxs)("div",{style:{height:"400px",overflowY:"auto"},onScroll:function(e){var r=e.currentTarget;Math.abs(r.scrollHeight-r.scrollTop-r.clientHeight)<300?!a&&o(!0):a&&o(!1)},children:[e.map((function(e){return(0,c.jsx)(l,{message:e},e.id)})),(0,c.jsx)("div",{ref:r})]})})),l=function(e){var r=e.message;return(0,c.jsxs)("div",{style:{color:"black"},children:[(0,c.jsx)("img",{src:r.photo,width:36}),(0,c.jsx)("b",{children:r.userName}),r.message,(0,c.jsx)("hr",{})]})},h=function(){var e=(0,s.useState)(""),r=(0,t.Z)(e,2),n=r[0],a=r[1],o=(0,i.v9)((function(e){return e.chat.status})),l=(0,i.I0)();return(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{children:(0,c.jsx)("textarea",{onChange:function(e){return a(e.currentTarget.value)},value:n})}),(0,c.jsx)("div",{children:(0,c.jsx)("button",{disabled:"ready"!==o,onClick:function(){n&&(l((0,u.bG)(n)),a(""))},children:"Send"})})]})}}}]);
//# sourceMappingURL=585.19b52aa5.chunk.js.map