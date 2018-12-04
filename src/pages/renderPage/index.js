import { Component } from 'react';
const componentList = [
  {name: 'Header',content: '打包头部'},{name: 'Content',content: '打包内容'}
]
class RenderPage extends Component{
  renderComponent(item){
    let Item = require(`./../../components/${item.name}`)
    return <Item key={`component_${item.name}`} {...item}/>
  }
  render() {
    return (
      <div>
      {
        componentList.map((item)=>{
          return this.renderComponent(item)
        })
      }
      </div>
    )
  }
}

export default RenderPage