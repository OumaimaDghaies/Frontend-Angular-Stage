export class Gamme{
    newgamme?:boolean
    compteur:Number
    codeGamme:String
    libelleGamme:String
    gammeReferences:boolean
    codeGammeReference:string
    qtePiquage:Float32Array
    qteControle:Float32Array
    qteExpedition:Float32Array
    codeGammeMillet:String
    listproduitsFinis: ProduitFini[]=[]

}
export class ProduitFini{
    newPFini?:boolean
    id:Number
    codeP:String
    libelle:String
    gammeid:Number
    famillePF:Number
    gamme:Gamme
  familleproduitfini:  FamilleProduitFini
}
  export class FamilleProduitFini{
    newfamillePFini?:boolean
    id:Number
    code:String
    libelle:String
    listproduitsFinis: ProduitFini[]=[]
}


