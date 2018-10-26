import { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { List, WhiteSpace, TextareaItem, WingBlank, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
@connect(({ edit, loading }) => ({
  edit,
  loading: loading.models.edit,
}))
@createForm({
  onValuesChange({ dispatch }, changedValues, allValues) {
    dispatch({
      type: 'edit/changeFormData',
      payload: {
        ...changedValues
      },
    });
  },
})
class Edit extends Component{
  componentDidMount(){
    const {match, form, dispatch } = this.props
    match.params.id && dispatch({
      type: 'edit/queryDetail',
      payload: {
        id: match.params.id,
      },
      callback: ()=>{
        form.setFieldsValue({...this.props.edit.formData})
      }
    })
  }
  render() {
    const { formIndex } = this.props.edit
    const { getFieldProps } = this.props.form;
    return (
      <WingBlank>
      {formIndex.length> 0 && formIndex.map((item)=>{
        return (
          <List renderHeader={() => `item${item}`} key={`input${item}`}>
            <TextareaItem
              autoHeight
              title="Key"
              {...getFieldProps(`item${item}Key`)}
              placeholder="key值需要唯一"
            >Key</TextareaItem>
            <TextareaItem
              autoHeight
              title="Value"
              {...getFieldProps(`item${item}Value`)}
              placeholder="value值"
            >Value</TextareaItem>
        </List>
        )
      })}
      <WhiteSpace size='lg'/>
      <WhiteSpace size='lg'/>
        <Button type="primary">保存</Button>
      <WhiteSpace size='lg'/>
      </WingBlank>
    );
  }
}
export default Edit