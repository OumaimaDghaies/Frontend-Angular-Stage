export class Article {
    newArticle?: boolean;
    id: Number;
    codeArticle: String;
    libelle: String;
    famille?:Famille=new Famille()
    sousfamille?: SousFamille = new SousFamille()
  }
  
  export class Famille {
    newfamille?: boolean;
    id: Number;
    libelle: String;
    listeSousFamilles: SousFamille[] = [];
    listArticles: Article[] = [];
    idsousfamille: SousFamille;
  }
  
  export class SousFamille {
    idsousfamille: Number;
    libellesousfamille: String;
    idf: Number;
    newsousfamille?: boolean;
    listArticles: Article[] = [];}