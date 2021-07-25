import Stack from './stack';

const opList = ['+', '-', '*', '/'];
const leftScope = ['(', '[', '{'];
const rightScope = [')', ']', '}'];
const opPriority = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
}

export function RPNTransform(str){
  const arr = str.split('');
  let opStr = '';
  let stack = new Stack(str.length);
  arr.reduce((acc, cur, index) => {
    // 处理字符
    if([...opList, ...leftScope, ...rightScope].indexOf(cur) !== -1){
      // 将当前数字添加到结果字符串中
      if(acc !== ''){
        opStr += `${acc} `;
      }
      if(stack.isEmpty()){
        stack.push(cur);
      }
      else{
        const indexRight = rightScope.indexOf(cur);
        let topEle;
        // 处理右括号
        if(indexRight !== -1){
          do{
            topEle = stack.pop();
            opStr += `${topEle} `;
          }while(!stack.isEmpty() && stack.getTopEle() !== leftScope[indexRight])
          stack.pop(); // 将符号栈中对应的左括号出栈
          // 当右括号为当前输入字符串最后一个字符时
          if(index === arr.length - 1){
            while(!stack.isEmpty()){
              opStr += `${stack.pop()} `;
            }
          }
        }
        /**
         * 需要将当前符号入栈的情景
         * 1.当前符号为左括号
         * 2.栈顶元素为左括号
         * 3.栈顶元素为+或-，当前符号为*或/
         */
        else if(leftScope.indexOf(cur) !== -1 || leftScope.indexOf(stack.getTopEle()) !== -1 || opPriority[stack.getTopEle()] < opPriority[cur]){
          stack.push(cur);
        }
        else{
          // 将符号栈内直到左括号为止的所有符号依次出栈并添加到结果字符串，将当前符号入栈
          do{
            topEle = stack.pop();
            opStr += `${topEle} `;
          }while(!stack.isEmpty() && leftScope.indexOf(stack.getTopEle()) === -1)
          stack.push(cur)
        }
      }
      return '';
    }
    else{
      // 处理数字
      acc += cur;
      // 所有字符处理完毕后，将符号栈内剩余元素依次弹出
      if(index === arr.length - 1){
        opStr += `${acc} `;
        while(!stack.isEmpty()){
          opStr += `${stack.pop()} `;
        }
        return '';
      }
      return acc;
    }
  }, '')
  console.log('NPR transform result:', opStr);
  // 移除末尾多余空格
  return opStr.slice(0, -1);
}

export function RPNCalc(str){
  const RPNArr = str.split(' ');
  let stack = new Stack(RPNArr.length);
  const result = RPNArr.reduce((acc, cur, index) => {
    if(opList.indexOf(cur) !== -1){
      const secondNum = stack.pop();
      const firstNum = stack.pop();
      switch(cur){
        case '+':
          stack.push(firstNum + secondNum);
          break;
        case '-':
          stack.push(firstNum - secondNum);
          break;
        case '*':
          stack.push(firstNum * secondNum);
          break;
        case '/':
          stack.push(firstNum / secondNum);
          break;
      }
    }
    else{
      stack.push(parseFloat(cur));
    }
    if(index === RPNArr.length - 1){
      acc = stack.pop();
      return acc;
    }
  }, '');
  return result;
}