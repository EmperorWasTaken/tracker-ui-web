import{r as a,c as V,d as f,a as s,u as n,f as R,I as g,t as b,J as x,o as r,K as B,n as d}from"./index-NCVY5sBe.js";const q={class:"surface-0 flex justify-content-center"},U={id:"home",class:"landing-wrapper overflow-hidden"},w={class:"card"},C={key:0},K={__name:"Tracker",setup(E){const u=a(null),c=a(),i=a(""),p=a(""),m=a(""),v=a(""),y=a([{name:"Mifflin-St Jeor Equation",code:"M"},{name:"Revised Harris-Benedict Equation",code:"H"},{name:"Katch-McArdle Formula",code:"K"}]),o=a(y[0]),h=a([{name:"Male",code:"M"},{name:"Female",code:"F"}]),M=()=>{try{u.value=null}catch(t){console.error("Could not set BMR to 0:",t)}},k=async()=>{try{const t={age:parseInt(i.value),height:parseInt(p.value),weight:parseInt(m.value),gender:c.value.code,bf:o&&o.value.code==="K"?parseInt(v.value):void 0,eq:o.value.code},e=await x("feature","calculations/bmr",t);u.value=e.data}catch(t){console.error("Error posting BMR:",t)}};return(t,e)=>(r(),V("main",q,[f("div",U,[f("div",w,[s(n(B),{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=l=>o.value=l),options:y.value,optionLabel:"name",placeholder:"Equations"},null,8,["modelValue","options"]),s(n(d),{type:"text",modelValue:i.value,"onUpdate:modelValue":e[1]||(e[1]=l=>i.value=l),placeholder:"Age"},null,8,["modelValue"]),s(n(d),{type:"text",modelValue:p.value,"onUpdate:modelValue":e[2]||(e[2]=l=>p.value=l),placeholder:"Height"},null,8,["modelValue"]),s(n(d),{type:"text",modelValue:m.value,"onUpdate:modelValue":e[3]||(e[3]=l=>m.value=l),placeholder:"Weight"},null,8,["modelValue"]),o.value&&o.value.code==="K"?(r(),R(n(d),{key:0,type:"text",modelValue:v.value,"onUpdate:modelValue":e[4]||(e[4]=l=>v.value=l),placeholder:"Bodyfat %"},null,8,["modelValue"])):g("",!0),s(n(B),{modelValue:c.value,"onUpdate:modelValue":e[5]||(e[5]=l=>c.value=l),options:h.value,optionLabel:"name",placeholder:"Gender"},null,8,["modelValue","options"])]),f("button",{onClick:k},"Calculate BMR"),u.value!==null?(r(),V("p",C,"BMR: "+b(u.value),1)):g("",!0),u.value!==null?(r(),V("button",{key:1,onClick:M},"Reset BMR")):g("",!0)])]))}};export{K as default};
