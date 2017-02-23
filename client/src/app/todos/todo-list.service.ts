import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Todo } from './todo';
import {Observable} from "rxjs";

@Injectable()
export class TodoListService {
    private baseUrl: string = API_URL + "todos";
    constructor(private http:Http) { }

    getTodos(): Observable<Todo[]> {
        return this.http.request(this.baseUrl).map(res => res.json());
    }

    getTodoById(id: string): Observable<Todo> {
        return this.http.request(this.baseUrl + "/" + id).map(res => res.json());
    }
}