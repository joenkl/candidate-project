/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import Mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';

chai.use(chaiHttp);
chai.use(dirtyChai);
chai.use(sinonChai);

const findTestFiles = (dir) => {
  const contents = fs.readdirSync(dir);

  const filePaths = [];

  contents.forEach((element) => {
    const elementPath = path.join(dir, element);
    const stats = fs.statSync(elementPath);

    if (stats.isDirectory()) {
      Array.prototype.push.apply(filePaths, findTestFiles(elementPath));
    } else if (element.substr(-8) === '.spec.js') {
      filePaths.push(elementPath);
    }
  });

  return filePaths;
};

const runMocha = (dir) =>
  new Promise((resolve, reject) => {
    try {
      const mocha = new Mocha();
      const files = findTestFiles(dir);
      files.forEach((file) => {
        mocha.addFile(file);
      });
      mocha.run(resolve);
    } catch (err) {
      reject(err);
    }
  });

const tests = async () => {
  const failures = await runMocha(__dirname);
  if (failures) process.exit(failures);
};

tests()
  .then(process.exit)
  .catch((err) => {
    console.error(err);
    process.exit(-1);
  });
