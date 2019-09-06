import MapModel from './model'

const mapController = {
  create: (fields) => {
    MapModel.create({...fields}, function(error) {console.log('error while creating map'); throw error})
  }
}

export default mapController