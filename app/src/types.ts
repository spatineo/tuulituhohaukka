export interface ReduxState {
  data: Data
}

export interface Data {
  global: Global
  cache: Cache
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



export interface Maps {
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
  R: number | null
  G: number | null
  B: number | null
}

export interface Catalogue {
  id: number
}

export interface Source {
  id: string
  name: string
  channelSelectorType: string
}

export interface WindDamages {
  date: string
  value: string
}

