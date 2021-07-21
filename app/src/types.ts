export interface ReduxState {
  data: Data
  cache: Cache
}

export interface Data {
  global: Global
  maps: Map[]
}

export interface Global {
  bbox: number[];
  selectedTime: string;
  fullScreen: string;
  mapSize: string;
}

export interface Cache {
  catalogue: Catalogue;
  sources: Source[];
  windDamages: WindDamages[];
}



export interface Map {
  id: number
  selectedSource: string | null
  channelSettings: ChannelSettings
  displayWindDamageVector: boolean
  displaySpyGlass: boolean
  panelBarSettings: PanelBarSettings
  derivedData: DerivedData
}

export interface DerivedData {
  sources: Source[]
  timeValues: TimeValues
  mapLayers: []
}

export interface mapLayers {
  [index: number]: innerArray
}

interface innerArray {
  [index: number]: { linkToMapImage: string, srs: string }
}

export interface TimeValues {
  inspection: string
  comparison: string
}

export interface PanelBarSettings {
  displayDataSourceList: boolean
  displayVisualization: boolean
}

export interface ChannelSettings {
  R: string
  G: string
  B: string
}

export interface Catalogue {
  id?: number
}

export interface Source {
  id?: string
  name: string
  channelSelectorType?: string
}

export interface WindDamages {
  date: string
  value: string
}

