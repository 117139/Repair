const finish = (that) => {
  return () => {
    that.setData({
      htmlStatus: {
        state: 'finish',
        message: '加载完成'
      }
    })
  }
}
const loading = (that) => {
  return () => {
    that.setData({
      htmlStatus: {
        state: 'loading',
        message: '加载中'
      }
    })
  }
}
const dataNull = (that) => {
  return () => {
    that.setData({
      htmlStatus: {
        state: 'dataNull',
        message: '暂无数据'
      }
    })
  }
}
const error = (that) => {
  return () => {
    that.setData({
      htmlStatus: {
        state: 'error',
        message: '加载失败,请点击重试'
      }
    })
  }
}
export default (that) => {
  return {
    finish: finish(that),
    loading: loading(that),
    error: error(that),
    dataNull: dataNull(that)
  }
}