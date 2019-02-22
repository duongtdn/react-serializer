" use strict"

import React from 'react'

export function serialize(element) {
  const children = _recursiveCloneChildren(element.props.children) 
  const props = {...element.props}
  delete props.children
  const type = typeof element.type  === 'string' ? element.type : element.type.name
  return JSON.stringify({props, type, children})    
    
    function _recursiveCloneChildren(children) {
      return  React.Children.toArray(children).map( child => {
                if (!child.type) {
                  return child
                }
                let children = null
                if (child.props && child.props.children) {
                  children = _recursiveCloneChildren(child.props.children)
                }
                const type = typeof child.type  === 'string' ? child.type : child.type.name
                if (children) {
                  const props = {...child.props}
                  delete props.children
                  return {
                    type, props, children
                  }
                } else {
                  return {
                    type, props: {...child.props}
                  }
                }                
              })
    }
}

export function deserialize(data, addon) {
  const tree = JSON.parse(data)  
  const children = tree.children.map(el => _recursiveCreateElement(el))
  const type = addon[tree.type] || tree.type
  return React.createElement(type, tree.props, children)

  function _recursiveCreateElement(el) {      
    if (!el.type) {
      return el
    }      
    let children = []
    if (el.children) {
      children = el.children.map(child => _recursiveCreateElement(child))
    }
    const type = addon[el.type] || el.type
    if (children.length > 0) {        
      return React.createElement(type, {key: Math.random().toString(36).substr(2,9), ...el.props}, children)
    } else {     
      return React.createElement(type, {key: Math.random().toString(36).substr(2,9), ...el.props})
    }
  }

}