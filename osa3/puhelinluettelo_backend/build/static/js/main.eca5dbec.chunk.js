(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),l=(t(19),t(2)),o=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("p",null,n.name,": ",n.number,r.a.createElement("button",{className:"delete",onClick:t},"Delete"))},i=function(e){var n=e.onSubmit,t=e.nameChange,a=e.name,u=e.numberChange,c=e.number;return r.a.createElement("form",{className:"form",onSubmit:n},r.a.createElement("div",null,"Name:",r.a.createElement("br",null),r.a.createElement("input",{onChange:t,value:a})),r.a.createElement("br",null),r.a.createElement("div",null,"Number:",r.a.createElement("br",null),r.a.createElement("input",{onChange:u,value:c})),r.a.createElement("div",null,r.a.createElement("button",{className:"add",type:"submit"},"Add")))},m=function(e){var n=e.filterNames;return r.a.createElement("form",null,"Filter names",r.a.createElement("br",null),r.a.createElement("input",{onChange:n}))},s=t(3),f=t.n(s),d="/api/persons",b=function(){return f.a.get(d).then((function(e){return e.data}))},h=function(e){return f.a.post(d,e).then((function(e){return e.data}))},E=function(e,n){return f.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return f.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"message"},n)},g=function(e){var n=e.errorMessage;return null===n?null:r.a.createElement("div",{className:"error"},n)},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)("add new person"),s=Object(l.a)(c,2),f=s[0],d=s[1],w=Object(a.useState)("add new number"),j=Object(l.a)(w,2),O=j[0],y=j[1],N=Object(a.useState)(""),S=Object(l.a)(N,2),C=S[0],k=S[1],P=Object(a.useState)(null),A=Object(l.a)(P,2),M=A[0],D=A[1],H=Object(a.useState)(null),J=Object(l.a)(H,2),L=J[0],T=J[1];Object(a.useEffect)((function(){b().then((function(e){u(e)}))}),[]);var x=t.filter((function(e){return e.name.toLowerCase().includes(C.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{message:M}),r.a.createElement(g,{errorMessage:L}),r.a.createElement(m,{filterNames:function(e){k(e.target.value)}}),r.a.createElement("h2",null,"Add New Person"),r.a.createElement(i,{onSubmit:function(e){e.preventDefault();var n={name:f,number:O};if(t.some((function(e){return e.name===f&&window.confirm("".concat(f," is already in the phonebook. Replace the old number with the new one?"))}))){var a=t.find((function(e){return e.name===f}));E(a.id,n).then((function(e){u(t.map((function(n){return n.id===a.id?e:n}))),D("".concat(n.name," updated succesfully!"))})).catch((function(e){T("Something went wrong while trying to update details. Hit refresh")}))}else h(n).then((function(e){u(t.concat(e)),d(""),y(""),D("".concat(n.name," added succesfully!"))})),setTimeout((function(){D(null)}),1e4)},name:f,nameChange:function(e){d(e.target.value)},number:O,numberChange:function(e){y(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement("div",null,x.map((function(e,n){return r.a.createElement(o,{key:n,person:e,deletePerson:function(){return n=e.id,a=e.name,void(window.confirm("Are you sure you want to delete ".concat(a,"?"))&&(p(n).then((function(){D("".concat(a," deleted succesfully!")),u(t.filter((function(e){return e.id!==n})))})).catch((function(e){T("".concat(a," has already been deleted! Hit refresh")),u(t.filter((function(e){return e.id!==n})))})),setTimeout((function(){D(null),T(null)}),1e4)));var n,a}})}))))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.eca5dbec.chunk.js.map