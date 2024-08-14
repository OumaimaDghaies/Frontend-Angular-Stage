export class Panne{
    id:Number
    libellePanne:String
    newPanne?: boolean
    typePanne:Number
    typepanne: TypePanne =new TypePanne();
}
export class TypePanne{
    id:Number
    codeTypePanne:String
    libelleTypePanne:String
    static newTypepanne: boolean
}


