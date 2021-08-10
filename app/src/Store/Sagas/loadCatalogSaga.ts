import axios from 'axios'
import { useSelector } from 'react-redux'
import { takeLatest, call, put } from "@redux-saga/core/effects"
import { LOAD_ROOT_CATALOG } from '../Actions/data'
import { setRootCatalog, catalogFetchStart, catalogFetchFailed, catalogFetchFinished } from '../Actions/data'

// _____ Catalog Functions ______
export const fetchRootCatalog = async () => {
  const response = await axios.get('/Testdata/root.json')
  const rootCatalogue = response.data
  return rootCatalogue
}

export const produceDatasetResults = (rootCatalog: any) => {
  return { datasets: rootCatalog.links.filter((link: any) => link.rel === 'child') }
}

export function* loadCatalogWatcher(): any {
  yield takeLatest(LOAD_ROOT_CATALOG, loadCatalogWorker)
}

function* loadCatalogWorker(): any {
  const rootCatalog = yield call(fetchRootCatalog)
  yield put(setRootCatalog(rootCatalog))
}

function* getCatalog(url: string) {
  // Fetch catalog from Redux
  const catalog = useSelector((state: any): any => state.dataReducer.cache.catalog)
  // If Catalog exists, return it
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

// const getCatalog2 = async(url:string) => {
//   const catalog = useSelector((state:any):any => state.dataReducer.cache.catalog)
//   if (catalog[url]) return catalog[url]

//   if (!catalog[url])
//   put(catalogFetchStart({url, inProgress: true}))
//   try {
//     const response = await axios.get(url)
//     const fetchedCatalog = response.data
//     put(catalogFetchFinished({url, fetchedCatalog, inProgress: false}))
//   } catch(error) {
//     put(catalogFetchFailed({url, error}))
//   }
//   return {links: []}
// }