import { FilterTaskStatus, ITask, OtherTaskStatus, TaskStatus } from '@libs/types';
import { datetime } from '@libs/utils';
import express, { Request, Response } from 'express';
import lodash from 'lodash';
import { TASK_TABLE, getDb } from '../database';

export default class TaskController {
  static router = express.Router();

  static async getList(req: Request, res: Response) {
    const db = await getDb();

    const page = !isNaN(Number(req.query.page)) ? Number(req.query.page) : 1;
    const limit = !isNaN(Number(req.query.limit)) ? Number(req.query.limit) : 20;
    const status = req.query.status as FilterTaskStatus;

    const products = db.chain.get(TASK_TABLE).value();
    const totalDocs = products.length;
    const current_page = page;
    const totalPages = Math.ceil(totalDocs / limit);
    const hasNextPage = current_page < totalPages;
    const hasPrevPage = current_page > 1;

    const data = db.chain
      .get(TASK_TABLE)
      .filter((item: ITask) => {
        if (status === OtherTaskStatus.All) {
          return true;
        }
        return item.status === status;
      })
      .slice((current_page - 1) * limit, current_page * limit)
      .value();

    res.json({
      success: true,
      data: data,
      totalDocs,
      totalPages,
      page: current_page,
      limit,
      hasNextPage,
      hasPrevPage,
    });
  }

  static async getOne(req: Request, res: Response) {
    const db = await getDb();
    const id = req.params.id;
    const data = db.chain.get(TASK_TABLE).find({ _id: id }).value();
    res.json({
      success: true,
      data,
    });
  }

  static async create(req: Request, res: Response) {
    const db = await getDb();
    const { title, description } = req.body;
    const newItem: ITask = {
      _id: lodash.uniqueId(),
      title,
      description,
      status: TaskStatus.Incomplete,
      created_at: datetime().toISOString(),
      updated_at: datetime().toISOString(),
    };
    const data = db.chain.get(TASK_TABLE).push(newItem).value();
    await db.write();
    res.json({
      success: true,
      data: newItem,
    });
  }

  static async update(req: Request, res: Response) {
    const db = await getDb();
    const id = req.params.id;
    const { title, description, status } = req.body;
    const updatedItem = {
      title,
      description,
      status,
      updated_at: datetime().toISOString(),
    };
    db.chain.get(TASK_TABLE).find({ _id: id }).assign(updatedItem).value();
    await db.write();
    const updatedData = db.chain.get(TASK_TABLE).find({ _id: id }).value();
    res.json({
      success: true,
      data: updatedData,
    });
  }

  static async delete(req: Request, res: Response) {
    const db = await getDb();
    const id = req.params.id;
    db.chain.get(TASK_TABLE).remove({ _id: id }).value();
    await db.write();
    res.json({
      success: true,
    });
  }

  static async updateStatus(req: Request, res: Response) {
    const db = await getDb();
    const id = req.params.id;
    const { status } = req.body;
    const updatedItem = {
      status,
      updated_at: datetime().toISOString(),
    };
    db.chain.get(TASK_TABLE).find({ _id: id }).assign(updatedItem).value();
    await db.write();
    const updatedData = db.chain.get(TASK_TABLE).find({ _id: id }).value();
    res.json({
      success: true,
      data: updatedData,
    });
  }
}

TaskController.router.get('/', TaskController.getList);
TaskController.router.get('/:id', TaskController.getOne);
TaskController.router.post('/', TaskController.create);
TaskController.router.put('/:id', TaskController.update);
TaskController.router.put('/:id/status', TaskController.updateStatus);
TaskController.router.delete('/:id', TaskController.delete);
