(self.webpackChunklavender_ui=self.webpackChunklavender_ui||[]).push([[164],{16869:(e,t,o)=>{"use strict";var r=o(24994);t.A=void 0;var n=r(o(42032)),a=o(74848);t.A=(0,n.default)((0,a.jsx)("path",{d:"m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"}),"Favorite")},5673:(e,t,o)=>{"use strict";var r=o(24994);t.A=void 0;var n=r(o(42032)),a=o(74848);t.A=(0,n.default)([(0,a.jsx)("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7M7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9"},"0"),(0,a.jsx)("circle",{cx:"12",cy:"9",r:"2.5"},"1")],"LocationOnOutlined")},71432:(e,t,o)=>{"use strict";var r=o(24994);t.A=void 0;var n=r(o(42032)),a=o(74848);t.A=(0,n.default)((0,a.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"}),"Person")},99682:(e,t,o)=>{"use strict";o.d(t,{A:()=>a});var r=o(20561),n=o(74848);const a=(0,r.A)((0,n.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add")},18393:(e,t,o)=>{"use strict";o.d(t,{A:()=>B});var r=o(98587),n=o(58168),a=o(96540),l=o(34164),i=o(64111),s=o(76081),c=o(11848),d=o(20561),u=o(74848);const p=(0,d.A)((0,u.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var v=o(27553),f=o(17245);function m(e){return(0,f.Ay)("MuiAvatar",e)}(0,v.A)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);var b=o(54871),h=o(72106),A=o(5676),x=o(67785);const S=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],g=["component","slots","slotProps"],y=["component"],w=["alt","children","className","component","slots","slotProps","imgProps","sizes","src","srcSet","variant"],C=(0,s.h)("MuiAvatar"),L=(0,c.Ay)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.variant],o.colorDefault&&t.colorDefault]}})((({theme:e})=>({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none",variants:[{props:{variant:"rounded"},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:{variant:"square"},style:{borderRadius:0}},{props:{colorDefault:!0},style:(0,n.A)({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:(0,n.A)({backgroundColor:e.palette.grey[400]},e.applyStyles("dark",{backgroundColor:e.palette.grey[600]})))}]}))),M=(0,c.Ay)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),R=(0,c.Ay)(p,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"}),B=a.forwardRef((function(e,t){const o=C({props:e,name:"MuiAvatar"}),{alt:s,children:c,className:d,component:p="div",slots:v={},slotProps:f={},imgProps:B,sizes:I,src:N,srcSet:P,variant:k="circular"}=o,j=(0,r.A)(o,w);let z=null;const E=function({crossOrigin:e,referrerPolicy:t,src:o,srcSet:r}){const[n,l]=a.useState(!1);return a.useEffect((()=>{if(!o&&!r)return;l(!1);let n=!0;const a=new Image;return a.onload=()=>{n&&l("loaded")},a.onerror=()=>{n&&l("error")},a.crossOrigin=e,a.referrerPolicy=t,a.src=o,r&&(a.srcset=r),()=>{n=!1}}),[e,t,o,r]),n}((0,n.A)({},B,{src:N,srcSet:P})),T=N||P,$=T&&"error"!==E,W=(0,n.A)({},o,{colorDefault:!$,component:p,variant:k}),F=(e=>{const{classes:t,variant:o,colorDefault:r}=e,n={root:["root",o,r&&"colorDefault"],img:["img"],fallback:["fallback"]};return(0,i.A)(n,m,t)})(W),[O,H]=function(e,t){const{className:o,elementType:a,ownerState:l,externalForwardedProps:i,getSlotOwnerState:s,internalForwardedProps:c}=t,d=(0,r.A)(t,S),{component:u,slots:p={[e]:void 0},slotProps:v={[e]:void 0}}=i,f=(0,r.A)(i,g),m=p[e]||a,w=(0,h.Y)(v[e],l),C=(0,A.p)((0,n.A)({className:o},d,{externalForwardedProps:"root"===e?f:void 0,externalSlotProps:w})),{props:{component:L},internalRef:M}=C,R=(0,r.A)(C.props,y),B=(0,b.A)(M,null==w?void 0:w.ref,t.ref),I=s?s(R):{},N=(0,n.A)({},l,I),P="root"===e?L||u:L,k=(0,x.X)(m,(0,n.A)({},"root"===e&&!u&&!p[e]&&c,"root"!==e&&!p[e]&&c,R,P&&{as:P},{ref:B}),N);return Object.keys(I).forEach((e=>{delete k[e]})),[m,k]}("img",{className:F.img,elementType:M,externalForwardedProps:{slots:v,slotProps:{img:(0,n.A)({},B,f.img)}},additionalProps:{alt:s,src:N,srcSet:P,sizes:I},ownerState:W});return z=$?(0,u.jsx)(O,(0,n.A)({},H)):c||0===c?c:T&&s?s[0]:(0,u.jsx)(R,{ownerState:W,className:F.fallback}),(0,u.jsx)(L,(0,n.A)({as:p,ownerState:W,className:(0,l.A)(F.root,d),ref:t},j,{children:z}))}))},37211:(e,t,o)=>{"use strict";o.d(t,{A:()=>S});var r=o(98587),n=o(58168),a=o(96540),l=o(34164),i=o(64111),s=o(771),c=o(11848),d=o(39770),u=o(3541),p=o(18850),v=o(2778),f=o(96852),m=o(32850),b=o(22927),h=o(74848);const A=["alignItems","autoFocus","component","children","dense","disableGutters","divider","focusVisibleClassName","selected","className"],x=(0,c.Ay)(p.A,{shouldForwardProp:e=>(0,d.A)(e)||"classes"===e,name:"MuiListItemButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.dense&&t.dense,"flex-start"===o.alignItems&&t.alignItemsFlexStart,o.divider&&t.divider,!o.disableGutters&&t.gutters]}})((({theme:e,ownerState:t})=>(0,n.A)({display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minWidth:0,boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${b.A.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,s.X4)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${b.A.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,s.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${b.A.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,s.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,s.X4)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${b.A.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${b.A.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},"flex-start"===t.alignItems&&{alignItems:"flex-start"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.dense&&{paddingTop:4,paddingBottom:4}))),S=a.forwardRef((function(e,t){const o=(0,u.A)({props:e,name:"MuiListItemButton"}),{alignItems:s="center",autoFocus:c=!1,component:d="div",children:p,dense:S=!1,disableGutters:g=!1,divider:y=!1,focusVisibleClassName:w,selected:C=!1,className:L}=o,M=(0,r.A)(o,A),R=a.useContext(m.A),B=a.useMemo((()=>({dense:S||R.dense||!1,alignItems:s,disableGutters:g})),[s,R.dense,S,g]),I=a.useRef(null);(0,v.A)((()=>{c&&I.current&&I.current.focus()}),[c]);const N=(0,n.A)({},o,{alignItems:s,dense:B.dense,disableGutters:g,divider:y,selected:C}),P=(e=>{const{alignItems:t,classes:o,dense:r,disabled:a,disableGutters:l,divider:s,selected:c}=e,d={root:["root",r&&"dense",!l&&"gutters",s&&"divider",a&&"disabled","flex-start"===t&&"alignItemsFlexStart",c&&"selected"]},u=(0,i.A)(d,b.Y,o);return(0,n.A)({},o,u)})(N),k=(0,f.A)(I,t);return(0,h.jsx)(m.A.Provider,{value:B,children:(0,h.jsx)(x,(0,n.A)({ref:k,href:M.href||M.to,component:(M.href||M.to)&&"div"===d?"button":d,focusVisibleClassName:(0,l.A)(P.focusVisible,w),ownerState:N,className:(0,l.A)(P.root,L)},M,{classes:P,children:p}))})}))},47363:(e,t,o)=>{"use strict";o.d(t,{A:()=>z});var r=o(98587),n=o(58168),a=o(96540),l=o(34164),i=o(64111),s=o(11848),c=o(3541),d=o(20561),u=o(74848);const p=(0,d.A)((0,u.jsx)("path",{d:"M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"}),"CheckCircle"),v=(0,d.A)((0,u.jsx)("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"}),"Warning");var f=o(75765),m=o(27553),b=o(17245);function h(e){return(0,b.Ay)("MuiStepIcon",e)}const A=(0,m.A)("MuiStepIcon",["root","active","completed","error","text"]);var x;const S=["active","className","completed","error","icon"],g=(0,s.Ay)(f.A,{name:"MuiStepIcon",slot:"Root",overridesResolver:(e,t)=>t.root})((({theme:e})=>({display:"block",transition:e.transitions.create("color",{duration:e.transitions.duration.shortest}),color:(e.vars||e).palette.text.disabled,[`&.${A.completed}`]:{color:(e.vars||e).palette.primary.main},[`&.${A.active}`]:{color:(e.vars||e).palette.primary.main},[`&.${A.error}`]:{color:(e.vars||e).palette.error.main}}))),y=(0,s.Ay)("text",{name:"MuiStepIcon",slot:"Text",overridesResolver:(e,t)=>t.text})((({theme:e})=>({fill:(e.vars||e).palette.primary.contrastText,fontSize:e.typography.caption.fontSize,fontFamily:e.typography.fontFamily}))),w=a.forwardRef((function(e,t){const o=(0,c.A)({props:e,name:"MuiStepIcon"}),{active:a=!1,className:s,completed:d=!1,error:f=!1,icon:m}=o,b=(0,r.A)(o,S),A=(0,n.A)({},o,{active:a,completed:d,error:f}),w=(e=>{const{classes:t,active:o,completed:r,error:n}=e,a={root:["root",o&&"active",r&&"completed",n&&"error"],text:["text"]};return(0,i.A)(a,h,t)})(A);if("number"==typeof m||"string"==typeof m){const e=(0,l.A)(s,w.root);return f?(0,u.jsx)(g,(0,n.A)({as:v,className:e,ref:t,ownerState:A},b)):d?(0,u.jsx)(g,(0,n.A)({as:p,className:e,ref:t,ownerState:A},b)):(0,u.jsxs)(g,(0,n.A)({className:e,ref:t,ownerState:A},b,{children:[x||(x=(0,u.jsx)("circle",{cx:"12",cy:"12",r:"12"})),(0,u.jsx)(y,{className:w.text,x:"12",y:"12",textAnchor:"middle",dominantBaseline:"central",ownerState:A,children:m})]}))}return m}));var C=o(98624),L=o(91382);function M(e){return(0,b.Ay)("MuiStepLabel",e)}const R=(0,m.A)("MuiStepLabel",["root","horizontal","vertical","label","active","completed","error","disabled","iconContainer","alternativeLabel","labelContainer"]),B=["children","className","componentsProps","error","icon","optional","slotProps","StepIconComponent","StepIconProps"],I=(0,s.Ay)("span",{name:"MuiStepLabel",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.orientation]]}})((({ownerState:e})=>(0,n.A)({display:"flex",alignItems:"center",[`&.${R.alternativeLabel}`]:{flexDirection:"column"},[`&.${R.disabled}`]:{cursor:"default"}},"vertical"===e.orientation&&{textAlign:"left",padding:"8px 0"}))),N=(0,s.Ay)("span",{name:"MuiStepLabel",slot:"Label",overridesResolver:(e,t)=>t.label})((({theme:e})=>(0,n.A)({},e.typography.body2,{display:"block",transition:e.transitions.create("color",{duration:e.transitions.duration.shortest}),[`&.${R.active}`]:{color:(e.vars||e).palette.text.primary,fontWeight:500},[`&.${R.completed}`]:{color:(e.vars||e).palette.text.primary,fontWeight:500},[`&.${R.alternativeLabel}`]:{marginTop:16},[`&.${R.error}`]:{color:(e.vars||e).palette.error.main}}))),P=(0,s.Ay)("span",{name:"MuiStepLabel",slot:"IconContainer",overridesResolver:(e,t)=>t.iconContainer})((()=>({flexShrink:0,display:"flex",paddingRight:8,[`&.${R.alternativeLabel}`]:{paddingRight:0}}))),k=(0,s.Ay)("span",{name:"MuiStepLabel",slot:"LabelContainer",overridesResolver:(e,t)=>t.labelContainer})((({theme:e})=>({width:"100%",color:(e.vars||e).palette.text.secondary,[`&.${R.alternativeLabel}`]:{textAlign:"center"}}))),j=a.forwardRef((function(e,t){var o;const s=(0,c.A)({props:e,name:"MuiStepLabel"}),{children:d,className:p,componentsProps:v={},error:f=!1,icon:m,optional:b,slotProps:h={},StepIconComponent:A,StepIconProps:x}=s,S=(0,r.A)(s,B),{alternativeLabel:g,orientation:y}=a.useContext(C.A),{active:R,disabled:j,completed:z,icon:E}=a.useContext(L.A),T=m||E;let $=A;T&&!$&&($=w);const W=(0,n.A)({},s,{active:R,alternativeLabel:g,completed:z,disabled:j,error:f,orientation:y}),F=(e=>{const{classes:t,orientation:o,active:r,completed:n,error:a,disabled:l,alternativeLabel:s}=e,c={root:["root",o,a&&"error",l&&"disabled",s&&"alternativeLabel"],label:["label",r&&"active",n&&"completed",a&&"error",l&&"disabled",s&&"alternativeLabel"],iconContainer:["iconContainer",r&&"active",n&&"completed",a&&"error",l&&"disabled",s&&"alternativeLabel"],labelContainer:["labelContainer",s&&"alternativeLabel"]};return(0,i.A)(c,M,t)})(W),O=null!=(o=h.label)?o:v.label;return(0,u.jsxs)(I,(0,n.A)({className:(0,l.A)(F.root,p),ref:t,ownerState:W},S,{children:[T||$?(0,u.jsx)(P,{className:F.iconContainer,ownerState:W,children:(0,u.jsx)($,(0,n.A)({completed:z,active:R,error:f,icon:T},x))}):null,(0,u.jsxs)(k,{className:F.labelContainer,ownerState:W,children:[d?(0,u.jsx)(N,(0,n.A)({ownerState:W},O,{className:(0,l.A)(F.label,null==O?void 0:O.className),children:d})):null,b]})]}))}));j.muiName="StepLabel";const z=j},82997:(e,t,o)=>{"use strict";o.d(t,{A:()=>A});var r=o(98587),n=o(58168),a=o(96540),l=o(34164),i=o(64111),s=o(98624),c=o(91382),d=o(3541),u=o(11848),p=o(27553),v=o(17245);function f(e){return(0,v.Ay)("MuiStep",e)}(0,p.A)("MuiStep",["root","horizontal","vertical","alternativeLabel","completed"]);var m=o(74848);const b=["active","children","className","component","completed","disabled","expanded","index","last"],h=(0,u.Ay)("div",{name:"MuiStep",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.orientation],o.alternativeLabel&&t.alternativeLabel,o.completed&&t.completed]}})((({ownerState:e})=>(0,n.A)({},"horizontal"===e.orientation&&{paddingLeft:8,paddingRight:8},e.alternativeLabel&&{flex:1,position:"relative"}))),A=a.forwardRef((function(e,t){const o=(0,d.A)({props:e,name:"MuiStep"}),{active:u,children:p,className:v,component:A="div",completed:x,disabled:S,expanded:g=!1,index:y,last:w}=o,C=(0,r.A)(o,b),{activeStep:L,connector:M,alternativeLabel:R,orientation:B,nonLinear:I}=a.useContext(s.A);let[N=!1,P=!1,k=!1]=[u,x,S];L===y?N=void 0===u||u:!I&&L>y?P=void 0===x||x:!I&&L<y&&(k=void 0===S||S);const j=a.useMemo((()=>({index:y,last:w,expanded:g,icon:y+1,active:N,completed:P,disabled:k})),[y,w,g,N,P,k]),z=(0,n.A)({},o,{active:N,orientation:B,alternativeLabel:R,completed:P,disabled:k,expanded:g,component:A}),E=(e=>{const{classes:t,orientation:o,alternativeLabel:r,completed:n}=e,a={root:["root",o,r&&"alternativeLabel",n&&"completed"]};return(0,i.A)(a,f,t)})(z),T=(0,m.jsxs)(h,(0,n.A)({as:A,className:(0,l.A)(E.root,v),ref:t,ownerState:z},C,{children:[M&&R&&0!==y?M:null,p]}));return(0,m.jsx)(c.A.Provider,{value:j,children:M&&!R&&0!==y?(0,m.jsxs)(a.Fragment,{children:[M,T]}):T})}))},91382:(e,t,o)=>{"use strict";o.d(t,{A:()=>r});const r=o(96540).createContext({})},39738:(e,t,o)=>{"use strict";o.d(t,{A:()=>L});var r=o(98587),n=o(58168),a=o(96540),l=o(34164),i=o(64111),s=o(3541),c=o(11848),d=o(27553),u=o(17245);function p(e){return(0,u.Ay)("MuiStepper",e)}(0,d.A)("MuiStepper",["root","horizontal","vertical","alternativeLabel"]);var v=o(28466),f=o(98624),m=o(91382);function b(e){return(0,u.Ay)("MuiStepConnector",e)}(0,d.A)("MuiStepConnector",["root","horizontal","vertical","alternativeLabel","active","completed","disabled","line","lineHorizontal","lineVertical"]);var h=o(74848);const A=["className"],x=(0,c.Ay)("div",{name:"MuiStepConnector",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.orientation],o.alternativeLabel&&t.alternativeLabel,o.completed&&t.completed]}})((({ownerState:e})=>(0,n.A)({flex:"1 1 auto"},"vertical"===e.orientation&&{marginLeft:12},e.alternativeLabel&&{position:"absolute",top:12,left:"calc(-50% + 20px)",right:"calc(50% + 20px)"}))),S=(0,c.Ay)("span",{name:"MuiStepConnector",slot:"Line",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.line,t[`line${(0,v.A)(o.orientation)}`]]}})((({ownerState:e,theme:t})=>{const o="light"===t.palette.mode?t.palette.grey[400]:t.palette.grey[600];return(0,n.A)({display:"block",borderColor:t.vars?t.vars.palette.StepConnector.border:o},"horizontal"===e.orientation&&{borderTopStyle:"solid",borderTopWidth:1},"vertical"===e.orientation&&{borderLeftStyle:"solid",borderLeftWidth:1,minHeight:24})})),g=a.forwardRef((function(e,t){const o=(0,s.A)({props:e,name:"MuiStepConnector"}),{className:c}=o,d=(0,r.A)(o,A),{alternativeLabel:u,orientation:p="horizontal"}=a.useContext(f.A),{active:g,disabled:y,completed:w}=a.useContext(m.A),C=(0,n.A)({},o,{alternativeLabel:u,orientation:p,active:g,completed:w,disabled:y}),L=(e=>{const{classes:t,orientation:o,alternativeLabel:r,active:n,completed:a,disabled:l}=e,s={root:["root",o,r&&"alternativeLabel",n&&"active",a&&"completed",l&&"disabled"],line:["line",`line${(0,v.A)(o)}`]};return(0,i.A)(s,b,t)})(C);return(0,h.jsx)(x,(0,n.A)({className:(0,l.A)(L.root,c),ref:t,ownerState:C},d,{children:(0,h.jsx)(S,{className:L.line,ownerState:C})}))})),y=["activeStep","alternativeLabel","children","className","component","connector","nonLinear","orientation"],w=(0,c.Ay)("div",{name:"MuiStepper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.orientation],o.alternativeLabel&&t.alternativeLabel]}})((({ownerState:e})=>(0,n.A)({display:"flex"},"horizontal"===e.orientation&&{flexDirection:"row",alignItems:"center"},"vertical"===e.orientation&&{flexDirection:"column"},e.alternativeLabel&&{alignItems:"flex-start"}))),C=(0,h.jsx)(g,{}),L=a.forwardRef((function(e,t){const o=(0,s.A)({props:e,name:"MuiStepper"}),{activeStep:c=0,alternativeLabel:d=!1,children:u,className:v,component:m="div",connector:b=C,nonLinear:A=!1,orientation:x="horizontal"}=o,S=(0,r.A)(o,y),g=(0,n.A)({},o,{alternativeLabel:d,orientation:x,component:m}),L=(e=>{const{orientation:t,alternativeLabel:o,classes:r}=e,n={root:["root",t,o&&"alternativeLabel"]};return(0,i.A)(n,p,r)})(g),M=a.Children.toArray(u).filter(Boolean),R=M.map(((e,t)=>a.cloneElement(e,(0,n.A)({index:t,last:t+1===M.length},e.props)))),B=a.useMemo((()=>({activeStep:c,alternativeLabel:d,connector:b,nonLinear:A,orientation:x})),[c,d,b,A,x]);return(0,h.jsx)(f.A.Provider,{value:B,children:(0,h.jsx)(w,(0,n.A)({as:m,ownerState:g,className:(0,l.A)(L.root,v),ref:t},S,{children:R}))})}))},98624:(e,t,o)=>{"use strict";o.d(t,{A:()=>r});const r=o(96540).createContext({})},10423:(e,t,o)=>{"use strict";o.d(t,{A:()=>x});var r=o(98587),n=o(58168),a=o(96540),l=o(34164),i=o(64111),s=o(18850),c=o(28466),d=o(3541),u=o(11848),p=o(27553),v=o(17245);function f(e){return(0,v.Ay)("MuiTab",e)}const m=(0,p.A)("MuiTab",["root","labelIcon","textColorInherit","textColorPrimary","textColorSecondary","selected","disabled","fullWidth","wrapped","iconWrapper"]);var b=o(74848);const h=["className","disabled","disableFocusRipple","fullWidth","icon","iconPosition","indicator","label","onChange","onClick","onFocus","selected","selectionFollowsFocus","textColor","value","wrapped"],A=(0,u.Ay)(s.A,{name:"MuiTab",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.label&&o.icon&&t.labelIcon,t[`textColor${(0,c.A)(o.textColor)}`],o.fullWidth&&t.fullWidth,o.wrapped&&t.wrapped]}})((({theme:e,ownerState:t})=>(0,n.A)({},e.typography.button,{maxWidth:360,minWidth:90,position:"relative",minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center"},t.label&&{flexDirection:"top"===t.iconPosition||"bottom"===t.iconPosition?"column":"row"},{lineHeight:1.25},t.icon&&t.label&&{minHeight:72,paddingTop:9,paddingBottom:9,[`& > .${m.iconWrapper}`]:(0,n.A)({},"top"===t.iconPosition&&{marginBottom:6},"bottom"===t.iconPosition&&{marginTop:6},"start"===t.iconPosition&&{marginRight:e.spacing(1)},"end"===t.iconPosition&&{marginLeft:e.spacing(1)})},"inherit"===t.textColor&&{color:"inherit",opacity:.6,[`&.${m.selected}`]:{opacity:1},[`&.${m.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}},"primary"===t.textColor&&{color:(e.vars||e).palette.text.secondary,[`&.${m.selected}`]:{color:(e.vars||e).palette.primary.main},[`&.${m.disabled}`]:{color:(e.vars||e).palette.text.disabled}},"secondary"===t.textColor&&{color:(e.vars||e).palette.text.secondary,[`&.${m.selected}`]:{color:(e.vars||e).palette.secondary.main},[`&.${m.disabled}`]:{color:(e.vars||e).palette.text.disabled}},t.fullWidth&&{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"},t.wrapped&&{fontSize:e.typography.pxToRem(12)}))),x=a.forwardRef((function(e,t){const o=(0,d.A)({props:e,name:"MuiTab"}),{className:s,disabled:u=!1,disableFocusRipple:p=!1,fullWidth:v,icon:m,iconPosition:x="top",indicator:S,label:g,onChange:y,onClick:w,onFocus:C,selected:L,selectionFollowsFocus:M,textColor:R="inherit",value:B,wrapped:I=!1}=o,N=(0,r.A)(o,h),P=(0,n.A)({},o,{disabled:u,disableFocusRipple:p,selected:L,icon:!!m,iconPosition:x,label:!!g,fullWidth:v,textColor:R,wrapped:I}),k=(e=>{const{classes:t,textColor:o,fullWidth:r,wrapped:n,icon:a,label:l,selected:s,disabled:d}=e,u={root:["root",a&&l&&"labelIcon",`textColor${(0,c.A)(o)}`,r&&"fullWidth",n&&"wrapped",s&&"selected",d&&"disabled"],iconWrapper:["iconWrapper"]};return(0,i.A)(u,f,t)})(P),j=m&&g&&a.isValidElement(m)?a.cloneElement(m,{className:(0,l.A)(k.iconWrapper,m.props.className)}):m;return(0,b.jsxs)(A,(0,n.A)({focusRipple:!p,className:(0,l.A)(k.root,s),ref:t,role:"tab","aria-selected":L,disabled:u,onClick:e=>{!L&&y&&y(e,B),w&&w(e)},onFocus:e=>{M&&!L&&y&&y(e,B),C&&C(e)},ownerState:P,tabIndex:L?0:-1},N,{children:["top"===x||"start"===x?(0,b.jsxs)(a.Fragment,{children:[j,g]}):(0,b.jsxs)(a.Fragment,{children:[g,j]}),S]}))}))},20240:(e,t,o)=>{"use strict";o.d(t,{A:()=>G});var r=o(98587),n=o(58168),a=o(96540),l=(o(20002),o(34164)),i=o(18730),s=o(64111),c=o(73788),d=o(11848),u=o(3541),p=o(44675),v=o(1935);let f;function m(){if(f)return f;const e=document.createElement("div"),t=document.createElement("div");return t.style.width="10px",t.style.height="1px",e.appendChild(t),e.dir="rtl",e.style.fontSize="14px",e.style.width="4px",e.style.height="1px",e.style.position="absolute",e.style.top="-1000px",e.style.overflow="scroll",document.body.appendChild(e),f="reverse",e.scrollLeft>0?f="default":(e.scrollLeft=1,0===e.scrollLeft&&(f="negative")),document.body.removeChild(e),f}function b(e,t){const o=e.scrollLeft;if("rtl"!==t)return o;switch(m()){case"negative":return e.scrollWidth-e.clientWidth+o;case"reverse":return e.scrollWidth-e.clientWidth-o;default:return o}}function h(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}var A=o(2778),x=o(93749),S=o(74848);const g=["onChange"],y={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};var w=o(16445),C=o(60124),L=o(18850),M=o(27553),R=o(17245);function B(e){return(0,R.Ay)("MuiTabScrollButton",e)}const I=(0,M.A)("MuiTabScrollButton",["root","vertical","horizontal","disabled"]),N=["className","slots","slotProps","direction","orientation","disabled"],P=(0,d.Ay)(L.A,{name:"MuiTabScrollButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.orientation&&t[o.orientation]]}})((({ownerState:e})=>(0,n.A)({width:40,flexShrink:0,opacity:.8,[`&.${I.disabled}`]:{opacity:0}},"vertical"===e.orientation&&{width:"100%",height:40,"& svg":{transform:`rotate(${e.isRtl?-90:90}deg)`}}))),k=a.forwardRef((function(e,t){var o,a;const d=(0,u.A)({props:e,name:"MuiTabScrollButton"}),{className:p,slots:v={},slotProps:f={},direction:m}=d,b=(0,r.A)(d,N),h=(0,c.I)(),A=(0,n.A)({isRtl:h},d),x=(e=>{const{classes:t,orientation:o,disabled:r}=e,n={root:["root",o,r&&"disabled"]};return(0,s.A)(n,B,t)})(A),g=null!=(o=v.StartScrollButtonIcon)?o:w.A,y=null!=(a=v.EndScrollButtonIcon)?a:C.A,L=(0,i.Q)({elementType:g,externalSlotProps:f.startScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:A}),M=(0,i.Q)({elementType:y,externalSlotProps:f.endScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:A});return(0,S.jsx)(P,(0,n.A)({component:"div",className:(0,l.A)(x.root,p),ref:t,role:null,ownerState:A,tabIndex:null},b,{children:"left"===m?(0,S.jsx)(g,(0,n.A)({},L)):(0,S.jsx)(y,(0,n.A)({},M))}))}));var j=o(83034),z=o(6533),E=o(96248);const T=["aria-label","aria-labelledby","action","centered","children","className","component","allowScrollButtonsMobile","indicatorColor","onChange","orientation","ScrollButtonComponent","scrollButtons","selectionFollowsFocus","slots","slotProps","TabIndicatorProps","TabScrollButtonProps","textColor","value","variant","visibleScrollbar"],$=(e,t)=>e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:e.firstChild,W=(e,t)=>e===t?e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:e.lastChild,F=(e,t,o)=>{let r=!1,n=o(e,t);for(;n;){if(n===e.firstChild){if(r)return;r=!0}const t=n.disabled||"true"===n.getAttribute("aria-disabled");if(n.hasAttribute("tabindex")&&!t)return void n.focus();n=o(e,n)}},O=(0,d.Ay)("div",{name:"MuiTabs",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[{[`& .${z.A.scrollButtons}`]:t.scrollButtons},{[`& .${z.A.scrollButtons}`]:o.scrollButtonsHideMobile&&t.scrollButtonsHideMobile},t.root,o.vertical&&t.vertical]}})((({ownerState:e,theme:t})=>(0,n.A)({overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex"},e.vertical&&{flexDirection:"column"},e.scrollButtonsHideMobile&&{[`& .${z.A.scrollButtons}`]:{[t.breakpoints.down("sm")]:{display:"none"}}}))),H=(0,d.Ay)("div",{name:"MuiTabs",slot:"Scroller",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.scroller,o.fixed&&t.fixed,o.hideScrollbar&&t.hideScrollbar,o.scrollableX&&t.scrollableX,o.scrollableY&&t.scrollableY]}})((({ownerState:e})=>(0,n.A)({position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap"},e.fixed&&{overflowX:"hidden",width:"100%"},e.hideScrollbar&&{scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},e.scrollableX&&{overflowX:"auto",overflowY:"hidden"},e.scrollableY&&{overflowY:"auto",overflowX:"hidden"}))),D=(0,d.Ay)("div",{name:"MuiTabs",slot:"FlexContainer",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.flexContainer,o.vertical&&t.flexContainerVertical,o.centered&&t.centered]}})((({ownerState:e})=>(0,n.A)({display:"flex"},e.vertical&&{flexDirection:"column"},e.centered&&{justifyContent:"center"}))),X=(0,d.Ay)("span",{name:"MuiTabs",slot:"Indicator",overridesResolver:(e,t)=>t.indicator})((({ownerState:e,theme:t})=>(0,n.A)({position:"absolute",height:2,bottom:0,width:"100%",transition:t.transitions.create()},"primary"===e.indicatorColor&&{backgroundColor:(t.vars||t).palette.primary.main},"secondary"===e.indicatorColor&&{backgroundColor:(t.vars||t).palette.secondary.main},e.vertical&&{height:"100%",width:2,right:0}))),V=(0,d.Ay)((function(e){const{onChange:t}=e,o=(0,r.A)(e,g),l=a.useRef(),i=a.useRef(null),s=()=>{l.current=i.current.offsetHeight-i.current.clientHeight};return(0,A.A)((()=>{const e=(0,v.A)((()=>{const e=l.current;s(),e!==l.current&&t(l.current)})),o=(0,x.A)(i.current);return o.addEventListener("resize",e),()=>{e.clear(),o.removeEventListener("resize",e)}}),[t]),a.useEffect((()=>{s(),t(l.current)}),[t]),(0,S.jsx)("div",(0,n.A)({style:y,ref:i},o))}))({overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),Y={},G=a.forwardRef((function(e,t){const o=(0,u.A)({props:e,name:"MuiTabs"}),d=(0,p.A)(),f=(0,c.I)(),{"aria-label":A,"aria-labelledby":g,action:y,centered:w=!1,children:C,className:L,component:M="div",allowScrollButtonsMobile:R=!1,indicatorColor:B="primary",onChange:I,orientation:N="horizontal",ScrollButtonComponent:P=k,scrollButtons:G="auto",selectionFollowsFocus:q,slots:Q={},slotProps:_={},TabIndicatorProps:U={},TabScrollButtonProps:K={},textColor:J="primary",value:Z,variant:ee="standard",visibleScrollbar:te=!1}=o,oe=(0,r.A)(o,T),re="scrollable"===ee,ne="vertical"===N,ae=ne?"scrollTop":"scrollLeft",le=ne?"top":"left",ie=ne?"bottom":"right",se=ne?"clientHeight":"clientWidth",ce=ne?"height":"width",de=(0,n.A)({},o,{component:M,allowScrollButtonsMobile:R,indicatorColor:B,orientation:N,vertical:ne,scrollButtons:G,textColor:J,variant:ee,visibleScrollbar:te,fixed:!re,hideScrollbar:re&&!te,scrollableX:re&&!ne,scrollableY:re&&ne,centered:w&&!re,scrollButtonsHideMobile:!R}),ue=(e=>{const{vertical:t,fixed:o,hideScrollbar:r,scrollableX:n,scrollableY:a,centered:l,scrollButtonsHideMobile:i,classes:c}=e,d={root:["root",t&&"vertical"],scroller:["scroller",o&&"fixed",r&&"hideScrollbar",n&&"scrollableX",a&&"scrollableY"],flexContainer:["flexContainer",t&&"flexContainerVertical",l&&"centered"],indicator:["indicator"],scrollButtons:["scrollButtons",i&&"scrollButtonsHideMobile"],scrollableX:[n&&"scrollableX"],hideScrollbar:[r&&"hideScrollbar"]};return(0,s.A)(d,z.H,c)})(de),pe=(0,i.Q)({elementType:Q.StartScrollButtonIcon,externalSlotProps:_.startScrollButtonIcon,ownerState:de}),ve=(0,i.Q)({elementType:Q.EndScrollButtonIcon,externalSlotProps:_.endScrollButtonIcon,ownerState:de}),[fe,me]=a.useState(!1),[be,he]=a.useState(Y),[Ae,xe]=a.useState(!1),[Se,ge]=a.useState(!1),[ye,we]=a.useState(!1),[Ce,Le]=a.useState({overflow:"hidden",scrollbarWidth:0}),Me=new Map,Re=a.useRef(null),Be=a.useRef(null),Ie=()=>{const e=Re.current;let t,o;if(e){const o=e.getBoundingClientRect();t={clientWidth:e.clientWidth,scrollLeft:e.scrollLeft,scrollTop:e.scrollTop,scrollLeftNormalized:b(e,f?"rtl":"ltr"),scrollWidth:e.scrollWidth,top:o.top,bottom:o.bottom,left:o.left,right:o.right}}if(e&&!1!==Z){const e=Be.current.children;if(e.length>0){const t=e[Me.get(Z)];o=t?t.getBoundingClientRect():null}}return{tabsMeta:t,tabMeta:o}},Ne=(0,j.A)((()=>{const{tabsMeta:e,tabMeta:t}=Ie();let o,r=0;if(ne)o="top",t&&e&&(r=t.top-e.top+e.scrollTop);else if(o=f?"right":"left",t&&e){const n=f?e.scrollLeftNormalized+e.clientWidth-e.scrollWidth:e.scrollLeft;r=(f?-1:1)*(t[o]-e[o]+n)}const n={[o]:r,[ce]:t?t[ce]:0};if(isNaN(be[o])||isNaN(be[ce]))he(n);else{const e=Math.abs(be[o]-n[o]),t=Math.abs(be[ce]-n[ce]);(e>=1||t>=1)&&he(n)}})),Pe=(e,{animation:t=!0}={})=>{t?function(e,t,o,r={},n=(()=>{})){const{ease:a=h,duration:l=300}=r;let i=null;const s=t[e];let c=!1;const d=r=>{if(c)return void n(new Error("Animation cancelled"));null===i&&(i=r);const u=Math.min(1,(r-i)/l);t[e]=a(u)*(o-s)+s,u>=1?requestAnimationFrame((()=>{n(null)})):requestAnimationFrame(d)};s===o?n(new Error("Element already at target position")):requestAnimationFrame(d)}(ae,Re.current,e,{duration:d.transitions.duration.standard}):Re.current[ae]=e},ke=e=>{let t=Re.current[ae];ne?t+=e:(t+=e*(f?-1:1),t*=f&&"reverse"===m()?-1:1),Pe(t)},je=()=>{const e=Re.current[se];let t=0;const o=Array.from(Be.current.children);for(let r=0;r<o.length;r+=1){const n=o[r];if(t+n[se]>e){0===r&&(t=e);break}t+=n[se]}return t},ze=()=>{ke(-1*je())},Ee=()=>{ke(je())},Te=a.useCallback((e=>{Le({overflow:null,scrollbarWidth:e})}),[]),$e=(0,j.A)((e=>{const{tabsMeta:t,tabMeta:o}=Ie();if(o&&t)if(o[le]<t[le]){const r=t[ae]+(o[le]-t[le]);Pe(r,{animation:e})}else if(o[ie]>t[ie]){const r=t[ae]+(o[ie]-t[ie]);Pe(r,{animation:e})}})),We=(0,j.A)((()=>{re&&!1!==G&&we(!ye)}));a.useEffect((()=>{const e=(0,v.A)((()=>{Re.current&&Ne()}));let t;const o=(0,x.A)(Re.current);let r;return o.addEventListener("resize",e),"undefined"!=typeof ResizeObserver&&(t=new ResizeObserver(e),Array.from(Be.current.children).forEach((e=>{t.observe(e)}))),"undefined"!=typeof MutationObserver&&(r=new MutationObserver((o=>{o.forEach((e=>{e.removedNodes.forEach((e=>{var o;null==(o=t)||o.unobserve(e)})),e.addedNodes.forEach((e=>{var o;null==(o=t)||o.observe(e)}))})),e(),We()})),r.observe(Be.current,{childList:!0})),()=>{var n,a;e.clear(),o.removeEventListener("resize",e),null==(n=r)||n.disconnect(),null==(a=t)||a.disconnect()}}),[Ne,We]),a.useEffect((()=>{const e=Array.from(Be.current.children),t=e.length;if("undefined"!=typeof IntersectionObserver&&t>0&&re&&!1!==G){const o=e[0],r=e[t-1],n={root:Re.current,threshold:.99},a=new IntersectionObserver((e=>{xe(!e[0].isIntersecting)}),n);a.observe(o);const l=new IntersectionObserver((e=>{ge(!e[0].isIntersecting)}),n);return l.observe(r),()=>{a.disconnect(),l.disconnect()}}}),[re,G,ye,null==C?void 0:C.length]),a.useEffect((()=>{me(!0)}),[]),a.useEffect((()=>{Ne()})),a.useEffect((()=>{$e(Y!==be)}),[$e,be]),a.useImperativeHandle(y,(()=>({updateIndicator:Ne,updateScrollButtons:We})),[Ne,We]);const Fe=(0,S.jsx)(X,(0,n.A)({},U,{className:(0,l.A)(ue.indicator,U.className),ownerState:de,style:(0,n.A)({},be,U.style)}));let Oe=0;const He=a.Children.map(C,(e=>{if(!a.isValidElement(e))return null;const t=void 0===e.props.value?Oe:e.props.value;Me.set(t,Oe);const o=t===Z;return Oe+=1,a.cloneElement(e,(0,n.A)({fullWidth:"fullWidth"===ee,indicator:o&&!fe&&Fe,selected:o,selectionFollowsFocus:q,onChange:I,textColor:J,value:t},1!==Oe||!1!==Z||e.props.tabIndex?{}:{tabIndex:0}))})),De=(()=>{const e={};e.scrollbarSizeListener=re?(0,S.jsx)(V,{onChange:Te,className:(0,l.A)(ue.scrollableX,ue.hideScrollbar)}):null;const t=re&&("auto"===G&&(Ae||Se)||!0===G);return e.scrollButtonStart=t?(0,S.jsx)(P,(0,n.A)({slots:{StartScrollButtonIcon:Q.StartScrollButtonIcon},slotProps:{startScrollButtonIcon:pe},orientation:N,direction:f?"right":"left",onClick:ze,disabled:!Ae},K,{className:(0,l.A)(ue.scrollButtons,K.className)})):null,e.scrollButtonEnd=t?(0,S.jsx)(P,(0,n.A)({slots:{EndScrollButtonIcon:Q.EndScrollButtonIcon},slotProps:{endScrollButtonIcon:ve},orientation:N,direction:f?"left":"right",onClick:Ee,disabled:!Se},K,{className:(0,l.A)(ue.scrollButtons,K.className)})):null,e})();return(0,S.jsxs)(O,(0,n.A)({className:(0,l.A)(ue.root,L),ownerState:de,ref:t,as:M},oe,{children:[De.scrollButtonStart,De.scrollbarSizeListener,(0,S.jsxs)(H,{className:ue.scroller,ownerState:de,style:{overflow:Ce.overflow,[ne?"margin"+(f?"Left":"Right"):"marginBottom"]:te?void 0:-Ce.scrollbarWidth},ref:Re,children:[(0,S.jsx)(D,{"aria-label":A,"aria-labelledby":g,"aria-orientation":"vertical"===N?"vertical":null,className:ue.flexContainer,ownerState:de,onKeyDown:e=>{const t=Be.current,o=(0,E.A)(t).activeElement;if("tab"!==o.getAttribute("role"))return;let r="horizontal"===N?"ArrowLeft":"ArrowUp",n="horizontal"===N?"ArrowRight":"ArrowDown";switch("horizontal"===N&&f&&(r="ArrowRight",n="ArrowLeft"),e.key){case r:e.preventDefault(),F(t,o,W);break;case n:e.preventDefault(),F(t,o,$);break;case"Home":e.preventDefault(),F(t,null,$);break;case"End":e.preventDefault(),F(t,null,W)}},ref:Be,role:"tablist",children:He}),fe&&Fe]}),De.scrollButtonEnd]}))}))},6533:(e,t,o)=>{"use strict";o.d(t,{A:()=>l,H:()=>a});var r=o(27553),n=o(17245);function a(e){return(0,n.Ay)("MuiTabs",e)}const l=(0,r.A)("MuiTabs",["root","vertical","flexContainer","flexContainerVertical","centered","scroller","fixed","scrollableX","scrollableY","hideScrollbar","scrollButtons","scrollButtonsHideMobile","indicator"])},49878:(e,t,o)=>{var r=o(96540);function n(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(o){if("default"!==o){var r=Object.getOwnPropertyDescriptor(e,o);Object.defineProperty(t,o,r.get?r:{enumerable:!0,get:function(){return e[o]}})}})),t.default=e,Object.freeze(t)}var a=n(r),l=function(e,t){var o=!1;return function(){o||(e(),o=!0,setTimeout((function(){o=!1}),t))}};t.A=function(e){var t=e.children,o=e.navContainerRef,n=e.parentScrollContainerRef,i=e.scrollThrottle,s=void 0===i?300:i,c=e.onUpdateCallback,d=e.offsetTop,u=void 0===d?0:d,p=e.offsetBottom,v=void 0===p?0:p,f=e.useDataAttribute,m=void 0===f?"to-scrollspy-id":f,b=e.activeClass,h=void 0===b?"active-scroll-spy":b,A=e.useBoxMethod,x=void 0===A||A,S=e.updateHistoryStack,g=void 0===S||S,y=r.useRef(null),w=r.useState(),C=w[0],L=w[1],M=r.useRef("");r.useEffect((function(){var e;L(o?null===(e=o.current)||void 0===e?void 0:e.querySelectorAll("[data-".concat(m,"]")):document.querySelectorAll("[data-".concat(m,"]")))}),[o]),r.useEffect((function(){R()}),[C]);var R=function(){var e=y.current;if(e&&C)for(var t=function(t){var o=e.children.item(t);if(function(e){var t=e.getBoundingClientRect();if(x){var o=l=(null==n?void 0:n.current)?null==n?void 0:n.current.offsetHeight:window.innerHeight,r=t.top;return o<t.top+l+v&&o>r-u}var a=(null==n?void 0:n.current)?.5*(null==n?void 0:n.current.offsetHeight):.5*window.innerHeight,l=(null==n?void 0:n.current)?null==n?void 0:n.current.offsetHeight:window.innerHeight;return t.top+a+u>=0&&t.bottom-a-v<=l}(o)){var r=o.id;return M.current===r?{value:void 0}:(C.forEach((function(e){var t=e.getAttribute("data-".concat(m));e.classList.contains(h)&&e.classList.remove(h),t!==r||e.classList.contains(h)||(e.classList.add(h),c&&c(r),M.current=r,g&&window.history.replaceState({},"","#".concat(r)))})),"break")}},o=0;o<e.children.length;o++){var r=t(o);if("object"==typeof r)return r.value;if("break"===r)break}};return r.useEffect((function(){var e;n?null===(e=n.current)||void 0===e||e.addEventListener("scroll",l(R,s)):window.addEventListener("scroll",l(R,s))})),a.createElement("div",{ref:y},t)}}}]);