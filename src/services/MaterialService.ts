import { MaterialFilter, Materials } from '../models/index';
import { v4 as uuidv4 } from 'uuid';
import { IMaterialRepository } from '../repositories/MaterialRepository'
import {QueryFilter} from '../models/QueryFilter'
import { HttpResponse } from '../utils/ApiJsonResponse';
import { ControllerBase } from '../controllers/ControllerBase';

export interface IMaterialService {
  findAllMaterial(filter : MaterialFilter): Promise<[Materials[], HttpResponse | null]>
  findMaterialById(id :number): Promise<[Materials | null, HttpResponse | null]>
  create(Material :Materials): Promise<[Materials | null, HttpResponse | null]>
  update(Material: Materials, id:number): Promise<[boolean, HttpResponse | null]>
  delete(id : number): Promise<[boolean, HttpResponse | null]>
}

export class MaterialService implements IMaterialService {
  private _MaterialRepository: IMaterialRepository;
  
  constructor(
    MaterialRepository: IMaterialRepository,
  ) {
    this._MaterialRepository = MaterialRepository
  }


  findAllMaterial = async (filter : MaterialFilter): Promise<[Materials[], HttpResponse | null]> => {
    const result = this._MaterialRepository.findAll(filter)
    if (result != null) {
      let err : HttpResponse = {
        message : "material not found",
        code  :404,
      }
      return [[], err] 
    }
    return [result, null]
  }

  findMaterialById = async (id :number):  Promise<[Materials | null, HttpResponse | null]> => {
    const result = this._MaterialRepository.findById(id)
    if (result != null) {
      let err : HttpResponse = {
        message : "material not found",
        code  :404,
      }
      return [null, err] 
    }
    return [result, null]
  }
  create = async (Material :Materials): Promise<[Materials | null, HttpResponse | null]> => {
    const result = this._MaterialRepository.create(Material)
    if (result != null) {
      let err : HttpResponse = {
        message : "Create Material Failed",
        code  :500,
      }
      return [null, err] 
    }
    return [result, null]
  }

  update = async (Material: Materials, id : number): Promise<[boolean, HttpResponse | null]> => {
    let resp : HttpResponse 
    let currentData = await this._MaterialRepository.findById(id)
    if(!currentData)
    {
      resp = {
        message : "Material Not Found",
        code  :404,
      }
      return [false, resp] 
    }
    else{
      currentData = {...Material}
      const result = await this._MaterialRepository.update(currentData,id)
      if (!result) {
        resp = {
          message : "update Material failed",
          code  :500,
        }
        return [false, resp] 
      }
      return [result, null]
    }
  }
  delete = async (id : number):Promise<[boolean, HttpResponse | null]> => {
    let err : HttpResponse 
    let currentData = await this._MaterialRepository.findById(id)
    if(!currentData)
    {
      err = {
        message : "Material not Found",
        code  :404,
      }
      return [false, err] 
    }
    else{
      const result = await this._MaterialRepository.delete(id)
      return [true, null] 
    }
  }
}
