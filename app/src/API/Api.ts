import { store } from '../App'
import { loadRootCatalog } from '../Store/Actions/data'

interface RootCatalog {
  type?: string,
  stack_version?: string,
  description?: string,
  links?: Array<any>
}

export const getAllDatasets = () => {
  const ReduxState = store.getState()
  const rootCatalog: RootCatalog = ReduxState.dataReducer.cache.catalog

  // Check if object is empty
  if (rootCatalog && Object.keys(rootCatalog).length === 0) {
    store.dispatch(loadRootCatalog('/Testdata/root.json'))
    return []
  }
  else {
    console.log('Rootcatalog in api function: ', rootCatalog)
    if (rootCatalog.links) {
      const dataSets = rootCatalog.links.filter((link: any) => link.rel === 'child')
      return dataSets
    }
  }
}
