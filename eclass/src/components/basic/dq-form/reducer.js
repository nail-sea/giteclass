export const defaultState = {}
export function reducer(state, action){
  // console.log('reducer change, action = ', action)
  switch(action.type){
    case 'change':
      const {name, value} = action.payload
      return {...state, [name]:value}
    case 'reset':
      return defaultState
  }
}