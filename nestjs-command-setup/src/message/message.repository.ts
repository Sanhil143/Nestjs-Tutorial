import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessageRepository {
  async findOne(id: string) {
    const contents = await readFile('message.json', 'utf-8');
    const messages = JSON.parse(contents);
    return messages[id];
  }

  async findAll() {
    const contents = await readFile('message.json', 'utf-8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async createMessage(message: string) {
    const contents = await readFile('message.json', 'utf-8');
    const messages = JSON.parse(contents);
    const ids = Object.keys(messages).map((id) => parseInt(id, 10));
    const highestId = ids.length > 0 ? Math.max(...ids) : 0;
    const newId = highestId + 1;
    messages[newId] = { id: newId, content: message };
    await writeFile('message.json', JSON.stringify(messages));
  }
}
