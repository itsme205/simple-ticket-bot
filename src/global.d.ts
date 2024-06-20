import type HandlerClient from './classes/default/HandlerClient'
import type DataManagerClass from './modules/data_manager/Manager'

declare global{
  var client: HandlerClient
  var DataManager: DataManagerClass // Module "./modules/data_manager/Manager"
}
