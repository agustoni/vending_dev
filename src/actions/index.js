export const increment = () => {
    return{
      type: "increment"
    }
  }
  
export const decrement = () => {
    return{
      type: "decrement"
    }
  }

export const numpadClick = () => {
  return{
    type: "CHANGE_CODE_NUMPAD"
  }
}