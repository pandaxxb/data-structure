import { KMP } from './KMP';

class MyString extends String{

  constructor(str){
    super(str);
  }

  index(subStr, start = 0){
    return KMP(this, subStr, true, start);
  }

  concat(...args){
    return args.reduce((acc, cur) => {
      return acc += cur;
    }, this);
  }
  
  endWith(str, position = this.length){
    const endLength = str.length;
    if(position < endLength){
      return false;
    }
    for(let i = 0; i < endLength; i++){
      if(this[position - endLength + i] !== str[i]){
        return false;
      }
    }
    return true;
  }

  isEqual(str){
    const length = this.length;
    if(length !== str.length){
      return false;
    }
    let result = true;
    for(let i = 0; i < length; i++){
      if(this[i] !== str[i]){
        result = false;
        break;
      }
    }
    return result;
  }
}

export function main(str, subStr){
  const myStr = new MyString(str);
  console.log(myStr.index(subStr));
}