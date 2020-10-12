/**
 * react-redux
 * 1.<Provider store={store} > <App></Provider>
 * 为所有的子组件提供store(context)
 * 2.context 函数
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }
  //  声明向子组件提供哪些context属性
  static childcontextTypes = {
    store: PropTypes.object.isRequired
  }
  //  给子组件提供store,返回context对象
  getChildcontext() {
    return {
      store: this.props.store
    }
  }
  // 渲染所有子标签
  render() {
    return this.props.children;
  }
}

export function context(mapStateToProps, mapDispatchToProps){
  // 返回一个函数,接收一个组件
  return (WrapComponent)=>{
    // 返回一个容器组件
    return class contextComponent extends Component{
      // 声明要获取的context的属性
      static contextTypes = {
        store:PropTypes.object.isRequired
      }

      constructor(porps,context){
        super(props,context)
        // 获取store
        const store = this.context.store
        // 包含一般属性的对象
        const stateProps = mapStateToProps(store.getState())
        // 包含函数属性的对象
        const dispatchProps = this.bindActionCreators(mapDispatchToProps)
        // 将所有一般属性到state
        this.state = { ...stateProps }
        // 將所有函数属性保存到组件对象
        this.dispatchProps = dispatchProps
      }
      // 根据mapDispatchToProps返回一个包含分发action的函数的对象
      bindActionCreators = (mapDispatchToProps)=> {
        return Object.keys(mapDispatchToProps).reduce((preDispatchToProps,key)=>{
        //  添加一个包含dispatch函数的方法 
          preDispatchToProps[key] = (...args)=>{
            this.context.store.dispatch(mapDispatchToProps[key](...args))
          }
          return preDispatchToProps
        },{})
      }
      componentDidMount(){
        // 订阅监听
        const store = this.context.store
        store.subscribe(()=>{//redux产生了新的state
          // 更新当前组件的状态
          this.setState(mapStateToProps(store.getState()))
        })
      }
      render() {
        return <WrapComponent {...this.state} {...this.dispatchProps} />
      }
    }
  }
}