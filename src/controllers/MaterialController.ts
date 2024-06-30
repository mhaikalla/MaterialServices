import { Request, Response, NextFunction } from 'express';
import { ControllerBase } from './ControllerBase';
import { IMaterialService } from '../services/MaterialService';

import { MaterialResponse } from '../models/response';
import { Materials, MaterialFilter } from '../models';
import { QueryFilterParam } from '../models/QueryFilter';
export class MaterialController extends ControllerBase {
  private _MaterialService: IMaterialService;

  constructor(MaterialService: IMaterialService) {
    super();
    this._MaterialService = MaterialService;
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params;
    const id = Number(params.id)
    try {
      const [result, errors] = await this._MaterialService.findMaterialById(id)
      if(!result)
      {
        return this.setResponse(res, errors?.code, errors?.message, null,null)
      }
      else{
        return this.setResponse(res,200, "", null,null)
      }
    } catch (error) {
      return next(error);
    }
  };
  findAll = async (req: Request<any, any, any, QueryFilterParam<MaterialFilter>>, res: Response, next: NextFunction) => {
    try {
      const params = req.query;
      const filter = new MaterialFilter(
        req.query,
        params.first_name,
        params.last_name,
        params.email,
        params.password,
        params.phone
      );
      const [result, errors] = await this._MaterialService.findAllMaterial(filter)
      if(!result)
      {
         return this.setResponse(res, errors?.code, errors?.message, null,null)
      }
      else{
        return this.setResponse(res,200, "", null,null)
      }
    } catch (error) {
     
      return next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const bodyJson = req.body;
    try {
      const [result, errors] = await this._MaterialService.create(bodyJson)
      if(errors != null)
        {
          return this.setResponse(res, errors?.code, errors?.message, null,null)
        }
        else{
          return this.setResponse(res,200, "", null,null)
        }
    } catch (error) {
     
      return next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    const bodyJson = req.body;
    const id = Number(req.params.id);
    try {
      const result = await this._MaterialService.update(bodyJson, id)
      if(!result)
      {
        return this.NotFound(res, "Data Tidak Ditemukan")
      }
      else{
        return this.ok(res, result, "Data telah diupdate");
      }
    } catch (error) {
     
      return next(error);
    }
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    try {
      const [result,errors] = await this._MaterialService.delete(id)
      if(errors != null)
        {
          return this.setResponse(res, errors?.code, errors?.message, null,null)
        }
        else{
          return this.setResponse(res,200, "", null,null)
        }
    } catch (error) {
     
      return next(error);
    }
  };

}
