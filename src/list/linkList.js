
class LinkListEle{
  _next = null
  constructor(data){
    this._data = data
  }
  
  setNext(nextEle){
    this._next = nextEle
  }
  
  getNext(){
    return this._next
  }
  
  getData(){
    return this._data
  }
}

class LinkList{
  _length = 0
  _next = null
  constructor(){
    
  }
  
  _getEle(index){
    if(index > this._length){
      console.error('元素不存在')
      return;
    }
    let i = 1;
    let p = this._next
    while(p !== null && i < index){
      p = p.getNext();
      i++;
    }
    if(p === null || i > index){
      console.error(`第${index}个元素不存在`)
      return;
    }
    return p;
  }
  
  getData(index){
    const ele = this._getEle(index);
    if(ele === null){
      return
    }
    return ele.getData();
  }
  
  insert(index, data){
    if(index > this._length + 1){
      console.log('插入位置错误')
      return
    }
    let insertEle = new LinkListEle(data);
    if(index === 1){
      insertEle.setNext(this._next);
      this._next = insertEle
    }
    else{
      let p = this._getEle(index - 1);
      insertEle.setNext(p.getNext());
      p.setNext(insertEle) 
    }
    this._length++
    return
  }
  
  delete(index){
    if(index > this._length + 1){
      console.log('删除位置错误')
      return
    }
    const deletedEle = this._getEle(index);
    if(index === 1){
      this._next = deletedEle.getNext();
    }
    else{
      let p = this._getEle(index - 1);
      p.setNext(deletedEle.getNext())
    }
    this._length--;
    return deletedEle.getData()
  }

  init(count){
    let curEle = null;
    for(let i = 0; i < count; i++){
      const p = new LinkListEle(Math.floor(Math.random() * 100))
      if(i === 0){
        this._next = p;
      }
      else{
        curEle.setNext(p)
      }
      curEle = p;
      this._length++
      // console.log(this.toString())
    }
  }

  initHead(count){
    for(let i = 0; i < count; i++){
      this.insert(1, Math.floor(Math.random() * 100))
      console.log(this.toString())
    }
  }

  clear(){
    let p = this._next
    let q = null
    while(p){
      q = p.next;
      p.setNext(null)
      p = q;
    }
    this._length = 0;
    this._next = null
  }

  toString(){
    let str = '';
    let p = this._next;
    for(let i = 0; i < this._length; i++){
      str += `->${p.getData()}`
      p = p.getNext();
    }
    return str;
  }
}

window.main = function() {
  console.clear();
  let linkList = new LinkList();
  linkList.initHead(5);
  linkList.clear()
  console.log(linkList.toString());
}