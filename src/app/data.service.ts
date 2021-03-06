import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environments/environment";

export interface Root_Cat {
  _id: string;
  name: string;
  picture: string;
}

export interface Cat {
  _id: string;
  name: string;
  marge: number;
  picture: string;
  sub_category: [
    _id: string,
    name: string,
    pricture: string
  ];
}

export interface Input {
  _id: string;
  name: string;
  array: boolean;
  text: boolean;
  category: string;
}

export interface Input_value {
  id: string;
  value: string;
  id_array: string | undefined;
}

export interface Input_array_temp {
  _id: string;
  name: string;
  val_func_id: string;
  value: number;
}

export interface Input_array {
  _id: string;
  name: string;
  val_func_id: string;
  value: number;
}

export interface Estim_lists {
  _id: string;
  product_category_id: string;
}

export interface Input_value_lists {
  _id: string;
  product_category_id: string;
  product_ref: string;
}

export interface Calcul_lists {
  _id: string;
  propose_price: number;
  marge: number;
}

@Injectable()
export class FrontDataService {

  rootCatLists: Root_Cat[] = [];
  catLists: Cat[] = [];
  inputLists_temp: Input[] = [];
  input_array_Lists: Input_array[] = [];
  input_array_Lists_temp: Input_array_temp[] = [];

  private _rootCatListUrl = environment.apiURL + '/sub-category';
  private _catListUrl = environment.apiURL + '/category';
  private _inputListUrl = environment.apiURL + '/val_func';
  private _input_array_ListUrl = environment.apiURL + '/array_val';
  private _estimPostUrl = environment.apiURL + '/price_estim';
  private _inputValueUrl = environment.apiURL + '/input_func';
  private _calculEstimUrl = environment.apiURL + '/calcul';

  constructor(public _httpClient: HttpClient) {}

  getRootCategoryData() {
    return this._httpClient.get<Root_Cat[]>(this._rootCatListUrl)
  }

  getCategoryData(root_cat_id: string) {
    return this._httpClient.get<Cat[]>(this._catListUrl + '/root_category/' + root_cat_id)
  }

  getInputFuncData() {
    return this._httpClient.get<Input[]>(this._inputListUrl)
  }

  getArrayFuncData() {
    return this._httpClient.get<Input_array_temp[]>(this._input_array_ListUrl)
  }

  postEstimateData(cat_id: string | undefined, name: string, surname: string, mail: string) {
    const body = {product_category_id: cat_id, name: name, surname: surname, mail: mail};
    return this._httpClient.post<Estim_lists[]>(this._estimPostUrl, body)
  }

  putEstimateData(calcul: string, estimId: string ) {
    const body = { calcul_id: calcul };
    return this._httpClient.put<Estim_lists[]>(this._estimPostUrl + '/' + estimId, body)
  }

  postInputValueData(estimId: string, id: string, value: string, id_array: string | undefined) {
    const body = {price_estimate_id: estimId, val_func_id: id, val_func_array_id: id_array, value: value};
    return this._httpClient.post<Input_value_lists[]>(this._inputValueUrl, body)
  }

  postCalculateData(estimId: string) {
    const body = {price_estimID: estimId};
    return this._httpClient.post<Calcul_lists[]>(this._calculEstimUrl, body)
  }

}
