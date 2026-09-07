export const dayKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const daysBetween=(a,b)=>Math.ceil(Math.abs(b-a)/864e5);
export const monthName=d=>d.toLocaleString(undefined,{month:'long'});
export const weekdayIndex=d=>d.getDay();
