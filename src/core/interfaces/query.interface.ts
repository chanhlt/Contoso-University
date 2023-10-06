
export interface IQuery {
    page?: number; 
    limit?: number; 
    filter?: string; 
    order?: [string, string][]
}
