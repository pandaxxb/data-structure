class SqQueue{
  _front = 0;
  _rear = 0;
  _arr = null;
  _MAX_LENGTH = null;
  constructor(length){
    this._MAX_LENGTH = length;
    this._arr = new Array(length);
  }

  getLength(){
    return (this._rear - this._front + this._MAX_LENGTH) % this._MAX_LENGTH;
  }

  isEmpty(){
    return this._rear === this._front;
  }

  _isFull(){
    return (this._rear + 1) % this._MAX_LENGTH === this._front;
  }

  enQueue(ele){
    if(this._isFull()){
      console.error('队列已满，无法插入新元素');
      return;
    }
    this._arr[this._rear] = ele;
    this._rear = (this._rear + 1) % this._MAX_LENGTH;
  }

  deQueue(){
    if(this.isEmpty()){
      console.error('队列为空，无元素可删除');
      return;
    }
    const ele = this[this._front];
    this[this._front] = undefined;
    this._front = (this._front + 1) % this._MAX_LENGTH;
    return ele;
  }
  

}