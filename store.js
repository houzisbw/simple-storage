if(!window.localStorage){
  alert('您的浏览器不支持localStorage!');
}
let storage = {
  /**
   * get方法,获取localStorage中的值
   *
   * @param {string} key localStorage的key
   * @returns {*} 返回localStorage中的value
   */
  get:function(key){
    if(typeof key !== 'string'){
      throw new Error('storage key must be string!')
    }
    let result = JSON.parse(localStorage.getItem(key));
    //result为null，不存在
    if(result===null)return ''
    let now = +new Date();
    if(!result.__expire__)return result.value;
    //缓存时间过期
    if(parseInt(result.__expire__,10)<now){
      this.remove(key)
      return ''
    }
    return result.value
  },

  /**
   * set方法,存储key和value到localStorage中
   *
   * @param {string} key 要存储的key
   * @param {*} value 要存储的value
   * @param {number} expire 过期时间，单位为秒
   */
  set:function(key,value,expire){
    if(typeof key !== 'string'){
      throw new Error('storage key must be string!')
    }
    if(typeof value === 'function'){
      value = value.toString()
    }
    let jsonValue;
    if(isNaN(expire)){
      //未设置过期时间
      jsonValue = JSON.stringify({value:value})
    }else{
      //设置过期时间
      jsonValue = JSON.stringify({
        __expire__:+new Date()+expire*1000,
        value:value
      })
    }
    localStorage.setItem(key,jsonValue)
  },

  /**
   * has方法,查找localStorage中是否有key对应的value
   *
   * @param {string} key 要查找的key
   * @returns {boolean} 返回值为true或false
   */
  has:function(key){
    if(typeof key !== 'string'){
      throw new Error('storage key must be string!')
    }
    let value = localStorage.getItem(key)
    return value!==null
  },

  /**
   * clear方法,清空整个localStorage
   */
  clear:function(){
    localStorage.clear();
  },

  /**
   * remove方法,删除localStorage中是特定的key和value
   *
   * @param {string} key 要删除的key
   */
  remove:function(key){
    if(typeof key !== 'string'){
      throw new Error('storage key must be string!')
    }
    localStorage.removeItem(key)
  },

  /**
   * size方法,获取localStorage的已经存储的容量和条数
   *
   * @returns {number} count localStorage中已存储的条目数
   * @returns {number} size localStorage中已存储的容量，单位为kb
   */
  size:function(){
    let total = 0,len = localStorage.length;
    for(let i=0;i<len;i++){
      let key = localStorage.key(i);
      total += localStorage.getItem(key).length
    }
    return {
      count:len,
      size:(total/1024).toFixed(2)+'KB'
    }
  },
};
export default storage
