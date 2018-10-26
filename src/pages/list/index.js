import { Component } from 'react';
import { connect } from 'dva';
import {
  Accordion,
  List,
  Badge,
  Flex,
  WhiteSpace,
  Button,
  NoticeBar,
  Icon,
  Toast,
  Modal
} from 'antd-mobile';
import router from 'umi/router';
import Loading from './../../components/Loading'
import './index.scss';
const prompt = Modal.prompt;
class Index extends Component {
  componentDidMount() {
    Loading.show()
    this.props.dispatch({
      type: 'list/queryList',
      payload: {page: 1},
      callback: ()=>{Loading.close()}
    })
  }
  redirctTo(path) {
    router.push(path);
  }
  onChange(key) {
    console.log(key);
  }
  addCMSconfig() {
    const _self = this
    const addConfig = (values)=>{
      _self.props.dispatch({
        type: 'list/addConfig',
        payload: {name: values},
        callback: ()=>Toast.info('新增成功')
      })
    }
    prompt('新增CMS配置', '配置名称', [
      { text: '取消' },
      {
        text: '确定', onPress: (values) => addConfig(values)
      },
    ], 'default', '')
  }
  switchBadge(status){
    status
  }
  renderPanelHeader(item) {
    return (
      <Flex>
        <Flex.Item>
          <Badge text="新" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#f19736', borderRadius: 2 }} />
          <span style={{ marginLeft: 12 }}>{item.name+'主题页配置'}</span>
        </Flex.Item>
      </Flex>
    )
  }
  render() {
    const { data } = this.props
    return (
      <div className='listPage'>
        <NoticeBar onClick={() => { this.addCMSconfig() }} mode="link" action={<span>新增配置</span>} icon={<Icon type="check-circle-o" size="xxs" />}>
          CMS配置列表
        </NoticeBar>
        <WhiteSpace />
        <Accordion className="my-accordion" onChange={this.onChange}>
          {
            data.list.length > 0 && data.list.map((item, index) => {
              return (
                <Accordion.Panel header={this.renderPanelHeader(item)} key={'list' + index} style={{ marginBottom: 15 }}>
                  <List className="my-list" >
                    <List.Item extra={
                        <Button type="primary" size="small" inline 
                        onClick={() => { this.redirctTo(`edit/${encodeURIComponent(item.id)}`) }}>
                        编辑</Button>
                    }>
                      {'cmsId：' + item.id}
                      <List.Item.Brief>{'时间：' + item.time}</List.Item.Brief>
                    </List.Item>
                  </List>
                </Accordion.Panel>
              )
            })
          }
        </Accordion>
      </div>
    );
  }
}
export default connect(state => {
  return {
    data: state.list
  };
})(Index);
