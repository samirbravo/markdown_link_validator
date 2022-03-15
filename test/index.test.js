import { expect } from 'chai';
import { getFile } from '../index.js';

const arrayResult = [
  {
    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
  }
]

describe('Get File', () => {
    it('should be a function', () => {
      expect(typeof getFile).to.equal('function')
    })
    it('should return an array with 1 result', async () => {
      const result = await getFile('test/arquivos/texto1.md')
      expect(result).to.have.lengthOf(1)
    })
    it('should return an array with results', async () => {
      const result = await getFile('test/arquivos/texto1.md')
      expect(result).to.deep.equal(arrayResult)
    })
    it('should return "there is no link" message when the file has no links', async () => {
      const result = await getFile('test/arquivos/texto1_sem_links.md')
      expect(result).to.equal('there is no link')
    })
});