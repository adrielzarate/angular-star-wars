export class Utils {

  /**
   * ???
   */
  public static swApiURL = 'https://swapi.dev/api';

  /**
   *
   * ????
   *
   * @param title
   * @param folderName
   */
  public static createImageURL(title: string, folderName: string): string {
    const imageName = title.toLowerCase().replace(/\s+/g, '');
    return `../assets/img/${folderName}/${imageName}.jpg`;
  }

  /**
   *
   */
  public static getIdFromURL(url: string): number {
    const id = url.match(/\d+/g)[0]
    return Number(id);
  }

  /**
   * ???
   *
   * @param characersCount
   * @param charactersPerPage
   */
  public static getPagesAmount(characersCount: number, charactersPerPage: number): number {
    return Math.ceil(characersCount/charactersPerPage);
  }

  /**
   * ???
   *
   * @param previousPage
   * @param nextPage
   * @param pagesLength
   */
  public static getCurrentPage(previousPage, nextPage, pagesLength) {
    if (!previousPage) return 1;
    else if (!nextPage) return pagesLength;
    else return this.getIdFromURL(nextPage) - 1;
  }
}
