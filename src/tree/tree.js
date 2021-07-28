import { SqQueue } from '../queue/queue';

const POINTER_TAG_ENUM = {
  'LINK': 0,
  'THREAD': 1,
};

class treeNode{
  data = null;
  lChild = null;
  rChild = null;
  constructor(data){
    this.data = data;
  }

  set lChild(node){
    this.lChild = node;
  }

  get lChild(){
    return this.lChild;
  }

  set rChild(node){
    this.rChild = node;
  }

  get rChild(){
    return this.rChild;
  }

  get data(){
    return this.data;
  }
}

class thrTreeNode extends treeNode{
  lTag = POINTER_TAG_ENUM.LINK;
  rTag = POINTER_TAG_ENUM.LINK;

  constructor(data){
    super(data);
  }

  get lTag(){
    return this.lTag;
  }

  set lTag(tag){
    this.lTag = tag;
  }

  get rTag(){
    return this.rTag;
  }

  set rTag(tag){
    this.rTag = tag;
  }
}

class tree{
  _deep = 0;
  _nodeNumber = 0;
  _root = null;
  _index = 0;
  _traverseQueue = null;
  _printQueue = null;
  constructor(){
  }

  isEmpty(){
    return this._nodeNumber === 0;
  }
  
  init(nodeList){
    this._index = 0;
    this._root = this._createNode(nodeList);
  }

  _createNode(nodeList){
    const data = nodeList[this._index++];
    if(data === '#' || data === undefined){
      return null;
    }
    let node = new treeNode(data);
    node.lChild = this._createNode(nodeList);
    node.rChild = this._createNode(nodeList);
    this._nodeNumber++;
    return node;
  }

  _preOrderTraverse(tree){
    if(tree === null){
      return;
    }
    console.log(tree.data);
    this._preOrderTraverse(tree.lChild);
    this._preOrderTraverse(tree.rChild);
  }

  _inOrderTraverse(tree){
    if(tree === null){
      return;
    }

    this._inOrderTraverse(tree.lChild);
    console.log(tree.data);
    this._inOrderTraverse(tree.rChild);
  }

  _postOrderTraverse(tree){
    if(tree === null){
      return;
    }

    this._postOrderTraverse(tree.lChild);
    this._postOrderTraverse(tree.rChild);
    console.log(tree.data);
  }

  preOrderTraverse(){
    this._preOrderTraverse(this._root);
  }

  inOrderTraverse(){
    this._inOrderTraverse(this._root);
  }

  postOrderTraverse(){
    this._postOrderTraverse(this._root);
  }

  _wideTraverse(){
    if(this._traverseQueue.isEmpty()){
      return;
    }
    const curNode = this._traverseQueue.deQueue();
    if(curNode !== null){
      console.log(curNode.data);
      this._traverseQueue.enQueue(curNode.lChild);
      this._traverseQueue.enQueue(curNode.rChild);
    }
    this._wideTraverse();
  }

  wideTraverse(){
    this._traverseQueue = new SqQueue(this._nodeNumber);
    this._traverseQueue.enQueue(this._root);
    this._wideTraverse();
  }

  _levelPrint(printArr){
    this._deep++;
    let tempQueue = new SqQueue(2 ** (this._deep));
    let printStr = [];
    let flag = false;
    while(!this._printQueue.isEmpty()){
      let node = this._printQueue.deQueue();
      if(node === null){
        printStr.push(' ');
        tempQueue.enQueue(null);
        tempQueue.enQueue(null);
      }
      else{
        flag = true;
        printStr.push(node.data);
        tempQueue.enQueue(node.lChild);
        tempQueue.enQueue(node.rChild);
      }
    }
    if(!flag){
      this._printQueue = null;
      return;
    }
    printArr.push(printStr);
    this._printQueue = tempQueue;
    this._levelPrint(printArr);
  }

  _getPrintPos(){
    let arr = [];

    arr[this._deep]
  }

  print(){
    let printArr = [];
    this._printQueue = new SqQueue(1);
    this._printQueue.enQueue(this._root);
    this._levelPrint(printArr);
    printArr.forEach((arr, index) => {
      const startCount = 2 ** (this._deep - index - 1) - 1;
      const separateCount = 2 ** (this._deep - index) - 1;
      const separateStr = new Array(separateCount).fill(' ').join('');

      let printStr = new Array(startCount).fill(' ').join('');
      for(let i = 0; i < arr.length; i++){
        printStr += `${arr[i]}${separateStr}`;
      }
      console.log(printStr.substring(0, 2 ** this._deep));
    });
  }

