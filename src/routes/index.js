import tarefaRoute from "./tarefaRoute.js"
import vetorRoutes from "./vetorRoute.js"

function Routes(app) {
    tarefaRoute(app)
    vetorRoutes(app)
}

export default Routes