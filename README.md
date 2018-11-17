# simple-storage-ls
A simple localStorage encapsulation

# Install
```
npm install simple-storage-ls --save
yarn add simple-storage-ls
```
# Usage
```js
import storage from 'simple-storage-ls'

//support expire time in seconds
//expires in 10 seconds
storage.set('name','Kobe',10)

//support object,array,function
storage.set('info',{a:1,b:2})
var info = storage.get('info') //{a:1,b:2}

storage.set('fn',function(){alert(1)})

//check key existance
storage.has('info') //true

//remove specified key
storage.remove('info')

//clear all localStorage
storage.clear()

//get localStorage's count and used size
storage.size() //{count:1,size:'2.02KB'}

```