  traverse(){
    console.log('----------preOrderStart----------')
    this.preOrderTraverse();
    console.log('----------preOrderEnd----------')
    console.log('----------inOrderStart----------')
    this.inOrderTraverse();
    console.log('----------inOrderEnd----------')
    console.log('----------postOrderStart----------')
    this.postOrderTraverse();
    console.log('----------postOrderEnd----------')
    console.log('----------wideTraverseStart----------')
    this.wideTraverse();
    console.log('----------wideTraverseEnd----------')
    console.log('----------printStart----------')
    this.print();
    console.log('----------printEnd----------')
  }
}

class thrTree extends tree{
  rChild = null;
  lChild = null;
  _pre = null;

  constructor(){
    super();
  }

  init(nodeList){
    super._index = 0;
    this.lChild = super._root = this._createNode(nodeList);
  }

  _createNode(nodeList){
    const data = nodeList[this._index++];
    if(data === '#' || data === undefined){
      return null;
    }
    let node = new thrTreeNode(data);
    node.lChild = this._createNode(nodeList);
    node.rChild = this._createNode(nodeList);
    this._nodeNumber++;
    return node;
  }

  _inThreading(tree){
    if(tree === null){
      return;
    }
    this.rChild = tree;
    this._inThreading(tree.lChild);
    if(tree.lChild === null){
      tree.lTag = POINTER_TAG_ENUM.THREAD;
      tree.lChild = this._pre;
    }
    if(this._pre.rChild === null){
      this._pre.rTag = POINTER_TAG_ENUM.THREAD;
      this._pre.rChild = tree;
    }
    this._pre = tree;
    this._inThreading(tree.rChild);
  }
 
  preThreading(tree){
    if(tree === null){
      return;
    }
    this.rChild = tree;
    if(tree.lChild === null){
      tree.lTag = POINTER_TAG_ENUM.THREAD;
      tree.lChild = this._pre;
    }
    if(this._pre && this._pre.rChild === null){
      this._pre.rTag = POINTER_TAG_ENUM.THREAD;
      this._pre.rChild = tree;
    }
    this._pre = tree;
    if(tree.lTag !== POINTER_TAG_ENUM.THREAD){
      this.preThreading(tree.lChild);
    }
    if(tree.rTag !== POINTER_TAG_ENUM.THREAD){
      this.preThreading(tree.rChild);
    }
    if(tree === this){
      this.rChild.rChild = this;
      this.rChild.rTag = POINTER_TAG_ENUM.THREAD;
    }
  }

  preOrderTraverse_thread(tree){
    let next = tree.lChild;
    while(next !== tree){
      while(next.lTag === POINTER_TAG_ENUM.LINK){
        console.log(next.data);
        next = next.lChild;
      }
      
      console.log(next.data);

      next = next.rChild;
      
      // if(next.rTag === POINTER_TAG_ENUM.LINK){
      //   next = next.rChild;
      // }
      // else{
      //   while(next.rTag === POINTER_TAG_ENUM.THREAD && next.rChild !== tree){
      //     next = next.rChild;
      //   }
      //   if(next.rChild === tree){
      //     break;
      //   }
      // }
    }
  }

  inThreading(){
    this._pre = this;
    this._inThreading(this._root);
    this.rChild.rChild = this;
    this.rChild.rTag = POINTER_TAG_ENUM.THREAD;
  }

  inOrderTraverse_thread(tree){
    let next = tree.lChild;
    while(next !== this){
      while(next.lTag === POINTER_TAG_ENUM.LINK){
        next = next.lChild;
      }
      console.log(next.data);

      while(next.rTag === POINTER_TAG_ENUM.THREAD && next.rChild !== this){
        next = next.rChild;
        console.log(next.data);
      }
      
      next = next.rChild;
    }
  }

  inOrderTraverseReverse_thread(tree){
    let pre = tree.rChild;
    while(pre !== this){
      while(pre.rTag === POINTER_TAG_ENUM.LINK){
        pre = pre.rChild;
      }
      console.log(pre.data);

      while(pre.lTag === POINTER_TAG_ENUM.THREAD && pre.lChild !== this){
        pre = pre.lChild;
        console.log(pre.data);
      }
      
      pre = pre.lChild;
    } 
  }

}

export function main(){
  let biTree = new thrTree();
  
  biTree.init('ABC###DE##F#G###'.split(''));

  // biTree.traverse();
  biTree.preThreading(biTree);
  // console.log(biTree);
  biTree.preOrderTraverse_thread(biTree);

  // biTree.inOrderTraverse_thread(biTree);

  // console.log('-------------reverse---------');

  // biTree.inOrderTraverseReverse_thread(biTree);
}