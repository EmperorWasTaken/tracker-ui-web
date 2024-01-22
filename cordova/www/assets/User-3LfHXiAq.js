import{r as l,y as x,H as V,b as f,c as s,a as u,w as y,I as p,d as t,t as m,u as _,o as n,n as v}from"./index-NCVY5sBe.js";const U={class:"dashboard-page"},w=t("h1",null,"USER",-1),N={key:0,class:"menu"},C=t("span",{class:"material-icons"},"how_to_reg",-1),A=t("span",{class:"text"},"Register",-1),B=t("span",{class:"material-icons"},"login",-1),H=t("span",{class:"text"},"Login",-1),L={key:1},S={key:2},D=t("p",null,"A tiny violin",-1),E={key:3},M=t("span",{class:"material-icons"},"logout",-1),R=t("span",{class:"text"},"Logout",-1),j={__name:"User",setup(W){const e=l(null),d=l(null);l(null),l();const r=l(""),i=l(""),c=l("");l(""),x(()=>{e.value=V.auth.user(),V.auth.onAuthStateChange((h,a)=>{e.value=(a==null?void 0:a.user)??null})});const b=()=>{console.log(e)};d.value,r.value,i.value,c.value;const k=async()=>{const h={name:d.value,age:Number(r.value),height:Number(i.value),weight:Number(c.value)};await V.auth.update({data:h,options:{refresh:!0}}),console.log("updated user data")};return(h,a)=>{const g=f("router-link");return n(),s("main",U,[w,e.value?p("",!0):(n(),s("div",N,[u(g,{to:"/register",class:"button"},{default:y(()=>[C,A]),_:1}),u(g,{to:"/login",class:"button"},{default:y(()=>[B,H]),_:1})])),e.value?(n(),s("div",L,[t("p",null,"Name: "+m(e.value?e.value.user_metadata.name:""),1),t("p",null,"Age: "+m(e.value?e.value.user_metadata.age:""),1),t("p",null,"Height: "+m(e.value?e.value.user_metadata.height:""),1),t("p",null,"Weight: "+m(e.value?e.value.user_metadata.weight:""),1)])):p("",!0),e.value?(n(),s("div",S,[D,t("button",{onClick:b},"Log user"),u(_(v),{type:"text",modelValue:d.value,"onUpdate:modelValue":a[0]||(a[0]=o=>d.value=o),placeholder:"Name"},null,8,["modelValue"]),u(_(v),{type:"text",modelValue:r.value,"onUpdate:modelValue":a[1]||(a[1]=o=>r.value=o),placeholder:"Age"},null,8,["modelValue"]),u(_(v),{type:"text",modelValue:i.value,"onUpdate:modelValue":a[2]||(a[2]=o=>i.value=o),placeholder:"Height"},null,8,["modelValue"]),u(_(v),{type:"text",modelValue:c.value,"onUpdate:modelValue":a[3]||(a[3]=o=>c.value=o),placeholder:"Weight"},null,8,["modelValue"]),t("button",{onClick:k},"Update user data")])):p("",!0),e.value?(n(),s("div",E,[u(g,{to:"/logout",class:"button"},{default:y(()=>[M,R]),_:1})])):p("",!0)])}}};export{j as default};