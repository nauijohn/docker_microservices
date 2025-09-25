import { JwtAuthGuard } from "@nauijohn/docker_microservices_common";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { CreateTodoDto } from "./dtos/create-todo.dto";
import { UpdateTodoDto } from "./dtos/update-todo.dto";
import { TodosService } from "./todos.service";

@Controller("todos")
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @Post()
  create(@Body() dto: CreateTodoDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const todo = await this.service.findOne(id);

    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateTodoDto) {
    const todo = await this.findOne(id);
    const updated = Object.assign(todo, dto);
    return this.service.update(updated);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string) {
    await this.findOne(id);
    this.service.delete(id);
  }
}
