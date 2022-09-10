interface iStickers {
  id_user: number | string
  countries: string
}

interface iCountryAlbum {
  name: string
  items: boolean[]
}

const simpleCountry = (name: string) => {
  let numberLenghtNewArray = 20

  if (name === 'FWC') {
    numberLenghtNewArray = 29
  }

  if (name === 'COCA') {
    numberLenghtNewArray = 8
  }

  return {
    name,
    items: Array(numberLenghtNewArray).fill(false),
  }
}

export default class AlbumCopa {
  Stickers: iStickers

  FWC: iCountryAlbum = simpleCountry('FWC')

  QAT: iCountryAlbum = simpleCountry('QAT')

  ECU: iCountryAlbum = simpleCountry('ECU')

  SEM: iCountryAlbum = simpleCountry('SEM')

  NED: iCountryAlbum = simpleCountry('NED')

  END: iCountryAlbum = simpleCountry('END')

  IRN: iCountryAlbum = simpleCountry('IRN')

  USA: iCountryAlbum = simpleCountry('USA')

  WAL: iCountryAlbum = simpleCountry('WAL')

  ARG: iCountryAlbum = simpleCountry('ARG')

  KSA: iCountryAlbum = simpleCountry('KSA')

  MEX: iCountryAlbum = simpleCountry('MEX')

  POL: iCountryAlbum = simpleCountry('POL')

  FRA: iCountryAlbum = simpleCountry('FRA')

  AUS: iCountryAlbum = simpleCountry('AUS')

  DEN: iCountryAlbum = simpleCountry('DEN')

  TUN: iCountryAlbum = simpleCountry('TUN')

  ESP: iCountryAlbum = simpleCountry('ESP')

  GRC: iCountryAlbum = simpleCountry('GRC')

  GER: iCountryAlbum = simpleCountry('GER')

  JPN: iCountryAlbum = simpleCountry('JPN')

  BEL: iCountryAlbum = simpleCountry('BEL')

  CAN: iCountryAlbum = simpleCountry('CAN')

  MAR: iCountryAlbum = simpleCountry('MAR')

  CRO: iCountryAlbum = simpleCountry('CRO')

  BRA: iCountryAlbum = simpleCountry('BRA')

  SRB: iCountryAlbum = simpleCountry('SRB')

  SUI: iCountryAlbum = simpleCountry('SUI')

  CMR: iCountryAlbum = simpleCountry('CMR')

  POR: iCountryAlbum = simpleCountry('POR')

  GHA: iCountryAlbum = simpleCountry('GHA')

  URU: iCountryAlbum = simpleCountry('URU')

  KOR: iCountryAlbum = simpleCountry('KOR')

  COCA: iCountryAlbum = simpleCountry('COCA')

  constructor(id_user: string | number) {
    const countries = [
      this.FWC,
      this.QAT,
      this.ECU,
      this.SEM,
      this.NED,
      this.END,
      this.IRN,
      this.USA,
      this.WAL,
      this.ARG,
      this.KSA,
      this.MEX,
      this.POL,
      this.FRA,
      this.AUS,
      this.DEN,
      this.TUN,
      this.ESP,
      this.GRC,
      this.GER,
      this.JPN,
      this.BEL,
      this.CAN,
      this.MAR,
      this.CRO,
      this.BRA,
      this.SRB,
      this.SUI,
      this.CMR,
      this.POR,
      this.GHA,
      this.URU,
      this.KOR,
      this.COCA,
    ]

    this.Stickers = {
      id_user,
      countries: JSON.stringify(countries),
    }
  }
}
