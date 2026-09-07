import {useMemo,useReducer} from 'react';
import {parseChat} from './lib/parser.js';
import {computeStats} from './lib/stats.js';
import DropZone from './components/DropZone.jsx';
import Deck from './components/Deck.jsx';
import ErrorPanel from './components/ErrorPanel.jsx';

const initial={status:'idle',messages:[],index:0,error:''};
function reducer(s,a){switch(a.type){case'PARSE':return{...s,status:'ready',messages:a.messages,index:0,error:''};case'ERROR':return{...s,status:'error',messages:[],index:0,error:a.error};case'RESET':return initial;case'NEXT':return{...s,index:s.index+1};case'PREV':return{...s,index:s.index-1};default:return s}}
export default function App(){const[s,dispatch]=useReducer(reducer,initial);const stats=useMemo(()=>computeStats(s.messages),[s.messages]);
 async function handleFile(file){try{dispatch({type:'PARSE_START'});const text=await file.text();const messages=parseChat(text);if(!messages.length)throw Error('No chat messages were recognised. Check the export format.');dispatch({type:'PARSE',messages})}catch(e){dispatch({type:'ERROR',error:e.message||'Could not parse this file.'})}}
 if(s.status==='error')return <ErrorPanel error={s.error} onReset={()=>dispatch({type:'RESET'})}/>;
 if(s.status!=='ready')return <DropZone onFile={handleFile}/>;
 return <Deck stats={stats} index={s.index} onPrev={()=>dispatch({type:'PREV'})} onNext={()=>dispatch({type:'NEXT'})}/>}
