export const formatNumber=n=>new Intl.NumberFormat().format(n);
export const plural=(n,word)=>`${word}${n===1?'':'s'}`;
export const ordinal=n=>{const s=['th','st','nd','rd'];const v=n%100;return n+(s[(v-20)%10]||s[v]||s[0])};
export const hourLabel=h=>`${h%12||12}${h<12?' AM':' PM'}`;
