/**
 * redux
 * 1.createStore 创造store对象 (getState,dispatch,subscribe)
 * 2.combineReducer 合并reducers函数,返回一个新的reducer函数，以此实现单一store
 */

export function createStore(reducer) {
  // 状态对象
  let state;
  // 监听者列表
  let listens = [];
  // 初始化state
  state = reducer(undefined, {
    type: '@test'
  });

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listens.forEach((listen) => listen())
  }

  function subscribe(listen) {
    listens.push(listen)
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

/**
 * 合并reducer,返回一个新的reducer函数
 */
export function combineReducers(reducers) {
  // state默认为{}
  return function (state = {}, action) {
    return Object.keys(reducers).reduce((newstate, key) => {
      newstate[key] = reducers[key](state[key], action)
      return newstate
    }, {})
  }
}