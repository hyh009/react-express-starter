import {
  todoPriorities,
  todoStatuses,
} from '@src/models/todo/model';
import { todoService } from '@src/services/todo.service';
import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const todoParamsSchema = z.object({
  todoId: z.string().trim().min(1),
});

const createTodoSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().nullable().optional(),
  status: z.enum(todoStatuses),
  priority: z.enum(todoPriorities),
  owner_name: z.string().trim().min(1),
});

const updateTodoSchema = createTodoSchema.partial().refine(
  (input) => Object.keys(input).length > 0,
  'At least one todo field is required',
);

/**
 * @openapi
 * components:
 *   schemas:
 *     TodoStatus:
 *       type: string
 *       enum:
 *         - todo
 *         - in-progress
 *         - done
 *     TodoPriority:
 *       type: string
 *       enum:
 *         - low
 *         - medium
 *         - high
 *     Todo:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - status
 *         - priority
 *         - owner_name
 *       properties:
 *         id:
 *           type: string
 *           example: todo-1
 *         title:
 *           type: string
 *           example: Design frontend architecture
 *         description:
 *           type: string
 *           nullable: true
 *           example: Document frontend boundaries.
 *         status:
 *           $ref: '#/components/schemas/TodoStatus'
 *         priority:
 *           $ref: '#/components/schemas/TodoPriority'
 *         owner_name:
 *           type: string
 *           example: Frontend
 *     CreateTodoRequest:
 *       type: object
 *       required:
 *         - title
 *         - status
 *         - priority
 *         - owner_name
 *       properties:
 *         title:
 *           type: string
 *           example: Build Todo CRUD
 *         description:
 *           type: string
 *           nullable: true
 *           example: Connect frontend Todo demo to backend.
 *         status:
 *           $ref: '#/components/schemas/TodoStatus'
 *         priority:
 *           $ref: '#/components/schemas/TodoPriority'
 *         owner_name:
 *           type: string
 *           example: Frontend
 *     UpdateTodoRequest:
 *       type: object
 *       minProperties: 1
 *       properties:
 *         title:
 *           type: string
 *           example: Build Todo CRUD
 *         description:
 *           type: string
 *           nullable: true
 *           example: Connect frontend Todo demo to backend.
 *         status:
 *           $ref: '#/components/schemas/TodoStatus'
 *         priority:
 *           $ref: '#/components/schemas/TodoPriority'
 *         owner_name:
 *           type: string
 *           example: Frontend
 *     TodoListSuccessResponse:
 *       type: object
 *       required:
 *         - status
 *         - data
 *       properties:
 *         status:
 *           type: string
 *           enum:
 *             - success
 *           example: success
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Todo'
 *     TodoSuccessResponse:
 *       type: object
 *       required:
 *         - status
 *         - data
 *       properties:
 *         status:
 *           type: string
 *           enum:
 *             - success
 *           example: success
 *         data:
 *           $ref: '#/components/schemas/Todo'
 *     DeleteTodoSuccessResponse:
 *       type: object
 *       required:
 *         - status
 *         - data
 *       properties:
 *         status:
 *           type: string
 *           enum:
 *             - success
 *           example: success
 *         data:
 *           type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               example: todo-1
 *     ErrorResponse:
 *       type: object
 *       required:
 *         - status
 *         - statusCode
 *         - code
 *         - message
 *       properties:
 *         status:
 *           type: string
 *           enum:
 *             - error
 *           example: error
 *         statusCode:
 *           type: integer
 *           example: 404
 *         code:
 *           type: string
 *           example: TODO_NOT_FOUND
 *         message:
 *           type: string
 *           example: Todo not found
 */

/**
 * @openapi
 * /v1/todos:
 *   get:
 *     tags:
 *       - Todos
 *     summary: List todos
 *     responses:
 *       200:
 *         description: Todo list returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoListSuccessResponse'
 */
router.get('/', async (_req, res) => {
  res.json({
    status: 'success',
    data: await todoService.listTodos(),
  });
});

/**
 * @openapi
 * /v1/todos/{todoId}:
 *   get:
 *     tags:
 *       - Todos
 *     summary: Get a todo
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         example: todo-1
 *     responses:
 *       200:
 *         description: Todo returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoSuccessResponse'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:todoId', async (req, res) => {
  const { todoId } = todoParamsSchema.parse(req.params);

  res.json({
    status: 'success',
    data: await todoService.getTodo(todoId),
  });
});

/**
 * @openapi
 * /v1/todos:
 *   post:
 *     tags:
 *       - Todos
 *     summary: Create a todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodoRequest'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoSuccessResponse'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', async (req, res) => {
  const input = createTodoSchema.parse(req.body);

  res.status(201).json({
    status: 'success',
    data: await todoService.createTodo(input),
  });
});

/**
 * @openapi
 * /v1/todos/{todoId}:
 *   patch:
 *     tags:
 *       - Todos
 *     summary: Update a todo
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         example: todo-1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodoRequest'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoSuccessResponse'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch('/:todoId', async (req, res) => {
  const { todoId } = todoParamsSchema.parse(req.params);
  const input = updateTodoSchema.parse(req.body);

  res.json({
    status: 'success',
    data: await todoService.updateTodo(todoId, input),
  });
});

/**
 * @openapi
 * /v1/todos/{todoId}:
 *   delete:
 *     tags:
 *       - Todos
 *     summary: Delete a todo
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         example: todo-1
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteTodoSuccessResponse'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:todoId', async (req, res) => {
  const { todoId } = todoParamsSchema.parse(req.params);

  res.json({
    status: 'success',
    data: await todoService.deleteTodo(todoId),
  });
});

export default router;
