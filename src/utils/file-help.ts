const fs = window.require('fs').promises;

const fileHelper = {
  readFile(path: string) {
    return fs.readFile(path, { encoding: 'utf8' });
  },

  writeFile(path: string, content: any) {
    console.log(path);
    return fs.writeFile(path, content, { encoding: 'utf8' });
  }
};

export default fileHelper;
