export enum DataApi {
    Usuario = 1,
    Authentication = 2,
    ComboBox = 3,
    Cita = 4,
    Sintoma = 5,
    Public = 6,
}


export const dataApiRootMap: { [api: string]: string } = {
    "1": "api/Usuario",
    "2": "api/Authentication",
    "3": "api/ComboBox",
    "4": "api/Cita",
    "5": "api/Sintoma",
    "6": "api/Public",
};
