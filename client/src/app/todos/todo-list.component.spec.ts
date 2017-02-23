import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Todo } from "./todo";
import { TodoListComponent } from "./todo-list.component";
import { TodoListService } from "./todo-list.service";
import { Observable } from "rxjs";
import { PipeModule } from "../../pipe.module";

describe("Todos list", () => {

    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
        // stub TodosService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    id: "id_1",
                    owner: "Chris",
                    status: true,
                    body: "In sunt ex non tempor cillum",
                    category: "software design"
                },
                {
                    id: "id_2",
                    owner: "Pat",
                    status: false,
                    body: "Ipsum esse est ullamco magna",
                    category: "homework"
                },
                {
                    id: "id_3",
                    owner: "Jamie",
                    status: true,
                    body: "Aliqua esse aliqua veniam id",
                    category: "groceries"
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [PipeModule],
            declarations: [ TodoListComponent ],
            // providers:    [ TodoListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers:    [ { provide: TodoListService, useValue: todoListServiceStub } ]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the owners", () => {
        expect(todoList.todos.length).toBe(3);
    });

    it("contains a owner named 'Chris'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Chris" )).toBe(true);
    });

    it("contain a owner named 'Jamie'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Jamie" )).toBe(true);
    });

    it("doesn't contain a owner named 'Santa'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Santa" )).toBe(false);
    });

    it("has two owners whose status is true", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.status === true).length).toBe(2);
    });

});