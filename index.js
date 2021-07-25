import { RPNTransform, RPNCalc } from './quadrature';

document.getElementById('main-btn').onclick = () => {
  const str = document.getElementById('input').value;
  const RPNStr = RPNTransform(str);
  const result = RPNCalc(RPNStr);

  let tr = document.createElement('tr');

  let inputTd = document.createElement('td');
  inputTd.innerText = str;

  let rpnTd = document.createElement('td');
  rpnTd.innerText = RPNStr;

  let resultTd = document.createElement('td');
  resultTd.innerText = result;

  tr.appendChild(inputTd);
  tr.appendChild(rpnTd);
  tr.appendChild(resultTd);
  let tbody = document.getElementById('tbody');

  tbody.appendChild(tr);
};