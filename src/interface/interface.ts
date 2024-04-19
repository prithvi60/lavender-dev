export interface ISaloonData {
  id: number;
  tags: string[];
  image: string;
  parlorName: string;
  rating: number;
  treatments:any;
  location: string;
  reviewCount: number;
}


export interface ISearchEstablishmentData{
  establishmentId: number,
  establishmentName: string,
  establishmentLocation: string,
  estImages: string[],
  rating: number,
  services: [],
}