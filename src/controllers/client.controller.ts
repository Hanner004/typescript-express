import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Client } from '../entities';
import { CreateClientDTO } from '../dto/client.dto';

export class ClientController {
  static async createClient(req: Request, res: Response) {
    const data: CreateClientDTO = req.body;
    console.log('🚀 ~ ClientController ~ createClient ~ data:', data);
    const clientRepository = AppDataSource.getRepository(Client);
    const newClient = clientRepository.create(data);
    await clientRepository.save(newClient);
    return res.status(200).json(newClient);
  }

  static async getClients(req: Request, res: Response) {
    const clientRepository = AppDataSource.getRepository(Client);
    const clientsFound = await clientRepository.find();
    return res.status(200).json(clientsFound);
  }
}
