import Taro, { useReducer } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import {reducer, defaultState} from './reducer'
import FormContext from "./context";
import * as utils from './utils'
import './index.scss'

function BasicForm (props){
  const [state, dispatch] = useReducer(reducer, defaultState)
  const {renderHeader, renderFooter, onSubmit, validate, style} = props
  const {children} = props
  const submit = () => {
    for (let index = 0; index < validate.length; index++) {
      const {name, rules} = validate[index];
      const value = state[name]
      const errMsg = utils.validate(rules, value, name)
      if(!errMsg) continue
      onSubmit({errMsg, name:name})
      return
    }
    //需要在onSubmit中return一个Promise.resolve()
    (onSubmit(null, {values:state}) || Promise.reject('表单未重置')).then(() => {
      dispatch({type:'reset'})
    })
    .catch(() => {})
  }
  return (
    <FormContext.Provider value={{state, dispatch, submit}}>
      <View className="dq-form dq-form-wrap">
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false} className="dq-form dq-form-container" scrollY style={style}>
          {children}
        </ScrollView>
        {renderFooter()}
      </View>
    </FormContext.Provider>
  );

}
BasicForm.options = {
  addGlobalClass: true
}
BasicForm.defaultProps = {
  renderHeader: () => { },
  renderFooter: () => { },
  onSubmit: () => { },
  validate: []
}
export default BasicForm;
