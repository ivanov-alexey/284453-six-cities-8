import { Hotel } from '../../types/index.js';

export interface FileParser {
  parseLine(line: string): Hotel;
}
