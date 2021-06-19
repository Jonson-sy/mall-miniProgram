import myRequest from './network'

export function getMultiData() {
 return myRequest({
    url:'/home/multidata',
  })
}

export function getGoodsData(type,page){
  return myRequest({
    url:'/home/data',
    data:{
      type,
      page
    }
  })
}