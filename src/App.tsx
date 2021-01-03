import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TopPage from './components/pages/top_page'
import { Provider, defaultTheme } from '@adobe/react-spectrum'
import SearchResultPage from './components/pages/search_result_page'
import DetailPage from 'components/pages/detail_page'


function App() {
  return (
    <Provider theme={defaultTheme} colorScheme="light" height="100%">
      <div className="App">
        <Router>
          {/* <Route exact path='/' render={props => <TopPage {...props} />} /> */}
          <Route exact path='/' component={TopPage} />
          <Route path='/result' component={SearchResultPage} />
          <Route path='/detail' component={DetailPage} />
          {/* TODO 404ページの作成 */}
          {/* <Route path="/*" children={<div>404 Not Found</div>} /> */}
        </Router>
      </div>
    </Provider>
  )
}

export default App
