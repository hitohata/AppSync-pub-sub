(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{8534:function(e,n,i){Promise.resolve().then(i.bind(i,2675))},2675:function(e,n,i){"use strict";i.r(n),i.d(n,{TopPage:function(){return c}});var a=i(3827),t=i(4090),d=i(4033),l=i(2707);let s={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetDemo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"demo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"datetime"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},r={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"subscription",name:{kind:"Name",value:"DemoSubscription"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NamedType",name:{kind:"Name",value:"ID"}},defaultValue:{kind:"StringValue",value:"",block:!1}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"onAddDemo"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"datetime"}},{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},o=e=>{let{id:n,description:i,datetime:t}=e;return(0,a.jsxs)("div",{className:"py-3",children:[(0,a.jsx)("h3",{children:"id: ".concat(n)}),(0,a.jsx)("p",{children:"description: ".concat(i)}),(0,a.jsx)("p",{children:"datetime: ".concat(t)})]})};d.V.configure({API:{GraphQL:{endpoint:"https://jfrm72hzzbbwtbqpmo4rrpsrga.appsync-api.us-west-2.amazonaws.com/graphql",region:"us-east-2",defaultAuthMode:"apiKey",apiKey:"da2-oxqvry6rj5exvoma7lrc4qmw6y"}}});let u=async()=>(0,l.d)().graphql({query:s,variables:{id:1}}),c=()=>{let[e,n]=(0,t.useState)(null),[i,d]=(0,t.useState)([]);(0,t.useEffect)(()=>{u().then(e=>{e.data&&n(e.data)})},[]),(0,t.useEffect)(()=>{let e=(0,l.d)().graphql({query:r,variables:{id:1}}).subscribe({next:e=>{s(e.data.onAddDemo)}});return()=>e.unsubscribe()},[]);let s=e=>{d(n=>[...n,e])};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("section",{children:[(0,a.jsx)("h2",{children:"Query Result"}),e?(0,a.jsx)(o,{...e.demo}):(0,a.jsx)("p",{children:"none"})]}),(0,a.jsxs)("section",{children:[(0,a.jsx)("h2",{children:"Subscription Result"}),(null==i?void 0:i.length)>0&&i.map((e,n)=>(0,t.createElement)(o,{...e,key:n.toString()}))]})]})}}},function(e){e.O(0,[253,971,69,744],function(){return e(e.s=8534)}),_N_E=e.O()}]);