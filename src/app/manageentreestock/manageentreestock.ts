export class EntreeStock{
    newentreestock?: boolean
    compteur:Number
    codeEntree:String
    referenceCommandeClient:String
    codeFournisseur:String
    codeSourceEntree:String
    codeStatusEntree:String
    dateColisage:Date
    dateEntree:Date  
    listeDetailsEntreeStock:DetailsEntreeStock[]=[]
}

export class DetailsEntreeStock{
    compteur:Number
    codeEntree:String
    codeArticle:String
    codeProduitFini:String
    numLot:String
    qteListeColisage:Float32Array
    qteEntree:Float32Array
    qteRetour:Float32Array
    newdetailsentreestock: boolean
  editable: boolean
}

