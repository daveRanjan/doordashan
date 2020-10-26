import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseURL: string;
  private finalURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = environment.apiBaseUrl;
  }


  async hit(method: string, url: string, body?, queryParams = {}, headers: Array<{ headerName: string, headerValue: string }> = null, baseUrl?) {
    switch (method.toUpperCase()) {
      case 'DELETE':
        return this.delete(url, body, queryParams, headers, baseUrl);
      case 'POST':
        return this.post(url, body, queryParams, headers, baseUrl);
      case 'PUT':
        return this.put(url, body, queryParams, headers, baseUrl);
      case 'GET':
        return this.get(url, queryParams, headers, baseUrl);
    }
  }

  /**
   *
   * @param url : api path
   * @param queryParams : any queryParams
   * @param headers  : any custom header
   * @param baseUrl : any other different baseURL
   */
  get(url: string, queryParams?: any, headers: Array<{ headerName: string, headerValue: string }> = null, baseUrl?) {
    // debugger
    const customHeaders = this.prepareHTTPUrlWithConfig(url, queryParams, headers, baseUrl);
    return this.http.get(this.finalURL, { headers: customHeaders }).toPromise();
  }

  /**
   *
   * @param url : api path
   * @param body : DATA
   * @param queryParams : any queryparams
   * @param headers  : any custom headers
   * @param baseUrl : any other different baseURL
   */
  post(url: string, body: any, queryParams = {}, headers: Array<{ headerName: string, headerValue: string }> = null, baseUrl?) {
    const customHeaders = this.prepareHTTPUrlWithConfig(url, queryParams, headers, baseUrl);
    return this.http.post(this.finalURL, body, { headers: customHeaders }).toPromise();
  }

  /**
   *
   * @param url : api path
   * @param body : DATA
   * @param queryParams : any queryparams
   * @param headers  : any custom headers
   * @param baseUrl : any other different baseURL
   */
  put(url: string, body: any, queryParams = {}, headers: Array<{ headerName: string, headerValue: string }> = null, baseUrl?) {
    const customHeaders = this.prepareHTTPUrlWithConfig(url, queryParams, headers, baseUrl);
    return this.http.put(this.finalURL, body, { headers: customHeaders }).toPromise();
  }

  /**
   *
   * @param url : api path
   * @param body : DATA
   * @param queryParams : any queryparams
   * @param headers  : any custom headers
   * @param baseUrl : any other different baseURL
   */
  delete(url: string, body: any, queryParams?: any, headers: Array<{ headerName: string, headerValue: string }> = [], baseUrl?) {
    headers.push({ headerName: 'Content-Type', headerValue: 'application/json' });
    const customHeaders = this.prepareHTTPUrlWithConfig(url, null, headers, baseUrl);
    const options = {
      headers: customHeaders,
      body,
    };
    return this.http.delete(this.generateURL(url, baseUrl), options).toPromise();
  }

  /**
   *
   * @param queryParamObject : {a:100,b:200}
   * This function will convert object into querparam string, e.g. {a:100,b:200,c:300}, so result will be ?a=100&b=200&c=300
   */
  private prepareTheQueryParams(queryParamObject: any): string {
    if (queryParamObject.constructor === Object) {
      return Object.keys(queryParamObject).reduce((accumulator, currentValue, currentIndex) => {
        return accumulator + (currentIndex === 0 ? '' : '&') +
          queryParamObject[currentValue].reduce((acc, curVal, curIndex) => {
            return `${acc}${(curIndex === 0 ? '' : '&')}${currentValue}=${curVal}`;
          }, '');
      }, '?');
    }
    return '';
  }

  /**
   *
   * @param url :
    * Generates complete Api URL
   */
  private generateURL(url: string, baseURL = null): string {
    if (baseURL) {
      return baseURL + url;
    }
    return this.baseURL + url;
  }

  /**
   *
   * @param object : object \_(--)_/
   *  Function to check object passed in params is empty or not i.e. {} OR {a:100}
   */
  private isEmptyObject(object: object): boolean {
    // true means it's empty object [self-note]
    return object ? Object.keys(object).length === 0 && object.constructor === Object : true;
  }

  //  Name can be another good name
  /**
   *
   * @param url : api URL
   * @param queryParams : ?a=100&b:200
   * @param headers : HTTP headers
   */
  private prepareHTTPUrlWithConfig(url: string, queryParams: any = null,
                                   headers: Array<{ headerName: string, headerValue: string }> = null, baseURL = null) {
    let queryParamForUrl = '';
    let customHeaders = {};
    if (!this.isEmptyObject(queryParams)) {
      queryParamForUrl = this.prepareTheQueryParams(queryParams);
    }
    this.finalURL = this.generateURL(url, baseURL) + queryParamForUrl;

    if (headers != null) {
      customHeaders = this.prepareHTTPHeaders(headers);
    }
    return customHeaders;
  }

  /**
   *
   * @param headers : HTTP headers
   * Add custom headers to http calls
   */
  private prepareHTTPHeaders(headers: Array<{ headerName: string, headerValue: string }>): Object {
    const headers1 = {};
    headers.forEach((value, key) => {
      headers1[value.headerName] = value.headerValue;
    });
    return new HttpHeaders(headers1);
  }
}
