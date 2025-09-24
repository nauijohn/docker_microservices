import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Todo } from "./todos.entity";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>,
  ) {}

  create(todo: Partial<Todo>): Promise<Todo> {
    const newTodo = this.repository.create(todo);
    return this.repository.save(newTodo);
  }

  findAll(): Promise<Todo[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Todo | null> {
    return this.repository.findOne({ where: { id } });
  }

  update(todo: Todo): Promise<Todo> {
    return this.repository.save(todo);
  }

  delete(id: string) {
    void this.repository.delete(id);
  }
}
