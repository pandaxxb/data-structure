export default class Stack{
  _top = -1;
  _MAX_LENGTH = null;
  _arr = [];

  constructor(length){
    this._MAX_LENGTH = length;
    this._arr = new Array(length);
  }

  push(ele){
    if(this.top === this._MAX_LENGTH - 1){
      console.error('栈已满');
      return;
    }
    this._top++;
    this._arr[this._top] = ele;
  }

  pop(ele){
    if(this.top === -1){
      console.error('栈为空');
      return;
    }
    const e = this._arr[this._top];
    this._arr[this._top] = undefined;
    this._top--;
    return e;
  }

  getTopEle(){
    if(this._top === -1){
      console.error('空栈');
      return;
    }
    return this._arr[this._top];
  }

  isEmpty(){
    return this._top === -1;
  }
}