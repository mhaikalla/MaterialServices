import BaseRoutes from "../BaseRoutes";
import { MaterialService } from "../../services/MaterialService";
import { MaterialController } from "../../controllers/MaterialController";
import { MaterialRoutes } from "./MaterialRoutes";
import { MaterialRepository } from "../../repositories/MaterialRepository";


//Menu CRM total
const materialRepository = new MaterialRepository();
const materialService = new MaterialService(materialRepository);
const materialController = new MaterialController(materialService);
const materialRoutes = new MaterialRoutes(materialController);
materialRoutes.routes();
//End menu CRM total

export class ApiV1 extends BaseRoutes {
    constructor() {
        super()
    }
    
    
    public routes(): void {
        const appname = String(process.env.APP_NAME) ?? 'material_managements'
        this.router.use(`/v1/${appname}`, materialRoutes.router)
    }
}
