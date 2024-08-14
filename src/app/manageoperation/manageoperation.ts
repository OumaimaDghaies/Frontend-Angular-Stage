export class Operation{
    compteur:Number
    codeOperation:String
    libelleOperation:String
    newOperation?: boolean
    typemateriel: TypeMateriel= new TypeMateriel();
    typeoperation : TypeOperation = new TypeOperation();
}
export class TypeMateriel{
    compteur:Number
    codeTypeMateriel:String
    libelleTypeMateriel:String
    newTypeMateriel?: boolean
}

export class TypeOperation{
    compteur:Number
    codeTypeOperation:String
    libelleTypeOperation:String
    OrdreImpression: String
    newTypeOperation?: boolean
}
