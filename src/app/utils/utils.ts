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
  public static getIdFromURL(url: string): string {
    return url.match(/\d+/g)[0];
  }
}
