export class Famille{
    newfamille?:boolean
    id:Number
    libelle:String
    listeSousFamilles:SousFamille[]=[]
    
}

export class SousFamille{
    idsousfamille:Number
    libellesousfamille:String
    idf:Number
    newsousfamille?: boolean
    
}



