import api from "../api";

export async function saveCity(islandId:number, cXMin:number, cXMax:number, cYMin:number, cYMax:number) {
    try {
        const res = await api.post("/structuresRoute.php",{
            "whitchFunction":"saveCity",
            "islandId":islandId,
            "cXMin":cXMin,
            "cXMax":cXMax,
            "cYMin":cYMin,
            "cYMax":cYMax
            
        },{withCredentials:true})
    } catch (error) {
        
    }
}