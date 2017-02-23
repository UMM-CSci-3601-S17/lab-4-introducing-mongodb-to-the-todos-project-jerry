import { Component, OnInit } from '@angular/core';
import { TodoListService } from "./todo-list.service";
import { Todo } from './todo';
import { FilterBy } from "./filter.pipe";

@Component({
    selector: 'todo-list-component',
    providers: [
        FilterBy,
        TodoListService
    ],
    templateUrl: 'todo-list.component.html',
    //styleUrls: [ 'todo-list.component.css' ]
})

export class TodoListComponent implements OnInit{
    public todos: Todo[];

    constructor(private todoListService: TodoListService) {
        // this.todos = this.todoListService.getTodos();
    }

    ngOnInit(): void {
        this.todoListService.getTodos().subscribe(
            todos => this.todos = todos,
            err => {
                console.log(err);
            }
        );
    }
}