import BaseRoutes from "../BaseRoutes";
import validate from "../../middlewares/ValidatorMiddleware";
import { createMaterialValidator, getMaterialValidator, updateMaterialValidator } from "../../validations/MaterialValidator";
import { MaterialController } from "../../controllers/MaterialController";

export class MaterialRoutes extends BaseRoutes {
  private _MaterialController: MaterialController;

  constructor(MaterialController: MaterialController) {
    super();
    this._MaterialController = MaterialController;
  }


  public routes(): void {
    this.router.get('/', this._MaterialController.findAll);
    this.router.get('/:material_id', validate(getMaterialValidator), this._MaterialController.findById);
    this.router.put('/:material_id', validate(updateMaterialValidator), this._MaterialController.update);
    this.router.delete('delete', validate(getMaterialValidator),this._MaterialController.delete);
    this.router.post('/create',validate(createMaterialValidator), this._MaterialController.create);
  }
}
