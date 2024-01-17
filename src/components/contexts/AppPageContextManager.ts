import React, { useState } from 'react'

export const AppPageContext = React.createContext({
  page: "#repositories",
  setPage: () => {}
})

export const AppPageContextProvider = (props) => {

  const setPage = (page) => {
    setState({...state, page: page})
  }

  const initState = {
    page: "#repositories",
    setPage: setPage
  } 

  const [state, setState] = useState(initState)

  return (
    <AppPageContext.Provider value={state}>
      {props.children}
    </AppPageContext.Provider>
  )
}