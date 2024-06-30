import {Op} from 'sequelize'
import {
  MaterialFilter,
  Materials
} from '../models'; 

import { MaterialsTable  } from '../db/sequelize/table';
import {QueryFilter} from '../models/QueryFilter'
export interface IMaterialRepository {
  findById(id  :number): Promise<Materials | null>
  findAll(filter : MaterialFilter): Promise<Materials[]> 
  create(Material : Materials) : Promise<Materials | null>
  delete(id : number) : Promise<boolean> 
  update(Material:Materials, id : number) : Promise<boolean>
 
}


export class MaterialRepository implements IMaterialRepository {
 
  findById = async (id :number): Promise<Materials | null> => {
    const result = await MaterialsTable.findByPk(id)
    if(!result) return null
    return result.get({plain : true})
  };
  findAll = async (filter : MaterialFilter): Promise<Materials[]> => {
    const {keyword, page, limit} = filter
    const offset = limit * (page - 1) 
    let where = {}
    if(keyword){
      where = {
        [Op.or] :{
          title :{ [Op.like] : keyword},
          description :{ [Op.like] : keyword},
        }
      }
    }
    const result = await  MaterialsTable.findAll({
      where,
      limit,
      offset
    })
    if(result.length == 0) return []

    return result.map(m => m.get({plain : true}))
  };
  create = async(Material : Materials) : Promise<Materials | null> => {
    try{
      const result = await MaterialsTable.create(Material)
      return result.get({plain : true})
    }
    catch(ex)
    {
      
      return null
    }
  }
  update = async(Material:Materials, id : number) : Promise<boolean> => {
    try{
      await MaterialsTable.update(Material, {where: {id}})
      return true 
    }
    catch(ex){
      return false
    }
  }
  delete = async(id : number) : Promise<boolean> => {
    try{
      await MaterialsTable.destroy({where: {id}})
      return true
    }
    catch(ex){
      return false
    }
  }
}
