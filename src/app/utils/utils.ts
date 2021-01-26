export class Utils {

  public static readonly SW_API_URL = 'https://swapi.dev/api';

  public static DEFAULT_IMAGE_URL = '../assets/img/unknown.jpg';

  public static createImageURL(title: string, folderName: string): string {
    const imageName = title.toLowerCase().replace(/\s+/g, '');
    return `../assets/img/${folderName}/${imageName}.jpg`;
  }

  public static getIdFromURL(url: string): number {
    const id = url.match(/\d+/g)[0]
    return Number(id);
  }

  public static getPagesAmount(characersCount: number, charactersPerPage: number): number {
    return Math.ceil(characersCount/charactersPerPage);
  }

  public static getCurrentPage(previousPage: string, nextPage: string, pagesLength: number) {
    if (!previousPage) return 1;
    else if (!nextPage) return pagesLength;
    else return this.getIdFromURL(nextPage) - 1;
  }
}
