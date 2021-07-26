// import { RPNTransform, RPNCalc } from './src/quadrature';
import { main } from './src/string/string';
import { KMP, ArticleWordAnalysis } from './src/string/KMP';

document.getElementById('main-btn').onclick = () => {
  const text = document.getElementById('textarea').value;
  console.log(ArticleWordAnalysis(text));
}

// 四则运算初步解析
// document.getElementById('main-btn').onclick = () => {
//   const str = document.getElementById('input').value;
//   const RPNStr = RPNTransform(str);
//   const result = RPNCalc(RPNStr);

//   let tr = document.createElement('tr');

//   let inputTd = document.createElement('td');
//   inputTd.innerText = str;

//   let rpnTd = document.createElement('td');
//   rpnTd.innerText = RPNStr;

//   let resultTd = document.createElement('td');
//   resultTd.innerText = result;

//   tr.appendChild(inputTd);
//   tr.appendChild(rpnTd);
//   tr.appendChild(resultTd);
//   let tbody = document.getElementById('tbody');

//   tbody.appendChild(tr);
// };

// document.getElementById('main-btn').onclick = () => {
//   const str = document.getElementById('input').value;
//   const subStr = document.getElementById('input-sub').value;
//   console.time('find time');
//   main(str, subStr);
//   console.timeEnd('find time');
// }

// document.getElementById('secondary-btn').onclick = () => {
//   const str = document.getElementById('input').value;
//   const subStr = document.getElementById('input-sub').value;
//   console.time('kmp find time');
//   for(let i = 0; i < 1000; i++){
//     KMP(str, subStr);
//   } 
//   console.timeEnd('kmp find time');
// }

// document.getElementById('third-btn').onclick = () => {
//   const str = document.getElementById('input').value;
//   const subStr = document.getElementById('input-sub').value;
//   console.time('kmp pro find time');
//   for(let i = 0; i < 1000; i++){
//     KMP(str, subStr, true);
//   }
//   console.timeEnd('kmp pro find time');
// }