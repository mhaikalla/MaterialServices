import { QueryFilter,QueryFilterParam } from "./QueryFilter"

export interface Materials extends BaseEntity {
  name : string,
  category:  string,
  price : number,
  stock : number,
  description : string,
  unit : string,
  unit_count : number
} 


export interface BaseEntity {
  id  :  number,
  created_at : Date,
  updated_at : Date,
  deleted_at : Date | null
}

export class MaterialFilter extends QueryFilter<Materials> {
  first_name? :  string | null
  last_name? :  string | null
  email?:   string | null
  password? :  string | null
  phone? :  string | null
  constructor(
    filter: QueryFilterParam<Materials>,
    first_name? : string,
    last_name? : string,
    email?:  string,
    password?: string,
    phone? : string
  ) {
    super(filter);
    this.first_name = first_name ? String(first_name) : null,
    this.last_name = last_name ? String(last_name) : null,
    this.email = email ? String(email) : null,
    this.password = password ? String(password) : null,
    this.phone = phone ? String(phone) : null
  }
}

