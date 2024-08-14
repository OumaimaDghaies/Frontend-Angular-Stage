export class Intervention{
    id:Number
    code:String
    description:String
    dateDemande: Date
    
    newIntervention?: boolean
    panne: Panne[]=[];
    preparation : Preparation[]=[];
    immobilisation : Immobilisation= new Immobilisation();
    employee: Employee = new Employee();
    operation:Operation = new Operation();
}

export class Panne{
    id:Number
    libellePanne:String
    newPanne?: boolean
    typePanne:Number
    //typepanne: TypePanne =new TypePanne();
  
}
export class TypePanne{
    id:Number
    codeTypePanne:String
    libelleTypePanne:String
    static newTypepanne: boolean
}

export class Preparation{
    compteur:Number
    codePreparation:String
    libellePreparation:String
    newPreparation?: boolean
 
}
export class Immobilisation{
    compteur:Number
    designation:String
    emplacement:String
    numSerie:String
    groupe:String
    newImmobilisation?: boolean
}

export class Employee{
    compteur:Number
    codeEmployee:String
    libelleEmployee:String
    newEmployee?: boolean
    monitrice:boolean
}

export class Operation{
    compteur:Number
    codeOperation:String
    libelleOperation:String
    newOperation?: boolean
    //typemateriel: TypeMateriel= new TypeMateriel();
    //typeoperation : TypeOperation = new TypeOperation();
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