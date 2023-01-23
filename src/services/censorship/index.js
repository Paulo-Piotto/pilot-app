import { Route } from "react-router-dom";
import Config from "../../pilot-app.config";
import CensoredScreen from "./CensoredScreen";
import routesConfig from "./routesConfig";


export default function Censorship(userData) {
    const userPermission = userData.role

    return routesConfig.map(routeConfig => 
        Config.rolesLevel[userPermission] >= Config.rolesLevel[routeConfig.minimumAcessLevel]
            ? <Route path={routeConfig.path} element={<routeConfig.component />} key={routeConfig.path} />
            : <Route path={routeConfig.path} element={routeConfig.unauthorizedComponent ?? <CensoredScreen />} key={routeConfig.path} />
        )
}