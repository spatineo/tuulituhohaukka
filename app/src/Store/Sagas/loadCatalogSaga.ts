import axios from 'axios'
import { takeLatest, call, put, select } from "@redux-saga/core/effects"
import { LOAD_ROOT_CATALOG } from '../Actions/data'
import { setRootCatalog, catalogFetchStart, catalogFetchFailed, catalogFetchFinished } from '../Actions/data'

interface LoadDataActionWithParam {
  type: string,
  payload: string
}

// _____ Saga watchers and Workers ______

export function* loadCatalogWatcher(): any {
  yield takeLatest(LOAD_ROOT_CATALOG, loadCatalogWorker)
}

function* loadCatalogWorker(action: LoadDataActionWithParam): any {
  const rootCatalog = yield call(getAllDatasets, action.payload)
  yield put(setRootCatalog(rootCatalog))
}

// _____ Catalog functions
const getAllDatasets = (url: string) => {
  const rootCatalog = getCatalog(url)
  const dataSets = produceDatasetResults(rootCatalog)
  return dataSets
}

const getCatalog = async (url: string) => {
  const catalog = select((state: any) => state.dataReducer.cache.catalog) as any
  if (catalog[url]) return catalog[url]

  if (!catalog[url])
    put(catalogFetchStart({ url, inProgress: true }))
  try {
    const response = await axios.get(url)
    const fetchedCatalog = response.data
    put(catalogFetchFinished({ url, fetchedCatalog, inProgress: false }))
  } catch (error) {
    put(catalogFetchFailed({ url, error }))
  }
  return { links: [] }
}


export const produceDatasetResults = (rootCatalog: any) => {
  return { datasets: rootCatalog.links.filter((link: any) => link.rel === 'child') }
}






//______ Return catalog

export const fetchRootCatalog = async () => {
  const response = await axios.get('/Testdata/root.json')
  const rootCatalogue = response.data
  return rootCatalogue
}









function* getCatalogGenerator(url: string) {
  // Fetch catalog from Redux
  const getCatalogRedux = (state: any): any => state.dataReducer.cache.catalog
  const catalog = select(getCatalogRedux) as any
  if (catalog[url]) return catalog

  // If No catalog, fetch catalog, and initially return empty array
  if (!catalog[url]) {
    yield put(catalogFetchStart({ url, inProgress: true }))
    axios.get(url).then(catalog => {
      put(catalogFetchFinished({ url, catalog, inProgress: false }))
    }).catch(error => {
      put(catalogFetchFailed({ url, error }))
    })
    return { links: [] }
  }
}